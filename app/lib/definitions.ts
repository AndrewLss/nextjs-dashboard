// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Book = {
  id: string;
  book: string;
  author: string;
  amt_available: number;  
  observation: string;
  inclusion_date: string;
  box: string;
};

export type Student = {
  id: string;
  name: string;  
  age: number;
  classroom: string;
  inclusion_date: string;
  observation: string;  
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type Chart = {
  weekday: string;
  amount: number;  
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestLoan = {
  id: string;
  book: string;
  author: string;
  name: string;
  classroom: string;
  return_date: string;
  status: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type LoansTable = {
  id: string;
  book_id: string;
  student_id: string;
  name: string;   
  classroom: string; 
  book: string;
  box: string;
  loan_date: string;
  return_date: string;
  status: 'pendente' | 'devolvido';
  observation: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  age: number;
  classroom: string;
};

export type StudentsTableType = {
  id: string;
  name: string;
  age: number;
  classroom: string;
  total_loans: number;
  total_returns: number;
};

export type FormattedStudentsTable = {
  id: string;
  name: string;
  age: number;
  classroom: string;
  total_loans: number;
  total_returns: number;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type BookField = {
  id: string;
  book: string;  
};

export type StudentField = {
  id: string;
  name: string; 
};


export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type BookForm = {
  id: string;
  book: string;
  author: string;
  amt_available: number;
  observation: string;
  inclusion_date: string;
  box: string;
};

export type LoanForm = {
  id: string;
  book_id: string;
  student_id: string;  
  loan_date: string;
  return_date: string;
  status: 'pendente' | 'devolvido';
  observation: string;
};

export type StudentForm = {
  id: string;
  name: string;
  age: number;
  classroom: string;
  inclusion_date: string;
  observation: string;
};
