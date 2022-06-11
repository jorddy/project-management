import { ClipboardListIcon, UserIcon } from "@heroicons/react/solid";
import { PropsWithChildren } from "react";

export default function Button({
  projectButton,
  clientButton,
  onClick,
  children
}: PropsWithChildren<{
  projectButton?: boolean;
  clientButton?: boolean;
  onClick: () => void;
}>) {
  const coreStyles =
    "flex gap-2 items-center px-4 py-2 text-white rounded-md transition";

  if (projectButton) {
    return (
      <button
        onClick={onClick}
        className={`${coreStyles} bg-purple-600 hover:bg-purple-800`}
      >
        <ClipboardListIcon className='w-6 h-6 text-white' />
        <p>Add Project</p>
      </button>
    );
  }

  if (clientButton) {
    return (
      <button
        onClick={onClick}
        className={`${coreStyles} bg-pink-600 hover:bg-pink-800`}
      >
        <UserIcon className='w-6 h-6 text-white' />
        <p>Add Client</p>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${coreStyles} bg-pink-400 hover:bg-pink-600`}
    >
      {children}
    </button>
  );
}
