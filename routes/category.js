const router = require("express").Router();
const pool = require("../db");
const categoryController = require("../controllers/category");

router.get("/all", async (req, res) => {
  const responseShowData = await categoryController.list();
  res.send(responseShowData);
});

router.get("/count", async (req, res) => {
  const responseCount = await categoryController.count();
  res.send(responseCount);
});

router.post("/create", async (req, res) => {
  const { name, description, url } = req.body;
  const responseCreate = await categoryController.create(
    name,
    description,
    url
  );
  res.send(responseCreate);
});

router.post("/edit", async (req, res) => {
  const { name, description, url, id } = req.body;
  const responseEdit = await categoryController.edit(
    name,
    description,
    url,
    id
  );
  res.send(responseEdit);
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;
  const responseDelete = await categoryController.delete(id);
  res.send(responseDelete);
});

router.post("/getID", async (req, res) => {
  const { name } = req.body;
  const response = await categoryController.showName(name);
  res.send(response);
});

router.post("/getname", async (req, res) => {
  const { id } = req.body;
  const response = await categoryController.getName(id);
  res.send(response);
});

router.post("/listPorCantidad", async (req, res) => {
  const { num } = req.body;
  const response = await categoryController.listPorCantidad(num);
  res.send(response);
});

module.exports = router;
