export function daysFromToday(date) {
    const inputDate = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
     const diffTime = inputDate.getTime() - today.getTime();

    if (diffTime < 0) {
        return -1;
    }

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}