import { notFound } from "next/navigation";
import { PROJECTS } from "@/app/__components/WorkSection/seed";
import { WorkDetailPage } from "./WorkDetailPage";

interface WorkDetailPageProps {
  params: Promise<{ workId: string }>;
}

export const generateStaticParams = async () => {
  return PROJECTS.map((project) => ({
    workId: project.workId,
  }));
};

const Page = async ({ params }: WorkDetailPageProps) => {
  const { workId } = await params;
  const project = PROJECTS.find((p) => p.workId === workId);

  if (!project) {
    notFound();
  }

  return <WorkDetailPage project={project} />;
};

export default Page;
