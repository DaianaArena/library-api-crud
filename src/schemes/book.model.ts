// book.model.ts
import { Schema, model } from 'mongoose';

export const BookSchema = new Schema({
  name: String,
  author: String,
  year: Number,
});

export const BookModel = model('Book', BookSchema);