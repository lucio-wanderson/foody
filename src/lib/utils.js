module.exports = {
    date(timestamp){
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        const hour = date.getUTCHours()
        const minute = date.getUTCMinutes()

        return {
            minute,
            hour,
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        }
    }
}