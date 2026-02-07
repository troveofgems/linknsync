'use client';

function Error({error}: { error: Error }) {
    return (
        <>
            <div className={"w-full text-center h-125"}>
                <h2 className={"text-2xl"}>An Error Has Occurred Within The Application</h2>
                <p className={"text-red-500 py-8"}>{error.name}</p>
                <p className={"text-red-500"}>{error.message}</p>
                {
                    process.env.NOD_ENV === "development" && (
                        <p className={"text-red-500 p-8"}>{error.stack}</p>
                    )
                }
            </div>
        </>
    );
}

export default Error;