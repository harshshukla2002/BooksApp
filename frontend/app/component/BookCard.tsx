import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdAdd } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Book = {
  book: {
    title: string;
    desc: string;
    cover: string;
    id: number;
  };
  callbackFn: () => void;
};

type FormData = {
  title: string;
  desc: string;
  cover: string;
};

const BookCard = ({ book, callbackFn }: Book) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(book);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/api/books/delete/${id}`
      );
      toast.success(response.data.message);
      callbackFn();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message || "error while deleting book");
      console.error(
        "error while deleting book",
        error?.response?.data.message || error
      );
    }
  };

  const handleUpdate = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:4001/api/books/update/${id}`,
        formData
      );
      toast.success(response.data.message);
      callbackFn();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message || "error while deleting book");
      console.error(
        "error while deleting book",
        error?.response?.data.message || error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-[24%]">
      <CardHeader>
        <img src={book.cover || ""} alt={book.title} width={200} height={150} />
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{book.desc}</p>
      </CardContent>
      <CardFooter className="gap-3">
        <Dialog>
          <DialogTrigger
            className={`${buttonVariants({
              variant: "default",
            })} cursor-pointer`}
          >
            Update
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                Update Book
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={() => handleUpdate(book.id)} className="space-y-8">
              <div className="my-2">
                <Label className="my-2">Title</Label>
                <Input
                  type="text"
                  placeholder="enter title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <Label className="my-2">Description</Label>
                <Input
                  type="text"
                  placeholder="enter description"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <Label className="my-2">Cover Image</Label>
                <Input
                  type="text"
                  placeholder="enter cover image url"
                  name="cover"
                  value={formData.cover}
                  onChange={handleChange}
                />
              </div>
              <Button
                className="mt-5 cursor-pointer w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Update"}
              </Button>
            </form>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant="secondary"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          variant={"destructive"}
          className="cursor-pointer"
          onClick={() => handleDelete(book.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
