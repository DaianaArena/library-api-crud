import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModel, BookSchema } from './schemes/book.model';
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule

@Module({
  imports: [
    ConfigModule.forRoot(), // Configura la carga de variables de entorno
    MongooseModule.forRoot(process.env.MONGODB_URI), // Utiliza la URL de conexión desde las variables de entorno
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    BookModel,
  ],
})
export class AppModule {}