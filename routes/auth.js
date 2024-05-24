const router = require("express").Router();
const pool = require("../db");
const userController = require("../controllers/user");
const authorize = require("../middleware/User/authorize");
const validInfo = require("../middleware/User/validInfo");

router.get("/count", async (req, res) => {
  const responseCount = await userController.count();
  res.send(responseCount);
});

router.get("/all", async (req, res) => {
  const responseShowData = await userController.list();
  res.send(responseShowData);
});

router.post("/register", async (req, res) => {
  const { name, lastname, gender, email, dni, phone, password, role } =
    req.body;

  const registerResponse = await userController.register(
    name,
    lastname,
    gender,
    email,
    dni,
    phone,
    password,
    role
  );

  res.send(registerResponse);
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  const loginResponse = await userController.login(email, password);

  res.send(loginResponse);
});

router.post("/loginCliente", validInfo, async (req, res) => {
  const { email, password } = req.body;

  const loginResponse = await userController.loginCliente(email, password);

  res.send(loginResponse);
});

router.get("/verify", authorize, (req, res) => {
  res.json(true);
});

router.get("/getName", authorize, async (req, res) => {
  const response = await userController.showName(req.user);
  res.send(response);
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;
  const responseDelete = await userController.delete(id);
  res.send(responseDelete);
});

router.post("/getUserbyEmail", async (req, res) => {
  const { email } = req.body;
  const response = await userController.obtenerUsuario(email);
  res.send(response);
});

router.post("/edit", async (req, res) => {
  const { name, lastname, email, dni, phone, id } = req.body;
  const responseEdit = await userController.edit(
    name,
    lastname,
    email,
    dni,
    phone,
    id
  );
  res.send(responseEdit);
});

module.exports = router;
