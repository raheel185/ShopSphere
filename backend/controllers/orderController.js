import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import stripe from "stripe";

const currency = "$";
const deliveryCharge = 10;

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

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge.price * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    return res.json({
      status: true,
      session_url: session.url,
      message: error.message,
    });
    //
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const placeOrderRazorPay = async (req, res) => {};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ status: true, orders });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const userOrder = async (req, res) => {
  try {
    //
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ status: true, orders });
    //
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ status: true, message: "Status updated" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrder,
  updateStatus,
};
