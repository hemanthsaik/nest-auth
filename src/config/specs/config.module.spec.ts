import { Test, TestingModule } from '@nestjs/testing'
import { makeConfig } from '../config.factory'
import { Config } from '../config.interface'
import { ConfigModule } from '../config.module'

describe('ConfigModule', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile()
  })

  it('should be defined', () => {
    expect(module).toBeDefined()
  })

  it('should provide the Config instance', () => {
    const configProvider = module.get<Config>(Config)
    expect(configProvider).toBeDefined()
    expect(configProvider).toBeInstanceOf(Object)
  })

  it('should return a valid configuration', () => {
    const configProvider = module.get<Config>(Config)
    const config = makeConfig()
    expect(configProvider).toEqual(config)
  })
})
