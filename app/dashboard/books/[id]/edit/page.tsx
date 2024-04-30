import Form from '@/app/ui/books/edit-form'; //done
import Breadcrumbs from '@/app/ui/books/breadcrumbs'; //ok
import { fetchBookById} from '@/app/lib/data'; //done
import { notFound } from 'next/navigation'; //ok
import { Metadata } from 'next'; //ok
 
export const metadata: Metadata = {
  title: 'Editar Livro',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const book = await fetchBookById(id);

      if (!book) {
        notFound();
      }
     
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Livros', href: '/dashboard/books' },
          {
            label: 'Editar Livro',
            href: `/dashboard/books/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form book={book} />
    </main>
  );
}