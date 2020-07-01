import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoxsModule } from './boxs/boxs.module';

@Module({
  imports: [
    BoxsModule, 
    MongooseModule.forRoot('mongodb+srv://pokenest_user:WECiw8R9Zx3u0Ebx@pokenest.zaykm.mongodb.net/pokenest?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
