import { useState } from "react";
import { useForm } from "react-hook-form";
import { Client } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserIcon, XIcon } from "@heroicons/react/solid";
import { Dialog } from "@headlessui/react";
import { trpc } from "@/utils/trpc";
import { ClientSchema, clientSchema } from "@/shared/client-schema";

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
      ctx.setQueryData(["clients.findAll"], old => [...old!, data] as Client[]);

      setIsOpen(false);
      return { previousClients };
    },
    onError: (error, data, context) => {
      // Fall back if there's an error
      ctx.setQueryData(["clients.findAll"], context?.previousClients!);
    },
    onSettled: () => {
      // Invalidate just in case
      ctx.invalidateQueries(["clients.findAll"]);
      reset();
    }
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='flex gap-2 items-center px-4 py-2 bg-pink-400 text-white 
        rounded-md transition hover:bg-pink-600'
      >
        <UserIcon className='w-6 h-6 text-white' />
        <p>Add Client</p>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'
      >
        <Dialog.Backdrop
          className='fixed inset-0 bg-black/30'
          aria-hidden='true'
        />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel className='mx-auto max-w-sm rounded bg-white'>
            <Dialog.Title
              className='p-6 flex justify-between items-center gap-8 
              border-b border-b-gray-200'
            >
              <p className='text-xl font-semibold'>Add Client</p>
              <button onClick={() => setIsOpen(false)} aria-label='Close modal'>
                <XIcon className='w-5 h-5 text-gray-400' />
              </button>
            </Dialog.Title>

            {/* Modal form */}
            <div className='p-6'>
              <form
                onSubmit={handleSubmit(data => createClient.mutate(data))}
                className='flex flex-col gap-4'
              >
                <div className='flex flex-col gap-2'>
                  <label htmlFor='name'>Name:</label>
                  <input
                    {...register("name")}
                    className='border p-1 border-gray-300 bg-pink-50'
                  />
                  {/* TODO: Form Errors!! */}
                  {errors?.email && <p>{errors?.email.message}</p>}
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='email'>Email:</label>
                  <input
                    type='email'
                    {...register("email")}
                    className='border p-1 border-gray-300 bg-pink-50'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor='phone'>Phone:</label>
                  <input
                    {...register("phone")}
                    className='border p-1 border-gray-300 bg-pink-50'
                  />
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
                    className='bg-pink-400 text-white flex items-center gap-2 
                    px-4 py-2 rounded-md transition hover:bg-pink-600 disabled:opacity-60'
                  >
                    {createClient.isLoading ? "Creating..." : "Create client"}
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
