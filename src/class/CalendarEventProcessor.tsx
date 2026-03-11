import {MONTHS} from "@/lib/utils/Calendar/calendar.prop.utils";
import {BookingRequest} from "@prisma/client";

export type ScheduledEvent = {
    id: string;
    startDate: Date;
    endDate: Date,
    daysBetweenArrivalAndDeparture: number;
    eventOwner: string;
    markedAsBooked: boolean;
    markedAsArrival: boolean;
    markedAsDeparture: boolean;
    markedAsRequestedBooking?: boolean;
};

type CalendarData = {
    date: Date;
    btnLabel: string;
    ariaLabel: string;
    dayInPast: boolean;
    isFirstOfMonth: boolean;
    btnActionType: 'bookedPastDay' | 'bookedDay' | 'openDay';
    events: ScheduledEvent[];
}

type PrecedingWeekData = {
    currentDate: Date;
    startDate: Date;
    endDate: Date;
}

export class CalendarEventProcessor {
    private readonly events: ScheduledEvent[];
    private readonly bookingRequests: BookingRequest[];
    private readonly calendarData: CalendarData[][];

    constructor(events: ScheduledEvent[], bookingRequests: BookingRequest[]) {
        this.events = events;
        this.bookingRequests = bookingRequests;
        this.calendarData = this.initializeCalendar(events, bookingRequests);
    }

    private initializeCalendar(events: ScheduledEvent[], bookingRequests: BookingRequest[]) {
        const
            calendar: CalendarData[][] = [],
            precedingWeekData = this.getPrecedingWeekStartingOnSunday(),
            bookingEventsToDivest = [...bookingRequests],
            eventsToDivest = [...events];

        const convertUTCToLocal = (date: Date)=> {
            const
                utcDate = new Date(date),
                offset = utcDate.getTimezoneOffset(),
                localDate = new Date(utcDate.getTime() - (offset * 60 * 1000));

            // Prisma To Application Adjustment
            localDate.setDate(localDate.getDate() + 1);

            return localDate;
        }

        const zeroOutDate = (date: Date | number) => {
            const zeroedOutDate = new Date(date);
            zeroedOutDate.setHours(0);
            zeroedOutDate.setMinutes(0);
            zeroedOutDate.setSeconds(0);
            zeroedOutDate.setMilliseconds(0);
            return zeroedOutDate;
        }

        const setEventToDay = (date: Date) => {
            console.log("Arrival Exists? ", date, date.getTime(), eventsToDivest);
            const
                arrivalExistsForEvent = // Filters For Arrivals
                   eventsToDivest.filter(day => (date.getTime() === zeroOutDate(convertUTCToLocal(day.startDate)).getTime())),
                arrivalExistsForBookingRequest =
                    bookingEventsToDivest.filter(bookingRequest => zeroOutDate(convertUTCToLocal(bookingRequest.arrival)).getTime() === date.getTime()),
                departureExistsForEvent = // Filters For Departures
                    eventsToDivest.filter(day => (date.getTime() === zeroOutDate(convertUTCToLocal(day.endDate)).getTime())),
                departureExistsForBookingRequest =
                    bookingEventsToDivest.filter(bookingRequest => zeroOutDate(convertUTCToLocal(bookingRequest.departure)).getTime() === date.getTime()),
                bookedDayExistsForEvent = // Filters For Departures
                    eventsToDivest.filter(day => (
                        date.getTime() > day.startDate.getTime() &&
                        date.getTime() < day.endDate.getTime()
                    )),
                bookedDayExistsForBookingRequest =
                    bookingEventsToDivest.filter(bookingRequest => (
                        date.getTime() > zeroOutDate(convertUTCToLocal(bookingRequest.arrival)).getTime() &&
                        date.getTime() < zeroOutDate(convertUTCToLocal(bookingRequest.departure)).getTime()
                    )),
                processedEvents: ScheduledEvent[] = [];

            console.log("Arrival Exists for Event: ", arrivalExistsForEvent.length);
            console.log("Departure Exists for Event: ", departureExistsForEvent.length);
            if(arrivalExistsForEvent.length > 0 && departureExistsForEvent.length > 0) {
                console.log("Arrival and Departure? ");
            }

            if(arrivalExistsForEvent.length > 0) {
                arrivalExistsForEvent.forEach((scheduledEvent) => {
                    const stayLength = this.calculateDiffBetweenDays(scheduledEvent.startDate, scheduledEvent.endDate);
                    processedEvents.push(this.processBookedDay(scheduledEvent, false, false, true, stayLength))
                });
            }
            if(arrivalExistsForBookingRequest.length > 0) {
                arrivalExistsForBookingRequest.forEach((scheduledEvent) => {
                    const stayLength = this.calculateDiffBetweenDays(scheduledEvent.arrival, scheduledEvent.departure);
                    processedEvents.push(this.processRequestedBookingDay(scheduledEvent, false, false, true, true, stayLength))
                });
            }

            if(departureExistsForEvent.length > 0) {
                departureExistsForEvent.forEach((scheduledEvent) => {
                    const stayLength = this.calculateDiffBetweenDays(scheduledEvent.startDate, scheduledEvent.endDate);
                    processedEvents.push(this.processBookedDay(scheduledEvent, false, true, false, stayLength))
                });
            }
            if(departureExistsForBookingRequest.length > 0) {
                departureExistsForBookingRequest.forEach((scheduledEvent) => {
                    const stayLength = this.calculateDiffBetweenDays(scheduledEvent.arrival, scheduledEvent.departure);
                    processedEvents.push(this.processRequestedBookingDay(scheduledEvent, false, true, false, true, stayLength))
                });
            }

            if(bookedDayExistsForEvent.length > 0) {
                console.log("Booked Day Exists for Event: ", bookedDayExistsForEvent);
                bookedDayExistsForEvent.forEach((scheduledEvent) => {
                    const stayLength = this.calculateDiffBetweenDays(scheduledEvent.startDate, scheduledEvent.endDate);
                    processedEvents.push(this.processBookedDay(scheduledEvent, true, false, false, stayLength))
                });
            }
            if(bookedDayExistsForBookingRequest.length > 0) {
                bookedDayExistsForBookingRequest.forEach((scheduledEvent) => {
                    const stayLength = this.calculateDiffBetweenDays(scheduledEvent.arrival, scheduledEvent.departure);
                    processedEvents.push(this.processRequestedBookingDay(scheduledEvent, true, false, false, true, stayLength))
                });
            }

            console.log("Processed Events: ", processedEvents);
            return processedEvents;
        }

        // Generates a 2D Array of the Calendar and its Projected Dates
        for (let week = 0; week < 79; week += 1) {
            calendar[week] = [];
            for (let day = 0; day < 7; day += 1) {
                const
                    precedingWeek = new Date(precedingWeekData.startDate);
                    precedingWeek.setDate(precedingWeek.getDate() + (week * 7) + day);
                    precedingWeek.setHours(0);
                    precedingWeek.setMinutes(0);
                    precedingWeek.setSeconds(0);
                    precedingWeek.setMilliseconds(0);

                calendar[week][day] = {
                    date: precedingWeek,
                    btnLabel:
                        precedingWeek.getDate() === 1 ?
                        `${this.getShortMonth(precedingWeek.getMonth())}. 1st ${precedingWeek.getFullYear()}` : `${precedingWeek.getDate()}`,
                    ariaLabel: `Day ${precedingWeek.getDate()}, ${MONTHS[precedingWeek.getMonth()]} ${precedingWeek.getFullYear()}`,
                    dayInPast:  new Date().getTime() >= precedingWeek.getTime(),
                    isFirstOfMonth: precedingWeek.getDate() === 1,
                    btnActionType: 'openDay',
                    events: setEventToDay(precedingWeek)
                }
            }
        }

        console.log("Returning Calendar? ", calendar);
        return calendar;
    }

    private getShortMonth(monthIndex: number) {
        return `${MONTHS[monthIndex].substring(0, 3)}`;
    }

    private calculateDiffBetweenDays(start: Date, end: Date): number {
        const
            diffInMilliseconds = Math.abs(end.getTime() - start.getTime()),
            oneDayInMilliseconds = 1000 * 60 * 60 * 24;
        return Math.round(diffInMilliseconds / oneDayInMilliseconds);
    }

    private processBookedDay(
        event: ScheduledEvent,
        markedAsBooked: boolean,
        markedAsDeparture: boolean,
        markedAsArrival: boolean,
        daysBetweenArrivalAndDeparture: number,
    ): ScheduledEvent {
        return {
            ...event,
            markedAsBooked,
            markedAsDeparture,
            markedAsArrival,
            daysBetweenArrivalAndDeparture,
        }
    }

    private processRequestedBookingDay(
        bookingRequest: BookingRequest,
        markedAsBooked: boolean,
        markedAsDeparture: boolean,
        markedAsArrival: boolean,
        markedAsRequestedBooking: boolean,
        daysBetweenArrivalAndDeparture: number,
    ): ScheduledEvent {
        return {
            id: bookingRequest.id,
            startDate: bookingRequest.arrival,
            endDate: bookingRequest.departure,
            eventOwner: "",
            markedAsBooked,
            markedAsDeparture,
            markedAsArrival,
            markedAsRequestedBooking,
            daysBetweenArrivalAndDeparture,
        }
    }

    private getPrecedingWeekStartingOnSunday(date = new Date): PrecedingWeekData {
        const currentDate = new Date(date);

        const lastSunday = new Date(date);
        lastSunday.setDate(lastSunday.getDate() - (lastSunday.getDay() || 7));

        const precedingSunday = new Date(lastSunday);
        precedingSunday.setDate(precedingSunday.getDate() - 7);

        return {
            currentDate,
            startDate: precedingSunday,
            endDate: new Date(precedingSunday.getTime() + 6 * 24 * 60 * 60 * 1000),
        }
    }

    public calendarWithProcessedEventsAndBookingRequests(): CalendarData[][] {
        return this.calendarData;
    }

    public getEvents(): ScheduledEvent[] {
        return this.events;
    }

    public getBookingRequests(): BookingRequest[] {
        return this.bookingRequests;
    }
}