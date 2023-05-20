import { Injectable } from '@nestjs/common'
import { RegisterUserDto } from './dtos/register-user.dto'
import { UserRepository } from 'src/repositories'
import { UserDocument } from 'src/models'
import { sign } from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(private readonly UserRepository: UserRepository, private readonly configService: ConfigService) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.UserRepository.create(registerUserDto)
    return this.getUserReponsePayload(user)
  }

  private getUserReponsePayload(user: UserDocument) {
    const token = sign({ id: user.id }, this.configService.get('JWT_SECRET'), { expiresIn: '24h' })
    const { password, ...rest } = user._doc

    return { user: rest, token }
  }
}
