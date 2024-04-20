import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteBook } from '@/app/lib/actions'; //done

export function CreateBook() {
  return (
    <Link
      href="/dashboard/books/create"
      className="flex h-10 items-center rounded-lg bg-green-800 px-4 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Cadastrar Livro</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateBook({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/books/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteBook({ id }: { id: string }) {
  const deleteBookWithId = deleteBook.bind(null, id);
  return (
    <form action={deleteBookWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Excluir</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
