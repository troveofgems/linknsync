interface FederalHoliday {
    name: string;
    date: string;
    type: 'federal' | 'observance';
    alsoObservedAs?: string;
}

export const federalHolidayListUtils: FederalHoliday[] = [
    {
        name: "New Year's Day",
        date: "1/1",
        type: "federal"
    },
    {
        name: "Birthday of Martin Luther King Jr.",
        date: "third Monday in January",
        type: "federal"
    },
    {
        name: "Presidents' Day",
        date: "third Monday in February",
        type: "federal",
        alsoObservedAs: "Washington's Birthday"
    },
    {
        name: "Memorial Day",
        date: "last Monday in May",
        type: "federal"
    },
    {
        name: "Juneteenth National Independence Day",
        date: "6/19",
        type: "federal"
    },
    {
        name: "Independence Day",
        date: "7/4",
        type: "federal"
    },
    {
        name: "Labor Day",
        date: "first Monday in September",
        type: "federal"
    },
    {
        name: "Columbus Day",
        date: "second Monday in October",
        type: "federal",
        alsoObservedAs: "Indigenous Peoples' Day"
    },
    {
        name: "Veterans Day",
        date: "11/11",
        type: "federal"
    },
    {
        name: "Thanksgiving Day",
        date: "fourth Thursday in November",
        type: "federal"
    },
    {
        name: "Christmas Day",
        date: "12/25",
        type: "federal"
    }
];