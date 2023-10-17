export function LoadMeteoData({dataParams, getMeteoDatas, type}) {

    const meteoParams = {
      latitude: dataParams.latitudeLongitude.split(',').map(d => d.trim())[0],
      longitude: dataParams.latitudeLongitude.split(',').map(d => d.trim())[1]
    };

    if (type === 'archive') {
        meteoParams['timeZone'] = 'auto';
    }
    
    const datesInterval = {
      hourly: {
        start_date: dataParams.startDate,
        end_date: dataParams.endDate,
      },
    };
    
    return Promise.all([
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
    ]);
}