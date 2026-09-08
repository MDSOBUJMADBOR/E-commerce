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
const wishlistCollection = db.collection("wishlist");



   // ====================
    // POST ALL add to card
    // POST /add to card
    // ====================

app.post("/cart", async (req,res) => {
  const cart = req.body;
  const result = await cartCollection.insertOne(cart);
  res.send(result);
})

app.get("/cart/email/:email", async (req,res) => {
try {
  const { email } = req.params;
  const result = await cartCollection.find({ userEmail: email }).toArray();
  res.status(200).json(result);

}
catch (error) {
  console.error(error);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
});
// http://localhost:5000/cart/email/sobujmadbor660@gmail.com





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
    // GET ALL PRODUCTS
    // GET /products
    // ====================

app.get("/products", async (req, res) => {
  try {
    const products = await productsCollection
      .find({})
      .limit(6)
      .toArray();

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
// ADD TO WISHLIST
// POST /wishlist
// একই email একই product একবারই add করতে পারবে
// ====================

app.post("/wishlist", async (req, res) => {
  try {
    const wishlistData = req.body;

    const { productId, userEmail } = wishlistData;

    // ====================
    // VALIDATION
    // ====================

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!userEmail) {
      return res.status(401).json({
        success: false,
        message: "Please login first to add wishlist",
      });
    }

    // ====================
    // CHECK DUPLICATE
    // একই email + একই product
    // ====================

    const alreadyExists = await wishlistCollection.findOne({
      productId: productId,
      userEmail: userEmail,
    });

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "This product is already in your wishlist",
      });
    }

    // ====================
    // ADD CREATED DATE
    // ====================

    wishlistData.createdAt = new Date();

    // ====================
    // INSERT DATABASE
    // ====================

    const result = await wishlistCollection.insertOne(
      wishlistData
    );

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist successfully",
      insertedId: result.insertedId,
    });

  } catch (error) {
    console.error("Wishlist Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
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