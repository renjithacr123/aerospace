import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import "./style.scss";

function Home() {
  const [isFetching, setIsFetching] = useState(false);
  const [velocity, setVelocity] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [message, setMessage] = useState(null);
  const [ascending, setAscending] = useState(null);
  const [actionRequired, setActionRequired] = useState(null);

  const fetchData = () => {
    fetch(
      "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setIsFetching(true);
        setVelocity(data["velocity"]);
        setAltitude(data["altitude"]);
        setTemperature(data["temperature"]);
        setMessage(data["statusMessage"]);
        setAscending(data["isAscending"]);
        setActionRequired(data["isActionRequired"]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!isFetching) {
      setIsFetching(true);
      fetchData();
    }
  }, [isFetching]);

  return (
    <div>
      <h1 className="align-center">
        <label className="title1">isar</label>{" "}
        <label className="title2"> aerospace</label>
      </h1>
      <div className="container">
        <table>
          <th>Velocity</th>
          <th>Altitude</th>
          <th>Temperature</th>
          <th>Ascending</th>
          <th>Action Required</th>
          <tr>
            <td>
              <TextField
                className="textBoxColour"
                id="velocity"
                variant="filled"
                value={velocity}
                size="small"
                InputProps={{ readOnly: true }}
                color="secondary"
              />
            </td>
            <td>
              <TextField
                className="textBoxColour"
                id="altitude"
                variant="filled"
                value={altitude}
                size="small"
                InputProps={{ readOnly: true }}
                color="secondary"
              />
            </td>
            <td>
              <TextField
                className="textBoxColour"
                id="temperature"
                variant="filled"
                value={temperature}
                size="small"
                InputProps={{ readOnly: true }}
                color="secondary"
              />
            </td>

            <td>
              <TextField
                className="textBoxColour"
                id="ascending"
                variant="filled"
                value={ascending ? "Yes" : "No"}
                size="small"
                InputProps={{ readOnly: true }}
                color="secondary"
              />
            </td>
            <td>
              <TextField
                id="action"
                variant="filled"
                value={actionRequired ? "Yes" : "No"}
                className={
                  actionRequired ? "textBoxColour error" : "textBoxColour"
                }
                size="small"
                InputProps={{ readOnly: true }}
                color="secondary"
              />
            </td>
          </tr>
        </table>
        <div className="message-div">
          <label className="message-label">Status Message - </label>
          <label className="message">{message}</label>
        </div>
        <div className="update-button">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              fetchData();
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Home;
