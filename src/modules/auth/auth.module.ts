import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './auth.controller'
import { ServiceEntitySchema, UserEntitySchema } from './auth.schema'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './guards/google-auth.guard'
import { AuthClientController } from './auth-client.controller'
import { AuthClientService } from './auth-client.service'

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UserEntitySchema, ServiceEntitySchema]),
  ],
  controllers: [AuthController, AuthClientController],
  providers: [AuthService, GoogleStrategy, AuthClientService],
})
export class AuthModule {}
