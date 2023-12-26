import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthClientService } from './auth-client.service'
import {
  CreateClientServiceDto,
  UpdateClientServiceDto,
} from './auth-client.dto'

@Controller('client')
@ApiTags('Auth Client')
export class AuthClientController {
  constructor(private authClientService: AuthClientService) {}

  @Get()
  getClientServices() {
    return this.authClientService.getClientServices()
  }

  @Get(':clientId')
  getClientServiceById(@Param('clientId') id: number) {
    return this.authClientService.getClientServiceById(id)
  }

  @Post()
  createClientServices(@Body() clientServiceBody: CreateClientServiceDto) {
    return this.authClientService.createClientServices(clientServiceBody)
  }

  @Put()
  updateClientService(@Body() clientServiceBody: UpdateClientServiceDto) {
    return this.authClientService.updateClientService(clientServiceBody)
  }

  @Delete(':clientId')
  deleteClientService(@Param('clientId') id: number) {
    return this.authClientService.deleteClientService(id)
  }
}
