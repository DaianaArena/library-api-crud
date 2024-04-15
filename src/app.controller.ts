import { Controller, Get, Put, Post, Delete, Param, NotFoundException, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Book } from './interfaces/book';
import { Response } from './interfaces/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getBook(): Promise<Book[]> {
    return await this.appService.getBook();
  }

  @Post()
  async createBook(@Body() bookData: Book): Promise<Response> {
    return await this.appService.createBook(bookData);
  }

  @Put(':name')
  async updateBook(@Param('name') name: string, @Body() newData: Partial<Book>): Promise<Response> {
    try {
      return await this.appService.updateBook(name, newData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':name')
  async deleteBook(@Param('name') name: string): Promise<Response> {
    try {
      return await this.appService.deleteBook(name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}