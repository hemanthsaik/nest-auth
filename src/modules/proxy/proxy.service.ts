import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { catchError, lastValueFrom, map } from 'rxjs'
import { DataSource } from 'typeorm'
import { InputItem, ProxyResult, Result } from './proxy.types'

@Injectable()
export class ProxyService {
  constructor(
    @InjectDataSource('admin')
    private readonly dataSource: DataSource,

    private readonly httpService: HttpService,
  ) {}

  private handleError(error: any): never {
    throw new HttpException(
      'Something went wrong. Please try again later.',
      HttpStatus.SERVICE_UNAVAILABLE,
    )
  }

  async proxyRequest(
    httpMethod: string,
    url: string,
    accessToken: string,
    data: any,
  ) {
    switch (httpMethod) {
      case 'GET':
        const getResponse = this.httpService
          .get(url, {
            headers: {
              Authorization: accessToken,
            },
          })
          .pipe(
            map((res) => {
              return res.data
            }),
          )
          .pipe(
            catchError((error) => {
              this.handleError(error)
            }),
          )

        return await lastValueFrom(getResponse)
      case 'POST':
        const postResponse = this.httpService
          .post(url, data, {
            headers: {
              Authorization: accessToken,
            },
          })
          .pipe(
            map((res) => {
              return res.data
            }),
          )
          .pipe(
            catchError((error) => {
              this.handleError(error)
            }),
          )
        return await lastValueFrom(postResponse)
      case 'PUT':
        const putResponse = this.httpService
          .put(url, data, {
            headers: {
              Authorization: accessToken,
            },
          })
          .pipe(
            map((res) => {
              return res.data
            }),
          )
          .pipe(
            catchError((error) => {
              this.handleError(error)
            }),
          )
        return await lastValueFrom(putResponse)
      case 'DELETE':
        const deleteResponse = this.httpService
          .delete(url, {
            headers: {
              Authorization: accessToken,
            },
          })
          .pipe(
            map((res) => {
              return res.data
            }),
          )
          .pipe(
            catchError((error) => {
              this.handleError(error)
            }),
          )
        return await lastValueFrom(deleteResponse)
      default:
        throw new Error(`Unsupported HTTP method: ${httpMethod}`)
    }
  }

  async currentUser(email: string) {
    const rawQuery = `
      SELECT
        admin_user.id AS userId,
        admin_user.emailId AS emailId,
        admin_user.password AS password,
        admin_user.fullName AS fullName,
        admin_user.mobileNumber AS mobileNumber,
        admin_user.isBlock AS isBlock,
        admin_user.resetPasswordToken AS resetPasswordToken,
        admin_user.resetPasswordExpires AS resetPasswordExpires,
        admin_user.status AS status,
        roles.id AS roleId,
        roles.name AS roleName,
        role_permissions.id AS rolePermissionId,
        api_methods.id AS apiMethodId,
        api_methods.methodName AS methodName,
        api.id AS apiId,
        api.apiName AS apiName
      FROM
        adminservice.admin_user
      LEFT JOIN roles ON admin_user.roleId = roles.id
      LEFT JOIN role_permissions ON roles.id = role_permissions.roleId
      LEFT JOIN api_methods ON role_permissions.apiMethodId = api_methods.id
      LEFT JOIN api ON api_methods.apiId = api.id
      WHERE
        admin_user.emailId = ? AND admin_user.status = 1;`

    const user = await this.dataSource.query(rawQuery, [email])

    if (user.length === 0) {
      return {} as ProxyResult
    } else {
      const userData = this.transformArray(user)
      return userData
    }
  }

  transformArray(inputArray: InputItem[]): Result {
    let result: Result = {
      userId: 0,
      emailId: '',
      password: '',
      fullName: '',
      isBlock: '',
      resetPasswordToken: '',
      resetPasswordExpires: '',
      status: true,
      mobileNumber: '',
      role: {
        id: 0,
        name: '',
      },
      rolePermission: {},
    }

    inputArray.forEach((item) => {
      const {
        userId,
        emailId,
        password,
        fullName,
        mobileNumber,
        status,
        resetPasswordToken,
        resetPasswordExpires,
        isBlock,
        roleId,
        roleName,
        methodName,
        apiName,
      } = item

      if (!result.userId) {
        result.userId = userId
        result.emailId = emailId
        result.fullName = fullName
        result.password = password
        result.mobileNumber = mobileNumber
        result.isBlock = isBlock
        result.resetPasswordToken = resetPasswordToken
        result.resetPasswordExpires = resetPasswordExpires
        ;(result.status = status === 1 ? true : false),
          (result.role = {
            id: roleId,
            name: roleName,
          })
        result.rolePermission = {}
      }

      if (!result.rolePermission[apiName]) {
        result.rolePermission[apiName] = []
      }

      if (!result.rolePermission[apiName].includes(methodName)) {
        result.rolePermission[apiName].push(methodName)
      }
    })

    result.rolePermission.user = []

    Object.keys(result.rolePermission).forEach((apiName) => {
      result.rolePermission[apiName].forEach((methodName) => {
        if (!result.rolePermission.user.includes(methodName)) {
          result.rolePermission.user.push(methodName)
        }
      })
    })

    return result
  }
}
