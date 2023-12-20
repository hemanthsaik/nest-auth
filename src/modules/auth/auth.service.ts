import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Request, Response } from 'express'
import { JWT_SECRET_KEY, googleConfig } from 'src/config/config.factory'
import { userEntitySchema } from './auth.schema'
import { Repository } from 'typeorm'
import { UserLogs } from './auth.type'
import axios from 'axios'

interface UserRequest extends Request {
  user: any
}

const config = googleConfig()
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntitySchema)
    private userRepository: Repository<UserLogs>,
    private jwtService: JwtService,
  ) {}
  async googleLogin(req: UserRequest, res: Response) {
    console.log({ request: req.user })

    // if (!req.user) {
    //   return res.redirect('/500')
    // }
    const token = await this.generateJwt(req.user)
    return token
    // res.cookie('auth-payload', token, { httpOnly: true })

    // const userData = await this.userRepository.findOne({
    //   where: { emailId: req.user.emailId },
    // })

    // if (!userData) {
    //   const newUser = await this.userRepository.save(userData)
    //   return newUser
    // } else {
    //   const existingUser = {
    //     ...userData,
    //     token: req.user.token,
    //     expires_at: req.user.expires_at,
    //   }
    //   const updatedUser = await this.userRepository.save(existingUser)
    // return updatedUser
  }

  // return res.redirect('http://localhost:3001/hello')

  async generateJwt(payload) {
    return this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
    })
  }
}
