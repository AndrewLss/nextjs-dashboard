import { generateYAxis } from '@/app/lib/utils'; //ok
import { CalendarIcon } from '@heroicons/react/24/outline'; //ok
import { lusitana } from '@/app/ui/fonts'; //ok
import { fetchBarChart } from '@/app/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function BarChart() { // Make component async, remove the props
  const amount = await fetchBarChart(); // Fetch data inside the component
  
  const chartHeight = 350;
  // NOTE: comment in this code when you get to this point in the course

  const { yAxisLabels, topLabel } = generateYAxis(amount);

  if (!amount || amount.length === 0) {
    return <p className="mt-4 text-gray-400">Sem dados disponiveis.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Relatório de Quantidades
      </h2>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-8 mt-0 grid grid-cols-7 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {amount.map((weekday) => (
            <div key={weekday.weekday} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-green-200"
                style={{
                  height: `${(chartHeight / topLabel) * weekday.amount}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {weekday.weekday}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Quantidades por dia</h3>
        </div>
      </div>
    </div>
  );
}
