import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";

export default function BaseAutocomplete({
  value,
  onChange,
  setQuery,
  children
}: PropsWithChildren<{
  value: string;
  onChange: () => void;
  setQuery: Dispatch<SetStateAction<string>>;
}>) {
  return (
    <Combobox value={value} onChange={onChange}>
      <Combobox.Button
        className='flex justify-between items-center p-2 border 
      border-gray-300 bg-pink-50 focus-within:outline-1 
      focus-within:outline-black'
      >
        <Combobox.Input
          autoComplete='off'
          onChange={event => setQuery(event.target.value)}
          className='bg-transparent w-full focus:outline-none'
        />
        <ChevronDownIcon className='w-6 h-6 text-gray-600' />
      </Combobox.Button>

      <Combobox.Options className='-mt-3 bg-pink-50 border border-gray-300'>
        {children}
      </Combobox.Options>
    </Combobox>
  );
}
