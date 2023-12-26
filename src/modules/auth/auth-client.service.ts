import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Service } from './auth.type'
import { ServiceEntitySchema } from './auth.schema'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthClientService {
  constructor(
    @InjectRepository(ServiceEntitySchema)
    private serviceRepository: Repository<Service>,
  ) {}

  getClientServices() {
    return this.serviceRepository.find()
  }

  async getClientServiceById(id: number) {
    const authClient = await this.serviceRepository.findOne({
      where: {
        id: id,
      },
    })

    if (!authClient) {
      throw new HttpException('Client Service not found', HttpStatus.NOT_FOUND)
    }

    return authClient
  }

  createClientServices() {
    return 'postClientService'
  }

  updateClientService() {
    return 'putClientService'
  }

  deleteClientService() {
    return 'deleteClientService'
  }
}
