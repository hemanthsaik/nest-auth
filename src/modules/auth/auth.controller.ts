import {
  Controller,
  Get,
  HttpStatus,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req, @Response() res) {
    const token = await this.authService.signIn(req.user)
    console.log({ token })

    // req.cookie('accessToken', token, {
    //   maxAge: 2592000000,
    //   sameSite: true,
    //   secure: false,
    // })

    return res.status(HttpStatus.OK)
  }
}
