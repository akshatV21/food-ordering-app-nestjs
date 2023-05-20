import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import * as morgan from 'morgan'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)

  const PORT = configService.get('PORT')

  app.use(helmet())
  app.use(morgan('dev'))

  await app.listen(PORT, () => console.log(`Listening to requests on port: ${PORT}`))
}
bootstrap()
