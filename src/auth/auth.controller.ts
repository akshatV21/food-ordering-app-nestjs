import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto } from './dtos/register-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async httpRegisterUser(@Body() registerUserDto: RegisterUserDto) {
    const userPayload = await this.authService.register(registerUserDto)
    return { success: true, message: 'User registered successfully', data: userPayload }
  }
}
