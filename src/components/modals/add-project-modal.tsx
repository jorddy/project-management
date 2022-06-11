import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, projectSchema } from "@/shared/project-schema";
import { trpc } from "@/utils/trpc";
import Button from "../core/button";
import BaseModal from "./base-modal";
import StatusAutocomplete from "../autocomplete/status-autocomplete";
import ClientAutocomplete from "../autocomplete/client-autocomplete";

export default function AddProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const ctx = trpc.useContext();
  const clients = trpc.useQuery(["clients.findAll"]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control
  } = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema)
  });

  const createProject = trpc.useMutation(["projects.create"], {
    onMutate: data => {
      const previousProjects = ctx.getQueryData(["projects.findAll"]);

      // Optimistic update
      ctx.setQueryData(["projects.findAll"], old => [...old!, data] as any);

      setIsOpen(false);
      return { previousProjects };
    },
    onError: (error, data, context) => {
      // Fall back if there's an error
      ctx.setQueryData(["projects.findAll"], context?.previousProjects!);
    },
    onSettled: () => {
      // Invalidate just in case
      ctx.invalidateQueries(["clients.findAll"]);
      reset();
    }
  });

  if (clients.isLoading) return null;
  if (clients.isError) return <p>Something went wrong!</p>;

  return (
    <>
      <Button projectButton={true} onClick={() => setIsOpen(true)} />

      <BaseModal title='Add Project' isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='p-6'>
          <form
            id='create-project'
            onSubmit={handleSubmit(data => console.log(data))}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-2'>
              <label htmlFor='name'>Name:</label>
              <input
                {...register("name")}
                className='border p-1 border-gray-300 bg-pink-50'
              />
              {errors?.name && (
                <p className='text-red-600'>{errors?.name.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                {...register("description")}
                className='border p-1 border-gray-300 bg-pink-50'
              />
              {errors?.description && (
                <p className='text-red-600'>{errors?.description.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='status'>Status:</label>
              <Controller
                name='status'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StatusAutocomplete
                    status={["In Progress", "Not Started", "Completed"]}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              {errors?.status && (
                <p className='text-red-600'>{errors?.status.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='status'>Clients:</label>
              <Controller
                name='client'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ClientAutocomplete
                    clients={clients.data!}
                    value={value?.connect?.id}
                    onChange={onChange}
                  />
                )}
              />
              {errors?.status && (
                <p className='text-red-600'>{errors?.status.message}</p>
              )}
            </div>
          </form>
        </div>

        <div
          className='p-6 flex justify-end items-center gap-4
          border-t border-t-gray-200'
        >
          <button
            onClick={() => setIsOpen(false)}
            disabled={createProject.isLoading}
            className='bg-gray-200 px-4 py-2 rounded-md
            transition hover:bg-gray-300 disabled:opacity-60'
          >
            Cancel
          </button>

          <button
            type='submit'
            form='create-project'
            className='bg-pink-400 text-white flex items-center gap-2 
            px-4 py-2 rounded-md transition hover:bg-pink-600 disabled:opacity-60'
          >
            {createProject.isLoading ? "Creating..." : "Create project"}
          </button>
        </div>
      </BaseModal>
    </>
  );
}
