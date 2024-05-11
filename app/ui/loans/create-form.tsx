'use client';

import { BookField, StudentField } from '@/app/lib/definitions'; //done
import Link from 'next/link'; //ok 
import {
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  CalendarIcon,  
  CheckIcon,
  ClipboardIcon,
  ClockIcon,
  UserCircleIcon,   
} from '@heroicons/react/24/outline'; //done
import { Button } from '@/app/ui/button'; //ok
import { createLoan } from '@/app/lib/actions'; //done
import { useFormState } from 'react-dom'; //ok

export default function Form({ students, books }: { students: StudentField[], books: BookField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createLoan, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nome do Aluno */}
        <div className="mb-4">
          <label htmlFor="student_Id" className="mb-2 block text-sm font-medium">
            Selecione um aluno
          </label>
          <div className="relative">
            <select
              id="student_Id"
              name="student_Id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="student-error"
            >
              <option value="" disabled>
                Selecione um aluno
              </option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="student-error" aria-live="polite" aria-atomic="true">
            {state.errors?.student_Id &&
              state.errors.student_Id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Nome do Livro */}
        <div className="mb-4">
          <label htmlFor="book_Id" className="mb-2 block text-sm font-medium">
            Selecione um livro
          </label>
          <div className="relative">
            <select
              id="book_Id"
              name="book_Id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="book-error"
            >
              <option value="" disabled>
                Selecione um livro
              </option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.book}
                </option>
              ))}
            </select>
            <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="book-error" aria-live="polite" aria-atomic="true">
            {state.errors?.book_Id &&
              state.errors.book_Id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Data do Empréstimo */}
        <div className="mb-4">
          <label htmlFor="loan_date" className="mb-2 block text-sm font-medium">
            Selecione a data do Empréstimo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="loan_date"
                name="loan_date"
                type="date"                
                placeholder="Selecione a data do empréstimo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="loan_date-error"              
              />
              <ArrowRightOnRectangleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="loan_date-error" aria-live="polite" aria-atomic="true">
              {state.errors?.loan_date &&
                state.errors.loan_date.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Data da Devolução */}
        <div className="mb-4">
          <label htmlFor="return_date" className="mb-2 block text-sm font-medium">
            Selecione a data de Devolução
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="return_date"
                name="return_date"
                type="date"                
                placeholder="Selecione a data de Devolução"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="return_date-error"              
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="return_date-error" aria-live="polite" aria-atomic="true">
              {state.errors?.return_date &&
                state.errors.return_date.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Situação do Empréstimo */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Selecione a Situação
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pendente"
                  name="status"
                  type="radio"
                  value="pendente"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pendente"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pendente <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="devolvido"
                  name="status"
                  type="radio"
                  value="devolvido"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="devolvido"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Devolvido <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

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
      </div>        

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/loans"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Criar Empréstimo</Button>
      </div>
    </form>
  );
}
