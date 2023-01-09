import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set("strictQuery", true);

mongoose.connect(MONGODB_URI, options, (db) => {
  if (db) {
    console.error(db);
  } else {
    console.log("Connected to DB");
  }
});
