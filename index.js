import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import connectionDB from "./Connection/conn.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
connectionDB();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);
app.get("/", (req, res) => res.send("server is ready"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
