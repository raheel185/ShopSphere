import express from "express";
import {
  addToCart,
  getCartItems,
  updateCartItems,
} from "../controllers/cartController.js";
import { authUser } from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.get("/get", authUser, getCartItems);
cartRouter.post("/update", authUser, updateCartItems);

export default cartRouter;
