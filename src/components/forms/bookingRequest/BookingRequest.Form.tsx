import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import React, {useActionState, useEffect} from "react";
import {FormButton} from "@/components/forms/_elements/Buttons/FormButton";
import {useFormStatus} from "react-dom";
import { Textarea } from "@/components/ui/textarea";
import {createSendEmailActionFromForm, CreateSendEmailActionState} from "@/actions/email/send.action";
import {SessionDataState} from "@/store/userStore";
import {Alert} from "@/components/misc/Sonner.Alerter";

export const BookingRequestForm = ({
    bookingRequestDate,
    propertyId = "",
    propertyName = "",
    user,
    closeBookingRequestDialog
} : {
    bookingRequestDate: Date;
    propertyId: string;
    propertyName: string;
    user: SessionDataState;
    closeBookingRequestDialog: () => void;
}) => {
    const [state, action, isPending] = useActionState(
        createSendEmailActionFromForm,
        { pState: user } as CreateSendEmailActionState
    );

    useEffect(() => {
        if(!!state && !isPending) {
            if(state.message === "Email Successfully Sent!") {
                closeBookingRequestDialog();
                Alert({
                    message: state.message,
                    description: new Date().toISOString(),
                    actionLabel: "Close",
                });
            }
        }
    }, [state, isPending, closeBookingRequestDialog]);

    return (
        <form action={action}>
            <hr className={"mb-4"}/>
            <div className={"flex flex-col w-full justify-around"}>
                <div className={"flex flex-row"}>
                    <div className={"w-1/2 p-2"}>
                        <GenericTextInput
                            setAsInputTextField={true}
                            label={"Check-In Date"}
                            inputType={"date"}
                            value={bookingRequestDate.toISOString().slice(0, 10)}
                            name={"checkInDate"}
                            id={"checkInDate"}
                            readOnly={true}
                            labelClassnames={"mt-0"}
                            inputFieldClassnames={"formInput"}
                        />
                    </div>
                    <div className={"w-1/2 p-2"}>
                        <GenericTextInput
                            setAsInputTextField={true}
                            label={"Check-In Time"}
                            inputType={"time"}
                            showAsRequired={true}
                            placeholder={"0900"}
                            name={"checkInTime"}
                            id={"checkInTime"}
                            labelClassnames={"mt-0"}
                            inputFieldClassnames={"formInput"}
                        />
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    <div className={"flex flex-row"}>
                        <div className={"w-1/2 p-2"}>
                            <GenericTextInput
                                setAsInputTextField={true}
                                label={"Check-Out Date"}
                                inputType={"date"}
                                showAsRequired={true}
                                placeholder={"February 8th, 2025"}
                                name={"checkOutDate"}
                                id={"checkOutDate"}
                                labelClassnames={"mt-0"}
                                inputFieldClassnames={"formInput"}
                            />
                        </div>
                        <div className={"w-1/2 p-2"}>
                            <GenericTextInput
                                setAsInputTextField={true}
                                inputType={"time"}
                                label={"Check-Out Time"}
                                showAsRequired={true}
                                placeholder={"1415"}
                                name={"checkOutTime"}
                                id={"checkOutTime"}
                                labelClassnames={"mt-0"}
                                inputFieldClassnames={"formInput"}
                            />
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    <div className={"flex flex-row mb-3"}>
                        <div className={"w-1/3 p-2"}>
                            <GenericTextInput
                                setAsInputTextField={true}
                                label={"Adults"}
                                inputType={"number"}
                                showAsRequired={true}
                                placeholder={"1"}
                                name={"adults"}
                                id={"adults"}
                                labelClassnames={"mt-0"}
                                inputFieldClassnames={"formInput"}
                            />
                        </div>
                        <div className={"w-1/3 p-2"}>
                            <GenericTextInput
                                setAsInputTextField={true}
                                label={"Children"}
                                inputType={"number"}
                                showAsRequired={true}
                                placeholder={"0"}
                                name={"children"}
                                id={"children"}
                                labelClassnames={"mt-0"}
                                inputFieldClassnames={"formInput"}
                            />
                        </div>
                        <div className={"w-1/3 p-2"}>
                            <GenericTextInput
                                setAsInputTextField={true}
                                label={"Pets"}
                                inputType={"number"}
                                showAsRequired={true}
                                placeholder={"0"}
                                name={"pets"}
                                id={"pets"}
                                labelClassnames={"mt-0"}
                                inputFieldClassnames={"formInput"}
                            />
                        </div>
                        <div className={"hidden"}>
                            <GenericTextInput
                                setAsHiddenField={true}
                                label={"Property Id"}
                                showAsRequired={true}
                                readOnly={true}
                                value={propertyId}
                                defaultValue={propertyId}
                                name={"property.id"}
                                id={"property.id"}
                                labelClassnames={"mt-0"}
                                inputFieldClassnames={"formInput"}
                            />
                            <GenericTextInput
                                setAsHiddenField={true}
                                label={"Property Name"}
                                showAsRequired={true}
                                readOnly={true}
                                value={propertyName}
                                defaultValue={propertyName}
                                name={"property.name"}
                                id={"property.name"}
                                labelClassnames={"mt-0"}
                                inputFieldClassnames={"formInput"}
                            />
                            <GenericTextInput
                                setAsHiddenField={true}
                                showAsRequired={true}
                                readOnly={true}
                                value={user.loggedInUser?.cid}
                                defaultValue={user.loggedInUser?.cid}
                                name={"senderId"}
                                id={"senderId"}
                                labelClassnames={"mt-0"}
                                inputFieldClassnames={"formInput"}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-full"}>
                <div className="grid w-full gap-3">
                    <label htmlFor="message">Notes:</label>
                    <Textarea
                        id={"notes-textarea"}
                        name={"notes"}
                        placeholder="Type your message to the PLA here. Be sure to include any additional information as needed for a successful booking."
                    />
                </div>
            </div>
            <div className={"flex mt-5 justify-center"}>
                <FormButton
                    btnType={"submit"}
                    classNames={"button-87"}
                    btnLabel={"Send Request"}
                    pendingMessage={"Building & Sending Email..."}
                    useFormStatus={useFormStatus}
                />
            </div>
        </form>
    );
}