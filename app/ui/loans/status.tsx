import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline'; //ok
import clsx from 'clsx'; //ok

export default function LoanStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pendente',
          'bg-green-500 text-white': status === 'devolvido',
        },
      )}
    >
      {status === 'pendente' ? (
        <>
          Pendente
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'devolvido' ? (
        <>
          Devolvido
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
