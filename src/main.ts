import 'dotenv/config'
import { patchNestjsSwagger } from '@anatine/zod-nestjs'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import * as os from 'os'
import { AppModule } from './app.module'
import { Config } from './config/config.interface'
import * as cookieParser from 'cookie-parser'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
process.on('unhandledRejection', (error) => {
  console.error(
    '[ERROR]: unhandled promise rejection (should not occur)',
    error,
  )
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })
  app.useLogger(app.get(Logger))

  app.use((req, _, next) => {
    console.log(`Got invoked: '${req.originalUrl}'`)
    next()
  })

  const appConfig = app.get<Config>(Config)

  // app.useGlobalGuards(new AuthGuard());
  // To be added later

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }
  app.use(cookieParser())

  app.enableCors(corsOptions)

  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('Payrup API - Career Module')
  //   .addBearerAuth()
  //   .build()

  // patchNestjsSwagger()

  // const document = SwaggerModule.createDocument(app, swaggerConfig)
  // SwaggerModule.setup('', app, document)

  const ipAddress = getIpAddress()

  await app.listen(appConfig.app.port, ipAddress)
}

bootstrap()

function getIpAddress() {
  if (process.env.NODE_ENV !== 'production') {
    return '127.0.0.1'
  }

  const interfaces = Object.values(os.networkInterfaces())

  for (const _interface of interfaces) {
    if (!_interface) continue

    for (const { family, internal, address } of _interface) {
      if ('IPv4' === family && !internal) {
        return address
      }
    }
  }

  throw Error('Suitable IP address not found.')
}
