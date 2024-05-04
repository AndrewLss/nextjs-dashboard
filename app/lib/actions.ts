'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const FormSchemaBooks = z.object({
  id: z.string(),
  book: z.string().min(3, { 
    message: "Por favor insira o nome do livro" 
  }),
  author: z.string().min(3, { 
    message: "Por favor insira o autor" 
  }),
  amt_available: z.coerce.number()
  .gt(0, { message: 'Por favor insira uma quantidade maior que 0.' }),
  observation: z.string(),
  inclusion_date: z.string(),
  box: z.string().min(1, { 
    message: "Por favor insira a caixa onde se encontra" 
  }),   
});

const FormSchemaLoans = z.object({
  id: z.string(),
  book_Id: z.string({
    invalid_type_error: 'Por favor selecione o livro.',
  }),
  student_Id: z.string({
    invalid_type_error: 'Por favor selecione o aluno.',
  }),
  loan_date: z.string().min(8, { 
    message: 'Por favor insira a data do empréstimo.' 
  }),
  return_date: z.string().min(8, { 
    message: 'Por favor insira a data da devolução' 
  }),
  status: z.enum(['pendente', 'devolvido'], {
    invalid_type_error: 'Por favor selecione uma situação.',
  }),  
  observation: z.string(),
});

const FormSchemaStudent = z.object({
  id: z.string(),
  name: z.string().min(3, { 
    message: "Por favor insira o nome completo" }
  ),
  age: z.coerce.number()
  .gt(0, { message: 'Por favor insira a idade.' }),
  classroom: z.string().min(2, { 
    message: "Por favor insira a classe." }
  ),
  inclusion_date: z.string(),
  observation: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const CreateBook = FormSchemaBooks.omit({ id: true, amt_borrowed: true, inclusion_date: true });
const UpdateBook = FormSchemaBooks.omit({ id: true, amt_borrowed: true, inclusion_date: true });
const CreateLoan = FormSchemaLoans.omit({ id: true });
const UpdateLoan = FormSchemaLoans.omit({ id: true });
const CreateStudent = FormSchemaStudent.omit({ id: true, inclusion_date: true });
const UpdateStudent = FormSchemaStudent.omit({ id: true, inclusion_date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type StateBook = {
  errors?: {
    book?: string[];
    author?: string[];
    amt_available?: string[];
    observation?: string[];
    box?: string[];    
  };
  message?: string | null;
};

export type StateLoan = {
  errors?: {
    book_Id?: string[];
    student_Id?: string[];
    loan_date?: string[];
    return_date?: string[];
    status?: string[];
    observation?: string[];
  };
  message?: string | null;
};

export type StateStudent = {
  errors?: {
    name?: string[];
    age?: string[];
    classroom?: string[];
    observation?: string[];    
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
   // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function createBook(prevState: StateBook, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateBook.safeParse({
    book: formData.get('book'),
    author: formData.get('author'),
    amt_available: formData.get('amt_available'),
    observation:  formData.get('observation'),    
    box: formData.get('box'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltando campos obrigatorios. Falha em criar livro.',
    };
  }
 
  // Prepare data for insertion into the database
  const { book, author, amt_available, observation, box } = validatedFields.data;    
  const inclusion_date = new Date().toISOString().split('T')[0];
 
  try {
    await sql`
      INSERT INTO books (book, author, amt_available, observation, box, inclusion_date)
      VALUES (${book}, ${author}, ${amt_available}, ${observation}, ${box}, ${inclusion_date})
    `;
  } catch (error) {
    return {
      message: 'Erro de Banco de Dados: Falha em criar Livro.',
    };
  }
 
   // Revalidate the cache for the books page and redirect the user.
  revalidatePath('/dashboard/books');
  redirect('/dashboard/books');
}

export async function createLoan(prevState: StateLoan, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateLoan.safeParse({
    book_Id: formData.get('book_Id'),
    student_Id: formData.get('student_Id'),
    loan_date: formData.get('loan_date'),
    return_date: formData.get('return_date'),
    status: formData.get('status'),
    observation: formData.get('observation'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltando Campos. Falha em criar Empréstimo.',
    };
  }
 
  // Prepare data for insertion into the database
  const { book_Id, student_Id, loan_date, return_date, status, observation } = validatedFields.data;  
 
  try {
    await sql`
      INSERT INTO loans (book_id, student_id, loan_date, return_date, status, observation)
      VALUES (${book_Id}, ${student_Id}, ${loan_date}, ${return_date}, ${status}, ${observation})
    `;
  } catch (error) {
    return {
      message: 'Erro no Banco de Dados: Falha em Criar Empréstimo.'
        };
  }
 
   // Revalidate the cache for the loans page and redirect the user.
  revalidatePath('/dashboard/loans');
  redirect('/dashboard/loans');
}

export async function createStudent(prevState: StateStudent, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateStudent.safeParse({
    name: formData.get('name'),
    age: formData.get('age'),
    classroom: formData.get('classroom'),
    observation: formData.get('observation'),        
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltando campos obrigatorios. Falha em cadastrar aluno.',
    };
  }
 
  // Prepare data for insertion into the database
  const { name, age, classroom, observation } = validatedFields.data;  
  const inclusion_date = new Date().toISOString().split('T')[0];
 
  try {
    await sql`
      INSERT INTO students (name, age, classroom, inclusion_date, observation)
      VALUES (${name}, ${age}, ${classroom}, ${inclusion_date}, ${observation})
    `;
  } catch (error) {
    return {
      message: 'Erro de Banco de Dados: Falha em cadastrar aluno.',
    };
  }
 
   // Revalidate the cache for the books page and redirect the user.
  revalidatePath('/dashboard/students');
  redirect('/dashboard/students');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateBook(
  id: string,
  prevState: StateBook,
  formData: FormData,
) {
  const validatedFields = UpdateBook.safeParse({
    book: formData.get('book'),
    author: formData.get('author'),
    amt_available:formData.get('amt_available'),
    observation: formData.get('observation'),
    box: formData.get('box'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltando campos obrigatorios. Falha em editar livro.',
    };
  }
 
  const { book, author, amt_available, observation, box } = validatedFields.data;  
 
  try {
    await sql`
      UPDATE books
      SET book = ${book}, author = ${author}, amt_available=${amt_available}, observation=${observation}, box=${box}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Erro de Banco de Dados: Falha em editar livro' };
  }
 
  revalidatePath('/dashboard/books');
  redirect('/dashboard/books');
}

export async function updateLoan(
  id: string,
  prevState: StateLoan,
  formData: FormData,
) {
  const validatedFields = UpdateLoan.safeParse({
    book_Id: formData.get('book_Id'),
    student_Id: formData.get('student_Id'),
    loan_date: formData.get('loan_date'),
    return_date: formData.get('return_date'),
    status: formData.get('status'),
    observation: formData.get('observation'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltando Campos. Falha em Atualizar Empréstimo',
    };
  }
 
  const { book_Id, student_Id, loan_date, return_date, status, observation } = validatedFields.data; 
  
  try {
    await sql`
      UPDATE loans
      SET book_id = ${book_Id}, student_id = ${student_Id}, loan_date = TO_TIMESTAMP(${loan_date}, 'DD-MM-YYYY'), return_date = TO_TIMESTAMP(${return_date}, 'DD-MM-YYYY'), status = ${status}, observation = ${observation}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Erro de Banco de Dados: Falha em Atualizar Empréstimo' };
  }
 
  revalidatePath('/dashboard/loans');
  redirect('/dashboard/loans');
}

export async function updateStudent(
  id: string,
  prevState: StateStudent,
  formData: FormData,
) {
  const validatedFields = UpdateStudent.safeParse({
    name: formData.get('name'),
    age: formData.get('age'),
    classroom: formData.get('classroom'),
    observation: formData.get('observation'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltando campos obrigatorios. Falha em editar aluno.',
    };
  }
 
  const { name, age, classroom, observation } = validatedFields.data;  
 
  try {
    await sql`
      UPDATE students
      SET name = ${name}, age = ${age}, classroom=${classroom}, observation=${observation}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Erro de Banco de Dados: Falha em editar aluno' };
  }
 
  revalidatePath('/dashboard/students');
  redirect('/dashboard/students');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function deleteBook(id: string) {
  try {
    await sql`DELETE FROM books WHERE id = ${id}`;
    revalidatePath('/dashboard/books');
    return { message: 'Livro Excluido.' };
  } catch (error) {
    return { message: 'Erro de Banco de Dados: Falha em Excluir Livro.' };
  }
}

export async function deleteStudent(id: string) {
  try {
    await sql`DELETE FROM students WHERE id = ${id}`;
    revalidatePath('/dashboard/students');
    return { message: 'Aluno Excluido.' };
  } catch (error) {
    return { message: 'Erro de Banco de Dados: Falha em Excluir Aluno.' };
  }
}

export async function deleteLoan(id: string) {
  try {
    await sql`DELETE FROM loans WHERE id = ${id}`;
    revalidatePath('/dashboard/loans');
    return { message: 'Empréstimo Excluido.' };
  } catch (error) {
    return { message: 'Erro de Banco de Dados: Falha em Excluir Empréstimo.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}