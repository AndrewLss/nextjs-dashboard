import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline'; //ok
import clsx from 'clsx'; //ok

export default function LoanStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'returned',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pendente
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'returned' ? (
        <>
          Devolvido
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
