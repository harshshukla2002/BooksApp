import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import bookRouter from "./routes/books.route";

const app = express();
const PORT = 4001;

app.use(express.json());
app.use(cors());
app.use("/api/books", bookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({ message: `Server is running at http://localhost:${PORT}` });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
