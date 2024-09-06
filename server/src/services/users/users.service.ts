// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import { AuthLoginDto } from './dto/auth-login.dto';
import { TJwtPayload } from 'src/types/jwt-payload';
import { TServiceResponse } from 'src/types/service-response';
import { LoginDto, ChangePasswordDto } from './dto';
import { config } from 'src/common/configs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(input: LoginDto): Promise<TServiceResponse> {
    // return loginDto;
    try {
      //! Check User in DB
      const user = await this.userRepository.findOne({
        where: {
          username: input.username?.toLowerCase(),
          plant_code: input.plant_code,
        },
      });
      if (!user)
        return {
          status: 'error',
          statusCode: 400,
          message: 'User not found',
          data: [],
        };

      const isMatched = await bcrypt.compare(input.password, user.password);
      if (!isMatched)
        return {
          status: 'error',
          statusCode: 400,
          message: 'Invalid password',
          data: [],
        };

      // return {
      //   status: 'success',
      //   statusCode: 200,
      //   message: 'debug',
      //   data: [user],
      // };

      //? generate token
      const payload: TJwtPayload = {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        plant_code: user.plant_code,
      };

      const token = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: '1000d',
      });

      return {
        status: 'success',
        statusCode: 200,
        message: 'Login successfully',
        data: [
          {
            email: user.email,
            name: user.name,
            role: user.role,
            plant_code: user.plant_code,
            token,
          },
        ],
      };
    } catch (error) {
      // console.log(error);
      return {
        status: 'error',
        statusCode: 500,
        message: error.message,
        data: [],
      };
    }
  }

  async changePassword(
    input: ChangePasswordDto,
    decoded: TJwtPayload,
  ): Promise<TServiceResponse> {
    try {
      if (input.new_password == input.old_password)
        return {
          status: 'error',
          statusCode: 400,
          message: 'New password cannot be the same as old password',
          data: [],
        };

      //! Check User in DB
      const user = await this.userRepository.findOne({
        where: { user_id: decoded.user_id },
      });
      if (!user)
        return {
          status: 'error',
          statusCode: 400,
          message: 'User not found',
          data: [],
        };

      const isMatched = await bcrypt.compare(input.old_password, user.password);
      if (!isMatched)
        return {
          status: 'error',
          statusCode: 400,
          message: 'Invalid password',
          data: [],
        };

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(input.new_password, salt);

      const updated = await this.userRepository.update(
        {
          user_id: decoded.user_id,
        },
        {
          password: hash,
        },
      );

      return {
        status: 'success',
        statusCode: 201,
        message: 'Password updated successfully',
        data: [updated],
      };
    } catch (error) {
      return {
        status: 'error',
        statusCode: 500,
        message: error.message,
        data: [],
      };
    }
  }

  // async findAllPlants(): Promise<TServiceResponse> {
  //   try {
  //     const results = await this.plantRepository.find();
  //     return {
  //       status: 'success',
  //       statusCode: 200,
  //       message: 'All plants',
  //       data: results,
  //     };
  //   } catch (error) {
  //     return {
  //       status: 'error',
  //       statusCode: 500,
  //       message: error.message,
  //       data: [],
  //     };
  //   }
  // }

  async genPassword(password: string): Promise<TServiceResponse> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return {
        status: 'success',
        statusCode: 200,
        message: 'Password generated',
        data: [
          {
            password: hash,
          },
        ],
      };
    } catch (error) {
      return {
        status: 'error',
        statusCode: 500,
        message: error.message,
        data: [],
      };
    }
  }
}
