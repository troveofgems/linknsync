import React from "react";

function MainContainer({ children }: { children: React.ReactNode }) {
    return (
        <main>
            {children}
        </main>
    );
}

export default MainContainer;