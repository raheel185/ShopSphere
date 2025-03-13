import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrder,
  userOrder,
  updateStatus,
} from "../controllers/orderController.js";
import express from "express";
import { authUser } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";

const orderRouter = express.Router();
