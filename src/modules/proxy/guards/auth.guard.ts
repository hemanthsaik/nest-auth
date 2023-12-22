import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWT_SECRET_KEY } from 'src/config/config.factory'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

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
