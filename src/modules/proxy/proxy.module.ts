import { Module } from '@nestjs/common'

import { JwtModule } from '@nestjs/jwt'
import { ReverseProxyAdminService } from './proxy-admin.service'
import { ReverseProxyGeneralService } from './proxy-general.service'
import { ReverseProxyPaymentService } from './proxy-payment.service'
import { ReverseProxyWalletService } from './proxy-wallet.service'
import { ProxyController } from './proxy.controller'

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
  controllers: [ProxyController],
  providers: [
    ReverseProxyAdminService,
    ReverseProxyGeneralService,
    ReverseProxyPaymentService,
    ReverseProxyWalletService,
  ],
})
export class ProxyModule {}
