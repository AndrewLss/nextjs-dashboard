import Form from '@/app/ui/books/create-form'; //done
import Breadcrumbs from '@/app/ui/books/breadcrumbs'; //ok
import { fetchBooks } from '@/app/lib/data'; //done
import { Metadata } from 'next'; //ok
 
export const metadata: Metadata = {
  title: 'Cadastrar Livro',
};
 
export default async function Page() {
  const books = await fetchBooks();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Livros', href: '/dashboard/books' },
          {
            label: 'Cadastrar Livro',
            href: '/dashboard/books/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}