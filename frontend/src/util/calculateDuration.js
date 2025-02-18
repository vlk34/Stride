export default function calculateDuration(startDate, endDate, isCurrent) {
  const start = new Date(startDate);
  const end = isCurrent ? new Date() : new Date(endDate);

  const yearDiff = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();

  let totalMonths = yearDiff * 12 + monthDiff;
  if (end.getDate() < start.getDate()) {
    totalMonths--;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let durationText = "";
  if (years > 0) {
    durationText += `${years} ${years === 1 ? "year" : "years"}`;
    if (months > 0) {
      durationText += ` ${months} ${months === 1 ? "month" : "months"}`;
    }
  } else if (months > 0) {
    durationText += `${months} ${months === 1 ? "month" : "months"}`;
  } else {
    durationText = "Less than a month";
  }

  return durationText;
}
