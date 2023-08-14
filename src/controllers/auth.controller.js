const bcrypt = require("bcrypt");
const User = require("../models/usuario.model");
const { JWT_SECRET } = require("../common/constants");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, password, email, firstname, lastname, phone } = req.body;

  /** Logica de encriptacion */
  const salt = bcrypt.genSaltSync(5);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log(salt, hashedPassword, password);

  /** Logica de creacion de usuario */
  const user = new User({
    username,
    password: hashedPassword,
    email,
    firstname,
    lastname,
    phone,
  });

  await user.save();

  res.status(201);
  res.json({ message: "Usuario creado", username: user.username });
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

  // Existe el usuario?
  const user = await User.findOne({ username });

  if (user === null) {
    // CODIGO DE NO EXISTE O NO ENCONTRADO
    res.status(404);
    return res.json({ message: "Usuario no encontrado" });
  }

  // Verifica si la contraseña es igual a la que se creo al principio en el registro
  const isMatch = bcrypt.compareSync(password, user.password);

  // Error 401 sin autorizacion
  if (!isMatch) {
    res.status(401);
    return res.json({ message: "Sin autorizacion" });
  }

  // Firmo el JWT
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET
  );

  res.status(200);
  res.json({
    access_token: token,
  });
  } catch (error) {
    console.log(error)
    res.status(500).json({ massage: "algo salio mal" });
    
  }

  
};

module.exports = {
  loginUser,
  registerUser,
};
