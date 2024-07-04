import mongoose from "mongoose";

import users from "./data/user.js";
import { productsList } from "./data/product.js";
import connectDb from "./connection/db.js";
import User from "./model/user.model.js";
import Product from "./model/product.model.js";
import dotenv from "dotenv";
import Order from "./model/order.model.js";
dotenv.config();
connectDb();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    // await User.create(users);
    await Order.deleteMany();
    const createdUser = await User.insertMany(users);
    const adminUser = createdUser[0]._id;
    const sampleProducts = productsList.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    // await User.create(users);
    await Order.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
