import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signup')
  async signup(@Body() CreateUserDto: CreateUserDto) {
    return await this.UserService.signUp(CreateUserDto);
  }
}
