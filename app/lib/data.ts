import { sql } from '@vercel/postgres';
import {
  Book,
  BookField,
  BookForm,
  Chart,  
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  LatestLoan,
  LoanForm,
  LoansTable,
  Student,
  StudentField,
  StudentForm,
  User,
  Revenue,  
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {    

    const data = await sql<Revenue>`SELECT * FROM revenue`;    

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchBarChart() {  
  noStore();
  try {
    
    const data = await sql<Chart>`SELECT * FROM bar_chart`;

    return data.rows;
  }
  catch (error) {
    console.error('Erro de Banco de Dados:', error);
    throw new Error('Falha em Buscar Dados.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchLatestLoans() {
  noStore();
  try {
    const data = await sql<LatestLoan>`
      SELECT loans.return_date, loans.status, books.book, books.author, students.name, students.classroom, loans.id
      FROM loans
      INNER JOIN students ON loans.student_id = students.id
      INNER JOIN books ON loans.book_id = books.id
      WHERE loans.status = 'pendente'
      ORDER BY loans.return_date ASC`;
      //LIMIT 5

    const latestLoans = data.rows.map((loan) => ({
      ...loan,
    }));
    return latestLoans;
  } catch (error) {
    console.error('Erro de Banco de Dados:', error);
    throw new Error('Falha em buscar ultimos Empréstimos.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const bookCountPromise = sql`SELECT COUNT(*) FROM books`;
    const studentsCountPromise = sql`SELECT COUNT(*) FROM students`;
    const loanStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'devolvido' THEN 1 ELSE 0 END) AS "devolvido",
         SUM(CASE WHEN status = 'pendente' THEN 1 ELSE 0 END) AS "pendente"
         FROM loans`;

    const data = await Promise.all([
      bookCountPromise,
      studentsCountPromise,
      loanStatusPromise,
    ]);

    const numberOfBooks = Number(data[0].rows[0].count ?? '0');
    const numberOfStudents = Number(data[1].rows[0].count ?? '0');
    const totalReturnedLoans = Number(data[2].rows[0].devolvido ?? '0');
    const totalPendingLoans = Number(data[2].rows[0].pendente ?? '0');

    return {
      numberOfStudents,
      numberOfBooks,
      totalReturnedLoans,
      totalPendingLoans,
    };
  } catch (error) {
    console.error('Erro de Banco de Dados:', error);
    throw new Error('Falha em buscar dados de cartoes.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredLoans(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const loans = await sql<LoansTable>`
      SELECT
        loans.id,
        loans.loan_date,
        loans.return_date,
        loans.status,
        loans.observation,
        students.name,        
        students.classroom,
        books.book,        
        books.box
      FROM loans
      INNER JOIN students ON loans.student_id = students.id
      INNER JOIN books ON loans.book_id = books.id
      WHERE
        students.name ILIKE ${`%${query}%`} OR
        students.age::text ILIKE ${`%${query}%`} OR
        students.classroom ILIKE ${`%${query}%`} OR
        books.book ILIKE ${`%${query}%`} OR        
        books.box ILIKE ${`%${query}%`} OR
        loans.loan_date::text ILIKE ${`%${query}%`} OR
        loans.return_date::text ILIKE ${`%${query}%`} OR
        loans.status ILIKE ${`%${query}%`}
      ORDER BY loans.status DESC, loans.loan_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return loans.rows;
  } catch (error) {
    console.error('Erro de banco de Dados:', error);
    throw new Error('Falha em buscar Empréstimos.');
  }
}

export async function fetchFilteredBooks(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const books = await sql<Book>`
      SELECT
        id,
        book,
        author,
        amt_available,
        observation,
        inclusion_date,
        box      
      FROM books      
      WHERE
        books.book ILIKE ${`%${query}%`} OR
        books.author ILIKE ${`%${query}%`} OR
        books.amt_available::text ILIKE ${`%${query}%`} OR        
        books.observation ILIKE ${`%${query}%`} OR
        books.inclusion_date::text ILIKE ${`%${query}%`} OR
        books.box ILIKE ${`%${query}%`}
      ORDER BY books.book ASC     
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return books.rows;
  } catch (error) {
    console.error('Erro de Banco de Dados:', error);
    throw new Error('Falha em buscar livros.');
  }
}

export async function fetchFilteredStudents(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const students = await sql<Student>`
      SELECT
        id,
        name,
        age,
        classroom,
        inclusion_date,
        observation
      FROM students      
      WHERE
      students.name ILIKE ${`%${query}%`} OR
      students.age::text ILIKE ${`%${query}%`} OR
      students.classroom ILIKE ${`%${query}%`} OR
      students.inclusion_date::text ILIKE ${`%${query}%`} OR
      students.observation ILIKE ${`%${query}%`}
      ORDER BY students.name ASC     
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return students.rows;
  } catch (error) {
    console.error('Erro de Banco de Dados:', error);
    throw new Error('Falha em encontrar alunos.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchLoansPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)        
      FROM loans
      INNER JOIN students ON loans.student_id = students.id
      INNER JOIN books ON loans.book_id = books.id
      WHERE
        students.name ILIKE ${`%${query}%`} OR
        students.classroom ILIKE ${`%${query}%`} OR
        books.book ILIKE ${`%${query}%`} OR
        books.author ILIKE ${`%${query}%`} OR
        books.box ILIKE ${`%${query}%`} OR
        loans.loan_date::text ILIKE ${`%${query}%`} OR
        loans.return_date::text ILIKE ${`%${query}%`} OR
        loans.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Erro de Banco de Dados:', error);
    throw new Error('Falha em buscar o total de empréstimos.');
  }
}

export async function fetchBooksPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM books    
    WHERE
      books.book ILIKE ${`%${query}%`} OR
      books.author ILIKE ${`%${query}%`} OR
      books.amt_available::text ILIKE ${`%${query}%`} OR
      books.observation ILIKE ${`%${query}%`} OR
      books.inclusion_date::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Erro de Banco de Dados:', error);
    throw new Error('Falha em buscar o numero total de livros');
  }
}

export async function fetchStudentsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM students    
    WHERE
      students.name ILIKE ${`%${query}%`} OR
      students.age::text ILIKE ${`%${query}%`} OR
      students.classroom ILIKE ${`%${query}%`} OR
      students.inclusion_date::text ILIKE ${`%${query}%`} OR
      students.observation ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Erro de Banco de Dados:', error);
    throw new Error('Falha em buscar o numero total de alunos');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    
    console.log(invoice); // Invoice is an empty array []
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchBookById(id: string) {
  noStore();
  try {
    const data = await sql<BookForm>`
      SELECT
        books.id,
        books.book,
        books.author,
        books.amt_available,
        books.observation,
        books.box
      FROM books
      WHERE books.id = ${id};
    `;    

    const book = data.rows.map((book) => ({
      ...book,
    }));
    
    console.log(book); // Book is an empty array []
    return book[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch book.');
  }
}

export async function fetchLoanById(id: string) {
  noStore();
  try {
    const data = await sql<LoanForm>`
      SELECT
        loans.id,
        loans.book_id,
        loans.student_id,
        loans.loan_date,
        loans.return_date,
        loans.status,
        loans.observation        
      FROM loans      
      WHERE loans.id = ${id};
    `;

    const loan = data.rows.map((loan) => ({
      ...loan,     
    }));
    
    console.log(loan); // Loan is an empty array []
    return loan[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch loan.');
  }
}

export async function fetchStudentById(id: string) {
  noStore();
  try {
    const data = await sql<StudentForm>`
      SELECT
        students.id,
        students.name,
        students.age,
        students.classroom,
        students.observation
      FROM students
      WHERE students.id = ${id};
    `;    

    const student = data.rows.map((student) => ({
      ...student,
    }));
    
    console.log(student); // Book is an empty array []
    return student[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch student.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchBooks() {
  noStore();
  try {
    const data = await sql<BookField>`
      SELECT
        id,
        book
      FROM books
      ORDER BY book ASC
    `;

    const books = data.rows;
    return books;
  } catch (err) {
    console.error('Erro de Banco de Dados:', err);
    throw new Error('Falha em buscar livros.');
  }
}

export async function fetchStudents() {
  try {
    noStore();
    const data = await sql<StudentField>`
      SELECT
        id,
        name
      FROM students
      ORDER BY name ASC
    `;

    const students = data.rows;
    return students;
  } catch (err) {
    console.error('Erro de Banco de Dados:', err);
    throw new Error('Falha em buscar alunos.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
