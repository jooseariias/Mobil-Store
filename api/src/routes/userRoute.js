const { Router } = require("express");
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const router = Router();
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
// Importar todos los routers;


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

router.post("/", async (req, res, next) => {
    const { name, surname, password, email, image } = req.body;

      const validate = await User.findOne({
        where: {
          email: email,
        },
      });
  
      if (validate) {
        return res.status(400).send({message: "User or Email already registered"});
      }
  
      const newUser = await User.create({
        
        name,
        surname,
        password: bcrypt.hashSync(password, 8),
        email,
        image,
      });
  
      if (!newUser) {
        return res.status(500).json({ error: "Failed to create user" });
      }
  
      const token = jwt.sign({ email }, "secret");

      return res.status(200).send({ message: "User registered" });
      
  });



router.get('/:id', async (req, res) => {
  const selectedUser = await User.findOne({
    where: {
      id: req.params.id
    },
  })
  if (selectedUser) {
    res.status(200).send(selectedUser)
  } else {
    res.sendStatus(404)
  }
})

router.put('/:id', async (req, res) => {
  const selectedUser = await User.findOne({
    where: {
      id: req.params.id
    }

  });

  if (selectedUser) {
    let data = { ...req.body }

    let keys = Object.keys(data);

    keys.forEach(k => {
      selectedUser[k] = data[k]
    });

    await selectedUser.save()

    res.status(200).send(selectedUser)
  } else {
    res.status(404)
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    if (deletedUser) {
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

module.exports = router;
