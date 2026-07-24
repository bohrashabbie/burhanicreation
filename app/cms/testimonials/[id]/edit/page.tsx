import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import TestimonialForm from "@/app/cms/_components/TestimonialForm";
export const dynamic = "force-dynamic";
export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();
  return <TestimonialForm isEdit initialData={t as Record<string, unknown>} />;
}
