import { ArrowPathIcon } from '@heroicons/react/24/outline'; //ok
import clsx from 'clsx'; //ok
import { lusitana } from '@/app/ui/fonts'; //ok
import { formatDateToLocal} from '@/app/lib/utils'; //ok
import { fetchLatestLoans } from '@/app/lib/data'; //done

export default async function LatestLoans() { // Remove props
  const latestLoans = await fetchLatestLoans();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Ultimos Empréstimos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {latestLoans.map((loan, i) => {
            return (
              <div
                key={loan.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">                  
                  <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                      {loan.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {loan.classroom}
                    </p>                    
                  </div>
                </div>
                <div className="flex items-center">                  
                  <div className="min-w-0">                  
                    <p className="truncate text-sm text-center font-semibold md:text-base">
                      {loan.book}
                    </p>
                    <p className="hidden text-sm text-center text-gray-500 sm:block">
                      {loan.author}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-semibold md:text-base`}
                >
                  {formatDateToLocal(loan.return_date)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Atualizado agora mesmo</h3>
        </div>
      </div>
    </div>
  );
}
