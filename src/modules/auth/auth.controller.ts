import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common'
import { ApiExcludeController, ApiTags } from '@nestjs/swagger'
import { Request, Response, query } from 'express'
import { AuthService } from './auth.service'
import { AuthGuard } from './guards/auth.guard'
import { GoogleOauthGuard } from './strategies'

@Controller('auth')
@ApiTags('Google')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard, GoogleOauthGuard)
  async googleAuth(@Query() query) {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req, @Res() res) {
    return this.authService.googleLogin(req, res)
  }

  @Get('logout')
  googleAuthLogout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.logout(request, response)
  }
}
