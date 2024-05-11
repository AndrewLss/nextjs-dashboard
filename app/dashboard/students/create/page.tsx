import Form from '@/app/ui/students/create-form';
import Breadcrumbs from '@/app/ui/students/breadcrumbs'; //ok
import { Metadata } from 'next'; //ok 
 
export const metadata: Metadata = {
  title: 'Novo Aluno',
};
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Alunos', href: '/dashboard/students' },
          {
            label: 'Novo Aluno',
            href: '/dashboard/students/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}