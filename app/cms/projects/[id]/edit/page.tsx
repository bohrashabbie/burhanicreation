import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ProjectForm from "@/app/cms/_components/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <ProjectForm
      isEdit
      initialData={{
        ...project,
        deliverablesEn: project.deliverablesEn as string[],
        deliverablesAr: project.deliverablesAr as string[],
      }}
    />
  );
}
