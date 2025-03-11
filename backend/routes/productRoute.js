import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  removeProduct2,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  authAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", authAdmin, removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);
productRouter.delete("/delete/:productId", authAdmin, removeProduct2);

export default productRouter;
