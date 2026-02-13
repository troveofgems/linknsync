"use client";
import "./CreateProperty.Form.scss";
import React, {useActionState, useEffect} from "react";
import {useFormStatus} from "react-dom";
import {useRouter} from "next/navigation";

// Session State Type
import {SessionDataState} from "@/store/userStore";

// Components
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";

// Actions, Hooks, Utils
import {createPropertyAction, CreatePropertyActionState} from "@/actions/property/create.action";
import {ICalUploader} from "@/components/forms/property/elements/ICalUploader";
import {FormErrorMessage} from "@/components/forms/property/elements/FormErrorMessage";
import {Alert} from "@/components/misc/Sonner.Alerter";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import {
    getAddSecondLineLabelForCountry, getCityLabelForCountry, getCityNotListedLabelForCountry,
    getCountryLabelForCountry,
    getPostalCodeLabelForCountry, getStateLabelForCountry, getStreet1LabelForCountry, getStreet2LabelForCountry,
    SupportedCountries
} from "@/lib/utils/Address/address.utils";
import {useAddress} from "@/hooks/ProtoAddress/useAddress";
import {Card, CardContent} from "@/components/ui/card";
import {PictureWrapper} from "@/components/structural/picture/Picture.Wrapper";
import {useFileToBase64} from "@/hooks/ProtoImage/useImage";
import {APP_PATHS} from "@/utils/nav.path.utils";

