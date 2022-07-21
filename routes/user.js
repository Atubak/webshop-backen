const { Router } = require("express");
const { user: User } = require("../models");

const router = new Router();
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("../auth/jwt");

//-------------------------USER SIGNUP--------------------------------
router.post("/signup", async function (req, res, next) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      //no name,email,password??
      res.status(400).send("Please provide a name, email and password");
    } else {
      const hashedPass = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPass,
      });
      //delete the new user's password before we send it as a response, will exist in db
      delete newUser.dataValues.password;
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

//---------------------------USER LOGIN-------------------------------

router.post("/login", async function (req, res, next) {
  try {
    //get email and password from body
    const { email, password: pass } = req.body;
    //check these
    if (!email || !pass) {
      res.status(400).send(`Please provide credentials`);
    } else {
      //get user from database via email
      const dbUser = await User.findOne({
        where: { email: email },
      });
      //check if database user does not exist
      if (!dbUser) {
        res.status(404).send("User does not exist");
      }
      //extract database user's password and id
      const { password, id } = dbUser;
      //check if password DOES NOT match hash
      if (!bcrypt.compareSync(pass, password)) {
        res.status(400).send("Please provide a correct password");
      } else {
        //send json web token
        res.send({
          jwt: toJWT({ userId: id }),
        });
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
