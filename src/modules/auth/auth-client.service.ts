import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Service } from './auth.type'
import { ServiceEntitySchema } from './auth.schema'
import { InjectRepository } from '@nestjs/typeorm'
import {
  CreateClientServiceDto,
  UpdateClientServiceDto,
} from './auth-client.dto'

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

  async createClientServices(clientServiceBody: CreateClientServiceDto) {
    const newAuthClient = await this.serviceRepository.insert(clientServiceBody)
    return newAuthClient
  }

  async updateClientService(clientServiceBody: UpdateClientServiceDto) {
    const authClient = await this.serviceRepository.findOne({
      where: {
        id: clientServiceBody.id,
      },
    })

    if (!authClient) {
      throw new HttpException('Client Service not found', HttpStatus.NOT_FOUND)
    }

    const updatedAuthClient = await this.serviceRepository.save({
      ...authClient,
      ...clientServiceBody,
    })

    return updatedAuthClient
  }

  async deleteClientService(id: number) {
    const authClient = await this.serviceRepository.findOne({
      where: {
        id: id,
      },
    })

    if (!authClient) {
      throw new HttpException('Client Service not found', HttpStatus.NOT_FOUND)
    }
    await this.serviceRepository.delete(id)
    return { message: 'Client Service deleted successfully' }
  }
}
