import CardWrapper from '@/app/ui/dashboard/cards'; //done
//import BarChart from '@/app/ui/dashboard/bar-chart'; //done
import LatestLoans from '@/app/ui/dashboard/latest-loans'; //done
import { lusitana } from '@/app/ui/fonts'; //ok
import { fetchCardData } from '@/app/lib/data'; //done
import { Suspense } from 'react';
import {
  BarChartSkeleton,
  LatestLoansSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons'; //done
import Image from 'next/image'; //ok
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
          <Image
          src="/Books.png"
          width={600}
          height={600}
          className="w-full md:col-span-2 py-3"
          alt="Ilustration of books"
          /> 
        <Suspense fallback={<LatestLoansSkeleton />}>
          <LatestLoans />
        </Suspense>
      </div>
      <p className='text-gray-500 text-xs py-5'> Imagem de <a target='new' href="https://pixabay.com/pt/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2022464">OpenClipart-Vectors</a> por <a target='new' href="https://pixabay.com/pt//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2022464">Pixabay</a></p>
    </main>
  );
}