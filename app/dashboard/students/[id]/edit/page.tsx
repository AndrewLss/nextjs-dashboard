import Form from '@/app/ui/students/edit-form'; //done
import Breadcrumbs from '@/app/ui/students/breadcrumbs'; //ok
import { fetchStudentById} from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Editar Livro',
};
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const student = await fetchStudentById(id);

      if (!student) {
        notFound();
      }
     
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Livros', href: '/dashboard/students' },
          {
            label: 'Editar Aluno',
            href: `/dashboard/students/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form student={student} />
    </main>
  );
}