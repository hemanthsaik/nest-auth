import { NestMiddleware } from '@nestjs/common'
import { createProxyMiddleware } from 'http-proxy-middleware'

export class ReverseProxyGeneralMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: 'https://beta-api.payrup.com/api',
    pathRewrite: {
      'api/general': '/',
    },
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      // console.log(proxyReq)
      proxyReq.setHeader(
        'Authorization',
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm1vYmlsZU51bWJlciI6Ijk1MjQ5MTQ5NDAiLCJmdWxsTmFtZUFkbWluIjoiQW5hbmRoYW4gU3VydWxpIiwiZW1haWxJZCI6ImFuYW5kaGFuQHBheXJ1cC5jb20iLCJyb2xlcyI6eyJ1c2VyIjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJibG9nIjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJhZG1pbnVzZXIiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sInN1cHBvcnQiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sInRpY2tldCI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwibG9naW5oaXN0b3J5IjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJwcmVwYWlkcGxhbiI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwicHJlcGFpZHBsYW50YWIiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sImR0aHBsYW50YWIiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sImR0aCI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwib25lcGFnZSI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwic2VydmljZSI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwic2xpZGVyIjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJvZmZlciI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwiY291cG9uIjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJmYXEiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sInByb2ZpbGUiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sIm5vdGlmaWNhdGlvbiI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwiYmxvZ2NhdGVnb3J5IjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJzdWJzY3JpcHRpb24iOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sImt5YyI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwiZ2lmdGNhcmRjYXRlZ29yeSI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwic2V0dGluZ3MiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sImdpZnRjYXJkb3BlcmF0b3IiOlsiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIiwiUE9TVCIsIkdFVCIsIlBVVCIsIlBBVENIIiwiREVMRVRFIl0sInNlcnZpY2Vwcm92aWRlciI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwicm9sZSI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwicGF5bWVudCI6WyJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiLCJQT1NUIiwiR0VUIiwiUFVUIiwiUEFUQ0giLCJERUxFVEUiXSwiZG10IjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSIsIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdLCJtYXRtIjpbIlBPU1QiLCJHRVQiLCJQVVQiLCJQQVRDSCIsIkRFTEVURSJdfSwiaWF0IjoxNzAyOTg1NTM5LCJleHAiOjE3MDI5OTYzMzl9.w5vjoB1CfdAoiilm6awYXzjpNQPGojJ-iG9XxPkvF2M`,
      )
      console.log(
        `[NestMiddleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'`,
      )
      console.log(
        `[NestMiddleware]: Proxying ${proxyReq.method} request to '${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}'`,
      )
    },
  })
  constructor() {}

  use(req: any, res: any, next: () => void) {
    // console.log(res)
    this.proxy(req, res, next)
  }
}