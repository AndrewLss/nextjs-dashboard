import CardWrapper from '@/app/ui/dashboard/cards'; //done
import BarChart from '@/app/ui/dashboard/bar-chart';
import LatestLoans from '@/app/ui/dashboard/latest-loans'; //done
import { lusitana } from '@/app/ui/fonts'; //ok
import { fetchCardData } from '@/app/lib/data'; //done
import { Suspense } from 'react';
import {
  BarChartSkeleton,
  LatestLoansSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons'; //done
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Painel',
};
 
export default async function Page() {
  const {
    numberOfBooks,
    numberOfStudents,
    totalReturnedLoans,
    totalPendingLoans,
  } = await fetchCardData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Início
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<BarChartSkeleton />}>
          <BarChart />
        </Suspense>
        <Suspense fallback={<LatestLoansSkeleton />}>
          <LatestLoans />
        </Suspense>
      </div>
    </main>
  );
}