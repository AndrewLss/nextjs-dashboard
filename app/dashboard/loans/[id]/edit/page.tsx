import Form from '@/app/ui/loans/edit-form'; //done
import Breadcrumbs from '@/app/ui/loans/breadcrumbs'; //ok
import { fetchLoanById, fetchBooks, fetchStudents } from '@/app/lib/data'; //done
import { notFound } from 'next/navigation'; //ok
import { Metadata } from 'next'; //ok
 
export const metadata: Metadata = {
  title: 'Editar Empréstimo',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [loan, books, students] = await Promise.all([
        fetchLoanById(id),
        fetchBooks(),
        fetchStudents(),
      ]);

      if (!loan) {
        notFound();
      }
     
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Empréstimos', href: '/dashboard/loans' },
          {
            label: 'Editar Empréstimo',
            href: `/dashboard/loans/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form loan={loan} books={books} students={students} />
    </main>
  );
}