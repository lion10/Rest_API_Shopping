const Product = require("../models/product");
const mongoose = require("mongoose");

// get all product callback
exports.products_get_all = (req, res, next) => {
  Product.find()
    .select("name price id productImage")
    .exec()
    .then((doc) => {
      const response = {
        count: doc.length,
        product: doc.map((product) => {
          return {
            name: product.name,
            price: product.price,
            productImage: product.productImage,
            _id: product._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + product._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errro: err });
    });
};

// create new product callback
exports.products_create_product = (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created porduct successfully",
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          request: {
            type: "POST",
            url: "http://localhost:3000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errro: err });
    });
};

// get specefic product callback
exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price id productImage")
    .exec()
    .then((doc) => {
      if (doc) {
        console.log(doc);
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + doc._id,
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No vaild entry found for provided Id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errro: err });
    });
};

// update on product callback
exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product update",
        request: {
          type: "PATCH",
          url: "http://localhost:3000/products/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errro: err });
    });
};

// delete a product callback
exports.products_delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "Delete",
          url: "http://localhost:3000/products/",
          data: {
            name: "String",
            price: "Number",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errro: err });
    });
};
