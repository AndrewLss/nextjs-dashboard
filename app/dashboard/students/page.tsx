import Pagination from '@/app/ui/students/pagination'; //ok
import Search from '@/app/ui/search'; //ok
import Table from '@/app/ui/students/table'; //done
import { CreateStudent } from '@/app/ui/students/buttons'; //done
import { lusitana } from '@/app/ui/fonts'; //ok
import { Suspense } from 'react'; //ok
import { StudentsTableSkeleton } from '@/app/ui/skeletons'; //done
import { fetchStudentsPages } from '@/app/lib/data'; //done
import { Metadata } from 'next'; //done
 
export const metadata: Metadata = {
  title: 'Alunos',
};
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchStudentsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Alunos</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Encontrar alunos..." />
        <CreateStudent />
      </div>
      <Suspense key={query + currentPage} fallback={<StudentsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}