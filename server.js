const express = require("express");
const port = 4000;
const app = express();
const cors = require("cors");
const productRouter = require("./routes/products");
const categoryRouter = require("./routes/categories");
const userRouter = require("./routes/user");

app.use(express.json());
//what does cors do? cross origin resource scripting?
//allows your website to receive requests from different origins,
//sets up system where other wensites can make requests, but they have to ask for it
app.use(cors());
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
