import { readOrders, writeOrders } from '../services/db.service.js';

// Function to handle getting all orders
export const getAllOrders = async (req, res) => {
  try {
    const allOrders = readOrders();
    return res.status(200).json({
      success: true,
      message: 'Orders found!',
      orders: allOrders,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      orders: {},
    });
  }
};

// Function to handle getting a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { customerId } = req.body; // Customer ID from request body
    const { id: orderId } = req.params; // Order ID from URL params

    // Validate that customerId is provided
    if (!customerId) {
      return res.status(400).json({
        message: 'Customer ID is required!',
        success: false,
      });
    }

    const data = readOrders();

    // Find the order by ID
    let orderFound = null;
    for (const user of data.users) {
      const order = user.orders.find((order) => order.orderId === orderId);
      if (order) {
        orderFound = order;
        break;
      }
    }

    // Return 404 if order not found
    if (!orderFound) {
      return res.status(404).json({
        message: 'Order not found',
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Order found!',
      order: orderFound,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      order: {},
    });
  }
};

// Function to handle creating a new order
export const createOrder = async (req, res) => {
  try {
    const { customerId, name, email, products, paymentMethod, totalAmount } =
      req.body;

    // Validate request body
    if (
      !customerId ||
      !products ||
      products.length === 0 ||
      !paymentMethod ||
      totalAmount === undefined
    ) {
      return res.status(400).json({
        message: 'Missing required fields',
        success: false,
      });
    }

    // Read orders from JSON file
    const data = readOrders();

    // Create a new order object
    const newOrder = {
      orderId: new Date().getTime().toString(),
      orderDate: new Date().toISOString(),
      orderStatus: 'pending',
      products,
      paymentMethod,
      totalAmount,
    };

    // Find the user by customerId
    let user = data.users.find((user) => user.customerId === customerId);

    if (!user) {
      // If user does not exist, create a new user
      user = {
        customerId,
        name,
        email,
        orders: [newOrder],
      };
      data.users.push(user);
    } else {
      // If user exists, add the new order to the user's orders
      user.orders.push(newOrder);
    }

    // Write updated orders back to the JSON file
    writeOrders(data);

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      order: {},
    });
  }
};

// Function to handle updating an existing order by ID
export const updateOrderById = async (req, res) => {
  try {
    const { id: orderId } = req.params; // Order ID from URL params
    const { customerId, orderStatus, products, paymentMethod, totalAmount } =
      req.body;

    // Validate request body
    if (!orderStatus && !products && !paymentMethod && !totalAmount) {
      return res.status(400).json({
        message: 'No fields provided for update',
        success: false,
      });
    }

    // Read orders from JSON file
    const data = readOrders();

    // Find the user by customerId
    const userIndex = data.users.findIndex(
      (user) => user.customerId === customerId
    );

    if (userIndex === -1) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    // Find the order by orderId
    const orderIndex = data.users[userIndex].orders.findIndex(
      (order) => order.orderId === orderId
    );

    if (orderIndex === -1) {
      return res.status(404).json({
        message: 'Order not found',
        success: false,
      });
    }

    // Update order fields if provided in the request
    if (orderStatus)
      data.users[userIndex].orders[orderIndex].orderStatus = orderStatus;
    if (products) data.users[userIndex].orders[orderIndex].products = products;
    if (paymentMethod)
      data.users[userIndex].orders[orderIndex].paymentMethod = paymentMethod;
    if (totalAmount)
      data.users[userIndex].orders[orderIndex].totalAmount = totalAmount;

    // Write updated orders back to the JSON file
    writeOrders(data);

    return res.status(200).json({
      success: true,
      message: 'Order updated successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Function to handle deleting an order by ID
export const deleteOrderById = async (req, res) => {
  try {
    const { id: orderId } = req.params; // Order ID from URL params
    const { customerId } = req.body; // Customer ID from request body

    // Read orders from JSON file
    const data = readOrders();

    // Find the user by customerId
    const userIndex = data.users.findIndex(
      (user) => user.customerId === customerId
    );

    if (userIndex === -1) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    // Find the order by orderId
    console.log(orderId);
    const orderIndex = data.users[userIndex].orders.findIndex(
      (order) => order.orderId === orderId
    );

    if (orderIndex === -1) {
      return res.status(404).json({
        message: 'Order not found',
        success: false,
      });
    }

    // Remove the order from the user's orders array
    data.users[userIndex].orders.splice(orderIndex, 1);

    // Write updated orders back to the JSON file
    writeOrders(data);

    return res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
