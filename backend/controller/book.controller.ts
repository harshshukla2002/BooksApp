import { Request, Response } from "express";
import { db } from "../config/dbConfig";

export const getBooks = async (req: Request, res: Response) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message, success: false });
      return;
    }
    res.json({ data: result, success: true });
  });
};

export const createBook = async (req: Request, res: Response) => {
  const query = "INSERT INTO BOOKS (`title`, `desc`, `cover`) VALUES (?)";
  const { title, desc, cover } = req.body;
  const values = [title, desc, cover];

  db.query(query, [values], (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message, success: false });
      return;
    }
    res.json({ message: "Book created successfully", success: true });
  });
};

export const deleteBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [bookId], (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message, success: false });
      return;
    }
    res.json({ message: "Book deleted successfully", success: true });
  });
};

export const updateBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { title, desc, cover } = req.body;
  const query =
    "UPDATE books SET title = ?, `desc` = ?, cover = ? WHERE id = ?";
  const values = [title, desc, cover, bookId];

  db.query(query, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message, success: false });
      return;
    }
    res.json({ message: "Book updated successfully", success: true });
  });
};
