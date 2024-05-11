'use client';

import Link from 'next/link'; //ok
import {
  ArchiveBoxIcon,
  BookOpenIcon,  
  ClipboardIcon,  
  UserCircleIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/outline'; //done
import { Button } from '@/app/ui/button'; //ok
import { createBook } from '@/app/lib/actions'; //done
import { useFormState } from 'react-dom'; //ok

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBook, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">        
        {/* Nome do Livro */}
        <div className="mb-4">
          <label htmlFor="book" className="mb-2 block text-sm font-medium">
            Insira o Livro
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="book"
                name="book"
                type="text"                
                placeholder="Nome do Livro"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="book-error"              
              />
              <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="book-error" aria-live="polite" aria-atomic="true">
              {state.errors?.book &&
                state.errors.book.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Nome do Autor */}
        <div className="mb-4">
          <label htmlFor="author" className="mb-2 block text-sm font-medium">
            Insira o Autor
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="author"
                name="author"
                type="text"                
                placeholder="Nome do Autor"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="author-error"              
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="author-error" aria-live="polite" aria-atomic="true">
              {state.errors?.author &&
                state.errors.author.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Quantidade */}
        <div className="mb-4">
          <label htmlFor="amt_available" className="mb-2 block text-sm font-medium">
            Insira a Quantidade
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amt_available"
                name="amt_available"
                type="number"
                step="1"                
                placeholder="Quantidade disponível"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amt_available-error"              
              />
              <ViewColumnsIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="amt_available-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amt_available &&
                state.errors.amt_available.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Observação */}
        <div className="mb-4">
          <label htmlFor="observation" className="mb-2 block text-sm font-medium">
            Observações
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="observation"
                name="observation"
                type="text"                
                placeholder="Observações"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="observation-error"              
              />
              <ClipboardIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="observation-error" aria-live="polite" aria-atomic="true">
              {state.errors?.observation &&
                state.errors.observation.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Caixa */}
        <div className="mb-4">
          <label htmlFor="box" className="mb-2 block text-sm font-medium">
            Caixa
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="box"
                name="box"
                type="text"                
                placeholder="Caixa onde se encontra"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="box-error"              
              />
              <ArchiveBoxIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="box-error" aria-live="polite" aria-atomic="true">
              {state.errors?.box &&
                state.errors.box.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/books"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Cadastrar Livro</Button>
      </div>
    </form>
  );
}
