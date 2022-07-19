const { product: productModel } = require("../models");
const { Router } = require("express");
const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allProducts = await productModel.findAll();
    if (!allProducts) {
      res.status(404).send("No products found");
    }
    res.json(allProducts);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    //get the url param
    const { id } = req.params;
    //get specific product
    const product = await productModel.findByPk(id);
    if (!product) {
      res.status(404).send("This product does not exist");
    }
    res.json(product);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
