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

  const latitutudeLongitudeDefault = dataParams.latitudeLongitude.split(',')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => { 
    if (e.target.id === "Validate") {
      dispatch(setParams(dataTemp));
      setDataTemp(null)
    }
    setOpen(false);
  };

  const onChangeInput = (e) => {
    const data = dataTemp ? {...dataTemp} : {...dataParams};
    data[e.target.id] = e.target.value
    setDataTemp(data);
  };

  return (
    <>
      <div className="relative flex flex-wrap items-stretch">
        <span className="w-40 flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-2 py-[0.17rem] text-center text-sm font-normal leading-[1.5] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
          Latitude and longitude
        </span>
        <input
          type="text"
          aria-label="First name"
          defaultValue={latitutudeLongitudeDefault[0]}
          className="max-w-xs rounded-0 relative m-0 block w-[1px] min-w-0 flex-auto border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.17rem] text-sm font-normal leading-[1.5] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" />
          <input
            type="text"
            aria-label="Last name"
            defaultValue={latitutudeLongitudeDefault[1]}
            className="max-w-xs relative m-0 -ml-px block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.17rem] text-sm font-normal leading-[1.5] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" />
      </div>

      <div className="relative flex flex-wrap items-stretch pt-1">
        <span className="w-40 flex items-center whitespace-nowrap rounded-l border border-r-0 border-solid border-neutral-300 px-2 py-[0.17rem] text-center text-sm font-normal leading-[1.5] text-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200">
          date range
        </span>
        <input
          type="date"
          defaultValue={dataParams.startDate}
          className="max-w-xs rounded-0 relative m-0 block w-[1px] min-w-0 flex-auto border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.17rem] text-sm font-normal leading-[1.5] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" />
        <input
          type="date"
          defaultValue={dataParams.endDate}
          className="max-w-xs relative m-0 -ml-px block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.17rem] text-sm font-normal leading-[1.5] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" />
      </div>
    </>
  );
}
