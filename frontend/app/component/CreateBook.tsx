"use client";

import React, { useState } from "react";

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
import { toast } from "sonner";
import axios from "axios";

type CreateBookProps = {
  callbackFn: () => void;
};

type FormData = {
  title: string;
  desc: string;
  cover: string;
};

const intialState: FormData = {
  title: "",
  desc: "",
  cover: "",
};

const CreateBook = ({ callbackFn }: CreateBookProps) => {
  const [formData, setFormData] = useState<FormData>(intialState);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4001/api/books/create",
        formData
      );
      toast.success(response.data.message);
      setFormData(intialState);
      callbackFn();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data.message || "error while adding book");
      console.error(
        "error while adding book",
        error?.response?.data.message || error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className={`${buttonVariants({
          variant: "default",
        })} cursor-pointer`}
      >
        <IoMdAdd size={23} /> ADD New Book
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Add New Book
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8">
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
            {loading ? "Loading..." : "Submit"}
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
  );
};

export default CreateBook;
