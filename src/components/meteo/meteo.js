"use client"
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import RangeDatePicker from "../form/rangeDatePicker";
import { getMeteoDatas } from "./api/apiMeteo";
import { useSelector } from "react-redux";
import Loading from "../loader/loading";
import { LoadMeteoData } from "./loadMeteoData";
import { MapData, optionsLineChart } from "./mapData";

export default function Meteo({type}) {

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');
  const dataParams = useSelector(state => state.hourlyParams);
  

  useEffect(() => {

    setLoading(true);
    LoadMeteoData({dataParams, getMeteoDatas, type})
    .then((response) => {
      const data = response.filter((d) => d.hourly).map((d) => d.hourly);
      setData(MapData({data}));
      setLoading(false);
    })
    .catch((err) => {
      console.error("error status", err); // some coding error in handling happened
      setError("error status " + err);
    });

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
        <Line options={optionsLineChart} data={data} />
      </>
    );
}
