"use client";
import "./CreateProperty.Form.scss";
import React, {useActionState, useEffect, useState} from "react";
import {useFormStatus} from "react-dom";
import {useParams, useRouter} from "next/navigation";

// Session State Type
import {SessionDataState} from "@/store/userStore";

// Components
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";

// Actions, Hooks, Utils
import {FormErrorMessage} from "@/components/forms/property/elements/FormErrorMessage";
import {Alert} from "@/components/misc/Sonner.Alerter";
import {updatePropertyAction, UpdatePropertyActionState} from "@/actions/property/update.action";
import {fetchPropertyByIdAction, ReadPropertyActionState, ReadPropertyByIdParams} from "@/actions/property/read.action";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {Card, CardContent} from "@/components/ui/card";
import {PictureWrapper} from "@/components/structural/picture/Picture.Wrapper";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import {
    getAddSecondLineLabelForCountry, getCityLabelForCountry, getCityNotListedLabelForCountry,
    getCountryLabelForCountry,
    getPostalCodeLabelForCountry, getStateLabelForCountry, getStreet1LabelForCountry, getStreet2LabelForCountry,
    SupportedCountries
} from "@/lib/utils/Address/address.utils";

import {useAddress, UserInputAddress} from "@/hooks/ProtoAddress/useAddress";
import {useFileToBase64, useImageUploader} from "@/hooks/ProtoImage/useImage";
import {ArchivePropertyActionComponent} from "@/components/property/Danger/Archive.Property.Action.Component";
import {BorderedPanel} from "@/components/forms/_elements/BorderedPanel/BorderedPanel";
import {ServicerOptions} from "@/components/property/Servicers/ServicerOptions";
import {APP_PATHS} from "@/utils/nav.path.utils";

interface PropertyToUpdate {
    Photo: {
        id: string; title: string; width: string; height: string; thumbnailUrl: string; srcUrl: string;
    } | undefined;
    id: string;
    archived: boolean;
    archivedAt: Date;
    trackUnitId?: string;
    Address: {
        street: string;
        street2: string;
        street3: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        isMUA: boolean;
    };
    AttachedPMS: {
      pmsList: string[];
      foreignIdList: string[];
    };
    Calendar: {
        id: string;
        icalSources: {
            UserImprint: {
                fullName: string;
                appRole: string;
            },
            dateBlockConflicts: object[];
            dateBlocks: object[];
            icalUrl: string;
            importType: string;
        }[];
        CronService: {
            id: string;
            calendarId: string;
            propertyId: string;
            coid: string;
            icalFileUploadLimit: string;
            scheduleType: string;
            lastRun: Date;
            nextRun: Date;
            status: string;
        };
    },
    cid: string;
    coid: string;
    homepageLink: string;
    homepageLinkHash: null;
    name: string;
    nameHash: null;
    thumbnail: string;
    thumbnailHash: null;
    createdAt: Date;
    updatedAt: Date;
}

