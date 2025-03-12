import userModel from "../models/user.model.js";

async function addToCart(req, res) {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ status: true, message: "Added to Cart" });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
}

async function getCartItems(req, res) {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    return res.json({ status: true, cartData });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
}

async function updateCartItems(req, res) {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ status: true, message: "Cart Updated" });
  } catch (error) {
    return res.json({ status: false, message: error.message });
  }
}

export { addToCart, getCartItems, updateCartItems };
