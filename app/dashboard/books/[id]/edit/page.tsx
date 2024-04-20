import Form from '@/app/ui/books/edit-form';
import Breadcrumbs from '@/app/ui/books/breadcrumbs';
import { fetchBookById} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
 
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