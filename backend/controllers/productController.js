import productModel from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

async function addProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const prdData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const NewProduct = new productModel(prdData);
    await NewProduct.save();

    res.json({ status: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: error.message });
  }
}

async function listProducts(req, res) {
  try {
    const products = await productModel.find({});
    res.json({ status: true, products });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
}

async function removeProduct(req, res) {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.json({ status: true, message: "Product deleted" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
}

async function removeProduct2(req, res) {
  try {
    const { productId } = req.params;
    await productModel.findByIdAndDelete(productId);
    res.json({ status: true, message: "Product removed" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
}

async function singleProduct(req, res) {
  try {
    const { id } = req.body;
    const product = await productModel.findById(id);
    res.json({ status: true, product });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
}

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  removeProduct2,
};
