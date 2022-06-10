import Link from "next/link";
import { ExclamationIcon } from "@heroicons/react/solid";

export default function NotFound() {
  return (
    <main className='grid place-content-center min-h-screen'>
      <section className='bg-gray-100 p-6 rounded-md border space-y-4'>
        <div className='flex items-center gap-2'>
          <ExclamationIcon className='w-8 h-8 text-red-600' />
          <h1 className='text-2xl font-bold'>
            404 - Sorry this page does not exist
          </h1>
        </div>
        <Link href='/'>
          <a className='block underline'>Go back home</a>
        </Link>
      </section>
    </main>
  );
}