export const CreatePropertyForm = (
    {
        user
    } : {
        user: SessionDataState
    }) => {
    const
        router = useRouter(),
        {
            address,
            handleMUAClick, handleLocationNotListedClick,
            handleCityChange, handleCountryChange, handleParishChange, handleStateChange
        } = useAddress(),
        {
            base64String, convertFileToBase64, error
        } = useFileToBase64(),
        [state, action, isPending] = useActionState(
            createPropertyAction,
            {
                pState: user,
                nonce: Buffer.from(crypto.randomUUID()).toString('base64')
            } as CreatePropertyActionState
        );

    useEffect(() => {
        if(!!state && !isPending) {
            if(state.message === "Property Successfully Created!") {
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
                const propertyListPath = APP_PATHS.pages.authenticated.user.goToProperty.list.path as string;
                return router.push(propertyListPath);
            }
        }
        console.log(state);
    }, [state, isPending, router, error]);

    return (
        <form action={action} nonce={"some-nonce-value?"}>
            <h2 className={"text-1xl font-semibold capitalize"}>Property</h2>
            <DropdownMenuSeparator />
            <div className={"flex"}>
                <div className={"w-1/2 p-4 hidden lg:block pl-0 pt-9"}>
                    <Card className={"w-3/4 alignContentCenter"}>
                        <CardContent className={"p-1"}>
                            <PictureWrapper
                                classNames={"w-fit h-fit"}
                                photo={!!base64String ? {
                                    thumbnailUrl: base64String,
                                    width: "250",
                                    height: "250",
                                    title: "uploaded image"
                                } : undefined}
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className={"w-1/2"}>
                    <GenericTextInput
                        setAsInputTextField={true}
                        label={"Name"}
                        showAsRequired={true}
                        placeholder={"ToGA Villa"}
                        name={"property.name"}
                        id={"property.name"}
                        defaultValue={state?.response?.formData?.get("property.name") as string || ""}
                        labelClassnames={"formLabel"}
                        inputFieldClassnames={"formInput"}
                        fieldErrorMessage={(state?.errors?.name?.join("\n") ?? undefined)}
                    />
                    <GenericTextInput
                        setAsInputTextField={true}
                        useSubInputType={true}
                        inputType={"url"}
                        label={"Link to Property Homepage"}
                        showAsRequired={false}
                        placeholder={"https://pm.thetroveofgems.tech/property-homepage"}
                        name={"property.homepageLink"}
                        id={"property.homepageLink"}
                        defaultValue={state?.response?.formData?.get("property.homepageLink") as string || ""}
                        labelClassnames={"formLabel"}
                        inputFieldClassnames={"formInput"}
                        fieldErrorMessage={(state?.errors?.homepageLink?.join("\n") || undefined)}
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
                        fieldErrorMessage={error?.name?.join("\n") ?? undefined}
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

            <div className={"my-8"} />
            <h2 className={"text-1xl font-semibold capitalize"}>Address</h2>
            <DropdownMenuSeparator />
            <div className={"flex"}>
                <div className={"w-1/2"}>
                    <GenericTextInput
                        setAsCheckbox={true}
                        showAsRequired={false}
                        id={"address.isMUA"}
                        name={"address.isMUA"}
                        defaultChecked={false}
                        handleOnClick={handleMUAClick}
                        containerClassnames={"multiUnitBlock"}
                        labelClassnames={"formLabel formCheckboxLabel"}
                        inputFieldClassnames={"formInput formCheckbox"}
                        label={getAddSecondLineLabelForCountry(
                            { country: address.userInputs.country as SupportedCountries || address.defaults.country as SupportedCountries }
                        )}
                    />
                    <GenericTextInput
                        setAsDropdown={true}
                        id={"address.country"}
                        name={"address.country"}
                        label={getCountryLabelForCountry(
                            { country: address.userInputs.country as SupportedCountries || address.defaults.country as SupportedCountries }
                        )}
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
                        label={getStreet1LabelForCountry(
                            { country: address.userInputs.country as SupportedCountries || address.defaults.country as SupportedCountries }
                        )}
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
                                label={getStreet2LabelForCountry(
                                    { country: address.userInputs.country as SupportedCountries || address.defaults.country as SupportedCountries }
                                )}
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
                        label={getStateLabelForCountry(
                            { country: address.userInputs.country as SupportedCountries || address.defaults.country as SupportedCountries }
                        )}
                        showAsRequired={true}
                        name={"address.state"}
                        id={"address.state"}
                        optionList={address.userInputs.stateList ?? address.defaults.stateList}
                        value={address.userInputs.stateCode ?? address.defaults.stateCode}
                        handleOnChange={handleStateChange}
                        labelClassnames={"formLabel w-full"}
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
                                label={getCityLabelForCountry(
                                    { country: address.userInputs.country as SupportedCountries || address.defaults.country as SupportedCountries }
                                )}
                                showAsRequired={true}
                                placeholder={"Chandler"}
                                name={"address.city.custom"}
                                id={"address.city.custom"}
                                defaultValue={address.userInputs.customCity as string}
                                handleOnChange={handleCityChange}
                                labelClassnames={"formLabel w-full"}
                                inputFieldClassnames={"formInput w-full"}
                                fieldErrorMessage={state?.errors?.city?.join("\n") ?? undefined}
                            />
                        ) : (
                            <GenericTextInput
                                setAsDropdown={true}
                                label={getCityLabelForCountry(
                                    { country: address.userInputs.country as SupportedCountries || address.defaults.country as SupportedCountries }
                                )}
                                showAsRequired={true}
                                name={"address.city.selected"}
                                id={"address.city.selected"}
                                optionList={address.userInputs.cityList ?? address.defaults.cityList}
                                value={address.userInputs.cityCode ?? address.defaults.cityCode}
                                handleOnChange={handleCityChange}
                                labelClassnames={"formLabel w-full"}
                                inputFieldClassnames={"formInput w-full"}
                            />
                        )
                    }
                    <GenericTextInput
                        setAsCheckbox={true}
                        containerClassnames={"flex flex-row  p-4 pb-0 mb-0 w-full alignCenter"}
                        label={getCityNotListedLabelForCountry(
                            { country: address.userInputs.country as SupportedCountries || address.defaults.country as SupportedCountries }
                        )}
                        showAsRequired={false}
                        name={"address.locationNotListed"}
                        id={"address.locationNotListed"}
                        defaultChecked={false}
                        labelClassnames={"formLabel formCheckboxLabel"}
                        inputFieldClassnames={"formInput formCheckbox"}
                        handleOnClick={handleLocationNotListedClick}
                    />
                    <GenericTextInput
                        setAsInputTextField={true}
                        label={getPostalCodeLabelForCountry(
                            { country: address.userInputs.country as SupportedCountries || address.defaults.country as SupportedCountries }
                        )}
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

            <div className={"my-8"} />
            <h2 className={"text-1xl font-semibold capitalize"}>ICal Import</h2>
            <ICalUploader
                formState={state}
                containerClassnames={"flex-row"}
                labelClassnames={"w-1/2"}
                inputFieldClassnames={"w-1/2"}
            />
            <div className={"flex mt-10 justify-center"}>
                <FormButton
                    btnType={"submit"}
                    classNames={"button-87"}
                    btnLabel={"Submit"}
                    pendingMessage={"Creating Property..."}
                    useFormStatus={useFormStatus}
                />
            </div>
            {
                (state?.errors !== undefined) && <FormErrorMessage formState={state} />
            }
        </form>
    );
};