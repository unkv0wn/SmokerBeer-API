import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './config/constants/roles.constants';
import { RolesGuard } from './auth/guards/roles.guards';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'xtz7qr87',
      database: 'WineAPI',
      autoLoadEntities: true,
      synchronize: true, // Cuidado: não use em produção
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
