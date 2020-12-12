var userDB = require("../model/model");

// create and save user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "content cannot be empty" });
    return;
  }

  //  new user
  const user = new userDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //  save user in db
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating a create operation",
      });
    });
};

// retrieve & return all user and single user
exports.find = (req, res) => {
  if (req.query.id) {
    //   get single users
    const id = req.query.id;
    userDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error retrieving user with id" + id });
      });
  } else {
    //   get all users
    userDB
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

// update new user by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.then(400).send({ message: "Data to update cannot be empty" });
  }

  const id = req.params.id;
  userDB
    .findByIdAndUpdate(id, req.body, { userFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: `Cannot update user with ${id}, maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error update user info" });
    });
};

// delete user by id
exports.delete = (req, res) => {
  const id = req.params.id;

  userDB
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `cannot delete with ${id}, maybe id is wrong` });
      } else {
        res.send({
          message: " user deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "caould not delete user with id:" + id,
      });
    });
};
