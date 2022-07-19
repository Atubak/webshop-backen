const { category: categoryModel, product: productModel } = require("./models");

async function getStuff() {
  const category = await categoryModel.findAll({
    where: { title: "Electronics" },
    include: [productModel],
  });
  console.log(category);
}

getStuff();
