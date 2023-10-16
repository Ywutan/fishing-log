import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParams } from "../store/store";


const componentInit = async () => {
  return import("tw-elements")
  .then(
      (elements) => {
          const { Datepicker, Input, initTE } = elements;
          initTE({ Datepicker, Input });
      }
  );
}


export default function RangeDatePicker({ setDataParams }) {

  const router = useRouter();
  const [data, setData] = useState(useSelector(state => state.hourlyParams));
  const [dataTemp, setDataTemp] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const dataParams = useSelector(state => state.hourlyParams);

  useEffect(() => {
    componentInit();
  }, []);

  const latitutudeLongitudeDefault = dataParams.latitudeLongitude.split(',');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const applyData = (e) => { 
    if (e.target.id === "Validate") {
      dataTemp ? dispatch(setParams(dataTemp)) : dispatch(setParams(dataParams));
      setDataTemp(null)
    }
    setOpen(false);
  };

  const onChangeInput = (e) => {
    const data = dataTemp ? {...dataTemp} : {...dataParams};
    if (e.target.id === 'latitude') {
      const latitudeLongitude = data.latitudeLongitude.split(',')
      latitudeLongitude[0] = e.target.value;
      data.latitudeLongitude = latitudeLongitude.join(',');
    } else if (e.target.id === 'longitude') {
      const latitudeLongitude = data.latitudeLongitude.split(',')
      latitudeLongitude[1] = e.target.value;
      data.latitudeLongitude = latitudeLongitude.join(',');
    } else {
      data[e.target.id] = e.target.value
    }

    setDataTemp(data);
  };

  return (
    <>
    <div className="flex">
      <div className="flex-1"></div>
      <div className="flex-auto">
        <div className="relative flex flex-wrap items-stretch">
        <span className="w-40 flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-2 py-[0.17rem] text-center text-sm font-normal leading-[1.5] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
          Latitude and longitude
        </span>
        <input
          id="latitude"
          onChange={onChangeInput}
          type="text"
          defaultValue={latitutudeLongitudeDefault[0]}
          className="max-w-xs rounded-0 relative m-0 block w-[1px] min-w-0 flex-auto border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.17rem] text-sm font-normal leading-[1.5] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" />
        <input
          id="longitude"
          onChange={onChangeInput}
          type="text"
          defaultValue={latitutudeLongitudeDefault[1]}
          className="max-w-xs relative m-0 -ml-px block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.17rem] text-sm font-normal leading-[1.5] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" />
        </div>
        <div className="relative flex flex-wrap items-stretch pt-1">
        <span className="w-40 flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-2 py-[0.17rem] text-center text-sm font-normal leading-[1.5] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
          date range
        </span>
        <input
          id="startDate"
          onChange={onChangeInput}
          type="date"
          defaultValue={dataParams.startDate}
          className="max-w-xs rounded-0 relative m-0 block w-[1px] min-w-0 flex-auto border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.17rem] text-sm font-normal leading-[1.5] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" />
        <input
          id="endDate"
          onChange={onChangeInput}
          type="date"
          defaultValue={dataParams.endDate}
          className="max-w-xs relative m-0 -ml-px block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.17rem] text-sm font-normal leading-[1.5] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" />
        </div>
      </div>
      <div className="flex flex-none">
          <div className="flex flex-col">
            <div className="flex-1"></div>
            <button
              id="Validate"
              onClick={applyData}
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              Apply
            </button>
            <div className="flex-1"></div>
          </div>
      </div>
      <div className="flex-1"></div>
    </div>
    </>
  );
}
