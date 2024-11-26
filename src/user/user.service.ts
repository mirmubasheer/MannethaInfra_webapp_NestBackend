import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { hashPassword, encrypt, decrypt } from '../utils/crypto.utils';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await hashPassword(createUserDto.password); // Await if asynchronous
    const encryptedName = await encrypt(createUserDto.username); // Encrypt name if asynchronous
    const createdUser = new this.userModel({ 
      ...createUserDto, 
      password: hashedPassword, 
      username: encryptedName 
    });
    await createdUser.save();
    return { message: `User ${createUserDto.username} created successfully` };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
      ...user.toObject(),
      username: decrypt(user.username), // Decrypt the username before returning
    }));
  }

  async findOne(_id: string): Promise<User> {  // Changed 'id' to '_id' to follow MongoDB conventions
    const user = await this.userModel.findById(_id).exec();  // Using _id to find user
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      ...user.toObject(),
      username: decrypt(user.username), // Decrypt username
    };
  }

  async update(_id: string, updateUserDto: Partial<CreateUserDto>): Promise<{ message: string }> {  // Changed 'id' to '_id'
    const updatedData = { ...updateUserDto };

    if (updateUserDto.password) {
      updatedData.password = await hashPassword(updateUserDto.password); // Await hashing
    }
    if (updateUserDto.username) {
      updatedData.username = await encrypt(updateUserDto.username); // Await encryption
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(_id, updatedData, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return { message: `User ${decrypt(updatedUser.username)} updated successfully` };
  }

  async remove(_id: string): Promise<{ message: string }> {  // Changed 'id' to '_id'
    const deletedUser = await this.userModel.findByIdAndDelete(_id).exec();  // Using _id to delete user
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return { message: `User ${decrypt(deletedUser.username)} deleted successfully` };
  }

  async removeAll(): Promise<{ message: string }> {
    await this.userModel.deleteMany().exec(); // Await deletion
    return { message: 'All users deleted successfully' };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? user.toObject() : null;
  }
}