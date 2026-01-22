import {ScheduleType} from "@prisma/client";
export interface TimeLocks {
    for_CRUD_Ops: {
        orgSchedule: ScheduleType,
        constrainedActions: {
            updateICal: {
                permissions: string[];
            },
            deleteICal: {
                permissions: string[];
            },
        }
    },
    checkIfActionIsLocked?: (scheduleType: ScheduleType, lastUpdate: Date) => boolean;
}

export const TimeLocksOnActions = (() => {
    const checkIfActionIsLocked = (scheduleType: ScheduleType, lastUpdate: Date) => {
        let actionIsTimeLocked = false;
        const time = new Date();
        if(scheduleType === ScheduleType.HOURLY) {
            actionIsTimeLocked = time.getTime() > lastUpdate.getTime();
        } else if (scheduleType === ScheduleType.DAILY) {
            actionIsTimeLocked = time.getTime() > lastUpdate.getTime();
        } else { // something is wrong, do not allow the action to continue.
            return true;
        }
        return actionIsTimeLocked;
    }

    return {
        for_CRUD_Ops: {},
        checkIfActionIsLocked
    } as TimeLocks;
})();