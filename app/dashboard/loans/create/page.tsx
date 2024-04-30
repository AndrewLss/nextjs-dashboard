import Form from '@/app/ui/loans/create-form'; //done
import Breadcrumbs from '@/app/ui/loans/breadcrumbs'; //ok
import { fetchBooks, fetchStudents } from '@/app/lib/data'; //done
import { Metadata } from 'next'; //ok
 
export const metadata: Metadata = {
  title: 'Novo emprestimo',
};
 
export default async function Page() {
  const books = await fetchBooks();
  const students = await fetchStudents();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Emprestimos', href: '/dashboard/loans' },
          {
            label: 'Novo Emprestimo',
            href: '/dashboard/loans/create',
            active: true,
          },
        ]}
      />
      <Form students={students} books={books} />
    </main>
  );
}