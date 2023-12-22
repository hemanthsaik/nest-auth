import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { JWT_SECRET_KEY } from 'src/config/config.factory'

interface UserRequest extends Request {
  user: any
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async googleLogin(req: UserRequest, res: Response) {
    if (!req.user) {
      return res.redirect('/500')
    }
    const token = await this.generateJwt(req.user)

    const service = await this.verifyJwt(req.cookies.service_token)

    res.clearCookie('service_token')

    res.cookie('access_token', token, {
      httpOnly: true,
    })

    return res.redirect(service.callbackUrl)
  }

  logout(req: any, res: Response) {
    res.clearCookie('access_token')

    return res.send({ message: 'Logout successfully' })
  }

  async generateJwt(payload) {
    return this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
    })
  }

  async verifyJwt(token) {
    return this.jwtService.verify(token, {
      secret: JWT_SECRET_KEY,
    })
  }
}
