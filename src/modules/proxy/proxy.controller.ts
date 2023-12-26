import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { All, Controller, Get, Inject, Req, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { Cache } from 'cache-manager'
import { makePayrupUrlConfig } from 'src/config/config.factory'
import { AuthGuard } from './guards/auth.guard'
import { ProxyService } from './proxy.service'
import { ProxyResult } from './proxy.types'

const config = makePayrupUrlConfig()

@Controller('api')
@UseGuards(AuthGuard)
@ApiExcludeController()
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
  async currentUser(@Req() req): Promise<ProxyResult> {
    const { email } = req.user
    const cachedUser = await this.cacheManager.get(`role:${email}`)
    if (cachedUser) {
      return cachedUser as ProxyResult
    } else {
      const user = await this.proxyService.currentUser(email)
      await this.cacheManager.set(`role:${email}`, user)
      return user
    }
  }

  @All('admin/*')
  async proxyAdminRequest(@Req() req: any) {
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
