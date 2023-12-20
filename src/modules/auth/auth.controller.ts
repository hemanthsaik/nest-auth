import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleOauthGuard } from './strategies'
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard, GoogleOauthGuard)
  async googleAuth(@Req() request) {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.appService.googleLogin(req, res)
  }
}
