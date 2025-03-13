import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({ status: true, message: "Order has been placed." });
    //
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {};

const placeOrderRazorPay = async (req, res) => {};

const allOrders = async (req, res) => {};

const userOrder = async (req, res) => {
  try {
    //
    const { userId } = req.body;
    const orders = await orderModel.findById(userId);
    res.json({ status: true, orders });
    //
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrder,
  updateStatus,
};
