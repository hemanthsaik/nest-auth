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
    const authHeader = request.headers['authorization']
    if (!authHeader) {
      return false
    }

    try {
      const payload = this.jwtService.verify(authHeader.split(' ')[1], {
        secret: JWT_SECRET_KEY,
      })

      // TODO: check if user exist in db and git his roles and permissions
      // if exist  create a jwt token and add it to headers

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
