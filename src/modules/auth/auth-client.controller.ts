import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthClientService } from './auth-client.service'

@Controller('client')
@ApiTags('Auth Client')
export class AuthClientController {
  constructor(private authClientService: AuthClientService) {}

  @Get()
  getClientServices() {
    return this.authClientService.getClientServices()
  }

  @Get('clientId')
  getClientServiceById(@Param() id: number) {
    console.log({ id })
    return this.authClientService.getClientServiceById(id)
  }

  @Post()
  createClientServices() {
    return this.authClientService.createClientServices()
  }

  @Put()
  updateClientService() {
    return this.authClientService.updateClientService()
  }

  @Delete(':id')
  deleteClientService(@Param(':id') id: number) {
    console.log({ id })
    return this.authClientService.deleteClientService()
  }
}
