// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
// import { JwtService } from '@nestjs/jwt'
// import { InjectRepository } from '@nestjs/typeorm'
// import { JWT_SECRET_KEY } from 'src/config/config.factory'
// import { service } from 'src/modules/service/service.type'
// import { Repository } from 'typeorm'
// import { userEntitySchema } from '../auth.schema'
// import { serviceEntitySchema } from 'src/modules/service/service.schema'

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { service } from '../auth.type'
import { serviceEntitySchema } from '../auth.schema'

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     @InjectRepository(serviceEntitySchema)
//     private serviceRepository: Repository<service>,
//     private jwtService: JwtService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest()
//     // console.log({ request })

//     const { client_id } = request.query
//     // console.log(client_id)

//     if (!client_id) {
//       return false
//     }

//     try {
//       const service = await this.serviceRepository.findOne({
//         where: { id: client_id },
//       })

//       // console.log({ service })

//       if (!service) {
//         return false
//       } else {
//         return true
//       }
//     } catch (err) {
//       console.log(err)
//       return false
//     }
//   }
// }

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(serviceEntitySchema)
    private serviceRepository: Repository<service>,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    console.log({ request })

    const { client_id } = request.query

    if (!client_id) {
      return false
    }

    try {
      const foundService = await this.serviceRepository.findOne({
        where: { id: client_id },
      })

      if (!foundService) {
        console.error(`Service with id ${client_id} not found.`)
        return false
      }
      // request.client_id = foundService.id
      request.callbackUrl = 'data'

      return true
    } catch (err) {
      console.error('Error while checking service existence:', err)
      return false
    }
  }
}
