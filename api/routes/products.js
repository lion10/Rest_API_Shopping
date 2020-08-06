const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const ProductsController = require("../controllers/products");
const checkAuth = require("../middleware/check-auth");

// destination: where the photo will store,
// filename: what is the name of the file when store it
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, "-");
    cb(null, date + file.originalname);
  },
});

// only jpeg & png extention files will store
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// limits : max size of the file
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const Product = require("../models/product");

// Handling incoming endPoints requests

// get all products
router.get("/", ProductsController.products_get_all);

// post new product
router.post(
  "/",
  checkAuth,
  upload.single("productImage"), // single props : one file you can upload
  ProductsController.products_create_product
);

// get a product by id
router.get("/:productId", ProductsController.products_get_product);

// update on product
router.patch(
  "/:productId",
  checkAuth,
  ProductsController.products_update_product
);

// delete a product
router.delete(
  "/:productId",
  checkAuth,
  ProductsController.products_delete_product
);

module.exports = router;
