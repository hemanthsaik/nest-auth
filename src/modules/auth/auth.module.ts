import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { ServiceEntitySchema, UserEntitySchema } from './auth.schema'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './guards/google-auth.guard'

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntitySchema, ServiceEntitySchema]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
