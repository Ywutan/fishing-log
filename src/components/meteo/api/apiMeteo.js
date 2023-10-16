//HOURLY

const getUrlEndPoint = (type) => {
    return type ? "https://archive-api.open-meteo.com/v1/era5?":"https://api.open-meteo.com/v1/forecast?";
}


const getUrl = (params) =>
  //"https://api.open-meteo.com/v1/forecast?" +
  getUrlEndPoint(params.timeZone) +
  "latitude=" +
  params.latitude +
  "&longitude=" +
  params.longitude +
  "&" +
  params.type +
  "=" +
  params.dataName +
  "&" +
  (params.datesInterval[params.type].start_date ? "start_date=" + params.datesInterval[params.type].start_date : "") +
  "&" +
  (params.datesInterval[params.type].end_date ? "end_date=" + params.datesInterval[params.type].end_date : "") +
  (params.timeZone ? "&timezone=" + params.timeZone : "");

export const getMeteoDatas = (params, nameParamType) => {

  const date = new Date(Date.now());

  return fetch(getUrl({ ...params, ...nameParamType }), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    return response.status !== 200
      ? Promise.reject(response.status + " " + response.url)
      : response.json();
  });
};
