import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connection() {
  const conn = await mongoose.connect(`${process.env.DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  if (conn) {
    console.log("Database is connected");
    return conn;
  }

  if (!conn) {
    console.log("Database is not connected");
    return null;
  }
}

export function close() {
  mongoose.connection.close();
}

// mongoose
//   .connect(`${process.env.DATABASE}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then((db) => console.log("Database is connected"))
//   .catch((err) => console.log(err));

// export const conn = mongoose.createConnection(`${process.env.DATABASE}`);
