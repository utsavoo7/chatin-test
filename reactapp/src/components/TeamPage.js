import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function TeamPage() {
  const navigate = useNavigate();

  const [team1, setTeam1] = useState("");

  const [point1, setPoint1] = useState("");

  const [team2, setTeam2] = useState("");

  const [point2, setPoint2] = useState("");

  const [rowData, setRowData] = useState([]);

  const onChangeTeamName = (e) => {
    if (e.target.name === "team1") {
      setTeam1(e.target.value);
    } else {
      setTeam2(e.target.value);
    }
  };

  const onChnageTeamPoints = (e) => {
    console.log(e.target.name, e.target.value);
    if (e.target.name === "point1") {
      setPoint1(e.target.value);
    } else {
      setPoint2(e.target.value);
    }
  };

  const onSubmitData = () => {
    var data = [
      { team: team1, points: point1 },
      { team: team2, points: point2 },
    ];
    const url = "http://localhost:5000/api/league/add-team";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: data }),
    }).then((res) => {
      onClickAllTeams();
      if (res.ok) {
        res.json().then((val) => {});
      } else {
        res.json().then((err) => {
          console.log(err);
        });
      }
    });
  };

  const onClickAllTeams = () => {
    const url = "http://localhost:5000/api/league/get-all-teams";
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((val) => {
          console.log(val);
          setRowData(val);
        });
      } else {
        res.json().then((err) => {
          console.log(err);
        });
      }
    });
  };

  useEffect(() => {
    onClickAllTeams();
  }, []);

  return (
    <Grid
      container
      p={5}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      height={"100vh"}
    >
      <Grid item xs={5} container spacing={3}>
        <Grid item xs={12}>
          <Typography fontWeight={600} fontSize={20}>
            Enter Team Details
          </Typography>
        </Grid>
        <Grid item xs={12} spacing={2}>
          <FormControl
            fullWidth
            style={{
              margin: "10px 0",
            }}
          >
            <TextField
              name="team1"
              label="Team 1 "
              type="text"
              onChange={onChangeTeamName}
            />
          </FormControl>
          <FormControl
            fullWidth
            style={{
              margin: "10px 0",
            }}
          >
            <TextField
              name="point1"
              label="Team 1 Point"
              onChange={onChnageTeamPoints}
              type="number"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} spacing={2}>
          <FormControl
            fullWidth
            style={{
              margin: "10px 0",
            }}
          >
            <TextField
              name="team2"
              label="Team 2"
              type="text"
              onChange={onChangeTeamName}
            />
          </FormControl>
          <FormControl
            fullWidth
            style={{
              margin: "10px 0",
            }}
          >
            <TextField
              name="point"
              label="Team 2 Point"
              onChange={onChnageTeamPoints}
              type="number"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} gap={2} display={"flex"} justifyContent={"center"}>
          <Button variant="outlined" onClick={onSubmitData}>
            Submit Data
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={5} container>
        <Grid item xs={12}>
          <Typography fontWeight={600} fontSize={20}>
            Team List
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            overflow: "auto",
            height: "calc(100vh - 110px)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                style={{
                  position: "sticky",
                  top: 0,
                }}
              >
                <TableCell
                  style={{
                    color: "#ffffff",
                    background: "#000000",
                  }}
                >
                  Team Name
                </TableCell>
                <TableCell
                  style={{
                    color: "#ffffff",
                    background: "#000000",
                  }}
                >
                  Rank
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData &&
                rowData.map((item, index) => (
                  <TableRow>
                    <TableCell>{item.team}</TableCell>
                    <TableCell>{item.points}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>

      <Button
        onClick={() => {
          navigate("/");
        }}
        style={{
          top: 2,
          right: 2,
          position: "absolute",
        }}
        variant="contained"
      >
        Logout
      </Button>
    </Grid>
  );
}

export default TeamPage;
