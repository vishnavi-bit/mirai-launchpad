import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { PageTransition } from '@/components/motion/PageTransition'
import { SEO } from '@/components/SEO'
import { getBlogPostBySlug } from '@/lib/content/blog'

/**
 * Blog post detail page (ST-055). Plain Markdown only — no syntax
 * highlighting for code blocks (a deliberate v1 scope decision, E7).
 */
export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPostBySlug(slug) : undefined

  if (!post) {
    return (
      <PageTransition>
        <SEO title="Post not found" noindex />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h1 className="font-heading text-2xl font-semibold text-foreground">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Back to blog
          </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <SEO title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16">
        <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Back to blog
        </Link>

        <header className="flex flex-col gap-2">
          <h1 className="font-heading text-3xl font-bold text-foreground">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-4 text-foreground [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_pre]:overflow-x-auto [&_pre]:rounded-[var(--radius)] [&_pre]:bg-muted [&_pre]:p-4">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </PageTransition>
  )
}
