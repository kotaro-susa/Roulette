import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signup')
  async signup(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return await this.UserService.signUp(CreateUserDto);
  }

  
  @Post('signin')
  async signin(
    @Body() CredentialsDto: CredentialsDto,
  ): Promise<{ access_token: string }> {
    return await this.UserService.signIn(CredentialsDto);
  }
}
