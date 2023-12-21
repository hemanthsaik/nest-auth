import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Request, Response } from 'express'
import { JWT_SECRET_KEY, googleConfig } from 'src/config/config.factory'
import { userEntitySchema } from './auth.schema'
import { EntityManager, Repository } from 'typeorm'
import { UserLogs } from './auth.type'

interface UserRequest extends Request {
  callbackUrl: any
  user: any
}

const config = googleConfig()
@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager('adminService')
    private readonly adminService: EntityManager,
    @InjectRepository(userEntitySchema)
    private userRepository: Repository<UserLogs>,
    private jwtService: JwtService,
  ) {}
  async googleLogin(req: UserRequest, res: Response) {
    console.log({ request: req.user })
    console.log({ emailID: req.user.email })
    console.log({ url: req.callbackUrl })

    // if (!req.user) {
    //   return res.redirect('/500')
    // }
    // res.cookie('auth-payload', token, { httpOnly: true })

    const userData = await this.userRepository.findOne({
      where: { emailId: req.user.email },
    })

    const permission = await this.userPermission(req.user.email)
    console.log({ permission })

    const details = {
      name: req.user.name,
      emailId: req.user.email,
      expires_at: '2024-01-17 12:02:17.000000',
      token: req.user.accessToken,
    }

    if (!userData) {
      const newUser = await this.userRepository.save(details)
      console.log({ newUser })
    } else {
      userData.token = req.user.accessToken
      // userData.expires_at = '2024-01-17 12:02:17.000000'

      const updatedUser = await this.userRepository.save(userData)
      console.log({ updatedUser })
    }

    const token = await this.generateJwt(req.user)
    console.log({ token })

    return res.redirect(`http://localhost:3000/home`)
  }
  // }

  async generateJwt(payload) {
    return this.jwtService.sign(payload, {
      secret: JWT_SECRET_KEY,
    })
  }

  async userPermission(emailID: string) {
    const rawQuery = `
    SELECT
      admin_user.id AS adminUserId,
      admin_user.emailId AS emailId,
      roles.id AS roleId,
      roles.name AS roleName,
      role_permissions.id AS rolePermissionId,
      api_methods.id AS apiMethodId,
      api_methods.methodName AS methodName,
      api.id AS apiId,
      api.apiName AS apiName
    FROM
      adminservice.admin_user
    LEFT JOIN roles ON admin_user.roleId = roles.id
    LEFT JOIN role_permissions ON roles.id = role_permissions.roleId
    LEFT JOIN api_methods ON role_permissions.apiMethodId = api_methods.id
    LEFT JOIN api ON api_methods.apiId = api.id
    WHERE
      admin_user.emailId = ${emailID};
  `
    const result = await this.adminService.query(rawQuery)
    console.log({ result })

    return result
  }
}
