const express = require("express");
const port = 4000;
const app = express();
const cors = require("cors");
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/categories");

app.use(express.json());
//what does cors do? cross origin requests?
app.use(cors());
app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
