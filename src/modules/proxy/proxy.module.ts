import { Module } from '@nestjs/common'

import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'
import { ProxyController } from './proxy.controller'
import { ProxyService } from './proxy.service'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    JwtModule.register({}),
    HttpModule,
    TypeOrmModule.forFeature([], 'admin'),
  ],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
