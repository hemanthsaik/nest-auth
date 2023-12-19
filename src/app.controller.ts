import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AppService } from './app.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { JwtAuthGuard } from './gaurd/jwt-auth.guard'

@Controller('google')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req, @Response() res) {
    console.log('called')
    return this.appService.googleLogin(req, res)
  }

  // @Get('redirect')
  // @UseGuards(new JwtAuthGuard())
  // async googleAuthRedirect(@Request() req, @Response() res) {
  //   const token = await this.appService.signIn(req.user)
  //   console.log({ token })

  //   // req.cookie('accessToken', token, {
  //   //   maxAge: 2592000000,
  //   //   sameSite: true,
  //   //   secure: false,
  //   // })

  //   return res.status(HttpStatus.OK)
  // }
}
