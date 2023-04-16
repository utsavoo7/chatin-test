import {
  FormControl,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { setShowAlert } = useContext(AppContext);

  const [pathName, setPathName] = useState("login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log(window.location.pathname.split("/")[1]);
    if (window.location.pathname.split("/")[1] === "register") {
      setPathName("Registration");
    } else {
      setPathName("Login");
    }
  }, []);

  const onSubmitClick = () => {
    var url = "";
    var payload = { username: formData.username, password: formData.password };
    if (pathName === "Login") {
      url = "http://localhost:5000/api/auth/login";
    } else {
      url = "http://localhost:5000/api/auth/signup";
    }

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        res.json().then((val) => {
          console.log(val.info);
          setShowAlert({
            show: true,
            message: "Successfully Login :)",
            type: "success",
          });
        });
        navigate("/league");
      } else {
        res.json().then((err) => {
          console.log(err);
          setShowAlert({
            show: true,
            message: err.error,
            type: "error",
          });
        });
      }
    });
  };

  return (
    <Grid
      container
      alignItems={"center"}
      justifyItems={"center"}
      display={"flex"}
      p={5}
      height={"100vh"}
    >
      <Grid
        container
        alignItems={"center"}
        justifyItems={"center"}
        display={"flex"}
        p={5}
        spacing={2}
        style={{
          boxShadow: "0 0 13px 0px #00000033",
          borderRadius: 10,
        }}
      >
        <Grid item xs={12}>
          <Typography fontWeight={600} fontSize={30}>
            {pathName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              placeholder="Enter UserName"
              type="text"
              name="username"
              label="Username"
              required
              onChange={(event) => {
                setFormData({
                  ...formData,
                  username: event.target.value,
                });
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              placeholder="Enter Password"
              required
              type="password"
              name="password"
              label="Password"
              onChange={(event) => {
                setFormData({
                  ...formData,
                  password: event.target.value,
                });
              }}
            />
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          alignItems={"center"}
          justifyItems={"center"}
          display={"flex"}
          flexDirection={"column"}
          gap="8px"
        >
          <Button variant="contained" onClick={onSubmitClick}>
            {pathName}
          </Button>
          {pathName === "Login" ? (
            <p>
              Not a user? <a href="/register">Register</a>
            </p>
          ) : (
            <p>
              Not a user? <a href="/">Login</a>
            </p>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
