const { Router } = require("express");
const { category: Category } = require("../models");
const router = new Router();

router.get("/", async function (req, res, next) {
  try {
    //get the categories
    const allCategories = await Category.findAll();
    if (!allCategories) {
      res.status(404).send("No categories could be found");
    }
    res.send(allCategories);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
