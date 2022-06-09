import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { UserIcon, XIcon } from "@heroicons/react/solid";
import { Dialog } from "@headlessui/react";
import { clientSchema } from "@/shared/client-schema";

export default function AddClientModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(clientSchema)
  });

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='bg-pink-400 text-white px-4 py-2 rounded-md
        transition hover:bg-pink-600'
      >
        Add Client
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
              <h3 className='text-xl font-semibold'>Add Client</h3>
              <button onClick={() => setIsOpen(false)} aria-label='Close modal'>
                <XIcon className='w-5 h-5 text-gray-400' />
              </button>
            </Dialog.Title>

            {/* Modal form */}
            <div className='p-6'>
              <form
                onSubmit={() => handleSubmit(d => console.log(d))}
                className='flex flex-col gap-4'
              >
                <div className='flex flex-col gap-2'>
                  <label htmlFor='name'>Name:</label>
                  <input
                    {...register("name")}
                    className='border p-1 border-gray-300 bg-pink-50'
                  />
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

                <button type='submit'>awdawd</button>

                <div
                  className='p-6 flex justify-end items-center gap-4
                  border-t border-t-gray-200'
                >
                  <button
                    className='bg-gray-200 px-4 py-2 rounded-md
                    transition hover:bg-gray-300'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='bg-pink-400 text-white flex items-center gap-2 
                    px-4 py-2 rounded-md transition hover:bg-pink-600'
                  >
                    <UserIcon className='w-5 h-5 text-white' />
                    <p>Create client</p>
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
