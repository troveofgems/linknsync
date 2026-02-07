const PAGE_LABEL = "401: Forbidden!";

const
    pageLabel = PAGE_LABEL,
    pageKey = pageLabel.replaceAll(" ", "-").toLowerCase();

const CustomErrorPage = () => {
    return (
        <section key={pageKey} className={"mb-15"}>
            <h1 className={"flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl mb-8 text-red-700"}>
                {pageLabel}
            </h1>
            <div className={"min-h-85"}>
                <p className={"w-1/2 m-auto"}>
                    You have attempted to access a page or route that is not accessible to the public or intended for logged-in users
                </p>
                <p className={"w-1/2 m-auto text-center mt-8"}>
                    This attempt will be logged. Repeated attempts may result in an IP or User Account ban.
                </p>
            </div>
        </section>
    );
}

export default CustomErrorPage;