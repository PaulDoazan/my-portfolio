import { parseISO, format } from 'date-fns'

export default function Date({ dateString, fullDate, withHyphen }: { dateString: string, fullDate: boolean, withHyphen: boolean }) {
  const date = parseISO(dateString)
  const myFormat = fullDate ? 'LLLL, yyyy' : 'LLLL';
  const hyphen = withHyphen ? ' - ' : '';
  return <time dateTime={dateString}>{format(date, myFormat)}{hyphen}</time>
}