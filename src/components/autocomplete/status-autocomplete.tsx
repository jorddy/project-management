import { Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import BaseAutocomplete from "./base-autocomplete";

export default function StatusAutocomplete({
  status,
  value,
  onChange
}: {
  status: string[];
  value: string;
  onChange: () => void;
}) {
  const [query, setQuery] = useState("");

  const filteredStatus =
    query === ""
      ? status
      : status.filter(status => {
          return status.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <BaseAutocomplete value={value} onChange={onChange} setQuery={setQuery}>
      {filteredStatus.map(status => (
        <Combobox.Option key={status} value={status} as={Fragment}>
          {({ active, selected }) => (
            <li
              className={`p-2 flex items-center gap-2 ${
                active ? "bg-pink-200" : ""
              }`}
            >
              {selected && <CheckIcon className='w-5 h-5' />}
              {status}
            </li>
          )}
        </Combobox.Option>
      ))}
    </BaseAutocomplete>
  );
}
