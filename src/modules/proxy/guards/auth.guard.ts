import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWT_SECRET_KEY } from 'src/config/config.factory'
import { ProxyService } from '../proxy.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private proxyService: ProxyService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

        const cacheKey = `role:${payload.email}`
        const cachedData = await this.cacheManager.get(cacheKey)
        let userData

        if (cachedData == null) {
          userData = await this.proxyService.currentUser(payload.email)
          await this.cacheManager.set(cacheKey, userData)
        } else {
          userData = await this.cacheManager.get(cacheKey)
        }

        const authToken = this.jwtService.sign(userData, {
          secret: JWT_SECRET_KEY,
        })

        request.authToken = `Bearer ${authToken}`
      } catch (error) {
        console.log(error)

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
