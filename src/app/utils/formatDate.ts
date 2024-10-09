
export const formatDate = (dateString: string, monthNames: string[]
): string => {
    const date = new Date(dateString);

    const day: number = date.getUTCDate();

    const month: string = monthNames[date.getUTCMonth()];

    const year: number = date.getUTCFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
}
