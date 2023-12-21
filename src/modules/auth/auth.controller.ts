import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { GoogleOauthGuard } from './guards/google-auth.guard'
import { AuthGuard } from './guards/auth.guard'

@Controller('google')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard, GoogleOauthGuard)
  async googleAuth(@Req() request) {
    // return req.user
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req, @Res() res) {
    // return res.json(req)

    return await this.authService.googleLogin(req, res)
    // console.log({ accessToken })

    // // const { access_token } = await this.authService.login(req.user as User);
    // res.cookie('jwt', accessToken)
    // return res.redirect('/home')
  }
}
