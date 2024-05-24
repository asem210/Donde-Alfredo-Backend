module.exports = function (req, res, next) {
  const { name, lastname, gender, email, dni, phone, password, role } =
    req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (
      ![name, lastname, gender, email, dni, phone, password, role].every(
        Boolean
      )
    ) {
      res.status(401).send({ message: "Missing Credentials" });
    } else if (!validEmail(email)) {
      res.status(401).send({ message: "Invalid Email" });
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      res.status(401).send({ message: "Missing Credentials" });
    } else if (!validEmail(email)) {
      res.status(401).send({ message: "Invalid Email" });
    }
  }

  next();
};
