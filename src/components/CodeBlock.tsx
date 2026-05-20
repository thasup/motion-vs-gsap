import { useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'typescript' }: CodeBlockProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.removeAttribute('data-highlighted')
    ref.current.textContent = code
    hljs.highlightElement(ref.current)
  }, [code, language])

  return (
    <pre className="code-block" style={{ margin: 0 }}>
      <code ref={ref} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  )
}
