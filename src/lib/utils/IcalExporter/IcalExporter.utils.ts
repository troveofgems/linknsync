import {lnsExportCreateDateToICSFormat, lnsExportDateToICSFormat} from "@/lib/utils/DateTime/date.utils";

interface Event {
    id: string;
    subject: string;
    startDate: Date;
    endDate: Date;
    eventCreated: Date;
    description?: string;
}

export async function* generateICSContent (
    events: Event[],
    calScale: string
) {
    yield 'BEGIN:VCALENDAR\n';
    yield 'VERSION:2.0\n';
    if(calScale === "GREGORIAN") {
        yield 'CALSCALE:GREGORIAN\n';
    }

    for(const event of events) {
        yield 'BEGIN:VEVENT\n';
        yield `SUMMARY:${event.subject}\n`;

        if(calScale === "GREGORIAN") {
            yield `DTSTART;TZID=UTC:${event.startDate.toISOString().replace(/[-:.]/g, '')}Z\n`;
            yield `DTEND;TZID=UTC:${event.endDate.toISOString().replace(/[-:.]/g, '')}Z\n`;
        } else {
            yield `DTSTAMP:${lnsExportCreateDateToICSFormat({ date: event.eventCreated })}`;
            yield `DTSTART:${lnsExportDateToICSFormat({ date: event.startDate })}`;
            yield `DTEND:${lnsExportDateToICSFormat({ date: event.endDate })}`;
            yield `UID:${event.id}@lns-bookings.com`;
        }

        if (event.description) {
            yield `DESCRIPTION:${event.description}\n`;
        }

        yield 'END:VEVENT\n';
    }
    yield 'END:VCALENDAR\n';
}