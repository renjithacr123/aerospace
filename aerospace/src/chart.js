import React, { useState, useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { Line } from "react-chartjs-2";
import { Button } from "@material-ui/core";
import Chart from "chart.js/auto";

function LineChart() {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl] = useState(
    "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS"
  );
  const [velocityData, setVelocityData] = useState({
    labels: ["Velocity"],
    datasets: [],
  });
  const [temperatureData, setTemperatureData] = useState({
    labels: ["Temperature"],
    datasets: [],
  });
  const [altitudeData, setAltitudeData] = useState({
    labels: ["Altitude"],
    datasets: [],
  });
  const [isActionRequired, updateActionRequired] = useState(false);
  const [statusMessage, updateStatusMessage] = useState(null);
  const { lastMessage } = useWebSocket(socketUrl);

  const chartRef = useRef(null);

  const actOnSpectrum = () => {
    fetch(
      "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum",
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const updateVelocity = (currentVelocity) => {
      let datasets = [
        {
          id: 1,
          label: "Velocity",
          data: [currentVelocity],
        },
      ];
      setVelocityData({
        ...velocityData,
        datasets: datasets,
      });
    };
    const updateAltitude = (currentAltitude) => {
      let datasets1 = [
        {
          id: 1,
          label: "Altitude",
          data: [currentAltitude],
        },
      ];
      setAltitudeData({
        ...altitudeData,
        datasets: datasets1,
      });
    };
    const updateTemperature = (currentTemperature) => {
      let datasets2 = [
        {
          id: 1,
          label: "Temperature",
          data: [currentTemperature],
        },
      ];
      setTemperatureData({
        ...temperatureData,
        datasets: datasets2,
      });
    };

    if (lastMessage !== null) {
      const currentData = JSON.parse(lastMessage.data);
      updateVelocity(currentData.Velocity);
      updateAltitude(currentData.Altitude);
      updateTemperature(currentData.Temperature);
      updateActionRequired(currentData.IsActionRequired);
      updateStatusMessage(currentData.StatusMessage);
    }
  }, [lastMessage]);

  return (
    <div className="container">
      <h1>
        <label className="title1 align-center"> Live Data</label>
      </h1>
      <table>
        {isActionRequired && (
          <tr>
            <td>
              <div className="message-div">
                <td>
                  <label className="action-message">Action Required</label>
                </td>
                <td>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        actOnSpectrum();
                      }}
                    >
                      Act On Spectrum
                    </Button>
                  </div>
                </td>
                <div>
                  <label className="message-label"> Message - </label>
                  <label className="message">{statusMessage}</label>
                </div>
              </div>
            </td>
          </tr>
        )}
        <tr>
          <td>
            <Line ref={chartRef} data={velocityData} />
          </td>
          <td>
            <Line ref={chartRef} data={altitudeData} />
          </td>
          <td>
            <Line ref={chartRef} data={temperatureData} />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default LineChart;
