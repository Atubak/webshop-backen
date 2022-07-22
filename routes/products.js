const {
  product: productModel,
  category: categoryModel,
  review: reviewModel,
} = require("../models");
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
    const product = await productModel.findByPk(id, {
      include: [categoryModel],
    });

    if (!product) {
      res.status(404).send("This product does not exist");
    }
    res.json(product);
  } catch (e) {
    console.log(e.response);
    next(e);
  }
});

router.get("/:id/reviews", async (req, res, next) => {
  try {
    //get product id
    const { id } = req.params;

    //get all reviews
    const allReviews = await reviewModel.findAll({ where: { productId: id } });

    if (!allReviews) return res.status(404).send("sorry, no reviews yet!");

    res.json(allReviews);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
