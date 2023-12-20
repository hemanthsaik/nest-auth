import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { ReverseProxyAdminMiddleware } from './middleware/proxy-admin.middleware'
import { ReverseProxyGeneralMiddleware } from './middleware/proxy-general.middleware'
import { ReverseProxyPaymentMiddleware } from './middleware/proxy-payment.middleware'
import { ReverseProxyWalletMiddleware } from './middleware/proxy-wallet.middleware'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './guards/auth.guard'
import { AuthMiddleware } from './middleware/auth.middleware'

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
  providers: [AuthGuard],
})
export class ProxyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'api/*', method: RequestMethod.ALL })
    consumer
      .apply(ReverseProxyAdminMiddleware)
      .forRoutes({ path: 'api/admin/*', method: RequestMethod.ALL })

    consumer
      .apply(ReverseProxyGeneralMiddleware)
      .forRoutes({ path: 'api/general/*', method: RequestMethod.ALL })

    consumer
      .apply(ReverseProxyPaymentMiddleware)
      .forRoutes({ path: 'api/payment/*', method: RequestMethod.ALL })

    consumer
      .apply(ReverseProxyWalletMiddleware)
      .forRoutes({ path: 'api/wallet/*', method: RequestMethod.ALL })
  }
}
