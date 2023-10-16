import { configureStore, createSlice } from "@reduxjs/toolkit";

const date = new Date(Date.now());

const meteoHourlySlice = createSlice({
  name: "hourlyParams",
  initialState: { 
    latitudeLongitude: '45.5016889,-73.567256', 
    startDate: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate())).slice(-2)}`,
    endDate: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + (date.getDate() + 1)).slice(-2)}`
  },
  reducers: {
    setParams: (state, action) => {
      return action.payload;
    },
  },
});

export const { setParams } = meteoHourlySlice.actions;

export const store = configureStore({
  reducer: {
    hourlyParams: meteoHourlySlice.reducer,
  },
});
