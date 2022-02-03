import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    'w-[3.2rem] h-[3.2rem] border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold',
    {
      'bg-white border-slate-200 dark:bg-zinc-900': !status,
      'bg-slate-400 text-white border-slate-400 dark:bg-zinc-600': status === 'absent',
      'bg-green-500 text-white border-green-500': status === 'correct',
      'bg-yellow-500 text-white border-yellow-500': status === 'present',
    },
    {
      'border-gray-300' : !status && value != null
    }
  )

  return (
    <>
      <div className={classes}>{value}</div>
    </>
  )
}
