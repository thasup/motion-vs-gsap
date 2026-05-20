import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Framer Motion vs GSAP — Animation Library Comparison' },
      { name: 'description', content: 'A comprehensive comparison of Framer Motion and GSAP for senior frontend engineering decisions. Live demos, code snippets, and decision guidance.' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="noise" aria-hidden="true" />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
