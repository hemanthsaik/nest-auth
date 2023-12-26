import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Cache } from 'cache-manager'
import { Request, Response } from 'express'
import { JWT_SECRET_KEY } from 'src/config/config.factory'
import { UserEntitySchema } from './auth.schema'
import { Repository } from 'typeorm'
import { UserLogs } from './auth.type'

interface UserRequest extends Request {
  user: any
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,

    @InjectRepository(UserEntitySchema)
    private userLogRepository: Repository<UserLogs>,

    private jwtService: JwtService,
  ) {}

  async googleLogin(req: UserRequest, res: Response) {
    if (!req.user) {
      return res.redirect('/500')
    }

    const token = await this.generateJwt(req.user)

    const service = await this.verifyJwt(req.cookies.service_token)

    const user = await this.userLogRepository.findOne({
      where: {
        emailId: req.user.email,
        serviceId: service.id,
      },
    })

    const currentDate = new Date()

    const expireDate = new Date(currentDate.setDate(currentDate.getDate() + 1))

    if (user) {
      await this.userLogRepository.save({ ...user, expiresAt: expireDate })
    } else {
      const userData = {
        name: req.user.name,
        emailId: req.user.email,
        serviceId: service.id,
        token,
        expiresAt: expireDate,
      }

      await this.userLogRepository.insert(userData)
    }

    res.clearCookie('service_token')

    res.cookie('access_token', token, {
      httpOnly: true,
    })

    return res.redirect(service.callbackUrl)
  }

  async logout(req: any, res: Response) {
    const user = this.verifyJwt(req.cookies.access_token)

    try {
      await this.cacheManager.del(`role:${user.email}`)
    } catch (error) {
      console.log(error)
    }

    res.clearCookie('access_token')
  }

  async generateJwt(payload) {
    return this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
    })
  }

  verifyJwt(token) {
    return this.jwtService.verify(token, {
      secret: JWT_SECRET_KEY,
    })
  }
}
