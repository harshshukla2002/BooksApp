import mysql from "mysql2";

console.log("MYSQL_USER", process.env.MYSQL_USER);
console.log("MYSQL_PASSWORD", process.env.MYSQL_PASSWORD);
console.log("MYSQL_DATABASE", process.env.MYSQL_DATABASE);

export const db = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err);
    return;
  }
  console.log("Connected to MySQL");
});
