import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { AuthResolver } from './auth.resolver';
import { AuthGuards } from './guards/auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';


@Module({
  imports: [HttpModule, UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10000s' },
    }),],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuards,
    },
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule { }