'use client';
import React, {useCallback, useEffect, useState} from "react";
import "./Calendar.1.scss";

import {ChevronLeft, ClipboardList} from "lucide-react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {CalendarEventProcessor, ScheduledEvent} from "@/class/CalendarEventProcessor";
import {WEEKDAYS} from "@/lib/utils/Calendar/calendar.prop.utils";
import {ShowDialog} from "@/components/structural/dialog/Dialog";
import {BookingRequestForm} from "@/components/forms/bookingRequest/BookingRequest.Form";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {SessionDataState} from "@/store/userStore";
import {SubscribedIcalList} from "@/components/structural/tooltip/elements/Cron.elements";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {fetchEventsByPropertyIdAction, ReadEventsByPropertyIdActionState} from "@/actions/ical/read.action";
import {BookingRequest, UserImprint} from "@prisma/client";
import {
    fetchBookingRequestsByPropertyIdAction,
    ReadBookingRequestsByPropertyIdActionState
} from "@/actions/bookingRequest/read.action";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";

interface CalendarProps {
    pid: string;
    user: SessionDataState;
}

interface Day {
    date: Date;
    btnLabel: string;
    ariaLabel: string;
    dayInPast: boolean;
    isFirstOfMonth: boolean;
    btnActionType: string;
    events: Array<{
        markedAsRequestedBooking: boolean;
        markedAsArrival: boolean;
        markedAsDeparture: boolean;
        markedAsBooked: boolean;
        startDate: Date;
        endDate: Date;
    }>;
}

export type DateTimeOptions = {
    weekday: "long" | "short" | "narrow" | undefined;
    month: "long" | "short" | "narrow" | undefined;
    day: "numeric" | undefined;
    year: "numeric" | undefined;
}

const dfo: DateTimeOptions = {
    weekday: 'long', // Full weekday name (e.g., "Wednesday")
    month: 'long',   // Full month name (e.g., "November")
    day: 'numeric',   // Day of the month (e.g., "10")
    year: 'numeric',
};

// Rename to Rainbow-Calendar
export const Calendar1 = (
    {
        pid,
        user
    }: CalendarProps) => {
    const
        [loadingEvents, setLoadingEvents] = useState(true),
        [loadingBookingRequests, setLoadingBookingRequests] = useState(true),
        [processingEvents, setProcessingEvents] = useState(false),
        [events, setEvents] = useState<ScheduledEvent[]>([]),
        [bookingRequests, setBookingRequests] = useState([]),
        [calendar, setCalendar] = useState<[][] | null>(null),
        [activeView, setActiveView] = useState<'calendar' | 'schedule'>('calendar'),
        [viewingEvents, setViewingEvents] = useState<object[] | null>(null),
        [viewingDay, setViewingDay] = useState<Date | string>("No Data"),
        [openDialog, setOpenDialog] = useState(false),
        [bookingRequestDate, setBookingRequestDate] = useState<Date | null>(null);

    // Processing Events
    const compileEvents = (icalSources: SubscribedIcalList[]) => {
        const compiledEvents: unknown[] = [];

        icalSources.forEach((icalEntry) => {
            icalEntry.dateBlocks.forEach((blockEvent) => {
                compiledEvents.push({...blockEvent});
            })
        });

        setEvents(compiledEvents as unknown as []);
        setProcessingEvents(false);
    };

    // Viewing Events
    const handleViewEvents = (scheduledEvents: object[] | null, dayToView: Date) => {
        setViewingEvents(scheduledEvents);
        setViewingDay(dayToView);
        return setActiveView('schedule');
    };

    const compileClassNames = ({ day }: { day: Day }) => {
        let classNameStr = "";

        if(day.dayInPast) {
            classNameStr += ` dayInPast`;
        }

        if(day.events.length > 0) {
            let
                isBookingRequest = false,
                isArrival = false,
                isDeparture = false,
                isBookedDay = false,
                isArrivalAndDeparture = false;

            const eventExists = (day.events.length >= 1);
            if(eventExists) {
                isBookingRequest = day.events[0]!.markedAsRequestedBooking;
                isArrival = day.events[0]!.markedAsArrival;
                isDeparture = day.events[0]!.markedAsDeparture;
                isBookedDay = day.events[0]!.markedAsBooked;
            } else {
                isArrivalAndDeparture =
                    (day.events[0].markedAsArrival && day.events[1].markedAsDeparture) ||
                    (day.events[0].markedAsDeparture && day.events[1].markedAsArrival);
            }

            if(isArrival && !isBookingRequest) {
                classNameStr += " isArrival";
            } else if (isArrival && isBookingRequest) {
                classNameStr += " isPendingBookedArrival";
            }

            if(isDeparture && !isBookingRequest) {
                classNameStr += " isDeparture";
            } else if(isDeparture && isBookingRequest) {
                classNameStr += " isPendingBookedDeparture";
            }

            if(isBookedDay && !isBookingRequest) {
                classNameStr += " isBookedDay";
            } else if(isBookedDay && isBookingRequest) {
                classNameStr += " isPendingBookedDay";
            }

            if(isArrivalAndDeparture) {
                classNameStr += " isArrivalAndDeparture";
            }
        }

        return classNameStr;
    };

    // RLA Functionality
    const handleSendBookingRequestToPLA = ({month, day, year} : {month: number, day: number, year: number}) => {
        const dateBeingRequested = new Date(year, month, day);
        setBookingRequestDate(dateBeingRequested);
        return setOpenDialog(!openDialog);
    };

    const assignCalendarAction = ({ day }: { day: Day }) => {
        // Days with Events
        if(day.events.length > 0) {
            return () => handleViewEvents(day.events, day.date);
        }

        // Assigns Open Days For Booking Action
        if(!day.dayInPast && day.events.length === 0) return () => handleSendBookingRequestToPLA({
            month: day.date.getMonth(),
            day: day.date.getDate(),
            year: day.date.getFullYear()
        });

        // Assigns Closed Days For Past Dates Without Events
        if(day.dayInPast) return () => {};
    };

    const navigateBackInCalendar = () => {
        setActiveView('calendar');
    };

    const closeBookingRequestDialog = useCallback(() => setOpenDialog(false), []);

    useEffect(() => {
        if(loadingEvents) {
            fetchEventsByPropertyIdAction(
                { pState: user } as ReadEventsByPropertyIdActionState,
                {
                    propertyId: pid
                }
            )
                .then((result) => {
                    if(result?.response?.events) {
                        setLoadingEvents(false);
                        setProcessingEvents(true);
                        compileEvents(result.response.events as unknown as []);
                    }
                })
                .catch(e => console.error(e));
        }
        if(loadingBookingRequests) {
            fetchBookingRequestsByPropertyIdAction(
                { pState: user } as ReadBookingRequestsByPropertyIdActionState,
                {
                    propertyId: pid
                }
            )
                .then((result) => {
                if(result?.response?.bookingRequests) {
                    setLoadingBookingRequests(false);
                    setBookingRequests(result.response.bookingRequests as []);
                }
            })
                .catch(e => console.error(e));
        }
        if(!loadingEvents && !processingEvents && !loadingBookingRequests) {
            const
                calendarProcessor = new CalendarEventProcessor(
                    events as ScheduledEvent[],
                    bookingRequests as BookingRequest[]
                ),
                calendarCoupledToEventsAndRequests = calendarProcessor.calendarWithProcessedEventsAndBookingRequests();
            setCalendar(calendarCoupledToEventsAndRequests as []);
        }
    }, [
        events, loadingEvents, processingEvents,
        bookingRequests, loadingBookingRequests,
        pid, user
    ]);

    return (
        <>
            {
                loadingEvents || processingEvents ? (
                    <LoaderSkeleton loadingMessage={"Loading Calendar Data"} additionalClassNames={"mr-15"} />
                ) : (
                    <Card className="cal-device gap-0" data-calendar-tag="top">
                        <CardHeader className={"cal-header"}>
                            <div className="cal-bar">
                                {
                                    activeView !== "calendar" &&
                                    (
                                        <div key={"schedule-view-back-btn"}>
                                            <button
                                                onClick={() => navigateBackInCalendar()}
                                                aria-label="Toggle calendar view"
                                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                            >
                                                <ChevronLeft />
                                            </button>
                                        </div>
                                    )
                                }

                                <div className="flex items-center gap-4">
                                    {
                                        activeView === 'calendar' ? (
                                            <div className={`text-2xl cal-title`}>
                                                18 Month Calendar
                                            </div>
                                        ) : (
                                            <div className={`text-2xl cal-title`}>
                                                {viewingDay === "No Data" ? (viewingDay) : (viewingDay.toLocaleString('en-US', dfo))}
                                            </div>
                                        )
                                    }
                                </div>

                                <button
                                    aria-label="Search"
                                    className="p-2 rounded-full transition-colors"
                                    onClick={() => {}}
                                >
                                    <ClipboardList className="text-gray-600" />
                                </button>
                            </div>
                        </CardHeader>
                        {
                            activeView === 'calendar' && (
                                <div className="flex justify-between cal-week">
                                    {WEEKDAYS.map((day) => (
                                        <span key={day} className="w-[7.71vh] flex justify-center items-center font-bold cal-weekday">
                                            {day}
                                        </span>
                                    ))}
                                </div>
                            )
                        }
                        <CardContent className={"cal-app px-1 overflow-y-scroll"}>
                            {activeView === 'calendar' ? (
                                <div className="space-y-4">
                                    <div className="-calendar">
                                        <div className="grid grid-cols-7 gap-px">
                                            {
                                                !!calendar && calendar.map((week: unknown[], weekIndex: number) => {
                                                    return week.map((d, dayIndex: number) => {
                                                        const day = d as Day;
                                                        return (
                                                            <button
                                                                aria-label={day.ariaLabel}
                                                                key={`${weekIndex}_${dayIndex}`}
                                                                className={`aspect-square border text-sm border-gray-200 transparentBtn mt-0.25 ${compileClassNames({ day })}`}
                                                                onClick={assignCalendarAction({ day })}
                                                            >
                                                                {day.btnLabel}
                                                                {
                                                                    day.isFirstOfMonth && (
                                                                        <div
                                                                            data-month={`${day.date.getMonth()}`}
                                                                            className={`data-month-anchor data-month-${day.date.getMonth()}`}
                                                                        ></div>
                                                                    )
                                                                }
                                                            </button>
                                                        );
                                                    });
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="schedule">
                                    {
                                        <Card
                                            key={"someKey"}
                                            className={''}
                                        >
                                            <CardContent className={"w-full"}>
                                                {
                                                    (!!viewingEvents && viewingEvents.length > 0) &&
                                                    (viewingEvents.map((event, index, eventArray) => {
                                                        console.log("Event Array: ", eventArray);
                                                        const evt = event as unknown as ScheduledEvent;
                                                        const evtArray = eventArray as {
                                                            markedAsArrival: boolean;
                                                            markedAsRequestedBooking: boolean;
                                                            markedAsDeparture: boolean;
                                                            daysBetweenArrivalAndDeparture: number;
                                                            startDate: Date;
                                                            endDate: Date;
                                                            UserImprint?: Partial<UserImprint>;
                                                        }[];
                                                        return (
                                                            <div className={`flex ${index > 0 && 'py-15'}`} key={`evt_entry_${index}`}>
                                                                <div className={"flex mr-4"} key={`${evt.id}_viewing_${index}`}>
                                                                    <span>Event</span>
                                                                </div>
                                                                <div className={"flex flex-col"}>
                                                                    <span>
                                                                        {
                                                                            evtArray[index].markedAsArrival && !evtArray[index]?.markedAsRequestedBooking ? (
                                                                                    `Expected Arrival - Booked For ${evtArray[index].daysBetweenArrivalAndDeparture} Nights`
                                                                                ) :
                                                                                evtArray[index].markedAsDeparture && !evtArray[index]?.markedAsRequestedBooking ?
                                                                                    (
                                                                                        `Expected Departure - Concludes ${evtArray[index].daysBetweenArrivalAndDeparture} Night Stay`
                                                                                    ) : evtArray[index]?.markedAsRequestedBooking ? (
                                                                                        "Booking Requested - Pending PLA Approval"
                                                                                    ) : (
                                                                                        `Booked from ${datetimeConversionTo_String({
                                                                                            timestamp: evtArray[index].startDate as Date
                                                                                        })} to ${datetimeConversionTo_String({
                                                                                            timestamp: evtArray[index].endDate as Date
                                                                                        })}`
                                                                                    )
                                                                        }
                                                                    </span>
                                                                    <DropdownMenuSeparator className={"mb-3"} />
                                                                    {
                                                                        !evtArray[index]?.markedAsRequestedBooking && (
                                                                            <span>
                                                                                Booking Source - {evtArray[index]?.UserImprint?.fullName}&#39;s ics - ({evtArray[index]?.UserImprint?.appRole})
                                                                            </span>
                                                                        )
                                                                    }
                                                                    {
                                                                        evtArray[index]?.markedAsRequestedBooking && (
                                                                            <span>
                                                                                {
                                                                                    evtArray[index].daysBetweenArrivalAndDeparture} Day Stay - {
                                                                                evtArray[index].markedAsArrival ? ("Arrival") : evtArray[index].markedAsDeparture ? ("Departure") : (`Arrival on ${datetimeConversionTo_String({
                                                                                    timestamp: evtArray[index].startDate as Date
                                                                                })}, and Departure on ${datetimeConversionTo_String({
                                                                                    timestamp: evtArray[index].endDate as Date
                                                                                })}`)
                                                                            }
                                                                            </span>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }))
                                                }
                                            </CardContent>
                                        </Card>
                                    }
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )
            }
            <ShowDialog
                dialogTitle={"Send A Booking Request"}
                dialogDescription={"Would you like to send a booking request to the Primary Listing Agent? Use the form below to get started!"}
                dialogOpened={openDialog}
                handleDialogClose={setOpenDialog}
            >
                <BookingRequestForm
                    propertyId={pid}
                    propertyName={"property.name"}
                    bookingRequestDate={bookingRequestDate as Date}
                    user={user}
                    closeBookingRequestDialog={closeBookingRequestDialog}
                />
            </ShowDialog>
        </>
    );
}