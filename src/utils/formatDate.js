export default function formatDate(date){
  const dateString = date.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"});

  let [month,day,year] = dateString.split(" ")
  if(day.length === 2) { day = "0" + day}
  day = day.split(",")[0]
  return `${day} ${month} ${year}`
}