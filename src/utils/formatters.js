export function formatDate(date) {
	const options = { year: 'numeric', month: 'short', day: 'numeric' };

	const parsedDate = Date.parse(date);
	return new Intl.DateTimeFormat('en-US', options).format(parsedDate);
}

export function formatDateYearOnly(date) {
	const options = { year: 'numeric'};

	const parsedDate = Date.parse(date);
	return new Intl.DateTimeFormat('en-US', options).format(parsedDate);
}

export function formatDateWithoutYear(date) {
	const options = { month: 'short', day: 'numeric' };

	const parsedDate = Date.parse(date);
	return new Intl.DateTimeFormat('en-US', options).format(parsedDate);
}

export function formatSentence(str) {
	return str.slice(0, 51) + "..."
}

export function formatCompactNumber(n) {
  const formatter = Intl.NumberFormat('en', {notation: 'compact'})

  return formatter.format(n)
}

export function formatNumber(n) {
  const formatter = Intl.NumberFormat()

  return formatter.format(n)
}