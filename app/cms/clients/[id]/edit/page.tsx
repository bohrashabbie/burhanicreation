import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ClientForm from "@/app/cms/_components/ClientForm";
export const dynamic = "force-dynamic";
export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) notFound();
  return <ClientForm isEdit initialData={client as Record<string, unknown>} />;
}
