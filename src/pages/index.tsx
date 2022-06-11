import dynamic from "next/dynamic";
import Clients from "@/components/client/clients-table";
import Projects from "@/components/project/project-cards";

const AddClientModal = dynamic(
  () => import("@/components/modals/add-client-modal")
);
const AddProjectModal = dynamic(
  () => import("@/components/modals/add-project-modal")
);

export default function Index() {
  return (
    <>
      <div className='flex gap-2 items-center'>
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <Clients />
    </>
  );
}
