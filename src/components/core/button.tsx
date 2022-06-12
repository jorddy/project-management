import { ClipboardListIcon, UserIcon, TrashIcon } from "@heroicons/react/solid";
import { PropsWithChildren } from "react";

export default function Button({
  project,
  client,
  deleteProject,
  loading,
  onClick,
  type,
  children
}: PropsWithChildren<{
  project?: boolean;
  client?: boolean;
  deleteProject?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}>) {
  const coreStyles =
    "flex gap-2 items-center px-4 py-2 text-white rounded-md transition";

  if (project) {
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

  if (client) {
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

  if (deleteProject) {
    return (
      <button
        onClick={onClick}
        disabled={loading}
        className={`${coreStyles} bg-red-600 hover:bg-red-800 disabled:opacity-60`}
      >
        <TrashIcon className='w-6 h-6 text-white' />
        <p>{loading ? "Deleting Project..." : "Delete Project"}</p>
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${coreStyles} bg-pink-400 max-w-fit hover:bg-pink-600`}
    >
      {children}
    </button>
  );
}
