import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { PageTransition } from '@/components/motion/PageTransition'
import { SEO } from '@/components/SEO'

const swatches: { label: string; bg: string; fg: string }[] = [
  { label: 'background / foreground', bg: 'bg-background', fg: 'text-foreground' },
  { label: 'card / card-foreground', bg: 'bg-card', fg: 'text-card-foreground' },
  { label: 'primary / primary-foreground', bg: 'bg-primary', fg: 'text-primary-foreground' },
  {
    label: 'secondary / secondary-foreground',
    bg: 'bg-secondary',
    fg: 'text-secondary-foreground',
  },
  { label: 'muted / muted-foreground', bg: 'bg-muted', fg: 'text-muted-foreground' },
  { label: 'accent / accent-foreground', bg: 'bg-accent', fg: 'text-accent-foreground' },
  { label: 'destructive', bg: 'bg-destructive', fg: 'text-white' },
]

/**
 * QA/validation page (not part of the site IA in requirements.md) — exists
 * so every theme's tokens and every shadcn primitive can be eyeballed at
 * once while switching themes with the header dropdown (ST-025–ST-035).
 */
export function ThemePreviewPage() {
  return (
    <PageTransition>
      <SEO title="Theme Preview" noindex />
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold text-foreground">Theme Preview</h1>
          <ThemeSwitcher />
        </div>

        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">Typography</h2>
          <p className="font-sans text-foreground">
            Body text in the current theme's body font. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-muted-foreground">Muted text for secondary information.</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">Color tokens</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {swatches.map((swatch) => (
              <div
                key={swatch.label}
                className={`${swatch.bg} ${swatch.fg} rounded-[var(--radius)] border border-border p-4 text-xs`}
              >
                {swatch.label}
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">Card</h2>
          <Card>
            <CardHeader>
              <CardTitle>Sample card title</CardTitle>
              <CardDescription>Sample card description text.</CardDescription>
            </CardHeader>
            <CardContent>Card body content renders here.</CardContent>
          </Card>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sample dialog</DialogTitle>
                <DialogDescription>
                  This proves Dialog renders correctly on top of every theme.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-heading text-xl font-semibold text-foreground">Navigation menu</h2>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Projects</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </section>
      </div>
    </PageTransition>
  )
}
