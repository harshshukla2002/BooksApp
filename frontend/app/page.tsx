"use client";

import { useEffect, useState } from "react";
import CreateBook from "./component/CreateBook";
import axios from "axios";
import BookCard from "./component/BookCard";

export default function Home() {
  const [books, setBooks] = useState<Books[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4001/api/books");
      setBooks(response.data.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "error while fetching books",
        error?.response?.data.message || error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <main className="w-[80%] mx-auto mt-10">
      <CreateBook callbackFn={getBooks} />

      {loading && <h1 className="text-center text-xl m-[10%]">Loading...</h1>}

      {!loading && books && books.length > 0 ? (
        <div className="flex flex-row items-center flex-wrap gap-10 m-10">
          {books.map((book) => {
            return <BookCard key={book.id} book={book} callbackFn={getBooks} />;
          })}
        </div>
      ) : (
        <h1>No Books Found</h1>
      )}
    </main>
  );
}
