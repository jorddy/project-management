import { Client } from "@prisma/client";
import { TrashIcon } from "@heroicons/react/solid";
import { trpc } from "@/utils/trpc";

export default function ClientRow({ client }: { client: Client }) {
  const ctx = trpc.useContext();
  const deleteClient = trpc.useMutation(["clients.delete"], {
    onSuccess: () => ctx.invalidateQueries(["clients.findAll"])
  });

  return (
    <tr className='border-b border-b-gray-200 hover:bg-gray-100'>
      <td className='table-cell'>{client.name}</td>
      <td className='table-cell'>{client.email}</td>
      <td className='table-cell'>{client.phone}</td>
      <td className='table-cell text-right  '>
        <button
          onClick={() => deleteClient.mutate({ id: client.id })}
          disabled={deleteClient.isLoading}
          className='bg-red-600 p-2 rounded-md text-white transition hover:bg-red-800 disabled:opacity-40'
        >
          <TrashIcon className='w-5 h-5 text-white' />
        </button>
      </td>
    </tr>
  );
}
