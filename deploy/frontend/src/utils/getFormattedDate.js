export const getFormattedDate = (isoDate) => {
    const date = new Date(isoDate);

    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    return date.toLocaleString('ru-RU', options);
}