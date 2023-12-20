import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { APP_GUARD } from '@nestjs/core'
import { GoogleStrategy } from './guards/google-auth.guard'
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from './guards/auth.guard'

@Module({
  imports: [
    JwtModule.register({}),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [Config],
    //   useFactory: (config: Config) => {
    //     return {
    //       ...convertMysqlConfigToTypeormConfig(config.mysql),
    //       logging: config.app.environment === 'development' ? true : false,
    //       autoLoadEntities: true,
    //     }
    //   },
    // }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
