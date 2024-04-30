import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'; // ok
import Link from 'next/link'; // ok
import { deleteLoan } from '@/app/lib/actions'; // done

export function CreateLoan() {
  return (
    <Link
      href="/dashboard/loans/create"
      className="flex h-10 items-center rounded-lg bg-green-800 px-4 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Novo emprestimo</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateLoan({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/loans/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Editar</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteLoan({ id }: { id: string }) {
  const deleteLoanWithId = deleteLoan.bind(null, id);
  return (
    <form action={deleteLoanWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Excluir</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
