import { Module } from '@nestjs/common';
import { WinesModule } from './wines/wines.module';
import { TypesModule } from './types/types.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [WinesModule, TypesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
