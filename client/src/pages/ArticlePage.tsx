// =============================================================
// ArticlePage - Renders a full knowledge base article
// Technical Codex Design System
// Three-column: sidebar (in KBLayout) + content + TOC
// =============================================================

import { useState, useEffect, useRef } from "react";
import KBLayout from "@/components/KBLayout";
import { getArticleById, getCategoryById, getSubCategoryById } from "@/lib/kb-data";
import { useParams } from "wouter";
import { Tag, Calendar, Clock, ChevronRight } from "lucide-react";

function extractHeadings(html: string) {
  const matches = Array.from(html.matchAll(/<h([123])[^>]*>(.*?)<\/h[123]>/gi));
  return matches.map((m, i) => ({
    level: parseInt(m[1]),
    text: m[2].replace(/<[^>]+>/g, ""),
    id: `heading-${i}`,
  }));
}

function injectIds(html: string) {
  let i = 0;
  return html.replace(/<h([123])([^>]*)>/gi, (_match, level, attrs) => {
    return `<h${level}${attrs} id="heading-${i++}">`;
  });
}

export default function ArticlePage() {
  const params = useParams<{ catId: string; subId: string; artId: string }>();
  const [activeHeading, setActiveHeading] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  const cat = getCategoryById(params.catId);
  const sub = getSubCategoryById(params.catId, params.subId);
  const art = getArticleById(params.catId, params.subId, params.artId);

  const headings = art ? extractHeadings(art.content) : [];
  const processedContent = art ? injectIds(art.content) : "";

  // Estimate read time
  const wordCount = art ? art.content.replace(/<[^>]+>/g, "").length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 400));

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    const headingEls = contentRef.current.querySelectorAll("h1, h2, h3");
    headingEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [processedContent]);

  if (!art || !cat || !sub) {
    return (
      <KBLayout breadcrumbs={[{ label: "首頁", href: "/" }, { label: "找不到文章" }]}>
        <div className="p-10 text-center text-slate-500">找不到此文章</div>
      </KBLayout>
    );
  }

  return (
    <KBLayout
      breadcrumbs={[
        { label: "首頁", href: "/" },
        { label: cat.title, href: `/category/${cat.id}` },
        { label: sub.title, href: `/category/${cat.id}?sub=${sub.id}` },
        { label: art.title },
      ]}
    >
      <div className="flex gap-0">
        {/* Article Content */}
        <div className="flex-1 min-w-0 px-6 lg:px-10 py-8 max-w-3xl">
          {/* Article header */}
          <div className="mb-8 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <span>{cat.title}</span>
              <ChevronRight size={10} />
              <span>{sub.title}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {art.title}
            </h1>
            <p className="text-slate-500 text-sm mb-4 leading-6">{art.description}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Calendar size={12} />
                <span>{art.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                <Clock size={12} />
                <span>約 {readTime} 分鐘閱讀</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {art.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    <Tag size={9} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Article body */}
          <div
            ref={contentRef}
            className="kb-prose"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>

        {/* TOC (Table of Contents) */}
        {headings.length > 0 && (
          <aside className="hidden xl:block w-56 flex-shrink-0 py-8 pr-6">
            <div className="sticky top-16">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                本頁目錄
              </p>
              <nav className="space-y-0.5">
                {headings.map(h => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block text-xs leading-5 py-0.5 transition-colors no-underline
                      ${h.level === 1 ? "font-semibold" : ""}
                      ${h.level === 3 ? "pl-4 text-slate-400" : h.level === 2 ? "pl-2" : ""}
                      ${activeHeading === h.id
                        ? "text-green-600 font-medium"
                        : "text-slate-400 hover:text-slate-700"
                      }`}
                    onClick={e => {
                      e.preventDefault();
                      document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </KBLayout>
  );
}
