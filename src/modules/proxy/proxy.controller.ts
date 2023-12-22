import {
  All,
  Controller,
  Get,
  Next,
  Req,
  Request as NestRequest,
  Res,
  UseGuards,
} from '@nestjs/common'
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
  currentUser(@NestRequest() req) {
    const { email } = req.user
    console.log(email)
    return this.proxyService.currentUser('shemanth@payrup.com')
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
