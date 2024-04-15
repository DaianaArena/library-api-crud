"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AppService = class AppService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async getBook() {
        return await this.bookModel.find().exec();
    }
    async createBook(bookData) {
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
    async updateBook(bookName, newData) {
        const updatedBook = await this.bookModel.findOneAndUpdate({ name: bookName }, newData, { new: true }).exec();
        if (!updatedBook) {
            throw new common_1.NotFoundException(`Libro con el nombre ${bookName} no encontrado`);
        }
        return {
            code: 200,
            message: `Libro con el nombre ${bookName} actualizado correctamente`,
        };
    }
    async deleteBook(bookName) {
        const deletedBook = await this.bookModel.findOneAndDelete({ name: bookName }).exec();
        if (!deletedBook) {
            throw new common_1.NotFoundException(`Libro con el nombre ${bookName} no encontrado`);
        }
        return {
            code: 200,
            message: `Libro con el nombre ${bookName} eliminado correctamente`,
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Book')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppService);
//# sourceMappingURL=app.service.js.map