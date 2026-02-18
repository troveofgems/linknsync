"use client";
import React, {useState} from "react";
import "./Footer.scss";
import Link from "next/link";

import {APP_PATHS} from "@/utils/nav.path.utils";
import {ACTIVE_APP_VERSION} from "@/constants/SiteContent/app.constants";

import {DialogShell} from "@/components/dialogs/DialogShell";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge"

export const Footer = () => {
    const
        [openJobOpportunityDialog, setOpenJobOpportunityDialog] = useState(false),
        currentYear = new Date().getFullYear();

    const handleOpenDialog = (
        isOpen: boolean,
        setOpen:  React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setOpen(!isOpen);
    };

    const {
        goToHomepage,
        goToCustomer,
        goToAbout,
        goToContact,
        goToRoadmap,
        goToPricing,
        goToPrivacyPolicy,
        goToDataPolicy,
        goToTermsAndConditions,
        goToTechStack,
        goToTutorials,
    } = APP_PATHS.pages.general;

    return (
        <footer className="footer-20192">
            <div className="site-section">
                <div className="cta d-block d-md-flex align-items-center px-5">
                    <h2 className="mb-1 footerText">Are you hiring for a Software or Web Developer,</h2>
                    <p className="mb-1 footerText">Or do you have a community project idea you want to partner on?</p>
                    <div className="w-1/2 m-auto flex justify-center-safe">
                        <Button
                            className="button-87 overrideBtnPadding"
                            onClick={() => handleOpenDialog(openJobOpportunityDialog, setOpenJobOpportunityDialog)}
                            title={"Contact Dustin Greco"}
                        >
                            Contact me
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className={"mb-5"}>
                        <a href={goToHomepage.path as string} className="footer-logo">Link N&#39; Sync</a>
                        <p className="copyright">
                            &reg; <small>2025 - {currentYear}</small>
                        </p>
                        <Badge variant="destructive">{ACTIVE_APP_VERSION}</Badge>
                    </div>
                    <hr className={"footerHR"} />
                    <div className={"xl:flex"}>
                        <div className="xl:w-1/3 pb-5">
                            <h3 className={"footer-col-header"}>Customers</h3>
                            <ul className="flex flex-col items-center-safe links">
                                <Link href={goToCustomer.path as string} className={"footerLink py-2"}>
                                    {goToCustomer.label}
                                </Link>
                                <Link href={goToTutorials.path as string} className={"footerLink py-2"}>
                                    {goToTutorials.label}
                                </Link>
                            </ul>
                        </div>
                        <div className="xl:w-1/3 pb-5">
                            <h3 className={"footer-col-header"}>Company</h3>
                            <ul className="flex flex-col items-center-safe links">
                                <Link href={goToAbout.path as string} className={"footerLink py-2"}>
                                    {goToAbout.label}
                                </Link>
                                <Link href={goToContact.path as string} className={"footerLink py-2"}>
                                    {goToContact.label}
                                </Link>
                                <Link href={goToRoadmap.path as string} className={"footerLink py-2"}>
                                    {goToRoadmap.label}
                                </Link>
                                <Link href={goToPricing.path as string} className={"footerLink py-2"}>
                                    {goToPricing.label}
                                </Link>
                            </ul>
                        </div>
                        <div className="xl:w-1/3 pb-5">
                            <h3 className={"footer-col-header"}>Further Information</h3>
                            <ul className="flex flex-col items-center-safe links">
                                <Link href={goToTermsAndConditions.path as string} className={"footerLink py-2"}>
                                    {goToTermsAndConditions.label}
                                </Link>
                                <Link href={goToPrivacyPolicy.path as string} className={"footerLink py-2"}>
                                    {goToPrivacyPolicy.label}
                                </Link>
                                <Link href={goToDataPolicy.path as string} className={"footerLink py-2"}>
                                    {goToDataPolicy.label}
                                </Link>
                                <Link href={goToTechStack.path as string} className={"footerLink py-2"}>
                                    {goToTechStack.label}
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Dialog Layers */}
            <DialogShell
                options={{
                    implementJobOpportunityDialog: true,
                    openJobOpportunityDialog,
                    setOpenJobOpportunityDialog,
                }}
            />
        </footer>
    );
}

export default Footer;