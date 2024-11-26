// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';
// import { comparePassword } from '../utils/crypto.utils';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async validateUser(email: string, password: string): Promise<any> {
//     const user = await this.userService.findByEmail(email);
//     if (user && comparePassword(password, user.password)) {
//       console.log('User found', user);
//       return user;
//     }
//     return null;
//   }

//   async login(email: string, password: string): Promise<any> {
//     const user = await this.validateUser(email, password);
//     if (!user) {
//       throw new UnauthorizedException('Invalid credentials');
//     }
//     const payload = {sub:user.id, email: user.email, id: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//       user_profile : user,
//     };
//   } 
// }



import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { hashPassword, comparePassword } from '../utils/crypto.utils';
import { CreateUserDto } from '../user/dto/create-user.dto';  // Assuming you have a DTO for user creation

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && comparePassword(password, user.password)) {
      console.log('User found', user);
      return user;
    }
    return null;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user_profile: user,
    };
  }

  async signup(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const {username, email, password } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
        throw new ConflictException('User with this email already exists');
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    // Create the user in the database
    const newUser = await this.userService.create({
        ...createUserDto,
      
    });

    // Return a success message
    return { message: `User ${createUserDto.username} has been successfully created!` };

  

    // const payload = { sub: newUser.id, email: newUser.email, id: newUser.id };
    // return {
    //   access_token: this.jwtService.sign(payload),
    //   user_profile: newUser,
    // };
  }
}