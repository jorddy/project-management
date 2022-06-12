import ClientInfo from "@/components/client/client-info";
import Button from "@/components/core/button";
import Spinner from "@/components/core/spinner";
import EditProjectForm from "@/components/project/edit-project-form";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Project() {
  const router = useRouter();

  const project = trpc.useQuery([
    "projects.findById",
    { id: router.query.id as string }
  ]);

  const deleteProject = trpc.useMutation(["projects.delete"], {
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: () => router.push("/")
  });

  if (project.isLoading) {
    return <Spinner />;
  }

  if (project.isError) {
    return <p>Something went wrong!</p>;
  }

  return (
    <>
      <section className='max-w-md mx-auto border border-gray-400 rounded-md p-8 space-y-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>{project.data?.name}</h1>
          <Link href='/'>
            <a className='bg-gray-100 px-4 py-2 rounded-md'>Back</a>
          </Link>
        </div>

        <p>{project.data?.description}</p>

        <div className='mt-6 space-y-1'>
          <h2 className='text-xl font-semibold'>Project Status:</h2>
          <p>{project.data?.status}</p>
        </div>

        <ClientInfo client={project.data?.client} />

        <EditProjectForm project={project.data!} />

        <Button
          deleteProject={true}
          loading={deleteProject.isLoading}
          onClick={() => deleteProject.mutate({ id: project.data!.id })}
        />
      </section>
    </>
  );
}
