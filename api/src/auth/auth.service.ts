import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userData) {
    const user = await this.userService.create(userData);

    return this.generateToken(user);
  }

  async signin(credentials) {
    const user = await this.userService.validateUser(credentials);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async generateToken(user) {
    const payload = { ...user };

    try {
      const jwt = await this.jwtService.sign(payload);

      return { accessToken: jwt };
    } catch (error) {
      throw new ConflictException('Erreur lors de la génération du token');
    }
  }
}
