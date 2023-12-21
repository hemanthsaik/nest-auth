import { Module } from '@nestjs/common'

import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'
import { ProxyController } from './proxy.controller'
import { ProxyService } from './proxy.service'

@Module({
  imports: [JwtModule.register({}), HttpModule],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
