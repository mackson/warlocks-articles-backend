import { Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './application/guards/roles.guard';
// import { AuthGuard } from './application/guards/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from './infra/infra.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      // MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
      MongooseModule.forRoot('mongodb://user_db:warlocks@mongo:27017/warlocks?authSource=admin'),
      InfraModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
  exports: [],
  
})
export class AccountsModule {}
