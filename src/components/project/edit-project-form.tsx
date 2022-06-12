import { Client, Project } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import {
  UpdateProjectSchema,
  updateProjectSchema
} from "@/shared/project-schema";
import toast from "react-hot-toast";
import StatusAutocomplete from "../autocomplete/status-autocomplete";
import Button from "../core/button";

export default function EditProjectForm({
  project
}: {
  project: Project & { client: Client };
}) {
  const ctx = trpc.useContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control
  } = useForm<UpdateProjectSchema>({
    resolver: zodResolver(updateProjectSchema)
  });

  const updateProject = trpc.useMutation(["projects.update"], {
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: () => {
      ctx.invalidateQueries(["projects.findById", { id: project.id }]);
      reset();
    }
  });

  console.log(errors);

  return (
    <>
      <h3 className='text-lg font-semibold'>Update Project Details:</h3>
      <form
        onSubmit={handleSubmit(data =>
          updateProject.mutate({ ...data, id: project.id })
        )}
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
          <label htmlFor='description'>Description:</label>
          <input
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
                value={value!}
                onChange={onChange}
              />
            )}
          />
          {errors?.status && (
            <p className='text-red-600'>{errors?.status.message}</p>
          )}
        </div>

        <Button type='submit'>Update Details</Button>
      </form>
    </>
  );
}
