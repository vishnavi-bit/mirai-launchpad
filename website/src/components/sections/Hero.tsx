import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { personal } from '@/lib/content/personal'
import { withBase } from '@/lib/base-path'

/** Full-height hero (ST-100): name + tagline + the 3 primary CTAs. */
export function Hero() {
  return (
    <section className="flex min-h-[85svh] flex-col items-center justify-center gap-6 px-4 text-center">
      <img
        src={withBase(personal.avatarUrl)}
        alt={personal.name}
        width={128}
        height={128}
        // Typically the LCP element (ST-077) — hint the browser to fetch it
        // immediately rather than at its default (often deprioritized)
        // priority, same intent as `loading="lazy"` for offscreen images
        // but in the opposite direction: this one should load first.
        fetchPriority="high"
        className="aspect-square rounded-full border border-border object-cover"
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-4xl font-bold text-foreground sm:text-6xl">
          {personal.name}
        </h1>
        <p className="text-lg text-muted-foreground">{personal.title}</p>
        <p className="text-foreground">{personal.tagline}</p>
        <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {personal.location}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/resume">View Resume</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/projects">See Projects</Link>
        </Button>
        <Button variant="outline" asChild>
          <a href="#contact">Let&rsquo;s talk</a>
        </Button>
      </div>
    </section>
  )
}
