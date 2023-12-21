import { All, Controller, Get, Next, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from './guards/auth.guard'
import { ProxyService } from './proxy.service'
import { Request } from 'express'

@Controller('api')
@UseGuards(AuthGuard)
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  private accessToken =
    'Bearer ' +
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm1vYmlsZU51bWJlciI6Ijk1MjQ5MTQ5NDAiLCJmdWxsTmFtZUFkbWluIjoiQW5hbmRoYW4gU3VydWxpIiwiZW1haWxJZCI6ImFuYW5kaGFuQHBheXJ1cC5jb20iLCJyb2xlcyI6eyJ1c2VyIjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJibG9nIjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJhZG1pbnVzZXIiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sInN1cHBvcnQiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sInRpY2tldCI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwibG9naW5oaXN0b3J5IjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJwcmVwYWlkcGxhbiI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwicHJlcGFpZHBsYW50YWIiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sImR0aHBsYW50YWIiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sImR0aCI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwib25lcGFnZSI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwic2VydmljZSI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwic2xpZGVyIjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJvZmZlciI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwiY291cG9uIjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJmYXEiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sInByb2ZpbGUiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sIm5vdGlmaWNhdGlvbiI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwiYmxvZ2NhdGVnb3J5IjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJzdWJzY3JpcHRpb24iOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sImt5YyI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwiZ2lmdGNhcmRjYXRlZ29yeSI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwic2V0dGluZ3MiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sImdpZnRjYXJkb3BlcmF0b3IiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sInNlcnZpY2Vwcm92aWRlciI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwicm9sZSI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwicGF5bWVudCI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwiZG10IjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJtYXRtIjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdfSwiaWF0IjoxNzAzMTM5MjIzLCJleHAiOjE3MDMxNTAwMjN9.blD6sZk2Px97v0D26zOI5bRU0daNxqIiQLoom5wR100'

  private removePathPrefix(path: string, prefix: string): string {
    // Check if the path starts with the specified prefix
    if (path.startsWith(prefix)) {
      // Remove the prefix and return the modified path
      return path.substring(prefix.length)
    } else {
      // If the path does not start with the prefix, return the original path
      return path
    }
  }
  @Get('current-user')
  currentUser() {
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
    console.log('being called here')
    return userObject
  }

  @All('admin/*')
  async proxyAdminRequest(@Req() req: Request) {
    const { originalUrl, method, body } = req
    const path = this.removePathPrefix(originalUrl, '/api/admin')

    return this.proxyService.proxyRequest(
      method,
      `https://beta-api.payrup.com/api/admin${path}`,
      this.accessToken,
      body,
    )
  }

  @All('general/*')
  async proxyGeneralRequest(@Req() req) {
    const { originalUrl, method, body } = req
    const path = this.removePathPrefix(originalUrl, '/api/general')
    return this.proxyService.proxyRequest(
      method,
      `https://beta-api.payrup.com/api${path}`,
      this.accessToken,
      body,
    )
  }

  @All('payment/*')
  async proxyPaymentRequest(@Req() req) {
    const { originalUrl, method, body } = req
    const path = this.removePathPrefix(originalUrl, '/api/payment')
    return this.proxyService.proxyRequest(
      method,
      `https://beta-payment.payrup.com/api/v1/admin${path}`,
      this.accessToken,
      body,
    )
  }

  @All('wallet/*')
  async proxyWalletRequest(@Req() req) {
    const { originalUrl, method, body } = req
    const path = this.removePathPrefix(originalUrl, '/api/payment')
    return this.proxyService.proxyRequest(
      method,
      `https://beta-wallet.payrup.com/api/v1/admin${path}`,
      this.accessToken,
      body,
    )
  }
}
