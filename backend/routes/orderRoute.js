import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrder,
  userOrder,
  updateStatus,
} from "../controllers/orderController.js";

import express from "express";

const orderRouter = express.Router();
