export const getCurrentTS = () => new Date();

export const getTSModifier = (date: Date) => new Date(date);

export const modifyTSBy = (
    {
        years   = 0,
        months  = 0,
        days    = 0,
        minutes = 0,
        hours   = 0,
        seconds = 0,
        ts      = new Date()
    }: {
        years?: number,
        months?: number,
        days?: number,
        minutes?: number,
        hours?: number,
        seconds?: number,
        ts: Date
    }) => {
    ts.setFullYear(ts.getFullYear() + years);
    ts.setMonth(ts.getMonth() + months);
    ts.setDate(ts.getDate() + days);
    ts.setHours(ts.getHours() + hours);
    ts.setMinutes(ts.getMinutes() + minutes);
    ts.setSeconds(ts.getSeconds() + seconds);
    return ts;
};