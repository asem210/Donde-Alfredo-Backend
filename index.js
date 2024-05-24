const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/index");
const dotenv = require("dotenv");
dotenv.config();

//middleware
app.use(express.json()); //req.body
app.use(cors());

//ROUTES//
app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
