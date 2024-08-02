import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(
    createUserDto: CreateUserDto,
    manager?: EntityManager,
  ): Promise<User> {
    const userRepository = manager
      ? manager.getRepository(User)
      : this.userRepository;
    const user = userRepository.create({
      ...createUserDto,
      password: await bcrypt.hashSync(createUserDto.password, 10),
    });
    await this.validateNewUser(user.email, user.username);
    return await userRepository.save(user);
  }

  async validateNewUser(email: string, username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });
    if (user) {
      throw new HttpException(
        ['Email or username already exists'],
        HttpStatus.CONFLICT,
      );
    }
    return true;
  }
  async findByAccount(account: string): Promise<User> {
    return await this.userRepository.findOne({
      where: [{ email: account }, { username: account }],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async updatePassword(id: number, updatePasswordDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.password = updatePasswordDto.password;
    return await this.userRepository.save(user);
  }
}
