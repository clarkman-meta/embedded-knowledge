// =============================================================
// Home Page - Technical Codex Design System
// Shows category cards and recent articles
// =============================================================

import KBLayout from "@/components/KBLayout";
import { categories } from "@/lib/kb-data";
import { Link } from "wouter";
import { Cpu, Gauge, ChevronRight, BookOpen, Layers, Activity, Zap, Microchip, Camera, Radio, Waves, Play } from "lucide-react";

const catIconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu size={24} />,
  Gauge: <Gauge size={24} />,
};

const subIconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={14} />,
  Play: <Play size={14} />,
  Activity: <Activity size={14} />,
  Zap: <Zap size={14} />,
  Microchip: <Microchip size={14} />,
  Camera: <Camera size={14} />,
  Radio: <Radio size={14} />,
  Waves: <Waves size={14} />,
};

const catColorMap: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  green: {
    bg: "bg-green-50",
    border: "border-green-200 hover:border-green-400",
    icon: "text-green-600 bg-green-100",
    badge: "bg-green-100 text-green-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200 hover:border-blue-400",
    icon: "text-blue-600 bg-blue-100",
    badge: "bg-blue-100 text-blue-700",
  },
};

export default function Home() {
  // Helper: count articles in a subcategory (supports both flat and chip-grouped)
  const countSubArticles = (sub: { articles?: unknown[]; chips?: { articles: unknown[] }[] }) =>
    sub.chips
      ? sub.chips.reduce((n, chip) => n + chip.articles.length, 0)
      : (sub.articles?.length ?? 0);

  const totalArticles = categories.reduce(
    (acc, cat) => acc + cat.subcategories.reduce((a, sub) => a + countSubArticles(sub), 0),
    0
  );

  return (
    <KBLayout breadcrumbs={[{ label: "首頁" }]}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <BookOpen size={18} className="text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Embedded Knowledge
              </h1>
              <p className="text-slate-500 text-sm">嵌入式韌體工程師學習筆記</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm leading-7 max-w-2xl">
            整理嵌入式韌體開發的核心知識，涵蓋 Qualcomm Snapdragon SoC 的 non-HLOS 架構、各子系統分工，
            以及感測器驅動開發實務。所有內容來自實際工程問答與技術研究。
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {categories.length} 個分類
            </span>
            <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {totalArticles} 篇文章
            </span>
            <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              最後更新：2026-04-14
            </span>
          </div>
        </div>

        {/* Category Cards */}
        <div className="space-y-8">
          {categories.map(cat => {
            const colors = catColorMap[cat.color] || catColorMap.green;
            const articleCount = cat.subcategories.reduce((a, sub) => a + countSubArticles(sub), 0);
            return (
              <div key={cat.id} className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-6 transition-all duration-200`}>
                {/* Category Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                    {catIconMap[cat.icon]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {cat.title}
                      </h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                        {articleCount} 篇文章
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mt-1">{cat.description}</p>
                  </div>
                </div>

                {/* Subcategory Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.subcategories.map(sub => (
                    <Link key={sub.id} href={`/category/${cat.id}?sub=${sub.id}`}>
                      <div className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm p-4 cursor-pointer transition-all duration-150 group">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-slate-400 group-hover:text-slate-600 transition-colors">
                            {subIconMap[sub.icon]}
                          </span>
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {sub.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-5 mb-3">{sub.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{countSubArticles(sub)} 篇</span>
                          <ChevronRight size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400">
            內容持續更新中 · 如需加入 SX9204 CapSense 等感測器內容，請提供相關對話資料
          </p>
        </div>
      </div>
    </KBLayout>
  );
}
