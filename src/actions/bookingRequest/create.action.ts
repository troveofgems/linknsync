"use server";
import db from "@/db/connect.db";
import {LoggedInUserState} from "@/store/userStore";
import {CreateSendEmailActionState} from "@/actions/email/send.action";
import {compileUserAuditObject} from "@/lib/utils/Audit/audit.utils";
import {createUserAuditAction_BackgroundProcess} from "@/actions/audit/user/create.action";

export const createBookingRequestAction = async(
    prevState: CreateSendEmailActionState,
    data: {
        checkInDate: Date;
        checkOutDate: Date;
        adults: number;
        children: number;
        pets: number;
        checkInTime: string;
        checkOutTime: string;
        additionalNotes: string;
    },
    sentEmail: {
        messageId: string;
    },
    calendarId: string,
    generateAudit = true
): Promise<CreateSendEmailActionState> => {
    // Build Data Object

    const
        { id: coid } = prevState.pState!.profile!.org,
        { userId: cid, sessionId: sid } = prevState.pState!.loggedInUser as LoggedInUserState,
        inputData = {
            arrival: data.checkInDate,
            departure: data.checkOutDate,
            notes: `${data.additionalNotes}\n${data.adults} Adults, ${data.children} Children, ${data.pets}.\nCheck-In At: ${data.checkInTime}\nCheck-Out At: ${data.checkOutTime}`,
            orgImprintId: coid,
            userImprintId: prevState.pState!.loggedInUser!.userId as string,
            calendarId,
            messageId: sentEmail.messageId,
        };

    const storedBookingRequest = await db.bookingRequest.create({
        data: inputData
    });

    if(generateAudit) {
        const
            actionsTaken = [
                `Booking Request Sent: ${storedBookingRequest.id}`,
            ],
            auditData = compileUserAuditObject(
                actionsTaken, "send.action", "email",
                coid, cid as string, sid as string
            );
        createUserAuditAction_BackgroundProcess(auditData).then(() => {});
    }

    return {
        message: "Booking Request Successfully Stored!",
        response: {
            generatedBookingRequestId: storedBookingRequest.id,
        },
        pState: prevState.pState
    } as CreateSendEmailActionState;
};