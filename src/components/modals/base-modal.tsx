import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";

export default function BaseModal({
  title,
  isOpen,
  setIsOpen,
  children
}: PropsWithChildren<{
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>) {
  return (
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
            <p className='text-xl font-semibold'>{title}</p>
            <button onClick={() => setIsOpen(false)} aria-label='Close modal'>
              <XIcon className='w-5 h-5 text-gray-400' />
            </button>
          </Dialog.Title>

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
