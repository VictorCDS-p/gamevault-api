import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/library", libraryRoutes);
app.use("/collections", collectionRoutes);
app.use("/categories", categoryRoutes);

export default app;