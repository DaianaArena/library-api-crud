import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './interfaces/book';
import { Response } from './interfaces/response';

@Injectable()
export class AppService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async getBook(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  async createBook(bookData: Book): Promise<Response> {
    const existingBook = await this.bookModel.findOne({ name: bookData.name }).exec();
    if (existingBook) {
      return {
        code: 400,
        message: `El libro con el nombre ${bookData.name} ya existe`,
      };
    }

    const createdBook = new this.bookModel(bookData);
    await createdBook.save();
    return {
      code: 200,
      message: 'El libro se creó correctamente',
    };
  }

  async updateBook(bookName: string, newData: Partial<Book>): Promise<Response> {
    const updatedBook = await this.bookModel.findOneAndUpdate({ name: bookName }, newData, { new: true }).exec();
    if (!updatedBook) {
      throw new NotFoundException(`Libro con el nombre ${bookName} no encontrado`);
    }
    return {
      code: 200,
      message: `Libro con el nombre ${bookName} actualizado correctamente`,
    };
  }

  async deleteBook(bookName: string): Promise<Response> {
    const deletedBook = await this.bookModel.findOneAndDelete({ name: bookName }).exec();
    if (!deletedBook) {
      throw new NotFoundException(`Libro con el nombre ${bookName} no encontrado`);
    }
    return {
      code: 200,
      message: `Libro con el nombre ${bookName} eliminado correctamente`,
    };
  }
}