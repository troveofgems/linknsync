"use server";
import {SessionDataState} from "@/store/userStore";
import db from "@/db/connect.db";

import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";
import {createBookingRequestAction} from "@/actions/bookingRequest/create.action";
import {timeConversionTo_AmPm} from "@/lib/utils/DateTime/time.utils";
import {initTransporter} from "@/lib/utils/EmailTransporter/transporter.utils";
import {AddressFormatterProps, formatAddress} from "@/lib/utils/Address/address.utils";

export interface CreateSendEmailActionState {
    message: string;
    response: {
        generatedEmailId?: string;
        generatedBookingRequestId?: string;
        actionsTaken?: string[];
    },
    errors?: {
        [p: string]: string[];
    }
    pState?: SessionDataState | null;
}
/*export type CreateSendEmailActionProps = {
    propertyName: string;
}*/

// Booking Request Email(s)
export const createSendEmailActionFromForm = async(
    prevState: CreateSendEmailActionState,
    form: FormData,
): Promise<CreateSendEmailActionState> => {
   const // Fetch Property For PLA Data
       property = await db.property.findFirst({
           where: { id: form.get("property.id") as string },
           select: {
               name: true,
               cid: true,
               homepageLink: true,
               Address: true,
               Calendar: true
           }
       }),
       plaContact = await db.userImprint.findUnique({
           where: {
               id: property?.cid
           },
           select: {
               firstName: true,
               contactEmail: true
           }
       });

    // Build Email Object
    const requestData = {
        plaFirstName: plaContact?.firstName,
        requestorEmail: prevState?.pState?.profile?.email,
        requestorPhone: prevState?.pState?.profile?.phoneNumber,
        requestorFullName: prevState?.pState?.profile?.fullName,
        requestorOrgRole: prevState?.pState?.loggedInUser?.orgRole,
        requestorCompanyName: prevState?.pState?.profile?.org.name,
        noHomepageLink: property?.homepageLink.length === 0 || true,
        propertyName: property?.name,
        propertyAddress: formatAddress(property!.Address as AddressFormatterProps),
        checkInDate: new Date(form.get("checkInDate") as string),
        checkOutDate: new Date(form.get("checkOutDate") as string),
        checkInTime: timeConversionTo_AmPm(form.get("checkInTime") as string),
        checkOutTime: timeConversionTo_AmPm(form.get("checkOutTime") as string),
        adults: parseInt(form.get("adults") as string),
        children: parseInt(form.get("children") as string),
        pets: parseInt(form.get("pets") as string),
        additionalNotes: form.get("notes")
    };

    // Set up Nodemailer transporter with Imitate Email SMTP credentials
    const transporter = await initTransporter();

    // Email message options
    const mailOptions = {
        from: `"Contact Form" <noreply@linknsync.com>`, // sender address
        to: `${plaContact?.contactEmail}`,
        subject: "New Booking Request",
        text: `
        Dear ${plaContact?.firstName}
        
        I hope this message finds you well. I am writing to inquire about the availability at
        ${requestData.propertyName} for the dates ${datetimeConversionTo_String({ timestamp: requestData.checkInDate }).split(",")[0]} to ${datetimeConversionTo_String({ timestamp: requestData.checkOutDate}).split(",")[0]}: check-in at ${datetimeConversionTo_String({ timestamp: requestData.checkInTime})} and check-out for ${datetimeConversionTo_String({ timestamp: requestData.checkOutTime})}. 
        
        I have some guests who would be interested in booking the property for a stay.
        
        The guest count includes:
        ${requestData.adults} adult${requestData.adults > 1 ? "s" : ""}
        ${(!!requestData.children && requestData.children > 1) ? 
            `, ${requestData.children} children` : 
            (!!requestData.children && requestData.children === 1) ? 
                `, ${requestData.children} child` : ""}
                ${(!!requestData.pets && requestData.pets > 1) ? 
            `, and ${requestData.pets} pets.` : 
            (!!requestData.pets && requestData.pets === 1) ? 
                `, and ${requestData.pets} pet.` : ""} 
                
        I have provided additional notes about the booking below.
        -----------------
        Additional Notes:
        -----------------
        \t ${requestData.additionalNotes}
        
        ${
            requestData.noHomepageLink && "If possible, we would appreciate a brief overview on, or, hyperlink to the " + 
            "amenities and services included with the property."
        }
        
        Thank you for your time and assistance. We look forward to your prompt response and home to confirm
        a reservation soon. Please feel free to contact me if you need any further information.
        
        Best Regards,
        ${requestData.requestorFullName}
        ${requestData.requestorCompanyName} | ${requestData.requestorOrgRole}
        ${requestData.requestorEmail} | ${requestData.requestorPhone}
        `
    };

    // Send the email
    const sentEmail = await transporter.sendMail(mailOptions);

    const storedBooking = await createBookingRequestAction(
        { pState: prevState.pState } as CreateSendEmailActionState,
        {
            checkInDate: requestData.checkInDate,
            checkOutDate: requestData.checkOutDate,
            checkInTime: requestData.checkInTime,
            checkOutTime: requestData.checkOutTime,
            adults: requestData.adults,
            children: requestData.children,
            pets: requestData.pets,
            additionalNotes: requestData.additionalNotes as string
        },
        sentEmail,
        property!.Calendar!.id
    );

    return {
        message: "Email Successfully Sent!",
        response: {
            generatedBookingRequestId: storedBooking.response.generatedBookingRequestId,
            generatedEmailId: sentEmail.messageId
        },
        pState: prevState.pState
    } as CreateSendEmailActionState
};

