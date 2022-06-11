import { Combobox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { Client } from "@prisma/client";
import { Fragment, useState } from "react";
import BaseAutocomplete from "./base-autocomplete";

export default function ClientAutocomplete({
  clients,
  value,
  onChange
}: {
  clients: Client[];
  value: string;
  onChange: () => void;
}) {
  const [query, setQuery] = useState("");

  const filteredClients =
    query === ""
      ? clients
      : clients.filter(client => {
          return client.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <BaseAutocomplete value={value} onChange={onChange} setQuery={setQuery}>
      {filteredClients.map(client => (
        // TODO: form is working but need to show client name on select but send id up not show id
        <Combobox.Option
          key={client.id}
          value={{ connect: { id: client.id } }}
          as={Fragment}
        >
          {({ active, selected }) => (
            <li
              className={`p-2 flex items-center gap-2 ${
                active ? "bg-pink-200" : ""
              }`}
            >
              {selected && <CheckIcon className='w-5 h-5' />}
              {client.name}
            </li>
          )}
        </Combobox.Option>
      ))}
    </BaseAutocomplete>
  );
}
