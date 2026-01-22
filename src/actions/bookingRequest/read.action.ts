"use server";
import db from "../../db/connect.db";
import {SessionDataState} from "@/store/userStore";
import {BookingRequest} from "@prisma/client";

/**
 * This File Contains the Logic for Reading Property List or Individual Data By ID
 * */
export interface ReadBookingRequestsByPropertyIdActionState {
    message: string;
    response: {
        bookingRequests: BookingRequest[];
    };
    error?: Error | null;
    pState?: SessionDataState;
}

export type ReadBookingRequestsByPropertyIdParams = {
    propertyId: string;
}

export const fetchBookingRequestsByPropertyIdAction = async(
    prevState: ReadBookingRequestsByPropertyIdActionState,
    searchParams: ReadBookingRequestsByPropertyIdParams
) => {
    try {
        const
            fetchCalendarId = await db.property.findUnique({
                where: {
                    id: searchParams.propertyId,
                },
                select: {
                    Calendar: {
                        select: {
                            id: true
                        }
                    }
                }
            }),
            fetchBookingRequestsByPropertyIdResponse = await db.bookingRequest.findMany({
                where: {
                    orgImprintId: prevState.pState!.profile!.org.id as string,
                    calendarId: fetchCalendarId!.Calendar!.id,
                    status: "PENDING"
                },
                select: {
                    id: true,
                    status: true,
                    arrival: true,
                    departure: true,
                    notes: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
        return {
            message: "Booking Requests By Property Id Fetch Successful!",
            response: {
                bookingRequests: fetchBookingRequestsByPropertyIdResponse
            },
            pState: prevState.pState,
        };
    } catch(error) {
        return {
            message: 'Error Fetching Booking Requests By Property Id',
            response: {},
            error,
            pState: prevState.pState
        };
    }
};