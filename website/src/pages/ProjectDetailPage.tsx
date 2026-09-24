import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PageTransition } from '@/components/motion/PageTransition'
import { SEO } from '@/components/SEO'
import { getProjectById } from '@/lib/content/projects'
import { withBase } from '@/lib/base-path'

/** Project detail page (ST-050) — reached by clicking a project card. */
export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projectId ? getProjectById(projectId) : undefined

  if (!project) {
    return (
      <PageTransition>
        <SEO title="Project not found" noindex />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground">Project not found</h1>
          <Link to="/projects" className="text-primary hover:underline">
            Back to projects
          </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <SEO
        title={project.title}
        description={project.description}
        image={project.imageUrl}
        path={`/projects/${project.id}`}
      />
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16">
        <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Back to projects
        </Link>

        {project.imageUrl && (
          <img
            src={withBase(project.imageUrl)}
            alt=""
            className="aspect-video w-full rounded-[var(--radius)] object-cover"
          />
        )}

        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-3xl font-bold text-foreground">{project.title}</h1>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="text-foreground">{project.description}</p>
        </div>

        {(project.repoUrl || project.liveUrl) && (
          <div className="flex gap-3">
            {project.repoUrl && (
              <Button variant="outline" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  View code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="secondary" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live demo
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
