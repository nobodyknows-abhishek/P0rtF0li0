import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetailContent from "@/components/ProjectDetailContent";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) notFound();

  const others = projects.filter((p) => p.id !== project.id);

  return (
    <ProjectDetailContent project={project} others={others} />
  );
}
