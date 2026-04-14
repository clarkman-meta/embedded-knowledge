// =============================================================
// CategoryPage - Shows subcategory and article/chip list
// Technical Codex Design System
// Supports both flat articles (qcom) and chip-grouped (sensor/pmic)
// =============================================================

import KBLayout from "@/components/KBLayout";
import { getCategoryById } from "@/lib/kb-data";
import { Link, useParams, useSearch } from "wouter";
import { ChevronRight, FileText, Tag, Calendar, Cpu } from "lucide-react";

export default function CategoryPage() {
  const params = useParams<{ catId: string }>();
  const search = useSearch();
  const subId = new URLSearchParams(search).get("sub");
  const chipId = new URLSearchParams(search).get("chip");

  const cat = getCategoryById(params.catId);
  if (!cat) {
    return (
      <KBLayout breadcrumbs={[{ label: "首頁", href: "/" }, { label: "找不到分類" }]}>
        <div className="p-10 text-center text-slate-500">找不到此分類</div>
      </KBLayout>
    );
  }

  const activeSub = subId ? cat.subcategories.find(s => s.id === subId) : cat.subcategories[0];
  const activeChip = chipId && activeSub?.chips ? activeSub.chips.find(c => c.id === chipId) : undefined;

  return (
    <KBLayout
      breadcrumbs={[
        { label: "首頁", href: "/" },
        { label: cat.title, href: `/category/${cat.id}` },
        ...(activeSub ? [{ label: activeSub.title, href: `/category/${cat.id}?sub=${activeSub.id}` }] : []),
        ...(activeChip ? [{ label: activeChip.title }] : []),
      ]}
    >
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Category header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {cat.title}
            {activeSub && <span className="text-slate-400 font-normal"> › {activeSub.title}</span>}
            {activeChip && <span className="text-slate-400 font-normal"> › {activeChip.title}</span>}
          </h1>
          <p className="text-slate-500 text-sm">
            {activeChip?.description || activeSub?.description || cat.description}
          </p>
        </div>

        {/* Subcategory tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {cat.subcategories.map(sub => (
            <Link key={sub.id} href={`/category/${cat.id}?sub=${sub.id}`}>
              <div className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors
                ${activeSub?.id === sub.id
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900"
                }`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {sub.title}
              </div>
            </Link>
          ))}
        </div>

        {activeSub && (
          <>
            {/* If subcategory has chips: show chip selector then articles */}
            {activeSub.chips ? (
              <>
                {/* Chip model tabs */}
                {!activeChip && (
                  <div className="space-y-3">
                    {activeSub.chips.map(chip => (
                      <Link key={chip.id} href={`/category/${cat.id}?sub=${activeSub.id}&chip=${chip.id}`}>
                        <div className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm rounded-xl p-5 cursor-pointer transition-all duration-150 group">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-green-50 transition-colors">
                              <Cpu size={14} className="text-slate-400 group-hover:text-green-600 transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-green-700 transition-colors mb-1"
                                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                {chip.title}
                              </h3>
                              <p className="text-xs text-slate-500 leading-5">{chip.description}</p>
                              <p className="text-xs text-slate-400 mt-1">{chip.articles.length} 篇文章</p>
                            </div>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0 mt-1" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Articles under selected chip */}
                {activeChip && (
                  <>
                    {/* Back to chip list */}
                    <Link href={`/category/${cat.id}?sub=${activeSub.id}`}>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 cursor-pointer mb-4 transition-colors">
                        <ChevronRight size={10} className="rotate-180" />
                        <span>返回 {activeSub.title}</span>
                      </div>
                    </Link>
                    {/* Chip tabs (when multiple chips exist) */}
                    {activeSub.chips.length > 1 && (
                      <div className="flex gap-2 mb-5 flex-wrap">
                        {activeSub.chips.map(chip => (
                          <Link key={chip.id} href={`/category/${cat.id}?sub=${activeSub.id}&chip=${chip.id}`}>
                            <div className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors
                              ${activeChip.id === chip.id
                                ? "bg-green-600 text-white"
                                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
                              }`}
                              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                              {chip.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    <div className="space-y-3">
                      {activeChip.articles.map(art => (
                        <Link key={art.id} href={`/article/${cat.id}/${activeSub.id}/${activeChip.id}/${art.id}`}>
                          <div className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm rounded-xl p-5 cursor-pointer transition-all duration-150 group">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-green-50 transition-colors">
                                <FileText size={14} className="text-slate-400 group-hover:text-green-600 transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-green-700 transition-colors mb-1"
                                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                  {art.title}
                                </h3>
                                <p className="text-xs text-slate-500 leading-5 mb-3">{art.description}</p>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <Calendar size={10} />
                                    <span className="text-xs">{art.lastUpdated}</span>
                                  </div>
                                  <div className="flex items-center gap-1 flex-wrap">
                                    {art.tags.map(tag => (
                                      <span key={tag} className="flex items-center gap-1 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                                        <Tag size={9} />
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0 mt-1" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              /* Flat articles (legacy qcom style) */
              <div className="space-y-3">
                {activeSub.articles?.map(art => (
                  <Link key={art.id} href={`/article/${cat.id}/${activeSub.id}/${art.id}`}>
                    <div className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm rounded-xl p-5 cursor-pointer transition-all duration-150 group">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-green-50 transition-colors">
                          <FileText size={14} className="text-slate-400 group-hover:text-green-600 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-green-700 transition-colors mb-1"
                            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {art.title}
                          </h3>
                          <p className="text-xs text-slate-500 leading-5 mb-3">{art.description}</p>
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-1 text-slate-400">
                              <Calendar size={10} />
                              <span className="text-xs">{art.lastUpdated}</span>
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                              {art.tags.map(tag => (
                                <span key={tag} className="flex items-center gap-1 text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                                  <Tag size={9} />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </KBLayout>
  );
}
