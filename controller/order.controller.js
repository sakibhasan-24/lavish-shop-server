import Order from "../model/order.model.js";

export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
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
      itemsPrice,
      taxPrice,
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
  const order = await Order.findById(req.params.id).populate(
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
