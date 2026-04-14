# 設計構想 - Embedded Firmware Knowledge Base

## 目標
一個供嵌入式韌體工程師學習的知識庫網站，內容以 Qualcomm non-HLOS 架構為主，未來可擴充 Sensor 子系統（SX9204 CapSense 等）。

---

<response>
<text>
**設計方向 A：Technical Codex（技術典籍風格）**

- **Design Movement**: 工業技術文件美學（Industrial Technical Documentation）
- **Core Principles**:
  1. 左側固定導覽欄（sidebar），右側主內容區，類似 Linux kernel docs 或 GitBook
  2. 高密度資訊呈現，但以清晰的視覺層次引導閱讀
  3. 程式碼區塊、表格、標題層次感強烈
  4. 深色側邊欄 + 淺色主內容，形成明確的視覺分區
- **Color Philosophy**: 主色調為深海軍藍（#0F172A）側邊欄，主內容區純白，強調色使用電路板綠（#22C55E）標示重要概念
- **Layout Paradigm**: 三欄式：左側分類導覽 → 中間文章內容 → 右側文章目錄（TOC）
- **Signature Elements**:
  1. 麵包屑導覽（breadcrumb）顯示當前位置
  2. 程式碼區塊帶語法高亮與複製按鈕
- **Interaction Philosophy**: 點擊即展開，無頁面跳轉，SPA 體驗
- **Animation**: 側邊欄項目展開時有 200ms slide-down，內容切換有 fade-in
- **Typography System**: 標題用 Space Grotesk（技術感），內文用 Inter，程式碼用 JetBrains Mono
</text>
<probability>0.08</probability>
</response>

<response>
<text>
**設計方向 B：Dark Terminal（暗色終端機風格）**

- **Design Movement**: 駭客終端機美學（Hacker Terminal Aesthetic）
- **Core Principles**:
  1. 全暗色背景，螢光綠/青色文字，強烈的技術感
  2. 等寬字體為主，強調「工程師工具」的感覺
  3. 邊框使用細線，無圓角或極小圓角
  4. 動畫效果模擬終端機輸入
- **Color Philosophy**: 背景 #0D1117（GitHub 暗色），文字 #E6EDF3，強調色 #00FF88（終端機綠）
- **Layout Paradigm**: 左側 tree-view 目錄，右側內容區，頂部 breadcrumb
- **Signature Elements**:
  1. 分類標籤用 `[QCOM]` `[SENSOR]` 方括號格式
  2. 標題前加 `>` 符號
- **Interaction Philosophy**: hover 時邊框發光效果，模擬 CRT 螢幕
- **Animation**: 文字出現時有 typewriter 效果，頁面切換有 scanline 動畫
- **Typography System**: 全站使用 JetBrains Mono，標題加粗
</text>
<probability>0.06</probability>
</response>

<response>
<text>
**設計方向 C：Clean Knowledge Hub（簡潔知識中心）**

- **Design Movement**: 現代技術文件美學（Modern Documentation）
- **Core Principles**:
  1. 左側分類導覽 + 主內容區的雙欄佈局
  2. 大量留白，讓技術內容呼吸
  3. 卡片式分類入口，清晰的視覺層次
  4. 淺色背景為主，強調可讀性
- **Color Philosophy**: 背景 #F8FAFC（極淺灰），側邊欄 #1E293B（深石板藍），強調色 #3B82F6（藍色）搭配 #F59E0B（琥珀色）標示警告/重要
- **Layout Paradigm**: 頂部 header + 左側 sidebar + 主內容，響應式設計
- **Signature Elements**:
  1. 分類卡片帶圖示（lucide-react icons）
  2. 文章內有「關鍵概念」高亮區塊
- **Interaction Philosophy**: 流暢的 hover 效果，清晰的 active 狀態
- **Animation**: 頁面切換 fade，側邊欄展開 slide
- **Typography System**: 標題用 Sora（現代感），內文用 Noto Sans TC（中文友好），程式碼用 Fira Code
</text>
<probability>0.09</probability>
</response>

## 選擇

選擇 **方向 A：Technical Codex**，三欄式佈局，深色側邊欄搭配淺色主內容，Space Grotesk 標題字體，最適合技術文件閱讀體驗。
