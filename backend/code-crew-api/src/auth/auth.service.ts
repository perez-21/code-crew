import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signup(authDto: SignUpDto) {
    // hash password

    const hash = await argon.hash(authDto.password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          firstName: authDto.firstname,
          lastName: authDto.lastname,
          email: authDto.email,
          hash,
        },
        select: {
          hash: false,
          firstName: true,
          lastName: true,
          email: true,
          id: true,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }

        throw error;
      }
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
}
