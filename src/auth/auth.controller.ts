import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { eRoles } from 'src/config/enums/roles.enum';
import { Roles } from 'src/config/constants/roles.constants';
import { RolesGuard } from './guards/roles.guards';
import { Public } from 'src/config/constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.document, signInDto.password);
  }

  // @UseGuards(AuthGuard)
  // @Get('teste')
  // test(@Request() req) {
  //   console.log('Request user:', req.user);
  //   return req.user;
  // }

  @Get('teste')
  teste(@Request() req) {
    console.log('Controller - req.user:', req.user); // Verifica se chegou o user
    return req.user;
  }
}
