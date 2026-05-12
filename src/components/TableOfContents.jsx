import { useState, useEffect, useRef } from 'react';

// Must match the header height (h-14 = 56px) plus a small buffer
const SCROLL_OFFSET = 72;

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const elsRef = useRef([]);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const els = Array.from(article.querySelectorAll('h2, h3'));
    elsRef.current = els;

    setHeadings(
      els.map(el => ({
        id: el.id,
        text: el.textContent ?? '',
        level: parseInt(el.tagName[1]),
      }))
    );

    const onScroll = () => {
      const threshold = window.scrollY + SCROLL_OFFSET + 8;
      let current = els[0]?.id ?? '';
      for (const el of els) {
        if (el.getBoundingClientRect().top + window.scrollY <= threshold) {
          current = el.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  if (headings.length === 0) return null;

  return (
    <nav>
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4">
        Contents
      </p>
      <ul className="space-y-1.5">
        {headings.map(h => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={e => {
                e.preventDefault();
                scrollTo(h.id);
              }}
              className={[
                'block text-sm leading-snug transition-colors py-0.5',
                h.level === 3 ? 'pl-3 text-[13px]' : '',
                activeId === h.id
                  ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                  : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300',
              ].join(' ')}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
