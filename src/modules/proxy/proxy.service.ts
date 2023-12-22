// proxy.service.ts
import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { catchError, lastValueFrom, map } from 'rxjs'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

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
        admin_user.id AS adminUserId,
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

    // try {
    //   const result = await this.dataSource.query(rawQuery, [email])
    //   console.log({ result })
    // } catch (error) {
    //   console.log(error)
    // }

    const userObject = {
      emailId: 'anandhan@payrup.com',
      password: '$2b$10$K1RYUAkk8NNA0hck0lNDOu93GaiLoPAr9NuQ4sz7MpCnkd0R.jZ3u',
      fullName: 'Anandhan Suruli',
      mobileNumber: '9524914940',
      isBlock: 'no',
      resetPasswordToken: 'a7837d69cce78493be332119c2a7a3d4a8b9c282',
      resetPasswordExpires: '1678445873815',
      status: true,
      createdAt: '2023-12-13T11:31:45.620Z',
      updatedAt: '2023-12-13T11:31:45.620Z',
      role: {
        id: 1,
        name: 'admin',
      },
      rolePermission: {
        user: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        blog: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        adminuser: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        support: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        ticket: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        loginhistory: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        prepaidplan: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        prepaidplantab: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        dthplantab: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        dth: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        onepage: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        service: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        slider: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        offer: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        coupon: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        faq: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        profile: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        notification: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        blogcategory: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        subscription: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        kyc: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        giftcardcategory: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        settings: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        giftcardoperator: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        serviceprovider: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        role: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        payment: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        dmt: [
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
          'POST',
          'GET',
          'PUT',
          'PATCH',
          'DELETE',
        ],
        matm: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
      },
    }

    return userObject
  }
}
