import Pagination from '@/app/ui/books/pagination'; //done
import Search from '@/app/ui/search'; //done
import Table from '@/app/ui/books/table'; //done
import { CreateBook } from '@/app/ui/books/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { BooksTableSkeleton } from '@/app/ui/skeletons'; //done
import { fetchBooksPages } from '@/app/lib/data'; //done
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Livros',
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

  const totalPages = await fetchBooksPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Livros</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Encontrar livros..." />
        <CreateBook />
      </div>
      <Suspense key={query + currentPage} fallback={<BooksTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}