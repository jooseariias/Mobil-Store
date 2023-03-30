const { Router } = require("express");
const { Op } = require("sequelize");
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { SECRET }= process.env

const router = Router();

router.get("/", async (req, res) => {
    const { email, name } = req.query;
  
    try {
      const users = await User.findAll()
      if (name) {
        let result = users.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        result.length
          ? res.status(200).send(result)
          : res.status(404).send('name not found');
      }
  
      else if (email) {
        const users = await User.findAll({
          where: {
            email: {
              [Op.like]: `${email}%`
            }
          },
        });
        users.length > 0
          ? res.status(200).send(users)
          : res.status(400).send(`User ${email} not found`);
      } else {
        const users = await User.findAll();
        res.status(200).send(users);
      }
  
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

//   post

router.post("/", async (req, res) => {
    const { id, name, surname, password, email, rol, enable, image } = req.body;
  
    try {
      const validate = await User.findOne({
        where: {
          email: email,
        },
      });
  
      if (validate) {
        return res.status(200).send({ msg: "User or Email already registered" });
      }else{

        const newUser = await User.create({
            id,
            name,
            surname,
            password: bcrypt.hashSync(password, 8),
            email,
            rol,
            enable,
            image,
          });
      
          if (!newUser) {
            return res.status(500).json({ error: "Failed to create user" });
    
          }else{
            const token = jwt.sign({ email }, SECRET);
      
          return res.status(201).json({ token, newUser, msg: "User registered" });
          }
      }
  
      
  
    } catch (error) {
      
      return res.status(500).json({ error: error });
    }
  });
  

router.get('/:id', async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id
    },
  })
  if (user) {
    res.status(200).send(user)
  } else {
    res.send("user not found").status(404)
  }
})

router.put('/:id', async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id
    }

  });
  

  if (user) {
    let data = { ...req.body }

    let keys = Object.keys(data);

    keys.forEach(k => {
     user[k] = data[k]
    });

    await user.save()

    res.status(200).send(user)
  } else {
    res.status(404)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    if (user) {
      await User.destroy({ where: { id: id } });
      return res.status(200).json("User deleted");
    } else {
      res.status(404).json({ msj: 'user not found' })
    }

  }
  catch (err) {
    return res.status(500).send(`User could not be deleted (${err})`);
  }
})



module.exports= router;

