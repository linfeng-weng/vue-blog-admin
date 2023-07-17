import dayjs from 'dayjs'

export function formatDate(date, format) {
    const Date = dayjs(date).format(format)
    return Date
}
