import { Mail, MapPin, Phone } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { PageTransition } from '@/components/motion/PageTransition'
import { SEO } from '@/components/SEO'
import { personal } from '@/lib/content/personal'
import { withBase } from '@/lib/base-path'
import { experience } from '@/lib/content/experience'
import { education } from '@/lib/content/education'
import { certifications } from '@/lib/content/certifications'
import { awards } from '@/lib/content/awards'

function formatRange(startDate: string | undefined, endDate: string) {
  return startDate ? `${startDate} – ${endDate}` : endDate
}

/**
 * Resume page (ST-043–ST-049): contact info, summary, experience,
 * education, certifications, awards, and an optional PDF download.
 */
export function ResumePage() {
  return (
    <PageTransition>
      <SEO
        title="Resume"
        description={`${personal.name}'s experience, education, and skills.`}
        path="/resume"
      />
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-16">
        <header className="flex flex-col gap-3">
          <h1 className="font-heading text-3xl font-bold text-foreground">{personal.name}</h1>
          <p className="text-lg text-muted-foreground">{personal.title}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-1.5 hover:text-foreground"
            >
              <Mail className="size-4" aria-hidden="true" />
              {personal.email}
            </a>
            {personal.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="size-4" aria-hidden="true" />
                {personal.phone}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" aria-hidden="true" />
              {personal.location}
            </span>
          </div>
          {personal.resumePdfUrl && (
            <Button asChild className="w-fit">
              <a href={withBase(personal.resumePdfUrl)} target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </Button>
          )}
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">Summary</h2>
          <div className="flex flex-col gap-3 text-foreground [&_strong]:font-semibold">
            <ReactMarkdown>{personal.bio}</ReactMarkdown>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-heading text-xl font-semibold text-foreground">Experience</h2>
          {experience.map((entry) => (
            <div key={entry.id} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-heading font-medium text-foreground">
                  {entry.role} · {entry.company}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {formatRange(entry.startDate, entry.endDate)}
                </span>
              </div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">Education</h2>
          {education.map((entry) => (
            <div key={entry.id} className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-heading font-medium text-foreground">
                {entry.degree}, {entry.field} · {entry.institution}
              </h3>
              <span className="text-sm text-muted-foreground">
                {formatRange(entry.startDate, entry.endDate)}
              </span>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">Certifications</h2>
          {certifications.map((certification) => (
            <div
              key={certification.id}
              className="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <h3 className="font-heading font-medium text-foreground">
                {certification.name} · {certification.issuer}
              </h3>
              <span className="text-sm text-muted-foreground">{certification.date}</span>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-heading text-xl font-semibold text-foreground">Awards</h2>
          {awards.map((award) => (
            <div key={award.id} className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-heading font-medium text-foreground">
                  {award.name} · {award.issuer}
                </h3>
                <span className="text-sm text-muted-foreground">{award.date}</span>
              </div>
              {award.description && (
                <p className="text-sm text-muted-foreground">{award.description}</p>
              )}
            </div>
          ))}
        </section>
      </div>
    </PageTransition>
  )
}
