import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";
import connectDB from "./config/db";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ====================
// HOME
// ====================

app.get("/", (req, res) => {
  res.send("E-commerce REST API is running!");
});

// ====================
// SERVER START
// ====================

const startServer = async () => {
  try {
    const db = await connectDB();

    const usersCollection = db.collection("user");
    const productsCollection = db.collection("Product-data");
    const cartCollection = db.collection("cart");




   // ====================
    // POST ALL add to card
    // POST /add to card
    // ====================

app.post("/cart", async (req,res) => {
  const cart = req.body;
  const result = await cartCollection.insertOne(cart);
  res.send(result);
})





    // ====================
    // GET ALL USERS
    // GET /users
    // ====================

    app.get("/users", async (req, res) => {
      try {
        const users = await usersCollection.find({}).toArray();

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
    // GET SINGLE USER
    // GET /users/:id
    // ====================

    app.get("/users/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const user = await usersCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        res.status(200).json({
          success: true,
          data: user,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to get user",
        });
      }
    });

    // ====================
    // CREATE USER
    // POST /users
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
    // UPDATE USER
    // PUT /users/:id
    // ====================

    app.put("/users/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updatedUser = req.body;

        const result = await usersCollection.updateOne(
          {
            _id: new ObjectId(id),
          },
          {
            $set: updatedUser,
          }
        );

        res.status(200).json({
          success: true,
          message: "User updated successfully",
          modifiedCount: result.modifiedCount,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to update user",
        });
      }
    });

    // ====================
    // DELETE USER
    // DELETE /users/:id
    // ====================

    app.delete("/users/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await usersCollection.deleteOne({
          _id: new ObjectId(id),
        });

        res.status(200).json({
          success: true,
          message: "User deleted successfully",
          deletedCount: result.deletedCount,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to delete user",
        });
      }
    });

    // ====================
    // GET ALL PRODUCTS
    // GET /products
    // ====================

    app.get("/products", async (req, res) => {
      try {
        const products = await productsCollection.find({}).toArray();

        res.status(200).json({
          success: true,
          data: products,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to get products",
        });
      }
    });

    // ====================
    // GET SINGLE PRODUCT
    // GET /products/:id
    // ====================

    app.get("/products/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const product = await productsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found",
          });
        }

        res.status(200).json({
          success: true,
          data: product,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to get product",
        });
      }
    });

    // ====================
    // CREATE PRODUCT
    // POST /products
    // ====================

    app.post("/products", async (req, res) => {
      try {
        const product = req.body;

        const result = await productsCollection.insertOne(product);

        res.status(201).json({
          success: true,
          message: "Product created successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to create product",
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
    console.error("Server error:", error);
  }
};

startServer();