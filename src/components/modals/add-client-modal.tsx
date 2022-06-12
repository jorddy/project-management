import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { ClientSchema, clientSchema } from "@/shared/client-schema";
import BaseModal from "./base-modal";
import Button from "../core/button";
import toast from "react-hot-toast";

export default function AddClientModal() {
  const [isOpen, setIsOpen] = useState(false);
  const ctx = trpc.useContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema)
  });

  const createClient = trpc.useMutation(["clients.create"], {
    onMutate: data => {
      const previousClients = ctx.getQueryData(["clients.findAll"]);

      // Optimistic update
      ctx.setQueryData(["clients.findAll"], old => [...old!, data] as any);

      setIsOpen(false);
      return { previousClients };
    },
    onError: (error, data, context) => {
      // Fall back if there's an error
      ctx.setQueryData(["clients.findAll"], context?.previousClients!);
      toast.error(error.message);
    },
    onSettled: () => {
      // Invalidate just in case
      ctx.invalidateQueries(["clients.findAll"]);
      reset();
    }
  });

  return (
    <>
      <Button client={true} onClick={() => setIsOpen(true)} />

      <BaseModal title='Add Client' isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='p-6'>
          <form
            id='create-client'
            onSubmit={handleSubmit(data => createClient.mutate(data))}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-2'>
              <label htmlFor='name'>Name:</label>
              <input
                {...register("name")}
                required
                className='border p-1 border-gray-300 bg-pink-50'
              />
              {errors?.name && (
                <p className='text-red-600'>{errors?.name.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='email'>Email:</label>
              <input
                {...register("email")}
                type='email'
                required
                className='border p-1 border-gray-300 bg-pink-50'
              />
              {errors?.email && (
                <p className='text-red-600'>{errors?.email.message}</p>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='phone'>Phone:</label>
              <input
                {...register("phone")}
                required
                className='border p-1 border-gray-300 bg-pink-50'
              />
              {errors?.phone && (
                <p className='text-red-600'>{errors?.phone.message}</p>
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
            disabled={createClient.isLoading}
            className='bg-gray-200 px-4 py-2 rounded-md
            transition hover:bg-gray-300 disabled:opacity-60'
          >
            Cancel
          </button>

          <button
            type='submit'
            form='create-client'
            className='bg-pink-400 text-white flex items-center gap-2 
            px-4 py-2 rounded-md transition hover:bg-pink-600 disabled:opacity-60'
          >
            {createClient.isLoading ? "Creating..." : "Create client"}
          </button>
        </div>
      </BaseModal>
    </>
  );
}
