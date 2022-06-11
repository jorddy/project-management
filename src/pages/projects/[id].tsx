import ClientInfo from "@/components/client/client-info";
import Spinner from "@/components/core/spinner";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Project() {
  const router = useRouter();
  const project = trpc.useQuery([
    "projects.findById",
    { id: router.query.id as string }
  ]);

  if (project.isLoading) {
    return <Spinner />;
  }

  if (project.isError) {
    return <p>Something went wrong!</p>;
  }

  return (
    <>
      <section className='max-w-md mx-auto border border-gray-400 rounded-md p-8'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>{project.data?.name}</h1>
          <Link href='/'>
            <a className='bg-gray-100 px-4 py-2 rounded-md'>Back</a>
          </Link>
        </div>

        <p>{project.data?.description}</p>

        <div className='mt-6 space-y-1'>
          <h2 className='text-xl'>Project Status:</h2>
          <p>{project.data?.status}</p>
        </div>

        <ClientInfo client={project.data?.client} />
      </section>
    </>
  );
}
