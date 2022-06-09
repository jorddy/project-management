import AddClientModal from "@/components/add-client-modal";
import Clients from "@/components/clients";

export default function Index() {
  return (
    <main className='mt-8 container mx-auto px-4 space-y-6'>
      <AddClientModal />
      <Clients />
    </main>
  );
}
