import {PriorityType, UserImprint} from "@prisma/client";

export type DateBlock = {
    id?: string;
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
    slug?: string;
    summary: string;
    startDate: Date;
    endDate: Date;
    isRecurring: boolean;
    recurrenceRule: string;
    priority: PriorityType;
    propertyId: string;
    iCalEntryId?: string;
    userImprintId: string;
    UserImprint?: Partial<UserImprint>;
}