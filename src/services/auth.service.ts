import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from "../repositories/user.repository";
import { DbUser } from "../types/database/DbUser";
import { AuthRegisterDto } from "../dtos/auth.register.dto";
import { AuthLoginDto } from "../dtos/auth.login.dto";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async registerUser( userData: AuthRegisterDto) {
    const existingUser = await this.userRepository.find({
      OR: [
        { email: userData.email },
        { login: userData.login }
      ]
    });

    if (existingUser) {
      throw new Error(
        existingUser.email === userData.email
          ? 'User with such email already exists'
          : 'User with such login already exists'
      );
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.create({
      ...userData
    });
    return this.generateToken(user);
  }

  public async loginUser({identifier, password}: AuthLoginDto) {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    const where = isEmail ? { email: identifier } : { login: identifier };

    const user = await this.userRepository.find(where);

    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    return this.generateToken(user);
  }

  private generateToken(user: DbUser) {
    return jwt.sign({userId: user.id}, process.env.SECRET || 'secret', {expiresIn: '24h'});
  }
}