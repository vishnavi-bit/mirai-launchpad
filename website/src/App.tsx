import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { devRoutes } from 'virtual:dev-routes'
import { ThemeProvider } from '@/lib/theme/ThemeProvider'
import { siteConfig } from '@/lib/content/site-config'
import { getRouterBasename } from '@/lib/base-path'
import { initAnalytics, trackPageView } from '@/lib/analytics'
import { SkipLink } from '@/components/layout/SkipLink'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileTabBar } from '@/components/layout/MobileTabBar'
import { HomePage } from '@/pages/HomePage'

// Lazy-loaded (ST-077): Home is the common landing route and stays in the
// main bundle, but every other page's code — including its own data-file
// imports — only needs to load once a visitor actually navigates there,
// shrinking the JS the browser must fetch/parse before Home's first paint.
const ResumePage = lazy(() => import('@/pages/ResumePage').then((m) => ({ default: m.ResumePage })))
const ProjectsPage = lazy(() =>
  import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
)
const ProjectDetailPage = lazy(() =>
  import('@/pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })),
)
const OthersPage = lazy(() => import('@/pages/OthersPage').then((m) => ({ default: m.OthersPage })))
const BlogPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostPage = lazy(() =>
  import('@/pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })),
)
const CustomizePage = lazy(() =>
  import('@/pages/CustomizePage').then((m) => ({ default: m.CustomizePage })),
)
const ThemePreviewPage = lazy(() =>
  import('@/pages/ThemePreviewPage').then((m) => ({ default: m.ThemePreviewPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

/** GA4 page-view tracking (ST-101) — see src/lib/analytics.ts for why this can't just be gtag's own automatic page_view. */
function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={getRouterBasename(siteConfig.basePath)}>
        <AnalyticsTracker />
        <SkipLink />
        <Header />
        <main id="main-content" className="pb-16 sm:pb-0">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="/others" element={<OthersPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/customize" element={<CustomizePage />} />
              <Route path="/theme-preview" element={<ThemePreviewPage />} />
              {devRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <MobileTabBar />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
