import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";

// For Production Level Sending...
export const sendBookingRequestToPLA_Template = (
    {
        plaFirstName,
        requestorEmail,
        requestorPhone,
        requestorFullName,
        requestorOrgRole,
        requestorCompanyName,
        noHomepageLink,
        propertyName,
        checkInDate,
        checkOutDate,
        checkInTime,
        checkOutTime,
        adults,
        children,
        pets,
        additionalNotes
    }: {
        plaFirstName: string;
        requestorEmail: string;
        requestorPhone: string;
        requestorFullName: string;
        requestorOrgRole: string;
        requestorCompanyName: string;
        noHomepageLink: boolean;
        propertyName: string;
        checkInDate: Date;
        checkOutDate: Date;
        checkInTime: string;
        checkOutTime: string;
        adults: number;
        children?: number;
        pets?: number;
        additionalNotes: string;
    }
) => (
    <div>
        <div>
            <p>Dear {plaFirstName}</p>
            <p>
                I hope this message finds you well. I am writing to inquire about the availability at
                {propertyName} for the dates {datetimeConversionTo_String({ timestamp: checkInDate }).split(",")[0]} to {datetimeConversionTo_String({ timestamp: checkOutDate }).split(",")[0]}:
                check-in at {checkInTime} and check-out for {checkOutTime}.
            </p>
            <p>I have some guests who would be interested in booking the property for a stay.</p>
            <p>
                The guest count includes {adults} adult{adults > 1 ? "s" : ""}
                {!!children && children > 1 ? `, ${children} children` : `, ${children} child`}
                {!!pets && pets > 1 ? `, ${pets} pets` : `, ${pets} pet.`} I have provided additional notes about
                the booking below.
            </p>
            <p>
                Additional Notes:
            </p>
            <p>
                {additionalNotes}
            </p>
            {
                noHomepageLink && ( /* No Homepage, so request additional information */
                    <p>
                        If possible, we would appreciate a brief overview on the amenities and services included with
                        the property or hyperlink to the property.
                    </p>
                )
            }
            <p>
                Thank you for your time and assistance. We look forward to your prompt response and home to confirm
                a reservation soon. Please feel free to contact me at {requestorPhone} or {requestorEmail} if you need
                any further information.
            </p>
            <p>Best Regards,</p>
            <p>{requestorFullName}</p>
            <p>{requestorOrgRole} - {requestorCompanyName}</p>
        </div>
    </div>
);