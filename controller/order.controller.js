import SSLCommerzPayment from "sslcommerz-lts";
import Order from "../model/order.model.js";
import dotenv from "dotenv";
dotenv.config();
const store_id = process.env.STORE_ID;
const store_password = process.env.STORE_PASSWORD;
const isLive = false;
export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    // itemsPrice,
    productPrice,
    taxPrice,

    shippingPrice,
    totalPrice,
  } = req.body;
  // console.log(req.body);
  // console.log(deliveryAddress);
  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No order items" });
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      shippingAddress,
      paymentMethod,

      taxPrice,
      productPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).json({
      order: createdOrder,
      success: true,
      message: "order created successfully",
    });
  }
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate(
    "user",
    "name email"
  );
  if (order) {
    return res.status(200).json({
      order,
      success: true,
      message: "order get successfullly",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "order not found",
    });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    console.log("order", order._id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not found",
      });
    }
    const data = {
      total_amount: order.totalPrice,
      currency: "BDT",
      tran_id: Date.now(),
      success_url: `http://localhost:3000/api/v1/orders/payment-success/${order._id}`,
      fail_url: `http://localhost:3000/api/v1/orders/payment-failed/${order._id}`,
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: order.user.name,
      cus_email: order.user.email,
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    // console.log(data);
    const sslcz = new SSLCommerzPayment(store_id, store_password, isLive);
    const apiResponse = await sslcz.init(data);

    // Redirect the user to the payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    // console.log(GatewayPageURL);
    res.send(GatewayPageURL);
    if (apiResponse.status === "SUCCESS") {
      order.isPaid = true;
      order.paidAt = Date.now();
      await order.save();
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const successfullyPayment = async (req, res) => {
  console.log(req.params.id);
  res.redirect(`http://localhost:5173/order/${req.params.id}`);
};

export const cancelPayment = async (req, res) => {
  // console.log(req.params.id);
  res.redirect(`http://localhost:5173/order/${req.params.id}`);
};
