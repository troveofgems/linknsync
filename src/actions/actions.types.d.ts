import {PriorityType} from "@prisma/client";

export type DateBlock = {
    propertyName?: string;
    calendarId: string;
    calendarType: string;
    cid: string;
    coid: string;
    prodid: string;
    version: string;
    eventType: string;
    eventUID: string;
    eventCreated: Date;
    summary: string;
    startDate: Date;
    endDate: Date;
    isRecurring: boolean;
    recurrenceRule: string;
    priority: PriorityType;
    propertyId: string;
    iCalEntryId?: string;
    userImprintId: string;
}