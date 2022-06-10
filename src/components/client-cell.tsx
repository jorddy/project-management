import { ReactNode } from "react";

export default function ClientCell({
  as,
  children
}: {
  as: "th" | "td";
  children?: ReactNode;
}) {
  if (as === "td") {
    return <td className='px-4 py-2'>{children}</td>;
  }

  if (as === "th") {
    return <th className='px-4 py-2'>{children}</th>;
  }

  return null;
}
