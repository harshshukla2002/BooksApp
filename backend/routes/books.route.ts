import express from "express";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from "../controller/book.controller";

const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.post("/create", createBook);
bookRouter.patch("/update/:bookId", updateBook);
bookRouter.delete("/delete/:bookId", deleteBook);

export default bookRouter;
