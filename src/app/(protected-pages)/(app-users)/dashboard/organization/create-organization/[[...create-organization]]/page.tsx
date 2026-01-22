'use client';

import React from "react";
import {CreateOrganization} from "@clerk/nextjs";
import {Container} from "@/components/structural/container/Container";

function CreateOrganizationPage() {
    return (
        <Container className={"flex justify-center"}>
            <CreateOrganization
                afterCreateOrganizationUrl={"/dashboard/profile?registeredOrg=true"}
                skipInvitationScreen={false}
            />
        </Container>
    );
}

export default CreateOrganizationPage;