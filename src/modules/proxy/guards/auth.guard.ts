import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWT_SECRET_KEY } from 'src/config/config.factory'
import { ProxyService } from '../proxy.service'
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private proxyService: ProxyService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const cookie = request.cookies.access_token
    if (!cookie) {
      return false
    }

    try {
      const payload = this.jwtService.verify(cookie, {
        secret: JWT_SECRET_KEY,
      })
      try {
        request.user = payload

        const userData = await this.proxyService.currentUser(payload.email)

        if (!userData) {
          return false
        }

        const authToken = this.jwtService.sign(userData, {
          secret: JWT_SECRET_KEY,
        })

        request.authToken = `Bearer ${authToken}`
      } catch (error) {
        throw new HttpException(
          'something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
