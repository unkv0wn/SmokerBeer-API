import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { eRoles } from 'src/config/enums/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { mUser } from 'src/entities/user.entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(mUser)
    private userRepository: Repository<mUser>,
  ) {}


  async findOne(document: string): Promise<mUser | null> {
    return this.userRepository.findOne({ where: { document } });
  }

  async create(createUserDto: CreateUserDto) {

    
    const SaltOrRounds = 10;
    const HashedPassword = await bcrypt.hash(createUserDto.password, SaltOrRounds);

    // Ira separar o createUserDto em um array, e alterar o valor da senha para o valor criptografado
    const user = this.userRepository.create({
      ...createUserDto,
      password: HashedPassword,
    });

    return await this.userRepository.save(user); // ira salvar o usuario no banco de dados
  }

  findAll() {
    return this.userRepository.find();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
