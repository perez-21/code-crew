import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signup(authDto: SignUpDto) {
    // hash password

    const hash = await this.hash(authDto.password);
    authDto.password = hash;

    try {
      const user = await this.userService.create(authDto);

      if (!user) {
        throw new InternalServerErrorException();
      }

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async signin(authDto: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authDto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const correctPassword = await argon.verify(user.hash, authDto.password);
    if (!correctPassword) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.email);
  }

  signToken(userId: string, email: string) {
    const access_token = this.jwtService.sign(
      { sub: userId, email },
      {
        expiresIn: '1h',
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    return { access_token };
  }

  async hash(password: string) {
    return await argon.hash(password);
  }
}
