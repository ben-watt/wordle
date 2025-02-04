import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  status?: CharStatus
  onClick: (value: KeyValue) => void
}

export const Key = ({
  children,
  status,
  value,
  onClick,
}: Props) => {
  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 my-0.5 text-xs font-bold cursor-pointer',
    {
      'bg-slate-200 hover:bg-slate-300 active:bg-slate-400 dark:bg-zinc-600': !status,
      'bg-slate-400 text-white': status === 'absent',
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white':
        status === 'correct',
      'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white':
        status === 'present',
    }
  )

  return (
    <div
      style={{ height: '58px' }}
      className={classes + " flex flex-grow"}
      onClick={() => onClick(value)}
    >
      <div style={{ minWidth: '12px' }} className="text-center">{children || value}</div>
    </div>
  )
}
