import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrder,
  updateStatus,
} from "../controllers/orderController.js";
import express from "express";
import { authUser } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", authAdmin, allOrders);
orderRouter.post("/status", authAdmin, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorPay);

// User Features
orderRouter.post("/userorders", authUser, userOrder);

export default orderRouter;
