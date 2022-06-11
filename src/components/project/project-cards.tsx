import { trpc } from "@/utils/trpc";
import ProjectCard from "./project-card";
import Spinner from "../core/spinner";

export default function Projects() {
  const projects = trpc.useQuery(["projects.findAll"]);

  if (projects.isLoading) {
    return <Spinner />;
  }

  if (projects.isError) {
    return <p>Something went wrong!</p>;
  }

  return projects.data!.length > 0 ? (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {projects.data?.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  ) : (
    <p>No projects</p>
  );
}
