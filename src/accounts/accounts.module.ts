import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    InfraModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AccountsModule {}
