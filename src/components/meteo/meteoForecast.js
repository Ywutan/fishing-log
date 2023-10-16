"use client"
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import RangeDatePicker from "../form/rangeDatePicker";
import { getMeteoDatas } from "./api/apiMeteo";
import { useSelector } from "react-redux";
import Loading from "../loader/loading";

const options = {
  type: "line",
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        boxWidth: 20,
        generateLabels: (chartLine) => {
          return chartLine.data.datasets.map((d, i) => ({
            text: d.label,
            hidden: !chartLine.legend.chart.isDatasetVisible(i),
            strokeStyle: d.backgroundColor,
            fillStyle: d.backgroundColor,
            lineWidth: d.borderWidth,
            index: i,
            datasetIndex: i,
          }));
        },
      },
    },
    title: {
      display: true,
      text: "Weather Forecast Conditions Hourly",
    },
  },
  scales: {
    "cloud-axis": {
      type: "linear",
      stacked: false,
      position: "left",
      ticks: {
        callback: (value, index, ticks) => {
          return value + "";
        },
      },
      title: {
        display: true,
        text: "Cloud %",
      },
    },
    "wind-speed": {
      type: "linear",
      stacked: false,
      position: "right",
      ticks: {
        callback: (value, index, ticks) => {
          return value + "";
        },
      },
      title: {
        display: true,
        text: "Wind km/h",
      },
    },
    "atm-pression": {
      type: "linear",
      stacked: false,
      position: "right",
      ticks: {
        callback: (value, index, ticks) => {
          return value + "";
        },
      },
      title: {
        display: true,
        text: "Pressure hPa",
      },
    },
    temperature: {
      type: "linear",
      stacked: false,
      position: "left",
      title: {
        display: true,
        text: "Temperature •C",
      },
    },
    precipitation: {
      type: "linear",
      stacked: false,
      position: "right",
      title: {
        display: true,
        text: "precipitation mm",
      },
    },
  },
};

const mapData = (data) => {
  const dataMulti = data;

  const dataMultiKeys = [
    Object.keys(dataMulti[0])[1],
    Object.keys(dataMulti[1])[1],
    Object.keys(dataMulti[2])[1],
    Object.keys(dataMulti[3])[1],
    Object.keys(dataMulti[4])[1],
    Object.keys(dataMulti[5])[1],
    Object.keys(dataMulti[6])[1],
    Object.keys(dataMulti[7])[1],
  ];
  const labels = dataMulti[0]["time"].map((d) => {
    const date = new Date(d);
    return date.toDateString() + " " + date.getHours() + "H";
  });

  const dataLine = {
    labels,
    datasets: [
      {
        label: dataMultiKeys[0],
        data: dataMulti[0][dataMultiKeys[0]],
        borderColor: "Salmon",
        backgroundColor: "Salmon",
        borderWidth: 2,
        yAxisID: "temperature",
      },
      {
        type: "line",
        pointRadius: 0,
        label: dataMultiKeys[5],
        data: dataMulti[5][dataMultiKeys[5]],
        borderColor: "SteelBlue",
        backgroundColor: "SteelBlue",
        borderWidth: 1,
        yAxisID: "wind-speed",
        options: {
          y: {
            ticks: {
              callback: (value, index, ticks) => {
                return value + "zozo";
              },
            },
          },
        },
      },
      {
        type: "line",
        label: dataMultiKeys[6],
        data: dataMulti[6][dataMultiKeys[6]],
        borderColor: "DarkBlue",
        backgroundColor: "DarkBlue",
        borderWidth: 2,
        yAxisID: "wind-speed",
      },
      {
        type: "line",
        pointRadius: 0,
        label: dataMultiKeys[4],
        data: dataMulti[4][dataMultiKeys[4]],
        borderColor: "Gold",
        backgroundColor: "Gold",
        borderWidth: 2,
        yAxisID: "atm-pression",
      },
      {
        type: "line",
        pointRadius: 0,
        label: dataMultiKeys[2],
        data: dataMulti[2][dataMultiKeys[2]],
        borderColor: "SteelBlue",
        backgroundColor: "rgb(70, 130, 180, 0.3)",
        fill: true,
        borderWidth: 1,
        yAxisID: "precipitation",
      },
      {
        type: "line",
        fill: true,
        pointRadius: 0,
        label: dataMultiKeys[7],
        data: dataMulti[7][dataMultiKeys[7]],
        borderColor: "rgb(105, 105, 105, 0.6)",
        backgroundColor: "rgb(211, 211, 211, 0.6)", //"LightGrey",
        borderWidth: 1,
        yAxisID: "cloud-axis",
      },
    ],
  };

  return dataLine;
};

export default function MeteoForecast() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');
  const dataParams = useSelector(state => state.hourlyParams);

  const load = () => {
  
    const meteoParams = {
      latitude: dataParams.latitudeLongitude.split(',').map(d => d.trim())[0],
      longitude: dataParams.latitudeLongitude.split(',').map(d => d.trim())[1]
    };
  
    const datesInterval = {
      hourly: {
        start_date: dataParams.startDate,
        end_date: dataParams.endDate,
      },
    };
  
    setLoading(true);
  
    Promise.all([
      getMeteoDatas(meteoParams, {
        datesInterval,
        dataName: "apparent_temperature",
        type: "hourly",
      }), //hourly
      getMeteoDatas(meteoParams, {
        datesInterval,
        dataName: "temperature_2m",
        type: "hourly",
      }), //hourly
      getMeteoDatas(meteoParams, {
        datesInterval,
        dataName: "precipitation",
        type: "hourly",
      }), //hourly
      getMeteoDatas(meteoParams, {
        datesInterval,
        dataName: "pressure_msl",
        type: "hourly",
      }), //hourly
      getMeteoDatas(meteoParams, {
        datesInterval,
        dataName: "surface_pressure",
        type: "hourly",
      }), //hourly
      getMeteoDatas(meteoParams, {
        datesInterval,
        dataName: "windspeed_10m",
        type: "hourly",
      }), //hourly
      getMeteoDatas(meteoParams, {
        datesInterval,
        dataName: "windgusts_10m",
        type: "hourly",
      }), //hourly
      getMeteoDatas(meteoParams, {
        datesInterval,
        dataName: "cloudcover",
        type: "hourly",
      }), //hourly
    ])
      .then((response) => {
        setData(mapData(response.filter((d) => d.hourly).map((d) => d.hourly)));
        setLoading(false);
      })
      .catch((err) => {
        console.error("error status", err); // some coding error in handling happened
        setError("error status " + err);
      });
  }
  

  useEffect(() => {

    load();

  }, [dataParams]);

  if (isError) {
    return (
      <>
      <div>{dataParams.latitudeLongitude}</div>
      <div>{dataParams.startDate}</div>
      <div>{dataParams.endDate}</div>
      {isError}
      </>
    )
  }

  if (isLoading)
    return (
      <Loading/>
    );

  if (data)
    return (
      <>
        <RangeDatePicker />
        <Line options={options} data={data} />
      </>
    );
}
