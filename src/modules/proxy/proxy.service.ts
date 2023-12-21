// proxy.service.ts
import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { catchError, lastValueFrom, map } from 'rxjs'

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  private handleError(error: any): never {
    console.error({ error: error.response })
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
    console.log('called here')
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
}
