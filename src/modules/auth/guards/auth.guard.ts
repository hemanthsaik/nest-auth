import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { client_id } = request.query
    // const authHeader = request.headers['authorization']
    if (!client_id) {
      return false
    }

    try {
      // request.tokenPayload = this.jwtService.verify(authHeader.split(' ')[1], {
      //   secret: JWT_SECRET_KEY,
      // })

      // TODO: check is service exist in db
      // services - > payrup-admin-panel, payrup-careers-ui, dc-panel etc
      // create schema of id , service name,
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
