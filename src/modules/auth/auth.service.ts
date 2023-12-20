import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { JWT_SECRET_KEY } from 'src/config/config.factory'

interface UserRequest extends Request {
  user: any
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  googleLogin(req: UserRequest, res: Response) {
    if (!req.user) {
      return res.redirect('/500')
    }

    // TODO: add userLogs to database

    const token = this.generateJwt(req.user)
    res.cookie('auth-payload', token, { httpOnly: true })

    return res.redirect('http://localhost:3001/hello')
  }

  async generateJwt(payload) {
    return this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
    })
  }
}
