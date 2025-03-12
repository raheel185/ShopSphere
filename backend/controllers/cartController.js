async function addToCart(req, res) {
  res.json({ message: "Cart API working" });
}

async function getCartItems(req, res) {}

async function updateCartItems(req, res) {}

export default { addToCart, getCartItems, updateCartItems };
