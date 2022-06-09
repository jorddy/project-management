import Link from "next/link";

export default function Header() {
  return (
    <nav className='bg-gray-100'>
      <div className='container mx-auto px-4 py-6'>
        <Link href='/'>
          <a className='text-xl text-pink-400 md:text-3xl'>
            <span className='font-bold'>プロジェクトかなり</span> (Project
            Management)
          </a>
        </Link>
      </div>
    </nav>
  );
}