// Conflict Email(s)
type ConflictEmailData = {
    processedConflictCount: number;
    inputData: {
        propertyName: string;
        calendarId: string;
        calenderType: string;
        cid: string;
        coid: string;
        prodid: string;
        version: string;
        eventType: string;
        eventUID: string;
        eventCreated: Date;
        startDate: Date;
        endDate: Date;
        summary: string;
        isRecurring: boolean;
        recurrenceRule: string;
        priority: string;
        propertyId: string;
        userImprintId: string;
        iCalEntryId: string;
        firstBlockId: string;
        overlapDuration: number;
        resolved: boolean;
        resolutionAction: string;
    }[];
}

export const createSendConflictsDetectedEmailAction = async(
    prevState: CreateSendEmailActionState,
    data: ConflictEmailData,
    generateAudit = true
): Promise<CreateSendEmailActionState> => {
    console.log("Try to send Email for Conflict: ", prevState, data);

    const
        userList = data.inputData.map((item) => item.cid),
        propertyIdList = data.inputData.map((item) => item.propertyId);

    const
        initialBooking = await db.dateBlock.findFirst({
            where: {
                id: data.inputData[0].firstBlockId
            },
            select: {
                userImprintId: true
            }
        });

    userList.push(initialBooking?.userImprintId as string);

    const
        users = await db.userImprint.findMany({
            where: {
                orgImprintId: data.inputData[0].coid,
                id: {
                    in: userList
                }
            },
            select: {
                fullName: true,
                contactEmail: true,
            }
        }),
        properties = await db.property.findMany({
            where: {
                id: {
                    in: propertyIdList
                }
            },
            select: {
                id: true,
                name: true,
                Address: true
            }
        });

    console.log("Fix Email: ", users);

    // Build Email Object
    const requestData = {
        contactList: [users[0].contactEmail],
        contactNames: [users[0].fullName],
    };

    if (users.length === 2) { // PLA or ALA Conflicts Across Multiple Properties
        requestData.contactList.push(users[1].contactEmail);
        requestData.contactNames.push(users[1].fullName);
    }

    // Set up Nodemailer transporter with Imitate Email SMTP credentials
    const transporter = await initTransporter();

    const stringifiesConflicts = properties.map((item) => {
        let dataStr = "";

        dataStr += `${item!.Address!.street}, ${item!.Address!.city} ${item!.Address!.state}, ${item!.Address!.postalCode} ${item!.Address!.country}\n\t\t\tConflicts uploaded by: ${users.length === 2 ? users[1].fullName : users[0].fullName}\n`;
        data.inputData.forEach((conflict) => {
            if(conflict.propertyId === item.id) {
                dataStr += `\t\t\t\tDates: ${datetimeConversionTo_String({ timestamp: conflict.startDate }).split(",")[0]} to ${datetimeConversionTo_String({timestamp: conflict.endDate}).split(",")[0]} conflict with a currently existing booking.\n`;
            }
           return dataStr;
        });
        return dataStr;
    });

    // Email message options
    const mailOptions = {
        from: `"LNS Sync Service" <noreply@linknsync.com>`, // sender address
        to: `${requestData.contactList.join(",")}`,
        subject: "Conflicts Between ICals Detected on the Link N' Sync Service!",
        text: `
        Dear ${requestData.contactNames.join(" and ")}, 
        
        The Link N' Sync Team hopes this message finds you well - Our systems have detected conflicts between
        uploaded ICal calendar events on specific sources. The details are as follows:
        
        ${stringifiesConflicts.join("\n\t\t")}
        Thank you for allowing our team to assist yours! Our system will drop conflicts once we detect updated
        information from your ical urls or manually uploaded files*.

        Best Regards,
        The Link N' Sync Team
        
        *Manual File Uploads, Changes, Or Deletes are limited to your organization's Scheduled Job Designation Type,
        which may be Hourly or Daily. Daily designations mean that you may only change your Ical Resource once
        per day. The same holds true for a designation of Hourly: changes may be made once per hour.
        `
    };

    const sentEmail = await transporter.sendMail(mailOptions);

    /* if(generateAudit) { // TODO: Plug In Audit For System Sent Emails
         const
             actionsTaken = [
                 `Booking Conflict Found`,
                 `Email Notification Sent`
             ],
             auditData = compileUserAuditObject(
                 actionsTaken, "send.action", "email",
                 coid, cid, sid
             );
         createUserAuditAction_BackgroundProcess(auditData).then(() => {});
     }*/

    return {
        message: "Email Successfully Sent!",
        response: {
            ...sentEmail
        },
        pState: prevState.pState
    } as CreateSendEmailActionState
};

