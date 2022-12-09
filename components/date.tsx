import { parseISO, format } from 'date-fns'

export default function Date({ dateString }: { dateString: string }) {
  console.log(dateString);
  
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL, yyyy')}</time>
}