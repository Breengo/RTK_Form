function getDiffedYear(ageDiff: number, pivDate?: string) {
  const today = pivDate ? new Date(pivDate) : new Date();
  let dd = today.getDate().toString();
  let mm = (today.getMonth() + 1).toString(); // January starts at 0, so we add 1 to get  the correct number for the month.
  let yyyy = today.getFullYear() + ageDiff;

  if (+dd < 10) dd = "0" + dd;
  if (+mm < 10) mm = "0" + mm;
  const date = `${yyyy}-${mm}-${dd}`;
  return date;
}

export default getDiffedYear;
