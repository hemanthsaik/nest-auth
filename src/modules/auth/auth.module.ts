import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from './guards/auth.guard'
import { GoogleStrategy } from './strategies'
import { TypeOrmModule } from '@nestjs/typeorm'
import { serviceEntitySchema, userEntitySchema } from './auth.schema'
import { JWT_SECRET_KEY, googleConfig } from 'src/config/config.factory'

const config = googleConfig()

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature(
      [userEntitySchema, serviceEntitySchema],
      'adminService',
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
