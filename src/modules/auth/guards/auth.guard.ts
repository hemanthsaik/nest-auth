import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ServiceEntitySchema } from '../auth.schema'
import { AuthService } from '../auth.service'
import { Service } from '../auth.type'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(ServiceEntitySchema)
    private serviceRepository: Repository<Service>,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()

    const { client_id, callbackUrl } = request.query

    if (!client_id) {
      return false
    }

    try {
      const service = await this.serviceRepository.findOne({
        where: { id: client_id },
      })

      if (!service) {
        console.error(`Service with id ${client_id} not found.`)
        return false
      }
      service.callbackUrl = callbackUrl
        ? `${service.callbackUrl}${callbackUrl}`
        : service.callbackUrl
      const token = await this.authService.generateJwt(service)

      response.cookie('service_token', token, {
        httpOnly: true,
      })

      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}
