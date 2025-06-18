import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { HasRoles } from 'src/config/constants/roles.constants';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('sum')
  @HasRoles('admin')
  sum() {
    return this.orderService.countAndSum();
  }

  @Get('name/:name')
  @HasRoles('user')
  findByName(@Param('name') name: string) {
    return this.orderService.FindByName(name);
  }

  @Get()
  @HasRoles('user')
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @HasRoles('user')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Post()
  @HasRoles('user')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }


  @Delete(':id')
  @HasRoles('user')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
