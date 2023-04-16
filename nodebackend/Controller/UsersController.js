const { UserModel, PointsModel } = require("../Models/UsersModel");

const register = (req, res, next) => {
  const { username, password } = JSON.parse(JSON.stringify(req.body));

  if (!(username && password)) {
    return res.status(401).send({
      Username: "This field is required!",
      Password: "This field is required!",
    });
  }

  UserModel.searchUser({ username })
    .then((user) => {
      if (user) {
        return res.status(400).send({
          error: "User with same username already exists!",
        });
      }

      const newUser = { username, password };

      UserModel.addNewUser(newUser)
        .then((createdUser) => {
          return res.status(201).send({ info: createdUser });
        })
        .catch((error) => {
          return res.status(400).send({
            error: "Unable to create user!",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        error: "Unable to verify user with username!",
      });
    });
};

const getCurrentUser = (req, res, next) => {
  const username = req.session.user.username;
  console.log(username);
  UserModel.searchUser({ username }).then((user) => {
    if (user) {
      console.log(user);
      return res.status(200).send({ user });
    } else {
      return res
        .status(400)
        .send({ Error: "Invalid Request please try again." });
    }
  });
};

const login = (req, res, next) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).send({
      Username: "Username is required!",
      Password: "Password is required!",
    });
  }

  UserModel.searchUser({ username, password })
    .then((user) => {
      if (user) {
        req.session.user = user;
        return res.status(200).send({
          info: "Login successfully!",
        });
      } else {
        return res.status(400).send({
          error: "Invalid Credintials used please try again or Signup again.",
        });
      }
    })
    .catch((error) => {
      console.log("catch : ", error);
      return res.status(400).send({
        error: "Login failed!",
      });
    });
};

const logoutUser = (req, res, next) => {
  req.session.user = null;
  return res.status(200).send({ Msg: "User logout Successfully" });
};

const getAllTeams = (req, res, next) => {
  PointsModel.getAllTeamsPoints()
    .then((val) => {
      return res.status(200).send(val);
    })
    .catch((error) => {
      return res.status(400).send({ error: error });
    });
};

const updateTeamPoints = (req, res, next) => {
  const { data } = req.body;

  data.map((val, key) => {
    const { team, points } = val;
    var newData = { team, points };
    PointsModel.searchTeam({ team })
      .then((response) => {
        if (response) {
          newData.points = response.points + 1;
          if (data[0].points === data[1].points) {
            PointsModel.updatePoints(team, newData).then((dat) => {
              if (dat) {
                console.log(dat);
              }
            });
          } else if (data[0].points > data[1].points) {
            PointsModel.updatePoints(data[0].team, {
              team: data[0].team,
              points: response.points + 3,
            }).then((dat) => {
              if (dat) {
                return res
                  .status(200)
                  .send(
                    "data 0 points is greater" +
                      data[0].points +
                      " " +
                      data[1].points
                  );
              } else {
                console.log("error while updating data");
              }
            });
          } else {
            PointsModel.updatePoints(data[1].team, {
              team: data[1].team,
              points: response.points + 3,
            }).then((dat) => {
              if (dat) {
                console.log(dat);
                return res
                  .status(200)
                  .send(
                    "data 1 points is greater " +
                      data[0].points +
                      " " +
                      data[1].points
                  );
              } else {
                console.log("error");
              }
            });
          }
        } else {
          if (data[0].points === data[1].points) {
            newData.points = 1;
          } else if (data[0].points > data[1].points) {
            if (key === 0) {
              newData.points = 3;
            } else {
              newData.points = 0;
            }
          } else {
            if (key === 1) {
              newData.points = 3;
            } else {
              newData.points = 0;
            }
          }
          PointsModel.addTeam(newData)
            .then((createdTeam) => {
              console.log(createdTeam);
            })
            .catch((error) => {
              return res.status(400).send({ error: error });
            });
        }
      })
      .catch((error) => {
        return res.status(400).send({ error: error });
      });
  });
  return res.status(200).send("data submitted successsfully");
};

module.exports = {
  login,
  register,
  getCurrentUser,
  logoutUser,
  getAllTeams,
  updateTeamPoints,
};
