"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
//import { useRouter } from 'next/router';

function NavList({children}) {

    const router = useRouter();

    const componentInit = () => {
        import("tw-elements")
        .then(
            (elements) => {
                const { Sidenav, Ripple, initTE } = elements;
                initTE({ Sidenav, Ripple});
                const sidenav = document.getElementById("full-screen-example");
                const sidenavInstance = Sidenav.getInstance(sidenav);
                let innerWidth = null;
                const setMode = (e) => {
                  // Check necessary for Android devices
                  if (window.innerWidth === innerWidth) {
                    return;
                  }
                
                  innerWidth = window.innerWidth;
                
                  if (window.innerWidth < sidenavInstance.getBreakpoint("sm")) {
                    sidenavInstance.changeMode("over");
                    sidenavInstance.hide();
                  } else {
                    sidenavInstance.changeMode("side");
                    sidenavInstance.show();
                  }
                };
                
                if (window.innerWidth < sidenavInstance.getBreakpoint("sm")) {
                  setMode();
                }
                
                // Event listeners
                window.addEventListener("resize", setMode);
            }
        );
    }

    useEffect(() => {
        componentInit();
    }, []);

    return (
        <>

        <nav
            id="full-screen-example"
            className="fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 md:data-[te-sidenav-hidden='false']:translate-x-0"
            data-te-sidenav-init
            data-te-sidenav-mode-breakpoint-over="0"
            data-te-sidenav-mode-breakpoint-side="sm"
            data-te-sidenav-hidden="false"
            data-te-sidenav-color="dark"
            data-te-sidenav-content="#content"
            data-te-sidenav-scroll-container="#scrollContainer">
            <div className="pt-6">
            <div id="header-content" className="pl-4">
            
            {/*
            <img
                src=""
                alt="Avatar"
                className="mb-4 h-auto rounded-full align-middle"
                style={{maxWidth: "50px"}} />
            */}

            <h4 className="mb-2 text-2xl font-medium leading-[1.2]">John Doe</h4>
            <p className="mb-4">John_Doe@JohnDoe.com</p>
            </div>
            <hr className="border-gray-300" />
            </div>
            <div id="scrollContainer">
                <ul
                    className="relative m-0 list-none px-[0.2rem]"
                    data-te-sidenav-menu-ref>
                    <li  className="relative">
                        <a
                            className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-gray-300/30 hover:text-inherit hover:outline-none focus:bg-gray-300/30 focus:text-inherit focus:outline-none active:bg-gray-300/30 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            data-te-sidenav-link-ref>
                        <span>Weather</span>
                        <span
                            className="absolute right-0 ml-auto mr-[0.8rem] rotate-180 transition-all duration-300 ease-linear motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 dark:[&>svg]:fill-gray-300"
                            data-te-sidenav-rotate-icon-ref>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                        <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                        </svg>
                        </span>
                        </a>
                        <ul
                            className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
                            data-te-sidenav-collapse-ref
                            data-te-collapse-show>
                            <li  className="relative">
                                <a
                                    onClick={()=>{router.push("/weather/forecast")}}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-gray-300/30 hover:text-inherit hover:outline-none focus:bg-gray-300/30 focus:text-inherit focus:outline-none active:bg-gray-300/30 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                    data-te-sidenav-link-ref>
                                    Forecast
                                </a>
                            </li>
                            <li  className="relative">
                                <a
                                    onClick={()=>{router.push("/weather/history")}}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-gray-300/30 hover:text-inherit hover:outline-none focus:bg-gray-300/30 focus:text-inherit focus:outline-none active:bg-gray-300/30 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                                    data-te-sidenav-link-ref>
                                    History
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li  className="relative">
                        <a
                            className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-gray-300/30 hover:text-inherit hover:outline-none focus:bg-gray-300/30 focus:text-inherit focus:outline-none active:bg-gray-300/30 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            href="#!"
                            data-te-sidenav-link-ref>
                            <span>Logs</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        <div className="min-h-screen w-full bg-gray-50 !pl-0 text-center sm:!pl-60" id="content">
        <div className="py-12 text-center">
        <h3 className="my-12 text-[1.75rem] font-medium leading-[1.2]">
            Resize to change the mode
        </h3>
            {children}
        <button 
            id="toggler" 
            className="m-12 inline-block rounded bg-zinc-800 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-900 active:shadow-lg sm:hidden"
            data-te-sidenav-toggle-ref
            data-te-target="#full-screen-example"
            data-te-ripple-init
            data-te-ripple-color="white">
        <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5">
            <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd" />
          </svg>
        </span>
        </button>
        </div>
        </div>

        </>
    );
}


export default NavList;