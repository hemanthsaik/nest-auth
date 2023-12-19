import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { userEntitySchema } from 'src/modules/auth/auth.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntitySchema)
    private jwtService: JwtService,
    // private userRepository: Repository<UserLogs>,
  ) {}

  async generateJwt(payload) {
    const token = this.jwtService.sign(payload)
    console.log({ token })
  }

  async signIn(user) {
    console.log({ user })

    // if (!user) {
    //   throw new BadRequestException('Unauthenticated')
    // }

    // const existingUser = await this.userRepository.findOne({
    //   where: user.emailId,
    // })

    // if (!existingUser) {
    //   throw new NotFoundException('user not found')
    // } else {
    return this.generateJwt({
      sub: user.id,
      email: user.emailId,
    })
  }
}