export const UpdatePropertyForm = (
    {
        user
    } : {
        user: SessionDataState
    }) => {
    const
        baseKey = "updatePropertyForm_",
        router = useRouter(),
        { pid } = useParams(),
        [isLoading, setIsLoading] = useState(true),
        [property, setProperty] = useState<PropertyToUpdate | null>(null),
        { address,
            handleAddressChange, handleAddressPrefillWithData,
            handleMUAClick, handleLocationNotListedClick,
            handleCityChange, handleParishChange,
            handleCountryChange, handleStateChange
        } = useAddress(),
        {
            handleImagePrefillWithData
        } = useImageUploader(),
        {
            base64String, convertFileToBase64, isLoading: isLoadingImage, error
        } = useFileToBase64(),
        [state, action, isPending] = useActionState(
            updatePropertyAction,
            {
                pState: user,
                pid: pid,
                nonce: Buffer.from(crypto.randomUUID()).toString("base64"),
            } as UpdatePropertyActionState,
        );

    useEffect(() => {
        if(isLoading && property === null && !isPending) {
            fetchPropertyByIdAction(
                { pState: user } as ReadPropertyActionState,
                {
                    propertyId: pid,
                    user
                } as ReadPropertyByIdParams
            ).then(result => {
                const {response: { propertyById } } = result;
                setProperty(propertyById as unknown as PropertyToUpdate);
                handleAddressPrefillWithData(propertyById?.Address as UserInputAddress);
                handleImagePrefillWithData({
                    imageData: propertyById?.Photo?.thumbnailUrl as string,
                    showPlaceholder: false
                });
                setIsLoading(false);
            });
        }
        if(!!state && !isPending) {
            if(state.message === "Property Successfully Updated!") {
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
                return router.push(APP_PATHS.pages.authenticated.user.goToProperty.list.path as string);
            }
        }
    }, [
        state, isPending, router, isLoading, property, pid, base64String, error, isLoadingImage,
        user,
        handleAddressChange, handleAddressPrefillWithData, handleImagePrefillWithData,
    ]);

    return (
        <form action={action} nonce={state.nonce}>
            <div className={"flex flex-row justify-between"}>
                <div className={"w-10/12"}>
                    <BorderedPanel
                        divKey={baseKey + "connectToServicer"}
                        title={"PMS Connections"}
                    >
                        {
                            (
                                !!property && !isLoading
                            ) && (
                                <ServicerOptions
                                    connected={property.AttachedPMS !== null}
                                    unitId={property?.trackUnitId as string ?? undefined}
                                />
                            )
                        }
                    </BorderedPanel>
                </div>
                <div className={"w-2/12"}></div>
                <div className={"w-10/12"}>
                    <BorderedPanel
                        divKey={baseKey + "dangerActions"}
                        title={"Danger Zone"}
                        titleClasses={"font-extrabold text-4xl my-8 text-red-800"}
                    >
                        {
                            (
                                !!property && !isLoading
                            ) && (
                                <ArchivePropertyActionComponent
                                    markedAsArchived={property?.archived}
                                    archivalDate={property?.archivedAt}
                                    showPreviousArchival={property?.archived}
                                />
                            )
                        }
                    </BorderedPanel>
                </div>
            </div>
            <h2 className={"text-1xl font-semibold capitalize mt-12"}>Property</h2>
            <DropdownMenuSeparator />
            {
                (isLoading && !property) && (
                    <LoaderSkeleton loadingMessage={"Loading Property Data..."} additionalClassNames={""} />
                )
            }
            {
                (!!property && !isLoading) && (
                    <div className={"flex"}>
                        <div className={"w-1/2 p-4 hidden lg:block"}>
                            <Card className={"w-3/4 alignContentCenter"} >
                                <CardContent>
                                    <PictureWrapper
                                        photo={
                                            (!!base64String && base64String.length > 0) ? {
                                                    thumbnailUrl: base64String,
                                                    width: "250",
                                                    height: "250",
                                                    title: "Uploaded Photo"
                                                } :
                                                !!property.Photo ? {
                                                    thumbnailUrl: (property.Photo?.srcUrl ?? property.Photo.thumbnailUrl),
                                                    width: property.Photo.width,
                                                    height: property.Photo.height,
                                                    title: property.Photo.title
                                        } : undefined
                                    }
                                    />
                                </CardContent>
                            </Card>
                        </div>
                        <div className={"w-1/2"}>
                            <GenericTextInput
                                setAsInputTextField={true}
                                label={"Name"}
                                defaultValue={`${property.name}`}
                                showAsRequired={true}
                                placeholder={"ToGA Villa"}
                                name={"property.name"}
                                id={"property.name"}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput"}
                                readOnly={false}
                                fieldErrorMessage={state?.errors?.name?.join("\n") || undefined}
                            />
                            <GenericTextInput
                                setAsInputTextField={true}
                                label={"Link to Homepage"}
                                showAsRequired={false}
                                placeholder={"https://pm.thetroveofgems.tech/property-homepage"}
                                name={"property.homepageLink"}
                                id={"property.homepageLink"}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput"}
                                fieldErrorMessage={state?.errors?.homepageLink?.join("\n") || undefined}
                            />
                            <GenericTextInput
                                setAsFileUpload={true}
                                label={"Image Upload"}
                                showAsRequired={false}
                                name={"property.thumbnail"}
                                id={"property.thumbnail"}
                                value={""}
                                handleOnChange={(event: { target: { files: File[]; }; }) => convertFileToBase64(event.target.files?.[0])}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput uploadFit"}
                                fieldErrorMessage={(error?.name?.join("\n") ?? undefined)}
                            />
                            <GenericTextInput
                                setAsInputTextField={true}
                                label={"Image Base 64"}
                                showAsRequired={false}
                                name={"property.base64"}
                                id={"property.base64"}
                                defaultValue={base64String as string}
                                containerClassnames={"mt-8 hidden"}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput uploadFit"}
                            />
                        </div>
                    </div>
                )
            }
            <div className={"my-8"} />
            <h2 className={"text-1xl font-semibold capitalize"}>Address</h2>
            <DropdownMenuSeparator />
            {
                (isLoading && !property) && (
                    <LoaderSkeleton loadingMessage={"Loading Address Data..."} additionalClassNames={""} />
                )
            }
            {
                (!!property && !isLoading) && (
                    <div className={"flex"}>
                        <div className={"w-1/2"}>
                            <GenericTextInput
                                setAsCheckbox={true}
                                showAsRequired={false}
                                id={"address.isMUA"}
                                name={"address.isMUA"}
                                defaultChecked={property?.Address?.isMUA}
                                handleOnClick={handleMUAClick}
                                containerClassnames={"multiUnitBlock"}
                                labelClassnames={"formLabel formCheckboxLabel"}
                                inputFieldClassnames={"formInput formCheckbox"}
                                label={getAddSecondLineLabelForCountry(
                                    { country: property.Address.country as SupportedCountries }
                                )}
                            />
                            <GenericTextInput
                                setAsDropdown={true}
                                id={"address.country"}
                                name={"address.country"}
                                label={getCountryLabelForCountry({
                                    country: property.Address.country as SupportedCountries
                                })}
                                showAsRequired={true}
                                optionList={address.defaults.supportedCountries as { name: string; value: string; }[]}
                                value={address.userInputs.country ?? address.defaults.country}
                                handleOnChange={handleCountryChange}
                                containerClassnames={"w-fit"}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput"}
                            />
                        </div>
                        <div className={"w-1/2"}>
                            <GenericTextInput
                                setAsInputTextField={true}
                                label={getStreet1LabelForCountry({
                                    country: property.Address.country as SupportedCountries
                                })}
                                showAsRequired={true}
                                placeholder={""}
                                name={"address.street"}
                                id={"address.street"}
                                defaultValue={address.userInputs.street || address.defaults.street}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput"}
                                fieldErrorMessage={state?.errors?.street?.join("\n") ?? undefined}
                            />
                            {
                                (address.userInputs.isMUA || address.defaults.isMUA) && (
                                    <GenericTextInput
                                        setAsInputTextField={true}
                                        label={getStreet2LabelForCountry({
                                            country: property.Address.country as SupportedCountries
                                        })}
                                        showAsRequired={true}
                                        placeholder={("Address 2")}
                                        id={"address.street2"}
                                        name={"address.street2"}
                                        defaultValue={(address.userInputs.street2 ?? address.defaults.street2) as string}
                                        labelClassnames={"formLabel"}
                                        inputFieldClassnames={"formInput"}
                                        fieldErrorMessage={state?.errors?.street2?.join("\n") ?? undefined}
                                    />
                                )
                            }
                            {
                                address.userInputs.country === "MEX" && (
                                    <GenericTextInput
                                        setAsInputTextField={true}
                                        label={"Colonia"}
                                        showAsRequired={false}
                                        placeholder={""}
                                        name={"address.street3"}
                                        id={"address.street3"}
                                        defaultValue={(address.userInputs.street3 ?? address.defaults.street3) as string}
                                        labelClassnames={"formLabel"}
                                        inputFieldClassnames={"formInput"}
                                        fieldErrorMessage={state?.errors?.street3?.join("\n") ?? undefined}
                                    />
                                )
                            }
                            <GenericTextInput
                                setAsDropdown={true}
                                label={getStateLabelForCountry({
                                    country: property.Address.country as SupportedCountries
                                })}
                                showAsRequired={true}
                                name={"address.state"}
                                id={"address.state"}
                                optionList={address.userInputs.stateList ?? address.defaults.stateList}
                                value={address.userInputs.stateCode ?? address.defaults.stateCode}
                                handleOnChange={handleStateChange}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput w-full"}
                                fieldErrorMessage={state?.errors?.state?.join("\n") ?? undefined}
                            />
                            {
                                address.userInputs.showParishes && (
                                    <GenericTextInput
                                        label={"Parish"}
                                        showAsRequired={true}
                                        name={"address.street3"}
                                        id={"address.street3"}
                                        setAsDropdown={true}
                                        optionList={address.userInputs.parishList as {name: string; value: string;}[]}
                                        handleOnChange={handleParishChange}
                                        value={(address.userInputs.parishCode || address.defaults.parishCode) as string}
                                        labelClassnames={"formLabel w-full"}
                                        inputFieldClassnames={"formInput w-full parishInput"}
                                    />
                                )
                            }
                            {
                                (address.userInputs.locationNotListed) ? (
                                    <GenericTextInput
                                        setAsInputTextField={true}
                                        label={getCityLabelForCountry({
                                            country: property.Address.country as SupportedCountries
                                        })}
                                        showAsRequired={true}
                                        placeholder={"Chandler"}
                                        name={"address.city.custom"}
                                        id={"address.city.custom"}
                                        defaultValue={address.userInputs.customCity as string}
                                        handleOnChange={handleCityChange}
                                        labelClassnames={"formLabel"}
                                        inputFieldClassnames={"formInput w-100"}
                                        fieldErrorMessage={state?.errors?.city?.join("\n") ?? undefined}
                                    />
                                ) : (
                                    <GenericTextInput
                                        setAsDropdown={true}
                                        label={getCityLabelForCountry({
                                            country: property.Address.country as SupportedCountries
                                        })}
                                        showAsRequired={true}
                                        name={"address.city.selected"}
                                        id={"address.city.selected"}
                                        optionList={address.userInputs.cityList ?? address.defaults.cityList}
                                        value={address.userInputs.cityCode ?? address.defaults.cityCode}
                                        handleOnChange={handleCityChange}
                                        labelClassnames={"formLabel"}
                                        inputFieldClassnames={"formInput w-full"}
                                    />
                                )
                            }
                            <GenericTextInput
                                setAsCheckbox={true}
                                containerClassnames={"flex flex-row  p-4 pb-0 mb-0 w-full alignCenter"}
                                label={getCityNotListedLabelForCountry({
                                    country: property.Address.country as SupportedCountries
                                })}
                                showAsRequired={false}
                                name={"address.locationNotListed"}
                                id={"address.locationNotListed"}
                                defaultChecked={address.userInputs.locationNotListed}
                                labelClassnames={"formLabel formCheckboxLabel"}
                                inputFieldClassnames={"formInput formCheckbox"}
                                handleOnClick={handleLocationNotListedClick}
                            />
                            <GenericTextInput
                                setAsInputTextField={true}
                                label={getPostalCodeLabelForCountry({
                                    country: property.Address.country as SupportedCountries
                                })}
                                showAsRequired={true}
                                placeholder={""}
                                name={"address.postalCode"}
                                id={"address.postalCode"}
                                defaultValue={address.userInputs.postalCode ?? address.defaults.postalCode}
                                labelClassnames={"formLabel"}
                                inputFieldClassnames={"formInput"}
                                fieldErrorMessage={(state?.errors?.postalCode?.join("\n") ?? undefined)}
                            />
                        </div>
                    </div>
                )
            }
            <DropdownMenuSeparator className={"mt-10"} />
            <div className={"flex mt-5 justify-center"}>
                <FormButton
                    btnType={"submit"}
                    classNames={`button-87`}
                    btnLabel={"Submit Updates"}
                    pendingMessage={"Updating Property Data..."}
                    useFormStatus={useFormStatus}
                />
            </div>
            {
                (state?.errors !== undefined) && <FormErrorMessage formState={state} />
            }
        </form>
    );
};