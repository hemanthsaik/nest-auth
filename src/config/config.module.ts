import { Module } from '@nestjs/common'
import { Config } from './config.interface'
import { makeConfig } from './config.factory'

@Module({
  providers: [
    {
      provide: Config,
      useFactory: (): Config => {
        return makeConfig()
      },
    },
  ],
  exports: [Config],
})
export class ConfigModule {}
