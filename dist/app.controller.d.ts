import { AppService } from './app.service';
import { Book } from './interfaces/book';
import { Response } from './interfaces/response';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getBook(): Promise<Book[]>;
    createBook(bookData: Book): Promise<Response>;
    updateBook(name: string, newData: Partial<Book>): Promise<Response>;
    deleteBook(name: string): Promise<Response>;
}
