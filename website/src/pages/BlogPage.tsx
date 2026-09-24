import { Link } from 'react-router-dom'
import { PageTransition } from '@/components/motion/PageTransition'
import { SEO } from '@/components/SEO'
import { blogPosts } from '@/lib/content/blog'

/** Blog list page (ST-054) — every post, newest first. */
export function BlogPage() {
  return (
    <PageTransition>
      <SEO title="Blog" description="Articles and writing." path="/blog" />
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-16">
        <h1 className="font-heading text-3xl font-bold text-foreground">Blog</h1>
        <div className="flex flex-col gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="flex flex-col gap-2">
              <Link
                to={`/blog/${post.slug}`}
                className="font-heading text-xl font-semibold text-foreground hover:underline"
              >
                {post.title}
              </Link>
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
              <p className="text-foreground">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
