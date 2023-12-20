import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JSONCookie } from 'cookie-parser'
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
    res.cookie('access_token', token, {
      httpOnly: true,
    })

    return res.redirect('http://localhost:3000/home')
  }

  async generateJwt(payload) {
    return this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
    })
  }
}
