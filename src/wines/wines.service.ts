import { Injectable } from '@nestjs/common';
import { CreateWineDto } from './dto/create-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';

@Injectable()
export class WinesService {
  create(createWineDto: CreateWineDto) {
    return 'This action adds a new wine';
  }

  findAll() {
    return `This action returns all wines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wine`;
  }

  update(id: number, updateWineDto: UpdateWineDto) {
    return `This action updates a #${id} wine`;
  }

  remove(id: number) {
    return `This action removes a #${id} wine`;
  }
}
