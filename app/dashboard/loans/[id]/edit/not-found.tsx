import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Nao Encontrado</h2>
      <p>Nao foi possivel encontrar o registro solicitado.</p>
      <Link
        href="/dashboard/loans"
        className="mt-4 rounded-md bg-green-700 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Voltar
      </Link>
    </main>
  );
}