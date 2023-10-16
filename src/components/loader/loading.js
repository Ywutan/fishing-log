import { useEffect } from "react";

const componentInit = () => {
    import("tw-elements")
    .then(
        (elements) => {
            const { LoadingManagement, initTE } = elements;
            initTE({ LoadingManagement });
        }
    );
};

function Loading() {

    useEffect(() => {
        componentInit();
    }, []);

    return (
        <>
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
            </div>
            <div>
            <span>Loading...</span>
            </div>
        </>
    );
}

export default Loading;