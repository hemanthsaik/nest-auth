import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
  All,
  Controller,
  Get,
  Inject,
  Request as NestRequest,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Cache } from 'cache-manager'
import { Request } from 'express'
import { AuthGuard } from './guards/auth.guard'
import { ProxyService, Role, RolePermission } from './proxy.service'
import { makePayrupUrlConfig } from 'src/config/config.factory'

interface UserRequest extends Request {
  user: {
    provider: string
    email: string
    name: string
    picture: string
  }
  authToken: string
}

interface ProxyResult {
  userId: number
  emailId: string
  role: Role
  rolePermission: RolePermission
}
const config = makePayrupUrlConfig()
@Controller('api')
@UseGuards(AuthGuard)
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private removePathPrefix(path: string, prefix: string): string {
    if (path.startsWith(prefix)) {
      return path.substring(prefix.length)
    } else {
      return path
    }
  }
  @Get('current-user')
  async currentUser(@NestRequest() req): Promise<ProxyResult> {
    const { email } = req.user
    const cachedUser = await this.cacheManager.get(`role:${email}`)
    if (cachedUser) {
      return cachedUser as ProxyResult
    }

    return this.proxyService.currentUser(email)
  }

  @All('admin/*')
  async proxyAdminRequest(@Req() req: UserRequest) {
    const { originalUrl, method, body, authToken } = req
    const path = this.removePathPrefix(originalUrl, '/api/admin')

    return this.proxyService.proxyRequest(
      method,
      `${config.general}/admin${path}`,
      authToken,
      body,
    )
  }

  @All('general/*')
  async proxyGeneralRequest(@Req() req) {
    const { originalUrl, method, body, authToken } = req
    const path = this.removePathPrefix(originalUrl, '/api/general')
    return this.proxyService.proxyRequest(
      method,
      `${config.general}${path}`,
      authToken,
      body,
    )
  }

  @All('payment/*')
  async proxyPaymentRequest(@Req() req) {
    const { originalUrl, method, body, authToken } = req
    const path = this.removePathPrefix(originalUrl, '/api/payment')
    return this.proxyService.proxyRequest(
      method,
      `${config.payment}${path}`,
      authToken,
      body,
    )
  }

  @All('wallet/*')
  async proxyWalletRequest(@Req() req) {
    const { originalUrl, method, body, authToken } = req
    const path = this.removePathPrefix(originalUrl, '/api/payment')
    return this.proxyService.proxyRequest(
      method,
      `${config.wallet}${path}`,
      authToken,
      body,
    )
  }
}
