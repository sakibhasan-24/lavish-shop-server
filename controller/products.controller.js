import Product from "../model/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    return res.status(200).json({
      success: true,
      products: products,
      message: "data found ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "data not found ",
      });
    }
    return res.status(200).json({
      success: true,
      product: product,
      message: "data found ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
