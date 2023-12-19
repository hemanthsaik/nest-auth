import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Request, Response } from 'express'
import { userEntitySchema } from './modules/auth/auth.entity'
import { UserLogs } from './modules/auth/auth.type'
import { Repository } from 'typeorm'

interface UserRequest extends Request {
  user: any
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(userEntitySchema)
    private jwtService: JwtService,
    private userRepository: Repository<UserLogs>,
  ) {}

  googleLogin(req: UserRequest, res) {
    if (!req.user) {
      return res.redirect('/500')
    }
    res.cookie('auth-payload', req.user, { httpOnly: true })

    return res.redirect('http://localhost:3001/hello')
  }
}
