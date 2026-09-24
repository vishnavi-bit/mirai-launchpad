import { PageTransition } from '@/components/motion/PageTransition'
import { SEO } from '@/components/SEO'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/lib/content/projects'

/** Full Projects list (ST-050) — every project, featured ones first. */
export function ProjectsPage() {
  return (
    <PageTransition>
      <SEO title="Projects" description="A selection of projects." path="/projects" />
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-16">
        <h1 className="font-heading text-3xl font-bold text-foreground">Projects</h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
