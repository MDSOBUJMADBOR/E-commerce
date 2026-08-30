import express from "express";
import cors from "cors";
import connectDB from "./config/db";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// ====================
// Home API
// ====================

app.get("/", (req, res) => {
  res.send("E-commerce Backend is running!");
});


// ====================
// Server Start
// ====================

const startServer = async () => {
  try {
    const db = await connectDB();

    const usersCollection = db.collection("users");


    // ====================
    // CREATE USER
    // ====================

    app.post("/users", async (req, res) => {
      try {
        const user = req.body;

        const result = await usersCollection.insertOne(user);

        res.status(201).json({
          success: true,
          message: "User created successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to create user",
        });
      }
    });


    // ====================
    // GET ALL USERS
    // ====================

    app.get("/users", async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();

        res.status(200).json({
          success: true,
          data: users,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to get users",
        });
      }
    });


    // ====================
    // START SERVER
    // ====================

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
};

startServer();