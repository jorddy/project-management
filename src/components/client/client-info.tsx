import { Client } from "@prisma/client";
import { ClipboardListIcon, MailIcon, PhoneIcon } from "@heroicons/react/solid";

export default function ClientInfo({ client }: { client: Client | undefined }) {
  return (
    <>
      <h3 className='mt-6 text-lg font-semibold'>Client Information:</h3>
      <ul className='mt-4 border border-gray-400 divide-y-2 divide-gray-300'>
        <li className='flex items-center gap-2 p-4'>
          <ClipboardListIcon className='w-6 h-6 text-gray-600' /> {client?.name}
        </li>
        <li className='flex items-center gap-2 p-4'>
          <MailIcon className='w-6 h-6 text-gray-600' /> {client?.email}
        </li>
        <li className='flex items-center gap-2 p-4'>
          <PhoneIcon className='w-6 h-6 text-gray-600' /> {client?.phone}
        </li>
      </ul>
    </>
  );
}
