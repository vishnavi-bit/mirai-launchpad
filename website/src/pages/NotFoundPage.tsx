import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PageTransition } from '@/components/motion/PageTransition'
import { SEO } from '@/components/SEO'

/**
 * In-app catch-all Not Found page (ST-099) — distinct from the 404.html
 * GitHub Pages redirect trick (ST-063): this handles a route that mounts
 * inside the app but matches no <Route>, e.g. a stale or mistyped link.
 */
export function NotFoundPage() {
  return (
    <PageTransition>
      <SEO title="Page not found" noindex />
      <div className="mx-auto flex min-h-[60svh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">Page not found</h1>
        <p className="text-muted-foreground">
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </PageTransition>
  )
}
