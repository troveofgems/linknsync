const
    THREE_NUMERICAL = 3,
    TEN_NUMERICAL = 10,
    UNLIMITED_NUMERICAL = -1,
    limit = {
      options: {
         THREE: THREE_NUMERICAL,
         TEN: TEN_NUMERICAL,
         UNLIMITED: UNLIMITED_NUMERICAL,
      }
    };

export const LIMIT_REACHED_MESSAGE = "Your Organization has hit the limit on uploaded ical sources for this " +
    "particular property...please remove a source or upgrade your " +
    "plan.";

export const icalLimiter = (
    {
        limitAsString = "THREE",
        currentSourceCount
    }:
    {
        limitAsString?: string;
        currentSourceCount: number;
    }
) => {
    let limitReached = true;

    if(limitAsString === "THREE" || limitAsString === "TEN") {
        limitReached = (currentSourceCount >= limit.options[limitAsString]);
    }

    if(limitAsString === "UNLIMITED") {
        return false;
    }

    return limitReached;
};