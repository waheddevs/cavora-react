import moment from "moment"

export const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

export function buildMonthGrid(monthMoment: moment.Moment) {
  const gridStart = monthMoment.clone().startOf("month").startOf("isoWeek")
  const days = []

  for (let index = 0; index < 42; index++) {
    days.push(gridStart.clone().add(index, "days"))
  }

  return days
}
