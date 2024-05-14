import { UpdateLoan, DeleteLoan } from '@/app/ui/loans/buttons'; //done
import LoanStatus from '@/app/ui/loans/status'; //done
import { formatDateToLocal } from '@/app/lib/utils'; //ok
import { fetchFilteredLoans } from '@/app/lib/data'; //done

export default async function LoansTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const loans = await fetchFilteredLoans(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {loans?.map((loan) => (
              <div
                key={loan.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">                      
                      <p>{loan.name}</p>
                    </div>                    
                    <p className="text-sm text-gray-500">{loan.classroom}</p>
                  </div>
                  <div>
                    <div className="mb-2 flex text-center">                      
                      <p>{loan.book}</p>
                    </div> 
                    <p className="text-sm text-center text-gray-500">{loan.box}</p>
                  </div>
                  <LoanStatus status={loan.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(loan.loan_date)}</p>
                    <p>{formatDateToLocal(loan.return_date)}</p>
                  </div>
                  <div className="mb-2 flex items-center">                      
                      <p>{loan.observation}</p>
                  </div> 
                  <div className="flex justify-end gap-2">
                    <UpdateLoan id={loan.id} />
                    <DeleteLoan id={loan.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Aluno
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Sala
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Livro
                </th>                
                <th scope="col" className="px-3 py-5 text-center font-medium">
                  Caixa
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Situação
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Emprestado em:
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Devolução em:
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Observação
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loans?.map((loan) => (
                <tr
                  key={loan.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">                      
                      <p>{loan.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {loan.classroom}
                  </td>
                  <td className="px-3 py-3">
                    {loan.book}
                  </td>                  
                  <td className="whitespace-nowrap text-center px-3 py-3">
                    {loan.box}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <LoanStatus status={loan.status} />
                  </td>
                  <td className="whitespace-nowrap text-center px-3 py-3">
                    {formatDateToLocal(loan.loan_date)}
                  </td>
                  <td className="whitespace-nowrap text-center px-3 py-3">
                    {formatDateToLocal(loan.return_date)}
                  </td>
                  <td className="px-3 py-3">
                    {loan.observation}
                  </td>                  
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateLoan id={loan.id} />
                      <DeleteLoan id={loan.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
