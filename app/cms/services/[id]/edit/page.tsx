import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ServiceForm from "@/app/cms/_components/ServiceForm";
export const dynamic = "force-dynamic";
export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();
  return <ServiceForm isEdit initialData={service as Record<string, unknown>} />;
}
