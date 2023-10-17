import { configureStore, createSlice } from "@reduxjs/toolkit";

const date = new Date(Date.now());

const meteoForecastHourlySlice = createSlice({
  name: "hourlyParamsForecast",
  initialState: { 
    latitudeLongitude: '45.5016889,-73.567256', 
    startDate: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate())).slice(-2)}`,
    endDate: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate() + 1)).slice(-2)}`
  },
  reducers: {
    setParamsForecast: (state, action) => {
      return action.payload;
    }
  },
});

const meteoArchiveHourlySlice = createSlice({
  name: "hourlyParamsArchive",
  initialState: { 
    latitudeLongitude: '45.5016889,-73.567256', 
    startDate: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate())).slice(-2)}`,
    endDate: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate() + 1)).slice(-2)}`
  },
  reducers: {
    setParamsArchive: (state, action) => {
      return action.payload;
    },
  },
});

export const { setParamsForecast } = meteoForecastHourlySlice.actions;
export const { setParamsArchive } = meteoArchiveHourlySlice.actions;

export const store = configureStore({
  reducer: {
    hourlyParamsForecast: meteoForecastHourlySlice.reducer,
    hourlyParamsArchive: meteoArchiveHourlySlice.reducer
  },
});
