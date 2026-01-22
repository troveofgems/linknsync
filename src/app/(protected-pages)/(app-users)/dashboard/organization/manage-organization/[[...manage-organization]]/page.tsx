"use client";
import {OrganizationProfile} from "@clerk/nextjs";
import {Container} from "@/components/structural/container/Container";
import React from "react";
import {useUserStore} from "@/store/userStore";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";


function TeamManagementPage() {
    const { user: { isLoading, attrs } } = useUserStore();
    return (
      <Container className={"flex justify-center w-3/4"}>
          <div className={"background relative"}>
              <div className={`background shape manageOrg_shape_style`}></div>
              <div className={`background shape manageOrg_shape_style`}></div>
          </div>
          {
              isLoading ?
                  <LoaderSkeleton loadingMessage={"Loading Organization Profile!"} additionalClassNames={""} /> :
                  attrs?.loggedInUser?.orgRole === "IND" ?
                      (<>Ind Users Do Not Get Org Profiles</>) :
                      <OrganizationProfile />
          }

      </Container>
    );
}

export default TeamManagementPage;

/*

/dashboard/organization/manage-organization
*/
