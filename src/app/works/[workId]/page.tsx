import { notFound } from "next/navigation";
import { PROJECTS } from "@/app/__components/WorkSection/seed";
import { WorkDetailPage } from "./WorkDetailPage";

interface WorkDetailPageProps {
  params: Promise<{ workId: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    workId: project.workId,
  }));
}

export default async function Page({ params }: WorkDetailPageProps) {
  const { workId } = await params;
  const project = PROJECTS.find((p) => p.workId === workId);

  if (!project) {
    notFound();
  }

  return <WorkDetailPage project={project} />;
}
