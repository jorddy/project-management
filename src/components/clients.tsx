import { trpc } from "@/utils/trpc";
import ClientCell from "./client-cell";
import ClientRow from "./client-row";
import Spinner from "./spinner";

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
          <ClientCell as='th'>Name</ClientCell>
          <ClientCell as='th'>Email</ClientCell>
          <ClientCell as='th'>Phone</ClientCell>
          <ClientCell as='th'></ClientCell>
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
