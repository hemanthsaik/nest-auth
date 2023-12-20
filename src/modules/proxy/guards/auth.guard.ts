import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { ExtractJwt } from 'passport-jwt'
import { JWT_SECRET_KEY } from 'src/config/config.factory'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    // TODO: change this to request cookies insted of headers
    const cookie = request.cookies.access_token
    console.log(request.cookies.access_token)
    // const cookie = true
    if (!cookie) {
      return false
    }

    try {
      const payload = this.jwtService.verify(cookie, {
        secret: JWT_SECRET_KEY,
      })
      request.user = payload

      // TODO: check if user exist in db and git his roles and permissions
      // if exist  create a jwt token and add it to headers
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
