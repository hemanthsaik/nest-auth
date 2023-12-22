// proxy.service.ts
import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { catchError, lastValueFrom, map } from 'rxjs'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

interface InputItem {
  userId: number
  emailId: string
  roleId: number
  roleName: string
  rolePermissionId: number
  apiMethodId: number
  methodName: string
  apiId: number
  apiName: string
}

export interface Role {
  id: number
  name: string
}

export interface RolePermission {
  [apiName: string]: string[]
}

interface Result {
  userId: number
  emailId: string
  role: Role
  rolePermission: RolePermission
}

@Injectable()
export class ProxyService {
  constructor(
    @InjectDataSource('admin')
    private readonly dataSource: DataSource,
    private readonly httpService: HttpService,
  ) {}

  private handleError(error: any): never {
    console.log(error)
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
        admin_user.emailId = ?;`

    const user = await this.dataSource.query(rawQuery, [email])
    if (user.length === 0) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    const userData = this.transformArray(user)
    return userData
  }

  transformArray(inputArray: InputItem[]): Result {
    // Create an empty result object
    let result: Result = {
      userId: 0,
      emailId: '',
      role: {
        id: 0,
        name: '',
      },
      rolePermission: {},
    }

    // Loop through the input array
    inputArray.forEach((item) => {
      // Extract common properties
      const { userId, emailId, roleId, roleName, methodName, apiName } = item

      // Create or update user-related properties in the result object
      if (!result.userId) {
        result.userId = userId
        result.emailId = emailId
        result.role = {
          id: roleId,
          name: roleName,
        }
        result.rolePermission = {}
      }

      // Create or update api-related properties in the result object
      if (!result.rolePermission[apiName]) {
        result.rolePermission[apiName] = []
      }

      result.rolePermission[apiName].push(methodName)
    })

    // Create a 'user' array based on the 'rolePermission' values
    result.rolePermission.user = result.rolePermission.matm.slice()

    return result
  }
}
