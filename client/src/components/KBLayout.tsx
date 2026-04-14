// =============================================================
// KBLayout - Technical Codex Design System
// Dark sidebar (#0F172A) + Light content area
// Space Grotesk headings, Inter body, JetBrains Mono code
// =============================================================

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { categories } from "@/lib/kb-data";
import {
  ChevronDown,
  ChevronRight,
  Cpu,
  Gauge,
  Menu,
  X,
  BookOpen,
  Search,
  Layers,
  Play,
  Activity,
  Zap,
  Microchip,
  Camera,
  Radio,
  Waves,
  Home,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu size={16} />,
  Gauge: <Gauge size={16} />,
  Layers: <Layers size={14} />,
  Play: <Play size={14} />,
  Activity: <Activity size={14} />,
  Zap: <Zap size={14} />,
  Microchip: <Microchip size={14} />,
  Camera: <Camera size={14} />,
  Radio: <Radio size={14} />,
  Waves: <Waves size={14} />,
};

const colorMap: Record<string, string> = {
  green: "text-green-400",
  blue: "text-blue-400",
  amber: "text-amber-400",
};

interface KBLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function KBLayout({ children, breadcrumbs }: KBLayoutProps) {
  const [location] = useLocation();
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({ qcom: true });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCat = (id: string) => {
    setExpandedCats(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Header */}
      <header className="h-14 bg-slate-900 border-b border-slate-700 flex items-center px-4 gap-4 sticky top-0 z-50 shadow-md">
        <button
          className="lg:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link href="/" className="flex items-center gap-2 text-white no-underline">
          <div className="w-7 h-7 bg-green-500 rounded flex items-center justify-center">
            <BookOpen size={14} className="text-white" />
          </div>
          <span className="font-semibold text-sm tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Embedded Knowledge
          </span>
        </Link>
        <div className="flex-1" />
        <div className="hidden sm:flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-400 text-xs w-48">
          <Search size={12} />
          <span>搜尋文章...</span>
        </div>
        <span className="text-slate-500 text-xs hidden md:block">v1.0 · 2026-04</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-slate-900
            border-r border-slate-700/50 overflow-y-auto z-40 flex-shrink-0
            transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="p-3">
            {/* Home link */}
            <Link href="/">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs mb-3 transition-colors cursor-pointer
                ${location === "/" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}>
                <Home size={13} />
                <span>首頁</span>
              </div>
            </Link>

            {/* Categories */}
            {categories.map(cat => (
              <div key={cat.id} className="mb-1">
                {/* Category header */}
                <button
                  onClick={() => toggleCat(cat.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-colors
                    text-slate-300 hover:text-white hover:bg-slate-800"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span className={colorMap[cat.color] || "text-slate-400"}>
                    {iconMap[cat.icon]}
                  </span>
                  <span className="flex-1 text-left">{cat.title}</span>
                  {expandedCats[cat.id] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </button>

                {/* Subcategories */}
                {expandedCats[cat.id] && (
                  <div className="ml-3 mt-0.5 space-y-0.5">
                    {cat.subcategories.map(sub => (
                      <div key={sub.id}>
                        <Link href={`/category/${cat.id}?sub=${sub.id}`}>
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs cursor-pointer transition-colors
                            ${location.includes(sub.id)
                              ? "bg-green-500/20 text-green-300 border-l-2 border-green-500"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                            }`}>
                            <span className="text-slate-500">{iconMap[sub.icon]}</span>
                            <span>{sub.title}</span>
                          </div>
                        </Link>
                        {/* Articles under subcategory */}
                        {sub.articles.map(art => (
                          <Link key={art.id} href={`/article/${cat.id}/${sub.id}/${art.id}`}>
                            <div className={`flex items-center gap-2 pl-8 pr-3 py-1 rounded text-xs cursor-pointer transition-colors
                              ${location === `/article/${cat.id}/${sub.id}/${art.id}`
                                ? "bg-green-500/10 text-green-400"
                                : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                              }`}>
                              <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
                              <span className="truncate">{art.title}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-slate-700/50 mt-auto">
            <p className="text-slate-600 text-xs leading-5">
              Embedded Knowledge<br />
              整理自工程師實際問答與研究
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {/* Breadcrumb */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="border-b border-slate-200 bg-white px-6 py-2.5 flex items-center gap-1.5 text-xs text-slate-500 sticky top-0 z-10">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={10} className="text-slate-300" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-slate-800 transition-colors">{crumb.label}</Link>
                  ) : (
                    <span className="text-slate-700 font-medium">{crumb.label}</span>
                  )}
                </span>
              ))}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
