'use client';

import { StudentForm } from '@/app/lib/definitions'; //done
import {
  CalendarIcon,  
  ClipboardIcon,
  BuildingLibraryIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'; //done
import Link from 'next/link'; //ok
import { Button } from '@/app/ui/button'; //ok
import { updateStudent } from '@/app/lib/actions'; //done
import { useFormState } from 'react-dom'; //ok

export default function EditStudentForm({ student }: { student: StudentForm }) {
  const initialState = { message: null, errors: {} };
  const updateStudentWithId = updateStudent.bind(null, student.id);
  const [state, dispatch] = useFormState(updateStudentWithId, initialState);
 
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Nome do Aluno */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Insira o Nome Completo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"                
                placeholder="Nome do Aluno"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                defaultValue={student.name}              
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Idade */}
        <div className="mb-4">
          <label htmlFor="age" className="mb-2 block text-sm font-medium">
            Insira a idade
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="age"
                name="age"
                type="number"
                step="1"
                placeholder="Insira a idade"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="age-error"
                defaultValue={student.age}              
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="age-error" aria-live="polite" aria-atomic="true">
              {state.errors?.age &&
                state.errors.age.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Classe/Sala */}
        <div className="mb-4">
          <label htmlFor="classroom" className="mb-2 block text-sm font-medium">
            Insira a classe/sala
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="classroom"
                name="classroom"
                type="text"                
                placeholder="Classe ou sala"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="classroom-error"
                defaultValue={student.classroom}              
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="classroom-error" aria-live="polite" aria-atomic="true">
              {state.errors?.classroom &&
                state.errors.classroom.map((error: string) => (
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
                defaultValue={student.observation}              
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
          href="/dashboard/students"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Aluno</Button>
      </div>
    </form>
  );
}
