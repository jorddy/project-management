import { trpc } from "@/utils/trpc";
import ClientRow from "./client-row";
import Spinner from "../core/spinner";

export default function Clients() {
  const clients = trpc.useQuery(["clients.findAll"]);

  if (clients.isLoading) {
    return <Spinner />;
  }

  if (clients.isError) {
    return <p>Something went wrong!</p>;
  }

  return (
    <table className='table-auto w-full'>
      <thead>
        <tr className='text-left border-b border-b-gray-200 '>
          <th className='table-cell'>Name</th>
          <th className='table-cell'>Email</th>
          <th className='table-cell'>Phone</th>
          <th className='table-cell'></th>
        </tr>
      </thead>
      <tbody>
        {clients.data?.map(client => (
          <ClientRow key={client.id} client={client} />
        ))}
      </tbody>
    </table>
  );
}