// Job Opportunity Email
export const createSendJobOppEmailAction = async(
    prevState: CreateSendEmailActionState,
    form: FormData
): Promise<CreateSendEmailActionState> => {
    const requestData = { // Build Email Object
        contactName: form.get("contactName") as string,
        contactMethod: form.get("contactMethod") as string,
        companyHomepage: form.get("companyHomepage") as string,
        opportunityNotes: form.get("opportunityNotes") as string
    };

    // Set up Nodemailer transporter with Imitate Email SMTP credentials
    const transporter = await initTransporter();

    // Email message options
    const mailOptions = {
        from: `"Job Opportunity Contact Form" <noreply@linknsync.com>`, // sender address
        to: `dkgreco.dev@gmail.com, dkgreco@thetroveofgems.tech`,
        subject: "Potential Job Opportunity Received!",
        text: `
        Hey Dustin,
        
        You've received a potential job opportunity from someone on Link N Sync!
        The details are as follows:
        
        ${requestData.contactName}
        ${requestData.contactMethod}
       
        The Opportunity:
        \t ${requestData.opportunityNotes}
        
        Best Regards,
        LNS System
        `
    };

    // Send the email
    const sentEmail = await transporter.sendMail(mailOptions);

    return {
        message: "Email Successfully Sent!",
        response: {
            ...sentEmail
        },
        pState: prevState.pState
    } as CreateSendEmailActionState
};