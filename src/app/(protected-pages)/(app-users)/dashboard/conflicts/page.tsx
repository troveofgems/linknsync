'use client';
import React from "react";

import {Container} from "@/components/structural/container/Container";
import CollisionListTable from "@/components/tables/CollisionListTable";
import {SessionDataState, useUserStore} from "@/store/userStore";

const CollisionDetectionPage = () => {
    const { user: { isLoading, isAuthenticated, attrs, error } } = useUserStore();
    return (
        <Container>
            <h1 className={"text-2xl"}>Calendar Conflict Detection</h1>
            <p className={"text-muted-foreground my-2"}>
                Conflicts Are Resolved Outside of the Application.
            </p>
            <p className={"text-muted-foreground my-4"}>
                The PLA and ALA must coordinate a resolution within their own ical files. Once resolved,
                the service that detects conflicts will remove the list items shown by the application within the next
                hour.
            </p>
            {
                !isLoading &&
                isAuthenticated && (
                    <CollisionListTable user={attrs as SessionDataState} />
                )
            }
            {
                !!error && (
                    <div>Error Loading Section: {JSON.stringify(error)}</div>
                )
            }
        </Container>
    );
};

export default CollisionDetectionPage;


