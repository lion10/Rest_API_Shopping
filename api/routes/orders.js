const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const chackAuth = require("../middleware/check-auth");
const OrdersController = require("../controllers/orders");

// Handling incoming endPoints requests

// get all orders
router.get("/", chackAuth, OrdersController.orders_get_all);

// post new order
router.post("/", chackAuth, OrdersController.orders_create_order);

// get an order by id
router.get("/:orderId", chackAuth, OrdersController.orders_get_order);

// delete an order by id
router.delete("/:orderId", chackAuth, OrdersController.orders_delete_order);

module.exports = router;
