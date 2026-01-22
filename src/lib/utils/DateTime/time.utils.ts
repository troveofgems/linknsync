/**
 * This File exports Custom Time Helpers For the App
 * */
export const timeConversionTo_AmPm = (timeStr: string) => {
    const [hour, minutes] = validateInputTime(timeStr);

    // No Errors: Continue With Calculation of AM/PM and adjust hours
    const isPm = hour >= 12;
    const displayHours = hour % 12 || 12;

    // Ensure minutes always show two digits
    const paddedMinutes = minutes.toString().padStart(2, '0');

    return `${displayHours}:${paddedMinutes} ${isPm ? 'PM' : 'AM'}`;
};

export const timeConversionTo_24Hour = (timeStr: string) => {
    const
        [time, period] = timeStr.split(' '),
        [hour, minutes] = validateInputTime(time);

    if (!period || !['AM', 'PM'].includes(period)) { // Handle invalid inputs
        throw new Error('Invalid period. Must be AM or PM');
    }

    let resultHours = hour;
    if (period === 'PM' && hour !== 12) {
        resultHours += 12;
    } else if (period === 'AM' && hour === 12) {
        resultHours = 0;
    }

    return `${resultHours.toString().padStart(2, '0')}:${minutes}`;
};

// Internal Helper Functions
const validateInputTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');

    if (!hours || !minutes) { // Handle invalid inputs
        throw new Error('Invalid time format. Expected format: HH:MM');
    }

    const // Parse Inputs and Check for Number Validity
        hourNum = parseInt(hours),
        minuteNum = parseInt(minutes);

    if (isNaN(hourNum) || isNaN(minuteNum)) {
        throw new Error('Invalid Hour or Minute. Must be a number');
    }

    return [hourNum, minuteNum];
};