import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartItems,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/get", getCartItems);
cartRouter.post("/post", updateCartItems);

export default cartRouter;
