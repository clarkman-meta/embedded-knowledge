// =============================================================
// Knowledge Base Data
// Technical Codex Design System
// All Qualcomm non-HLOS content organized by category
// =============================================================

export interface Article {
  id: string;
  title: string;
  description: string;
  tags: string[];
  content: string; // Markdown-like HTML content
  lastUpdated: string;
}

export interface SubCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  articles: Article[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: "qcom",
    title: "Qualcomm",
    description: "Qualcomm Snapdragon SoC 平台架構、non-HLOS 韌體與子系統解析",
    icon: "Cpu",
    color: "green",
    subcategories: [
      {
        id: "non-hlos-overview",
        title: "non-HLOS 架構總覽",
        description: "HLOS 與 non-HLOS 的分界，以及整體系統架構概念",
        icon: "Layers",
        articles: [
          {
            id: "what-is-non-hlos",
            title: "什麼是 non-HLOS？",
            description: "理解 Qualcomm 平台中 HLOS 與 non-HLOS 的分界與設計理念",
            tags: ["概念", "架構", "入門"],
            lastUpdated: "2026-04-14",
            content: `
<h1>什麼是 non-HLOS？</h1>

<p>在 Qualcomm（高通）的 Snapdragon SoC 平台中，整個系統的軟體被廣泛劃分為兩大類：</p>

<ul>
  <li><strong>HLOS（High-Level Operating System）</strong>：高階作業系統，如 Android、Linux。這是使用者直接接觸到的系統層。</li>
  <li><strong>non-HLOS</strong>：運行在 SoC 內部各個獨立協同處理器（Co-processors）、微控制器（MCUs）以及數位訊號處理器（DSPs）上的底層韌體與即時作業系統（RTOS）。</li>
</ul>

<h2>為什麼需要 non-HLOS？</h2>

<p>Qualcomm 的 SoC 是一個高度<strong>異構運算（Heterogeneous Computing）</strong>平台。為了達到以下目標，許多底層任務會交由專屬的 MCU 或 DSP 來處理：</p>

<ul>
  <li><strong>降低功耗</strong>：讓主 CPU 進入深度睡眠，由低功耗子系統持續運作</li>
  <li><strong>即時性（Real-time）</strong>：某些任務（如射頻通訊、感測器採集）需要精確的時序控制，不適合在通用 OS 上執行</li>
  <li><strong>安全隔離</strong>：加密、金鑰管理等敏感操作需要在隔離的安全環境中執行</li>
  <li><strong>專業化加速</strong>：音訊、影像、AI 等任務由專屬硬體加速，效率遠高於通用 CPU</li>
</ul>

<h2>non-HLOS 的典型映像檔（Image）</h2>

<p>在編譯 Qualcomm 平台程式碼時，會看到大量 non-HLOS 映像檔：</p>

<table>
  <thead><tr><th>映像檔名稱</th><th>對應子系統</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td><code>xbl.img</code></td><td>XBL Bootloader</td><td>第二階段啟動載入程式</td></tr>
    <tr><td><code>tz.img</code></td><td>TrustZone / TEE</td><td>安全執行環境</td></tr>
    <tr><td><code>modem.img</code> / <code>NON-HLOS.bin</code></td><td>MPSS</td><td>數據機基頻韌體</td></tr>
    <tr><td><code>adsp.img</code></td><td>ADSP / LPASS</td><td>音訊 DSP 韌體</td></tr>
    <tr><td><code>slpi.img</code></td><td>SLPI / SSC</td><td>感測器低功耗島韌體</td></tr>
    <tr><td><code>cdsp.img</code></td><td>CDSP</td><td>運算 DSP / AI 加速韌體</td></tr>
    <tr><td><code>aop.img</code></td><td>AOP</td><td>Always-On 電源管理處理器</td></tr>
    <tr><td><code>wpss.img</code></td><td>WPSS / WCN</td><td>Wi-Fi / Bluetooth 子系統韌體</td></tr>
  </tbody>
</table>

<h2>non-HLOS 與 HLOS 的通訊</h2>

<p>這些子系統各自運行專屬的韌體，並透過以下機制與主作業系統進行高效通訊：</p>

<ul>
  <li><strong>Shared Memory（共享記憶體）</strong>：最基礎的資料交換方式</li>
  <li><strong>SMD / GLINK</strong>：Qualcomm 的共享記憶體驅動（Shared Memory Driver）通訊協定</li>
  <li><strong>QMI（Qualcomm Messaging Interface）</strong>：高層 RPC 協定，用於 HLOS 與數據機等子系統的指令交換</li>
  <li><strong>SMP2P（Shared Memory Point to Point）</strong>：用於傳遞中斷訊號與狀態通知</li>
</ul>
            `
          }
        ]
      },
      {
        id: "bootloader",
        title: "啟動流程（Boot Chain）",
        description: "PBL、XBL、TrustZone 的信任鏈與安全啟動機制",
        icon: "Play",
        articles: [
          {
            id: "boot-chain-overview",
            title: "Qualcomm 啟動信任鏈（Chain of Trust）",
            description: "從 PBL 到 HLOS 的完整啟動流程與各階段職責",
            tags: ["Boot", "XBL", "TrustZone", "安全"],
            lastUpdated: "2026-04-14",
            content: `
<h1>Qualcomm 啟動信任鏈（Chain of Trust）</h1>

<p>在 HLOS（Android/Linux）載入之前，系統必須經過一系列嚴格的信任鏈啟動流程。每個階段都會驗證下一個階段的數位簽章，確保只有經過授權的韌體才能執行。</p>

<h2>啟動流程圖</h2>

<pre>ROM（PBL）
  ↓ 驗證並載入
XBL（eXtensible Boot Loader）
  ↓ 初始化 DDR、PMIC、時脈
  ↓ 載入並驗證
TZ（TrustZone）+ HYP（Hypervisor）
  ↓ 建立安全世界
  ↓ 載入並驗證
HLOS（Android / Linux Kernel）</pre>

<h2>各階段詳解</h2>

<h3>PBL（Primary Boot Loader）</h3>

<p>PBL 是固化在晶片唯讀記憶體（ROM）中的<strong>第一階段啟動程式</strong>，無法被修改或替換。</p>

<ul>
  <li>建立硬體信任根（Root of Trust）</li>
  <li>初始化最基礎的硬體（時脈、電源）</li>
  <li>從儲存裝置（eMMC/UFS）讀取並驗證 XBL 的數位簽章</li>
  <li>將控制權移交給 XBL</li>
</ul>

<div class="callout-info">
  <strong>ℹ️ 備註：</strong>PBL 固化在 ROM 中，是整個信任鏈的起點。即使裝置被 root，PBL 本身也無法被修改。
</div>

<h3>XBL（eXtensible Boot Loader）</h3>

<p>XBL 取代了早期的 SBL（Secondary Boot Loader），是功能最豐富的啟動階段。它基於 UEFI 框架實作。</p>

<ul>
  <li>初始化 DDR 記憶體（DRAM 訓練）</li>
  <li>初始化電源管理 IC（PMIC）</li>
  <li>設定系統時脈與電壓</li>
  <li>提供 UEFI 介面，載入 TrustZone、Hypervisor 等後續映像</li>
  <li>支援 Fastboot 模式（用於刷機）</li>
</ul>

<p>XBL 通常包含兩個映像檔：</p>
<ul>
  <li><code>xbl.img</code>：主要啟動程式</li>
  <li><code>xbl_config.img</code>：硬體初始化配置資料（DDR 時序等）</li>
</ul>

<h3>TZ（TrustZone / TEE）</h3>

<p>基於 ARM TrustZone 技術的<strong>安全執行環境（Trusted Execution Environment）</strong>。它將處理器分為「安全世界（Secure World）」與「正常世界（Normal World）」。</p>

<ul>
  <li>處理加密操作與金鑰管理（如 Keymaster）</li>
  <li>驗證指紋、臉部辨識的生物特徵資料</li>
  <li>管理數位版權（DRM，如 Widevine L1）</li>
  <li>執行安全啟動的映像驗證</li>
  <li>提供 QSEE（Qualcomm Secure Execution Environment）服務</li>
</ul>

<h3>HYP（Hypervisor）</h3>

<p>Qualcomm 的 Type-1 虛擬機監視器（如 Gunyah Hypervisor），運行在 ARM EL2 特權層。</p>

<ul>
  <li>隔離不同的虛擬機器與作業系統</li>
  <li>確保 TrustZone 安全世界不被 HLOS 直接存取</li>
  <li>在車用平台上用於隔離多個作業系統（如儀表板 OS + 娛樂系統 OS）</li>
</ul>

<h2>ARM 特權層對應</h2>

<table>
  <thead><tr><th>ARM 特權層</th><th>元件</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td><code>EL3（Monitor）</code></td><td>TrustZone Monitor</td><td>最高特權，管理安全/非安全世界切換</td></tr>
    <tr><td><code>EL2</code></td><td>HYP（Hypervisor）</td><td>虛擬化層</td></tr>
    <tr><td><code>EL1（Secure）</code></td><td>TZ / QSEE</td><td>安全世界 OS</td></tr>
    <tr><td><code>EL1（Non-secure）</code></td><td>Linux Kernel / Android</td><td>正常世界 OS（HLOS）</td></tr>
    <tr><td><code>EL0</code></td><td>User Apps</td><td>應用程式層</td></tr>
  </tbody>
</table>
            `
          }
        ]
      },
      {
        id: "sensor-subsystem",
        title: "感測器子系統",
        description: "SLPI、ADSP 的分層感測器架構與低功耗設計",
        icon: "Activity",
        articles: [
          {
            id: "sensor-layered-arch",
            title: "感測器分層架構：SLPI vs ADSP",
            description: "釐清 SLPI 與 ADSP 在感測器處理上的精確分工與協作關係",
            tags: ["SLPI", "ADSP", "Sensor", "低功耗", "Always-on"],
            lastUpdated: "2026-04-14",
            content: `
<h1>感測器分層架構：SLPI vs ADSP</h1>

<p>在 Qualcomm 平台上，感測器的處理並非由單一子系統負責，而是採用<strong>分層喚醒架構（Wake-up Chain）</strong>。這是開發者最容易混淆的部分。</p>

<div class="callout-tip">
  <strong>✅ 核心概念：</strong>SLPI 與 ADSP 是<strong>協作關係</strong>，不是競爭關係。兩者形成一個功耗由低到高的喚醒鏈，只在必要時才喚醒更耗電的上層處理器。
</div>

<h2>三層感測器處理架構</h2>

<table>
  <thead><tr><th>層次</th><th>子系統</th><th>功耗</th><th>典型用途</th></tr></thead>
  <tbody>
    <tr><td><strong>最低功耗</strong></td><td>SLPI / SSC</td><td>極低（&lt; 1 mW）</td><td>計步器、Always-on 手勢、抬腕亮屏</td></tr>
    <tr><td><strong>中等功耗</strong></td><td>ADSP（aDSP / LPASS）</td><td>低（數 mW）</td><td>語音喚醒、複雜感測器融合、音訊處理</td></tr>
    <tr><td><strong>最高功耗</strong></td><td>APSS（主 CPU + HLOS）</td><td>高（數百 mW）</td><td>應用層感測器資料消費、UI 更新</td></tr>
  </tbody>
</table>

<h2>SLPI（Sensor Low Power Island）</h2>

<p>SLPI 也稱為 <strong>SSC（Snapdragon Sensor Core）</strong>，自 Snapdragon 820 起引入。它是一個物理上獨立的電源島（Power Island），擁有自己的電源軌與微型 Hexagon DSP 核心。</p>

<ul>
  <li><strong>物理獨立性</strong>：當整個 SoC（包含主 CPU 與 ADSP）進入深度睡眠時，SLPI 可以完全獨立供電運作</li>
  <li><strong>直接連接感測器</strong>：SLPI 擁有自己的 I2C/SPI 介面，感測器（加速度計、陀螺儀等）直接連接到 SLPI 的 GPIO，而非主 SoC 的 GPIO</li>
  <li><strong>典型應用</strong>：計步器（Pedometer）、抬腕亮屏（Lift-to-wake）、Always-on 手勢偵測</li>
  <li><strong>觸發上層</strong>：達到觸發條件時，才喚醒 ADSP 或主 CPU</li>
</ul>

<div class="callout-warning">
  <strong>⚠️ 重要：</strong>在許多 Qualcomm 手機上，感測器的 I2C/SPI 線路是直接連到 SLPI 的，<strong>無法繞過 SLPI 直接從主 CPU 存取感測器</strong>。這也是為什麼 Linux mainline 支援這些感測器需要先支援 SLPI 韌體載入。
</div>

<h2>ADSP（Audio Digital Signal Processor / LPASS）</h2>

<p>ADSP 在系統休眠時<strong>也可以保持運作</strong>（ADSP Island Mode），但其功耗高於 SLPI。因此它負責需要更多運算能力的低功耗任務。</p>

<ul>
  <li><strong>語音喚醒（Voice Trigger）</strong>：持續跑一個小型神經網路模型，偵測 "Hey Siri" / "OK Google" 等喚醒詞</li>
  <li><strong>複雜感測器融合（Sensor Fusion）</strong>：將加速度計 + 陀螺儀 + 磁力計融合成精確的方向矩陣（需要較多運算）</li>
  <li><strong>音訊串流</strong>：播放音樂時，ADSP 處理音訊解碼，主 CPU 可以睡眠</li>
  <li><strong>QSH（Qualcomm Sensing Hub）框架</strong>：在較新平台（QCS5430/QCS6490）上，ADSP 提供 QSH 框架統一管理感測器資料流</li>
</ul>

<h2>喚醒鏈（Wake-up Chain）</h2>

<pre>感測器原始資料（加速度計、陀螺儀等）
        ↓
SLPI（極低功耗，持續運作，< 1 mW）
        ↓ 達到條件（如偵測到明顯動作）
ADSP（低功耗，被喚醒做複雜處理，數 mW）
        ↓ 達到條件（如偵測到語音喚醒詞）
APSS / HLOS（主 CPU，被喚醒執行應用邏輯，數百 mW）</pre>

<h2>常見問題釐清</h2>

<p><strong>Q: ADSP 在 sleep 狀態下不會使用 sensor 嗎？</strong></p>
<p>A: <strong>不對</strong>。ADSP 在系統 sleep 時確實可以保持運作（ADSP Island Mode），並且可以處理感測器資料。但 SLPI 的功耗比 ADSP 更低，因此最基礎的 Always-on 採集由 SLPI 負責，只有需要更複雜運算時才喚醒 ADSP。</p>

<p><strong>Q: SLPI 和 ADSP 的感測器是同一組嗎？</strong></p>
<p>A: 通常感測器的物理介面（I2C/SPI）是連接到 SLPI 的。ADSP 透過 IPC（Inter-Processor Communication）從 SLPI 取得資料，而非直接連接感測器硬體。
            `
          },
          {
            id: "slpi-ssc-detail",
            title: "SLPI / SSC 深度解析",
            description: "Snapdragon Sensor Core 的硬體架構、韌體載入與 Linux 支援",
            tags: ["SLPI", "SSC", "Hexagon", "Linux", "韌體"],
            lastUpdated: "2026-04-14",
            content: `
<h1>SLPI / SSC 深度解析</h1>

<p>SLPI（Sensor Low Power Island）自 Snapdragon 820（MSM8996）起引入，也被稱為 SSC（Snapdragon Sensor Core）。它是一個包含 Hexagon DSP 核心的感測器集線器（Sensor Hub）。</p>

<h2>硬體組成</h2>

<ul>
  <li><strong>Hexagon DSP 核心</strong>：低功耗的 VLIW 處理器，執行感測器資料處理演算法</li>
  <li><strong>專屬 GPIO / I2C / SPI 介面</strong>：直接連接外部感測器，與主 SoC 的 GPIO 完全獨立</li>
  <li><strong>獨立電源軌</strong>：可在主 SoC 斷電時繼續供電</li>
  <li><strong>獨立記憶體區域</strong>：在系統記憶體中有專屬的保留區域（reserved memory）</li>
</ul>

<h2>韌體載入機制</h2>

<p>SLPI 韌體透過 Linux 的 <code>qcom_q6v5_pas</code> 驅動程式載入：</p>

<pre>1. Linux 驅動程式從檔案系統讀取 slpi.mbn 韌體
2. 將韌體載入到預留的記憶體區域
3. 在 TrustZone（安全世界）中驗證韌體簽章
4. 重置 SLPI 處理器，開始執行韌體
5. 透過 SMP2P 中斷確認 SLPI 就緒</pre>

<h2>通訊機制</h2>

<p>SLPI 與主 CPU 之間的通訊使用以下機制：</p>

<table>
  <thead><tr><th>機制</th><th>用途</th></tr></thead>
  <tbody>
    <tr><td>SMD / GLINK</td><td>主要資料通道，傳輸感測器資料</td></tr>
    <tr><td>SMP2P（Shared Memory Point to Point）</td><td>傳遞狀態訊號（ready、fatal、stop 等）</td></tr>
    <tr><td>Shared Memory（SMEM）</td><td>底層共享記憶體基礎設施</td></tr>
  </tbody>
</table>

<h2>Linux Mainline 支援挑戰</h2>

<p>在 Linux mainline 上支援 SLPI 面臨以下挑戰：</p>

<ul>
  <li><strong>專有韌體</strong>：SLPI 韌體（<code>slpi.mbn</code>）是 Qualcomm 的專有二進位檔，沒有開放原始碼</li>
  <li><strong>專有 HAL</strong>：Android 上的感測器 HAL 是閉源的，與 SLPI 韌體緊密耦合</li>
  <li><strong>無法繞過</strong>：感測器的 I2C/SPI 線路直接連接到 SLPI，無法從主 CPU 直接存取</li>
  <li><strong>逆向工程</strong>：postmarketOS 社群正在進行 SLPI 驅動的逆向工程工作</li>
</ul>

<div class="callout-info">
  <strong>ℹ️ 參考：</strong>postmarketOS 的 EMAINLINE 系列文章詳細記錄了在 MSM8996 上啟用 SLPI 的過程，包括 Device Tree 設定、記憶體區域配置等。
</div>
            `
          }
        ]
      },
      {
        id: "dsp-subsystems",
        title: "DSP 子系統",
        description: "ADSP、CDSP 的架構與用途",
        icon: "Zap",
        articles: [
          {
            id: "adsp-lpass",
            title: "ADSP / LPASS：音訊與感測器 DSP",
            description: "ADSP 的架構、Island Mode 低功耗機制與主要應用場景",
            tags: ["ADSP", "LPASS", "音訊", "Island Mode"],
            lastUpdated: "2026-04-14",
            content: `
<h1>ADSP / LPASS：音訊與感測器 DSP</h1>

<p>ADSP（Audio Digital Signal Processor），也稱為 LPASS（Low Power Audio Subsystem），是 Qualcomm SoC 中負責音訊處理與部分感測器融合的低功耗 DSP 子系統。</p>

<h2>主要功能</h2>

<ul>
  <li><strong>音訊編解碼</strong>：硬體加速 MP3、AAC、FLAC 等格式的解碼，讓主 CPU 在播放音樂時可以睡眠</li>
  <li><strong>語音喚醒（Voice Trigger）</strong>：持續執行小型神經網路，偵測喚醒詞（"Hey Siri"、"OK Google"）</li>
  <li><strong>感測器融合（Sensor Fusion）</strong>：將多個感測器資料融合，如 IMU 融合（加速度計 + 陀螺儀 + 磁力計 → 方向）</li>
  <li><strong>音效處理</strong>：均衡器、空間音效、降噪等音訊後處理</li>
</ul>

<h2>ADSP Island Mode（低功耗模式）</h2>

<p>ADSP 支援 Island Mode，允許在系統深度睡眠時保持部分功能運作：</p>

<ul>
  <li>主 CPU 進入深度睡眠（C-state）</li>
  <li>ADSP 保持在低功耗 Island Mode</li>
  <li>繼續處理語音喚醒或感測器資料</li>
  <li>偵測到事件時，透過中斷喚醒主 CPU</li>
</ul>

<h2>與 SLPI 的分工</h2>

<table>
  <thead><tr><th>功能</th><th>SLPI</th><th>ADSP</th></tr></thead>
  <tbody>
    <tr><td>感測器物理介面（I2C/SPI）</td><td>✅ 直接連接</td><td>❌ 透過 IPC 取得</td></tr>
    <tr><td>基礎感測器採集</td><td>✅ 主要負責</td><td>❌</td></tr>
    <tr><td>簡單閾值判斷（計步）</td><td>✅</td><td>❌</td></tr>
    <tr><td>複雜感測器融合（IMU）</td><td>❌</td><td>✅</td></tr>
    <tr><td>語音喚醒神經網路</td><td>❌</td><td>✅</td></tr>
    <tr><td>音訊編解碼</td><td>❌</td><td>✅</td></tr>
    <tr><td>功耗</td><td>&lt; 1 mW</td><td>數 mW</td></tr>
  </tbody>
</table>

<h2>韌體映像檔</h2>

<p>ADSP 韌體通常打包為 <code>adsp.img</code>，包含：</p>
<ul>
  <li>QuRT RTOS（Qualcomm 的即時作業系統）</li>
  <li>音訊演算法庫</li>
  <li>感測器融合演算法</li>
  <li>語音喚醒模型</li>
</ul>
            `
          },
          {
            id: "cdsp-compute",
            title: "CDSP：運算 DSP 與 AI 加速",
            description: "CDSP 的 Hexagon 架構與 AI/ML 推論加速應用",
            tags: ["CDSP", "Hexagon", "AI", "NPU", "HVX"],
            lastUpdated: "2026-04-14",
            content: `
<h1>CDSP：運算 DSP 與 AI 加速</h1>

<p>CDSP（Compute DSP）是 Qualcomm SoC 中用於通用運算加速的 Hexagon DSP，特別針對 AI/ML 推論工作負載進行優化。</p>

<h2>Hexagon 架構特點</h2>

<ul>
  <li><strong>HVX（Hexagon Vector eXtensions）</strong>：SIMD 向量運算單元，適合影像處理與 AI 推論</li>
  <li><strong>HTA（Hexagon Tensor Accelerator）</strong>：專為矩陣乘法（神經網路推論核心運算）設計的硬體加速器</li>
  <li><strong>低功耗設計</strong>：相比 GPU，在相同 AI 推論效能下功耗更低</li>
</ul>

<h2>主要應用場景</h2>

<ul>
  <li><strong>Camera AI 處理</strong>：人臉偵測、場景辨識、背景虛化（Portrait Mode）的神經網路推論</li>
  <li><strong>語音辨識</strong>：語音轉文字（ASR）的神經網路推論</li>
  <li><strong>影像超解析度</strong>：AI 放大演算法</li>
  <li><strong>通用 GPGPU 替代</strong>：某些需要大量平行運算但對功耗敏感的任務</li>
</ul>

<h2>與 Camera ISP 的關係</h2>

<p>CDSP 在相機管線的最後階段被呼叫，負責 AI 加速部分：</p>

<pre>IFE（原始影像接收）
  ↓
BPS（Bayer 處理）
  ↓
IPE（降噪、色彩校正）
  ↓
CDSP / NPU（AI 場景辨識、人臉偵測）
  ↓
HLOS（Camera HAL 輸出最終影像）</pre>

<h2>開發介面</h2>

<ul>
  <li><strong>Qualcomm Neural Processing SDK（SNPE）</strong>：將 TensorFlow/PyTorch 模型部署到 CDSP</li>
  <li><strong>QNN（Qualcomm AI Engine Direct）</strong>：更新的 AI 推論框架</li>
  <li><strong>FastRPC</strong>：HLOS 呼叫 CDSP 上函式的遠端程序呼叫機制</li>
</ul>
            `
          }
        ]
      },
      {
        id: "mcu-subsystems",
        title: "MCU 子系統",
        description: "SMCU、CMCU 的用途與平台定位",
        icon: "Microchip",
        articles: [
          {
            id: "smcu-safety",
            title: "SMCU：車用安全微控制器",
            description: "SMCU 在車用/工業平台的功能安全角色，與 ISO 26262 的關係",
            tags: ["SMCU", "車用", "ISO 26262", "功能安全", "ASIL"],
            lastUpdated: "2026-04-14",
            content: `
<h1>SMCU：車用安全微控制器</h1>

<div class="callout-warning">
  <strong>⚠️ 常見誤解：</strong>SMCU 不是一般手機或消費性裝置上的感測器處理器。它專門用於車用（Automotive）或工業機器人平台。
</div>

<h2>什麼是 SMCU？</h2>

<p>SMCU（Safety Microcontroller Unit）是 Qualcomm 車用 SoC（如 Snapdragon Ride / IQ9 系列）中的<strong>功能安全微控制器</strong>。它符合 ISO 26262 功能安全標準，達到 ASIL-D（最高安全完整性等級）。</p>

<h2>核心職責</h2>

<ul>
  <li><strong>車輛安全控制</strong>：ADAS（先進駕駛輔助系統）的即時感測器融合與決策</li>
  <li><strong>煞車/轉向訊號</strong>：處理安全關鍵的車輛控制訊號</li>
  <li><strong>系統健康監控</strong>：監控主 SoC 的運作狀態，在主系統崩潰時執行安全停機（Safe State）</li>
  <li><strong>即時保證</strong>：提供確定性的即時回應，不受主 OS 排程影響</li>
</ul>

<h2>SAIL MCU 韌體</h2>

<p>SMCU 運行 Qualcomm 的 SAIL（Safety Abstraction Interface Layer）MCU 韌體，這是一個符合 ASIL-D 的即時作業系統環境。</p>

<h2>與消費性裝置感測器的區別</h2>

<table>
  <thead><tr><th>特性</th><th>SMCU（車用）</th><th>SLPI（手機）</th></tr></thead>
  <tbody>
    <tr><td>平台</td><td>Snapdragon Ride / IQ9</td><td>Snapdragon 8xx / 7xx</td></tr>
    <tr><td>安全標準</td><td>ISO 26262 ASIL-D</td><td>無特定安全標準</td></tr>
    <tr><td>主要任務</td><td>車輛安全控制</td><td>感測器資料採集</td></tr>
    <tr><td>即時性要求</td><td>極高（微秒級）</td><td>中等（毫秒級）</td></tr>
    <tr><td>失效處理</td><td>安全停機（Safe State）</td><td>感測器資料中斷</td></tr>
  </tbody>
</table>
            `
          },
          {
            id: "cmcu-connectivity",
            title: "CMCU：連線微控制器",
            description: "CMCU 在 Wi-Fi / Bluetooth 低功耗連線維持中的角色",
            tags: ["CMCU", "Wi-Fi", "Bluetooth", "IoT", "低功耗"],
            lastUpdated: "2026-04-14",
            content: `
<h1>CMCU：連線微控制器</h1>

<div class="callout-warning">
  <strong>⚠️ 常見誤解：</strong>CMCU 的「C」代表 <strong>Connectivity（連線）</strong>，不是 Camera。Camera 處理由獨立的 ISP 硬體負責，與 CMCU 完全無關。
</div>

<h2>什麼是 CMCU？</h2>

<p>CMCU（Connectivity Microcontroller Unit）是 Qualcomm 低功耗 IoT 晶片（如 QCC730M、QCC74x 系列）中的連線管理微控制器。</p>

<h2>核心職責</h2>

<ul>
  <li><strong>Wi-Fi 連線維持</strong>：在主處理器睡眠時，維持 Wi-Fi 連線狀態（Keep-alive 封包）</li>
  <li><strong>Bluetooth 低功耗（BLE）管理</strong>：處理 BLE 廣播與連線維持</li>
  <li><strong>802.15.4（Thread/Zigbee）</strong>：在 IoT 應用中管理 Mesh 網路協定</li>
  <li><strong>喚醒主處理器</strong>：收到重要網路事件時，喚醒主 CPU 處理</li>
</ul>

<h2>應用場景</h2>

<p>CMCU 主要出現在以下場景：</p>
<ul>
  <li>智慧家居裝置（智慧燈泡、門鎖、感測器節點）</li>
  <li>工業 IoT 閘道器</li>
  <li>穿戴裝置的無線連線管理</li>
</ul>

<h2>與 WPSS 的區別</h2>

<p>在較大的 Snapdragon 行動 SoC 中，Wi-Fi/BT 功能由 <strong>WPSS（Wireless Processor Subsystem）</strong>負責，而非 CMCU。CMCU 主要出現在專為 IoT 設計的低功耗晶片中。</p>
            `
          }
        ]
      },
      {
        id: "camera-isp",
        title: "相機 ISP 管線",
        description: "IFE、IPE、BPS 等相機硬體加速器的架構與分工",
        icon: "Camera",
        articles: [
          {
            id: "camera-isp-pipeline",
            title: "Camera ISP 處理管線",
            description: "從 MIPI CSI 原始影像到最終輸出的完整硬體處理流程",
            tags: ["Camera", "ISP", "IFE", "IPE", "BPS", "MIPI CSI"],
            lastUpdated: "2026-04-14",
            content: `
<h1>Camera ISP 處理管線</h1>

<p>Camera 的資料處理是一項極度消耗頻寬與運算資源的任務。Qualcomm 設計了一套專屬的 ISP（Image Signal Processor）硬體加速器管線，由主 CPU 上的 HLOS（Android 的 <code>cam-server</code>）直接控制。</p>

<div class="callout-info">
  <strong>ℹ️ 重點：</strong>Camera 處理<strong>不屬於低功耗 MCU 的範疇</strong>，也與 CMCU 無關。它由 SoC 內部的專屬 ISP 硬體負責。
</div>

<h2>完整 Camera 處理管線</h2>

<pre>Camera Sensor（CMOS 感光元件）
        ↓ MIPI CSI 介面
IFE（Image Front End）
  - 接收原始 Bayer 格式影像
  - 去馬賽克（Debayer）
  - 初步 ISP 處理（黑電平校正、鏡頭陰影校正）
        ↓
BPS（Bayer Processing Segment）
  - 靜態照片的高解析度 Bayer 資料處理
  - 高品質降噪
        ↓
IPE（Image Processing Engine）
  - 硬體降噪（NR）
  - 色彩校正（Color Correction）
  - HDR 合成
  - 銳化（Sharpening）
        ↓
CDSP / NPU（選用）
  - AI 場景辨識
  - 人臉偵測
  - 背景虛化（Portrait Mode）
        ↓
HLOS（cam-server / Camera HAL）
  - 輸出最終影像到應用程式</pre>

<h2>各元件詳解</h2>

<table>
  <thead><tr><th>元件</th><th>全稱</th><th>主要職責</th></tr></thead>
  <tbody>
    <tr><td><strong>IFE</strong></td><td>Image Front End</td><td>接收 MIPI CSI 原始影像、去馬賽克、初步 ISP</td></tr>
    <tr><td><strong>IPE</strong></td><td>Image Processing Engine</td><td>降噪、色彩校正、HDR 合成、銳化</td></tr>
    <tr><td><strong>BPS</strong></td><td>Bayer Processing Segment</td><td>靜態照片的高解析度 Bayer 處理</td></tr>
    <tr><td><strong>CDSP/NPU</strong></td><td>Compute DSP / AI Engine</td><td>AI 場景辨識、人臉偵測（神經網路推論）</td></tr>
    <tr><td><strong>Offline IFE</strong></td><td>Offline Image Front End</td><td>支援多相機離線處理，不佔用即時 IFE 資源</td></tr>
  </tbody>
</table>

<h2>驅動架構</h2>

<p>在 Linux/Android 上，Camera ISP 的驅動架構如下：</p>

<ul>
  <li><strong>V4L2（Video4Linux2）</strong>：Linux 標準影像裝置介面</li>
  <li><strong>cam-server</strong>：Qualcomm 的相機服務程序，管理 ISP 硬體資源</li>
  <li><strong>Camera HAL3</strong>：Android 相機硬體抽象層，連接 cam-server 與 Android 相機框架</li>
</ul>
            `
          }
        ]
      },
      {
        id: "power-modem",
        title: "電源與通訊子系統",
        description: "AOP/RPM 電源管理、MPSS 數據機子系統",
        icon: "Radio",
        articles: [
          {
            id: "aop-rpm-power",
            title: "AOP / RPM：Always-On 電源管理",
            description: "AOP 與 RPM 在全系統電源協調中的角色",
            tags: ["AOP", "RPM", "電源管理", "Always-On"],
            lastUpdated: "2026-04-14",
            content: `
<h1>AOP / RPM：Always-On 電源管理</h1>

<p>AOP（Always On Processor）或舊版的 RPM（Resource Power Manager）是 Qualcomm SoC 中<strong>始終保持喚醒狀態</strong>的微型處理器，負責協調整個 SoC 的電源管理。</p>

<h2>核心職責</h2>

<ul>
  <li><strong>電壓調節器（Regulators）管理</strong>：根據各子系統的需求，動態調整電壓軌的電壓與電流</li>
  <li><strong>時脈（Clocks）管理</strong>：協調各子系統的時脈頻率請求，找到最佳平衡點</li>
  <li><strong>匯流排頻寬（Bus Bandwidth）</strong>：管理記憶體匯流排的頻寬分配</li>
  <li><strong>睡眠協調</strong>：當所有子系統都進入睡眠時，協調整個 SoC 進入最深度的睡眠狀態</li>
</ul>

<h2>AOP vs RPM</h2>

<table>
  <thead><tr><th>特性</th><th>RPM（舊版）</th><th>AOP（新版）</th></tr></thead>
  <tbody>
    <tr><td>出現時間</td><td>Snapdragon 8xx（早期）</td><td>Snapdragon 845 起</td></tr>
    <tr><td>通訊方式</td><td>RPM SMD（共享記憶體）</td><td>RSC（Resource State Coordinator）</td></tr>
    <tr><td>延遲</td><td>較高</td><td>更低（硬體加速）</td></tr>
    <tr><td>韌體映像</td><td><code>rpm.img</code></td><td><code>aop.img</code></td></tr>
  </tbody>
</table>

<h2>Linux 驅動介面</h2>

<p>在 Linux 中，與 AOP/RPM 的通訊透過以下驅動程式：</p>
<ul>
  <li><code>qcom-rpmh</code>：RPM Hardened（新版 AOP 介面）</li>
  <li><code>qcom-smd-rpm</code>：舊版 RPM SMD 介面</li>
  <li>透過 <code>regulator</code> 和 <code>clk</code> 框架向上層提供標準介面</li>
</ul>
            `
          },
          {
            id: "mpss-modem",
            title: "MPSS：數據機子系統",
            description: "MPSS 基頻韌體的架構與 4G/5G 通訊處理",
            tags: ["MPSS", "Modem", "4G", "5G", "基頻"],
            lastUpdated: "2026-04-14",
            content: `
<h1>MPSS：數據機子系統</h1>

<p>MPSS（Modem Peripheral Subsystem）是 Qualcomm SoC 中負責蜂巢式網路通訊的基頻子系統，包含處理 4G LTE / 5G NR 通訊的完整基頻韌體。</p>

<h2>核心職責</h2>

<ul>
  <li><strong>射頻訊號處理</strong>：4G/5G 訊號的調變（Modulation）與解調（Demodulation）</li>
  <li><strong>協定堆疊</strong>：完整的蜂巢式網路協定堆疊（RRC、NAS、MAC、PHY 等層）</li>
  <li><strong>基地台通訊</strong>：與基地台（eNB/gNB）的通訊協定處理</li>
  <li><strong>語音通話</strong>：VoLTE / VoNR 語音通話的訊號處理</li>
</ul>

<h2>韌體映像檔</h2>

<p>MPSS 韌體通常以以下形式存在：</p>
<ul>
  <li><code>modem.img</code>：數據機韌體主映像</li>
  <li><code>NON-HLOS.bin</code>：在較舊平台上，所有 non-HLOS 韌體打包成單一檔案</li>
</ul>

<h2>與 HLOS 的通訊</h2>

<p>MPSS 與 Android/Linux 的通訊使用 <strong>QMI（Qualcomm Messaging Interface）</strong>協定，這是一個基於共享記憶體的 RPC 機制：</p>

<ul>
  <li>Android 的 <code>rild</code>（Radio Interface Layer Daemon）透過 QMI 與 MPSS 通訊</li>
  <li>提供標準的 RIL（Radio Interface Layer）介面給 Android 電話框架</li>
</ul>

<div class="callout-warning">
  <strong>⚠️ 安全性：</strong>MPSS 是 non-HLOS 中攻擊面最大的子系統之一，因為它直接處理來自外部網路的資料。歷史上曾有多個 MPSS 漏洞被發現，可能影響整個裝置的安全性。
</div>
            `
          }
        ]
      }
    ]
  },
  {
    id: "sensor",
    title: "Sensor",
    description: "感測器驅動開發、校準、協定與應用（即將加入 SX9204 CapSense 內容）",
    icon: "Gauge",
    color: "blue",
    subcategories: [
      {
        id: "capsense",
        title: "CapSense / SAR",
        description: "電容式近接感測器（SAR Sensor）的原理、驅動與調校",
        icon: "Waves",
        articles: [
          {
            id: "capsense-coming-soon",
            title: "SX9204 CapSense 內容（即將加入）",
            description: "Semtech SX9204 SAR 近接感測器的暫存器設定、Scan Period、Phase 配置等內容即將整理加入",
            tags: ["SX9204", "CapSense", "SAR", "即將加入"],
            lastUpdated: "2026-04-14",
            content: `
<h1>SX9204 CapSense 內容（即將加入）</h1>

<p>此分類將整理 Semtech SX9204 SAR（Specific Absorption Rate）電容式近接感測器的相關知識，包含：</p>

<ul>
  <li><strong>硬體架構</strong>：SX9204 的 4 個 CSIO Channel 與 Phase 設計</li>
  <li><strong>Scan Period 計算</strong>：sensing duration、processing duration 與 Phase 數量的關係</li>
  <li><strong>暫存器設定</strong>：PHEN（Phase Enable）、FREQ（Sampling Frequency）、RESOLUTION 等關鍵暫存器</li>
  <li><strong>Linux Kernel Driver</strong>：<code>sx9324.c</code> 驅動架構與 IIO 框架整合</li>
  <li><strong>校準流程</strong>：近接感測器的調校方法</li>
</ul>

<div class="callout-info">
  <strong>ℹ️ 備註：</strong>請將您的 SX9204 相關對話內容提供給我，我將整理成完整的學習文件加入此分類。
</div>
            `
          }
        ]
      }
    ]
  }
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getSubCategoryById(catId: string, subId: string): SubCategory | undefined {
  const cat = getCategoryById(catId);
  return cat?.subcategories.find(s => s.id === subId);
}

export function getArticleById(catId: string, subId: string, artId: string): Article | undefined {
  const sub = getSubCategoryById(catId, subId);
  return sub?.articles.find(a => a.id === artId);
}

export function getAllArticles(): Array<Article & { categoryId: string; subcategoryId: string }> {
  const result: Array<Article & { categoryId: string; subcategoryId: string }> = [];
  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      for (const art of sub.articles) {
        result.push({ ...art, categoryId: cat.id, subcategoryId: sub.id });
      }
    }
  }
  return result;
}
