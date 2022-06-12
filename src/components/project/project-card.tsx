import { Project } from "@prisma/client";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className='border border-gray-400 rounded-md p-6'>
      <div className='flex justify-between items-center'>
        <h3 className='text-xl font-semibold'>{project.name}</h3>
        <Link href={`/projects/${project.id}`}>
          <a className='bg-gray-100 px-4 py-2 rounded-md'>View</a>
        </Link>
      </div>
      <p>
        <strong>Status: </strong>
        {project.status}
      </p>
    </article>
  );
}
