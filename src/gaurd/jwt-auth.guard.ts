import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy } from 'passport-google-oauth20'
import { ExtractJwt } from 'passport-jwt'
import { userEntitySchema } from 'src/modules/auth/auth.entity'
import { UserLogs } from 'src/modules/auth/auth.type'
import { makeConfig, makeJwtConfig } from 'src/config/config.factory'
import { Repository } from 'typeorm'

export type JwtPayload = {
  sub: number
  email: string
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(makeConfig)
    private configService: ConfigType<typeof makeConfig>,
    // @InjectRepository(userEntitySchema)
    // private userRepository: Repository<UserLogs>,
  ) {
    const extractJwtFromCookie = async (req) => {
      let token = null
      if (req & req.cookie) {
        token = req.cookie['accessToken']
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req)
    }

    super({
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret,
      jwtFromRequest: extractJwtFromCookie,
    })
  }

  async validate(payload: JwtPayload) {
    // const user = await this.userRepository.findOne({
    // //   where: { id: payload.sub },
    // // })

    // if (!user) throw new UnauthorizedException('Please log in to continue')

    return {
      id: payload.sub,
      email: payload.email,
    }
  }
}
