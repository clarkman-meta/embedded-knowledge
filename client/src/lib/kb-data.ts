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

export interface ChipModel {
  id: string;
  title: string;
  description: string;
  icon?: string;
  articles: Article[];
}

export interface SubCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  // Either flat articles (legacy, e.g. qcom) or chip-level grouping
  articles?: Article[];
  chips?: ChipModel[];
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
SLPI（極低功耗，持續運作，&lt; 1 mW）
        ↓ 達到條件（如偵測到明顯動作）
ADSP（低功耗，被喚醒做複雜處理，數 mW）
        ↓ 達到條件（如偵測到語音喚醒詞）
APSS / HLOS（主 CPU，被喚醒執行應用邏輯，數百 mW）</pre>

<h2>常見問題釐清</h2>

<p><strong>Q: ADSP 在 sleep 狀態下不會使用 sensor 嗎？</strong></p>
<p>A: <strong>不對</strong>。ADSP 在系統 sleep 時確實可以保持運作（ADSP Island Mode），並且可以處理感測器資料。但 SLPI 的功耗比 ADSP 更低，因此最基礎的 Always-on 採集由 SLPI 負責，只有需要更複雜運算時才喚醒 ADSP。</p>

<p><strong>Q: SLPI 和 ADSP 的感測器是同一組嗎？</strong></p>
<p>A: 通常感測器的物理介面（I2C/SPI）是連接到 SLPI 的。ADSP 透過 IPC（Inter-Processor Communication）從 SLPI 取得資料，而非直接連接感測器硬體。</p>
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
5. 透過 SMP2P 中斷確認 SLPI 已就緒</pre>

<h2>Linux 支援現狀</h2>

<p>SLPI 的 Linux mainline 支援需要以下元件：</p>
<ul>
  <li><code>remoteproc</code> 框架：管理遠端處理器的生命週期</li>
  <li><code>qcom_q6v5_pas</code> 驅動：Qualcomm 的 Peripheral Authentication Service 介面</li>
  <li><code>fastrpc</code>：HLOS 與 SLPI 之間的函式呼叫橋接</li>
  <li>Device Tree 節點：描述 SLPI 的記憶體保留區域與中斷配置</li>
</ul>

<h2>SMCU vs SLPI</h2>

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
    description: "感測器驅動開發、校準、協定與應用",
    icon: "Gauge",
    color: "blue",
    subcategories: [
      {
        id: "capsense",
        title: "CapSense / SAR",
        description: "電容式近接感測器（SAR Sensor）的原理、驅動與調校",
        icon: "Waves",
        chips: [
          {
            id: "sx9204",
            title: "SX9204",
            description: "Semtech SX9204 4 通道電容式近接感測器",
            articles: [
          {
            id: "sx9204-overview",
            title: "SX9204 架構總覽與 AFE 流程",
            description: "深入解析 Semtech SX9204 SAR 感測器的硬體架構、Phase 概念與類比前端（AFE）信號處理流程。",
            tags: ["SX9204", "CapSense", "SAR", "Phase", "AFE"],
            lastUpdated: "2026-04-14",
            content: `
<h1>SX9204 架構總覽與 AFE 流程</h1>

<p>SX9204 是 Semtech 推出的 4 通道電容式近接感測器（SAR / CapSense），廣泛用於手機、穿戴裝置、IoT 設備的人體近接偵測，特別是在 SAR（Specific Absorption Rate）功率控制應用中，用來偵測人體靠近並降低射頻發射功率以符合安全規範。</p>

<h2>硬體架構與 Phase 概念</h2>

<p>SX9204 擁有 4 個感測通道（CSIO-0 到 CSIO-3）。與一般感測器不同，SX9204 的量測是基於 <strong>Phase（掃描階段）</strong> 的概念。晶片內部支援多個 Phase（最多 8 個，PH0 到 PH7），每個 Phase 可以獨立設定要量測哪個感測通道，或是將多個通道組合在一起量測。</p>

<ul>
  <li><strong>獨立設定</strong>：每個 Phase 都有自己獨立的暫存器設定（如解析度、採樣頻率、閾值等）。</li>
  <li><strong>彈性配置</strong>：在一個 Phase 中，可以設定某個 CSIO 腳位為量測輸入（Measured Input）、接地（GND）、高阻抗（HZ）或動態屏蔽（Dynamic Shield）。</li>
</ul>

<h2>AFE（Analog Front End）信號處理流程</h2>

<p>從感測電極到數位信號，SX9204 的類比前端經歷了以下核心處理流程：</p>

<pre>PCB 感測電極（Sensor Pad）
        ↓ 
1. 電容量測（Capacitance Measurement）
        ↓
2. 自動偏移補償（Auto-Offset Compensation）
        ↓
3. 類比數位轉換（ADC Conversion）
        ↓
PROXRAW（原始數位量測值）</pre>

<h3>1. 電容量測與挑戰</h3>
<p>感測電極與人體之間的電容變化（CUser）通常非常微小（aF 等級），而環境本身的寄生電容（CEnv）可能高達幾十 pF。系統面臨的挑戰是如何在巨大的環境電容中，精確提取微小的人體電容變化。</p>

<h3>2. 自動偏移補償（Auto-Offset Compensation）</h3>
<p>為了解決上述挑戰，SX9204 內建了 Auto-Offset Compensation 機制。在量測前，系統會動態監控並<strong>抵消掉環境電容（CEnv）</strong>。這樣一來，ADC 只需要處理人體靠近帶來的微小變化（CUser），大幅提高了系統的動態範圍與靈敏度。</p>

<h3>3. 類比數位轉換（ADC）</h3>
<p>經過補償後的電容信號進入 ADC 轉換為數位值。這個過程受到兩個關鍵參數影響：</p>
<ul>
  <li><strong>AGAIN（Analog Gain）</strong>：定義系統的滿量程電容值（Full-scale capacitance）。必須設定得當，確保物體靠近時信號最大化但不會飽和（Saturate）。</li>
  <li><strong>RESOLUTION（解析度）</strong>：決定 ADC 輸出的精度。解析度越高，信號越平滑，但需要更長的量測時間與更高的功耗。</li>
</ul>

<h2>數位信號鏈概覽</h2>
<p>經過 AFE 處理後，產生的 <code>PROXRAW</code> 會進入數位濾波鏈，依序經過 RAW Filter、USE Filter 和 AVG Filter，最終計算出 <code>PROXDIFF</code> 並與閾值比較以決定偵測狀態（PROXSTAT）。詳細的數位濾波流程將在後續章節深入探討。</p>

<h2>官方規格書下載</h2>

<p>以下為本知識庫所參考的 Semtech 官方文件，可直接下載 PDF：</p>

<table>
  <thead><tr><th>文件名稱</th><th>版本</th><th>說明</th><th>下載</th></tr></thead>
  <tbody>
    <tr>
      <td>SX9204 Datasheet</td>
      <td>Rev. 3</td>
      <td>完整硬體規格、暫存器地圖、電氣特性</td>
      <td><a href="https://d2xsxph8kpxj0f.cloudfront.net/310519663408076565/3qEFW4iCXc8PkkvG87arAD/SX9204_Final_DS_Rev3_4cd16e30.pdf" target="_blank" rel="noopener">📄 下載</a></td>
    </tr>
    <tr>
      <td>SX9200/04/06 Parameters Adjustment Guidelines</td>
      <td>Rev. 1.7</td>
      <td>參數調校指南，涵蓋 AGAIN、Threshold、HYST 設定方法</td>
      <td><a href="https://d2xsxph8kpxj0f.cloudfront.net/310519663408076565/3qEFW4iCXc8PkkvG87arAD/SX9200_04_06_Parameters_Adjustment_Guidelines_Rev1_7_12232024_0353fab6.pdf" target="_blank" rel="noopener">📄 下載</a></td>
    </tr>
    <tr>
      <td>SX9204 Reference Sensor Correction Guidelines</td>
      <td>Rev. 1</td>
      <td>參考感測器補償技術應用說明</td>
      <td><a href="https://d2xsxph8kpxj0f.cloudfront.net/310519663408076565/3qEFW4iCXc8PkkvG87arAD/SX9204_Reference_Sensor_Correction_Guidelines_AN_Rev1_39b8ae53.pdf" target="_blank" rel="noopener">📄 下載</a></td>
    </tr>
  </tbody>
</table>
            `
          },
          {
            id: "sx9204-shield",
            title: "Shield 電極的深度解析與設計",
            description: "探討 Shield 電極在消除寄生電容中的關鍵作用、Guard Drive 原理及 PCB 設計建議。",
            tags: ["SX9204", "Shield", "寄生電容", "Guard Drive", "PCB設計"],
            lastUpdated: "2026-04-14",
            content: `
<h1>Shield 電極的深度解析與設計</h1>

<p>在電容感測系統中，<strong>Shield（屏蔽）電極</strong>是硬體設計中極為重要的一環。它不僅能提升感測器的靈敏度，還能大幅增強系統對環境變化的免疫力。</p>

<h2>寄生電容（Parasitic Capacitance）的問題</h2>

<p>PCB 上的感測電極（Sensor Pad）本質上是一塊導電銅箔。它不僅會對正面的空氣和靠近的人體產生電容，也會對背面的 PCB 走線、電池、金屬外殼、甚至系統地（GND）產生電容。這些非目標的電容統稱為<strong>寄生電容</strong>。</p>

<p>寄生電容會帶來以下嚴重問題：</p>
<ul>
  <li><strong>降低靈敏度</strong>：巨大的背景寄生電容會稀釋人體靠近時產生的微小電容變化。</li>
  <li><strong>引發誤觸發</strong>：當設備受到擠壓變形（如手機彎曲）、溫度變化或內部元件位移時，背面的寄生電容會改變，導致系統誤判為有人靠近。</li>
</ul>

<h2>Guard Drive 與 Shield 原理</h2>

<p>為了解決寄生電容問題，SX9204 採用了 <strong>Guard Drive（等電位驅動）</strong> 技術。Shield 是一塊放置在感測電極背面的導體層（通常是 PCB 的內層或底層），SX9204 會驅動這個 Shield 層，使其輸出與感測電極<strong>完全相同的電壓波形</strong>。</p>

<div class="callout-tip">
  <strong>✅ 物理原理：</strong>根據電磁學，當兩個導體之間的電位差（電壓）為零時，它們之間就不會有電場，因此<strong>等效電容為零</strong>。
</div>

<p>透過將 Shield 保持與 Sensor 同電位，感測電極就「看不見」背面的任何干擾源，其電場只會朝向沒有 Shield 遮擋的正面（使用者方向）發射。</p>

<h2>Shield 的實際效果</h2>

<table>
  <thead><tr><th>性能指標</th><th>沒有 Shield</th><th>有 Shield</th></tr></thead>
  <tbody>
    <tr><td><strong>背面寄生電容</strong></td><td>存在，導致基線偏高</td><td>被消除，基線更低且穩定</td></tr>
    <tr><td><strong>偵測靈敏度</strong></td><td>較低（被背景雜訊稀釋）</td><td>較高（電場集中於正面）</td></tr>
    <tr><td><strong>抗環境干擾能力</strong></td><td>差（容易因形變、溫度誤觸發）</td><td>優（背面環境變化不影響感測）</td></tr>
    <tr><td><strong>抗 EMI 雜訊</strong></td><td>較弱</td><td>較強（Shield 具備屏蔽雜訊效果）</td></tr>
  </tbody>
</table>

<h2>PCB 設計關鍵建議</h2>

<p>為了讓 Shield 發揮最大效用，PCB 佈線（Layout）必須遵循以下規則：</p>

<ol>
  <li><strong>位置與面積</strong>：Shield 層必須放置在感測電極的正下方（相鄰層），且其面積應<strong>略大於</strong>感測電極，以確保邊緣電場也被屏蔽。</li>
  <li><strong>間距控制</strong>：Shield 與感測電極之間的距離越小越好（通常建議 0.1mm ~ 0.2mm 的板層厚度），以增強耦合效果。</li>
  <li><strong>正面留空</strong>：感測電極的正面（朝向使用者的方向）絕對不能有 Shield 或 GND 覆蓋，否則會把人體的信號也屏蔽掉。</li>
  <li><strong>走線保護</strong>：從晶片 CS 腳位連到感測電極的走線（Trace），也應該被 Shield 走線包圍或鋪銅保護，防止走線本身受到干擾。</li>
</ol>
            `
          },
          {
            id: "sx9204-digital-filtering",
            title: "數位濾波流程：RAW / USE / AVG 詳解",
            description: "深入解析 SX9204 三個數位濾波器的真實用途、運作機制與協作關係。",
            tags: ["SX9204", "Digital Filter", "PROXAVG", "PROXDIFF", "PROXUSEFUL"],
            lastUpdated: "2026-04-14",
            content: `
<h1>數位濾波流程：RAW / USE / AVG 詳解</h1>

<p>從 AFE 輸出的 <code>PROXRAW</code> 是一個帶有雜訊且會隨環境緩慢漂移的原始信號。SX9204 透過三個精心設計的數位濾波器（RAW、USE、AVG），將其轉換為穩定可靠的近接信號（<code>PROXDIFF</code>）。</p>

<h2>數位信號處理鏈</h2>

<pre>PROXRAW（原始 ADC 輸出）
  ↓ [RAW Filter]
PROXUSEFUL（去雜訊後的即時信號）
  ↓ [USE Filter]
PROXUSEOUT（平滑處理後的信號，僅供內部使用）
  ↓ [AVG Filter]
PROXAVG（環境基線）

核心算式： PROXDIFF = PROXUSEFUL - PROXAVG</pre>

<h2>1. RAW Filter：去除高頻電路雜訊</h2>

<p><strong>真實用途：</strong>消除系統內部的高頻雜訊（如 ADC 轉換誤差、Wi-Fi/BLE 射頻干擾），穩定即時信號。</p>

<p>RAW Filter 是一個低通濾波器，對 <code>PROXRAW</code> 進行多次平均，輸出 <code>PROXUSEFUL</code>。<code>PROXUSEFUL</code> 是系統用來判斷「目前有沒有人」的關鍵即時信號。</p>

<div class="callout-warning">
  <strong>⚠️ 調參陷阱：</strong>如果 RAW Filter 設定太強（平均次數過多），會導致信號反應變慢。快速的短暫觸碰可能會被濾波器「抹平」，導致 <code>PROXUSEFUL</code> 峰值變低，進而降低系統靈敏度與反應速度。
</div>

<h2>2. USE Filter：保護基線不被污染</h2>

<p><strong>真實用途：</strong>防止 <code>PROXAVG</code>（環境基線）跟著「人體靠近」的快速信號一起跑。</p>

<p>這是一個容易被誤解的濾波器。USE Filter 是一個指數移動平均（Exponential Moving Average）濾波器，它的輸出 <code>PROXUSEOUT</code> <strong>絕對不會</strong>用來做近接偵測判斷。它唯一的用途是作為 AVG Filter 的輸入。</p>

<p>當人體快速靠近時，<code>PROXUSEFUL</code> 會瞬間飆高。如果直接把這個信號餵給 AVG Filter，基線可能會受到干擾。USE Filter 的時間常數較短，它能緩衝這個突波，確保傳遞給 AVG Filter 的信號相對平緩，保護基線的純潔性。</p>

<h2>3. AVG Filter：追蹤環境基線</h2>

<p><strong>真實用途：</strong>緩慢追蹤真實的環境漂移（如溫度變化、濕度、機構形變），建立穩定的參考基線。</p>

<p>AVG Filter 是一個時間常數非常長的低通濾波器。它過濾掉所有短暫的信號變化，只保留極緩慢的趨勢，輸出 <code>PROXAVG</code>。這個值代表了「在沒有人靠近時，當下環境的真實電容狀態」。</p>

<h2>核心計算：PROXDIFF 的意義</h2>

<p>為什麼系統要用 <code>PROXUSEFUL - PROXAVG</code> 來計算 <code>PROXDIFF</code>？</p>

<ul>
  <li><code>PROXUSEFUL</code> 包含了 <strong>環境背景 + 人體信號 + 雜訊</strong>。</li>
  <li><code>PROXAVG</code> 代表了純粹的 <strong>環境背景</strong>。</li>
  <li>相減之後，環境背景被抵消，剩下的 <code>PROXDIFF</code> 就是純粹的 <strong>人體信號</strong>。</li>
</ul>

<p>這個減法機制（Differential Measurement）是 CapSense 系統能適應各種溫度與環境變化的核心。無論環境溫度讓整體電容上升還是下降，只要基線（PROXAVG）追蹤得夠準確，相減後的 PROXDIFF 就能始終保持在 0 附近，直到真正有人靠近。</p>
            `
          },
          {
            id: "sx9204-proxavg-freeze",
            title: "PROXAVG 凍結機制（Freeze Mechanism）",
            description: "探討為什麼在偵測到人體時必須凍結基線，以及解凍的時機與重要性。",
            tags: ["SX9204", "PROXAVG", "PROXSTAT", "Freeze", "基線追蹤"],
            lastUpdated: "2026-04-14",
            content: `
<h1>PROXAVG 凍結機制（Freeze Mechanism）</h1>

<p>在 CapSense 系統中，環境基線（<code>PROXAVG</code>）的準確性決定了系統的成敗。SX9204 內建了一個關鍵的保護機制：<strong>PROXAVG 凍結（Freeze）</strong>。</p>

<h2>凍結機制的核心邏輯</h2>

<p>系統根據當前的偵測狀態（<code>PROXSTAT</code>）來決定是否更新基線：</p>

<ul>
  <li><strong>當 PROXSTAT = 0（無人靠近）</strong>：PROXAVG <strong>解凍（Free）</strong>，持續追蹤環境的緩慢變化。</li>
  <li><strong>當 PROXSTAT = 1（有人靠近）</strong>：PROXAVG <strong>凍結（Frozen）</strong>，停止更新，保持在偵測到人體前一刻的數值。</li>
</ul>

<h2>為什麼有人時必須「凍結」？</h2>

<p>想像一個情境：使用者把手放在感測器上長達一分鐘。此時 <code>PROXUSEFUL</code> 維持在高電位。</p>

<p>如果此時 <strong>不凍結</strong> PROXAVG，AVG Filter 會認為這個持續的高電位是「新的環境狀態」，於是 PROXAVG 會慢慢往上爬，逐漸逼近 PROXUSEFUL。</p>

<p>結果：</p>
<ol>
  <li><code>PROXDIFF</code>（= PROXUSEFUL - PROXAVG）會越來越小。</li>
  <li>當 PROXDIFF 掉到閾值（Threshold）以下時，系統會誤判為「手已經離開」，導致 <code>PROXSTAT</code> 錯誤地變回 0。</li>
</ol>

<div class="callout-warning">
  <strong>⚠️ 嚴重後果（False Negative）：</strong>在 SAR 功率控制中，這會導致手機在人體還貼著設備時，錯誤地將發射功率調到最大，造成嚴重的安全違規。凍結機制就是為了「保護已偵測到的狀態不被自己吃掉」。
</div>

<h2>為什麼無人時必須「解凍」？</h2>

<p>當人體離開後（PROXSTAT = 0），環境可能因為設備發熱、冷氣開啟等因素發生了變化。此時必須讓 PROXAVG 重新開始追蹤這些變化。</p>

<p>如果一直凍結不更新，基線就會停留在過去的錯誤數值。當環境電容自然上升時，PROXDIFF 會跟著變大，最終超過閾值，導致在沒有人的情況下觸發偵測（False Positive / 幽靈觸發）。</p>

<h2>AVGFREEZEDIS 參數設定</h2>

<p>在 SX9204 的暫存器中，有一個參數 <code>AVGFREEZEDIS</code> 可以控制這個行為：</p>

<ul>
  <li><code>AVGFREEZEDIS = 0</code>（預設/建議）：啟用凍結。只要偵測到 proximity，基線就一直凍結直到人離開。</li>
  <li><code>AVGFREEZEDIS = 1</code>：禁用永久凍結。偵測到 proximity 後，基線只會凍結一段時間（4 * AVGDEB samples），然後強迫解凍。這通常只在非常特殊的應用場景（且停用 USE Filter 時）才會使用。</li>
</ul>
            `
          },
          {
            id: "sx9204-threshold-hyst",
            title: "閾值（Threshold）與遲滯（HYST）設計",
            description: "詳解 Schmitt Trigger 原理在感測器防抖動中的應用，以及 Debouncer 的設定策略。",
            tags: ["SX9204", "Threshold", "HYST", "Schmitt Trigger", "Debouncer"],
            lastUpdated: "2026-04-14",
            content: `
<h1>閾值（Threshold）與遲滯（HYST）設計</h1>

<p>SX9204 判斷「有沒有人」並非單純比較一個數值，而是採用了 <strong>閾值（Threshold）</strong> 搭配 <strong>遲滯（Hysteresis, HYST）</strong> 的雙重門檻設計。這種設計在電子學中稱為 <strong>Schmitt Trigger（施密特觸發器）</strong>。</p>

<h2>為什麼單一 Threshold 不夠？</h2>

<p>如果系統只用一個 Threshold（例如 100）來判斷：</p>
<ul>
  <li>大於 100 → 有人（PROXSTAT = 1）</li>
  <li>小於 100 → 無人（PROXSTAT = 0）</li>
</ul>

<p>在現實中，信號（PROXDIFF）總是帶有微小的雜訊波動。如果真實信號剛好在 100 附近徘徊（例如 99 → 101 → 99 → 101），系統的狀態就會瘋狂切換（0 → 1 → 0 → 1）。這種現象稱為 <strong>Chattering（抖動）</strong>，會導致後端處理器收到海量的中斷（IRQ），甚至引發系統崩潰。</p>

<h2>HYST 的雙門檻機制</h2>

<p>加入 HYST 後，系統將「進入偵測」與「離開偵測」的門檻分開：</p>

<table>
  <thead><tr><th>狀態切換</th><th>觸發條件</th></tr></thead>
  <tbody>
    <tr><td><strong>進入偵測（無人 → 有人）</strong></td><td>PROXDIFF &gt; <code>Threshold + HYST</code></td></tr>
    <tr><td><strong>離開偵測（有人 → 無人）</strong></td><td>PROXDIFF &lt; <code>Threshold - HYST</code></td></tr>
  </tbody>
</table>

<p>以 Threshold = 100, HYST = 10 為例：</p>
<ul>
  <li>信號必須超過 110 才會判定為「有人」。</li>
  <li>信號必須低於 90 才會判定為「無人」。</li>
  <li>在 90 到 110 之間的波動，系統狀態 <strong>保持不變</strong>。這個緩衝區間完美吸收了雜訊帶來的抖動。</li>
</ul>

<h2>HYST 設定的實務陷阱</h2>

<div class="callout-warning">
  <strong>⚠️ 重要：</strong>HYST 的值不能隨便設大。進入偵測的實際門檻是 <code>Threshold + HYST</code>。如果目標物靠近時，產生的 PROXDIFF 最大只有 105，那麼在上述設定（門檻 110）下，系統<strong>永遠不會觸發</strong>。
</div>

<p><strong>設定原則：</strong></p>
<ol>
  <li>測量無人時的峰對峰雜訊（Peak-to-Peak Noise, N）。</li>
  <li>測量目標物在最遠偵測距離時的信號強度（Signal）。</li>
  <li>Threshold 設在 Signal 的一半左右。</li>
  <li>HYST 必須大於雜訊 N 的一半，但 <code>Threshold + HYST</code> 必須小於 Signal，保留足夠的餘裕（Margin）。</li>
</ol>

<h2>Debouncer（防彈跳機制）</h2>

<p>除了 HYST，SX9204 還提供了時間維度的保護：<strong>CLOSEDEB</strong> 與 <strong>FARDEB</strong>。</p>

<ul>
  <li><strong>CLOSEDEB</strong>：必須連續 N 個採樣週期都滿足 <code>&gt; Threshold + HYST</code>，才會將 PROXSTAT 設為 1。</li>
  <li><strong>FARDEB</strong>：必須連續 N 個採樣週期都滿足 <code>&lt; Threshold - HYST</code>，才會將 PROXSTAT 設為 0。</li>
</ul>

<p>Debouncer 能有效過濾掉極短暫的突波干擾（例如 ESD 靜電打擊），但代價是<strong>增加反應時間（Reaction Time）</strong>。在設計時必須在「抗干擾能力」與「反應速度」之間取得平衡。</p>
            `
          },
          {
            id: "sx9204-scan-period-power",
            title: "Scan Period、Doze Mode 與功耗優化",
            description: "深入解析 SX9204 的掃描週期計算、Doze 節能模式，以及 FREQ 設定與功耗之間的反直覺關係。",
            tags: ["SX9204", "Scan Period", "Doze Mode", "FREQ", "功耗管理"],
            lastUpdated: "2026-04-14",
            content: `
<h1>Scan Period、Doze Mode 與功耗優化</h1>

<p>在穿戴裝置或手機中，感測器的功耗是極其關鍵的指標。SX9204 的功耗管理主要圍繞著 <strong>Scan Period（掃描週期）</strong> 與 <strong>休眠時間（Idle Time）</strong> 的比例來設計。</p>

<h2>Scan Period 與 Idle Time</h2>

<p>一個完整的 Scan Period 包含兩個部分：</p>
<pre>Scan Period = (所有啟用 Phase 的量測時間總和) + Idle Time</pre>

<p>晶片在量測時間（Active Sensing）非常耗電，而在 Idle Time 會進入低功耗狀態。因此，<strong>拉長 Idle Time 是省電的關鍵</strong>。</p>

<p>在 SX9204 中，我們透過 <code>SCANPERIOD</code> 暫存器設定總週期時間（範圍從 2ms 到約 4s）。系統會自動計算：<br>
<code>Idle Time = SCANPERIOD - 量測時間</code><br>
如果量測時間超過了設定的 SCANPERIOD，晶片就會連續不斷地掃描，完全沒有 Idle Time，導致功耗飆高。</p>

<h2>FREQ（採樣頻率）與功耗的反直覺關係</h2>

<p>很多人直覺認為：「頻率越高，功耗越大」。但在 SX9204 的設定中，情況可能恰好相反！</p>

<p>每個 Phase 的量測時間取決於：<code>RESOLUTION（解析度/平均次數） / FREQ（採樣頻率）</code></p>

<div class="callout-tip">
  <strong>✅ 反直覺真相：</strong>在 <code>SCANPERIOD</code> 固定不變的前提下，提高 <code>FREQ</code> 會讓每次充放電更快完成，進而<strong>縮短量測時間</strong>。量測時間變短，意味著 <strong>Idle Time 變長</strong>，整體平均功耗反而<strong>下降</strong>！
</div>

<p><strong>Trade-off（權衡）：</strong>提高 FREQ 雖然省電，但每次採樣時間變短會降低對低頻雜訊的抵抗力。通常需要搭配較高的 RESOLUTION 來補償，而這又會把量測時間拉長。工程師必須在兩者間找到最佳平衡點。</p>

<h2>Doze Mode（打盹模式）</h2>

<p>為了解決「需要快速反應」與「需要極低功耗」之間的矛盾，SX9204 提供了 <strong>Doze Mode</strong> 機制。</p>

<p>透過設定 <code>DOZEPERIOD</code>（可設為 SCANPERIOD 的 4倍、8倍或16倍），系統會具備以下智慧行為：</p>

<ul>
  <li><strong>無人狀態（Idle）</strong>：當長時間沒有偵測到物體時，晶片自動切換到 Doze 週期（例如原本 30ms 掃描一次，變成 240ms 掃描一次），大幅降低待機功耗。</li>
  <li><strong>有人靠近（Active）</strong>：只要任何一個 Phase 偵測到物體（PROXSTAT 變為 1），晶片會<strong>瞬間自動喚醒</strong>，切換回快速的 <code>SCANPERIOD</code>（30ms），確保在人體移動期間具備極快的反應速度。</li>
  <li><strong>人體離開</strong>：當人離開後，晶片再次自動降速進入 Doze Mode。</li>
</ul>

<p>Doze Mode 是穿戴式裝置達成超長續航力的必備設定。</p>
            `
          },
          {
            id: "sx9204-pauseirqen-i2c",
            title: "PAUSEIRQEN 與 I2C 衝突解決方案",
            description: "探討 I2C 讀取干擾 ADC 採樣的硬體問題，以及如何利用 PAUSEIRQEN 與中斷機制完美解決。",
            tags: ["SX9204", "I2C", "PAUSEIRQEN", "IRQ", "硬體衝突"],
            lastUpdated: "2026-04-14",
            content: `
<h1>PAUSEIRQEN 與 I2C 衝突解決方案</h1>

<p>在整合 SX9204 到系統中時，工程師常會遇到一個棘手的硬體問題：<strong>I2C 通訊干擾</strong>。理解並解決這個問題，是確保感測器信號穩定的關鍵。</p>

<h2>問題根源：I2C 讀取干擾 ADC 採樣</h2>

<p>SX9204 內部的 ADC 在量測微小的電容變化（aF 等級）時，對雜訊極度敏感。而 I2C 匯流排（SCL / SDA）在傳輸資料時，會產生高頻的數位切換雜訊。</p>

<p>如果主處理器（Host）在 SX9204 <strong>正在進行電容量測（Active Sensing）</strong> 的時候，透過 I2C 去讀取暫存器資料，I2C 的數位雜訊會耦合進類比前端（AFE），導致該次採樣的 <code>PROXRAW</code> 數值產生巨大偏差（Spike）。</p>

<p>這種偶發的巨大雜訊會破壞基線追蹤，甚至引發嚴重的誤觸發。</p>

<h2>錯誤的讀取方式（Polling）</h2>

<p>最糟糕的軟體設計是使用 <strong>Polling（輪詢）</strong> 方式：主處理器每隔幾毫秒就主動透過 I2C 去問 SX9204「現在數值是多少？」。</p>
<p>這種盲目的讀取有極高的機率剛好撞上 SX9204 的採樣週期，導致信號毀滅性的破壞。</p>

<h2>正確的讀取架構：中斷驅動（Interrupt Driven）</h2>

<p>為了避免衝突，讀取動作必須由 SX9204 來主導。系統應該設定 <code>CONVDONEIRQEN</code>（轉換完成中斷）：</p>

<ol>
  <li>SX9204 完成所有 Phase 的量測。</li>
  <li>進入 Idle Time。</li>
  <li>SX9204 拉低 NIRQ 腳位，發出中斷通知主處理器。</li>
  <li>主處理器收到中斷後，利用這段 <strong>Idle Time</strong> 的空檔，透過 I2C 安全地讀取資料。</li>
</ol>

<h2>進階保護機制：PAUSEIRQEN</h2>

<p>即使使用了中斷驅動，如果主處理器反應太慢，或者 I2C 速度太慢，導致讀取動作拖延到了下一個 Scan Period 開始，衝突依然會發生。</p>

<p>為了解決這個時序邊界問題，SX9204 提供了 <strong>PAUSEIRQEN（暫停中斷）</strong> 功能：</p>

<ul>
  <li>當 <code>PAUSEIRQEN = 1</code> 時：只要 SX9204 發出中斷（NIRQ 觸發），晶片內部的狀態機就會<strong>暫停（Pause）</strong>。</li>
  <li>在暫停期間，SX9204 <strong>絕對不會</strong>啟動下一次的電容量測。主處理器可以從容不迫地透過 I2C 讀取所有需要的資料。</li>
  <li>當主處理器讀取 <code>RegIrqSrc</code>（清除中斷旗標）的瞬間，SX9204 才會<strong>解除暫停（Unpause）</strong>，恢復正常的掃描週期。</li>
</ul>

<div class="callout-tip">
  <strong>✅ 最佳實踐：</strong>在所有重視信號品質的專案中，強烈建議啟用 <code>PAUSEIRQEN</code>，並確保主機在讀取完所有資料後，最後才讀取 <code>RegIrqSrc</code> 來釋放感測器。這是徹底根除 I2C 雜訊干擾的終極解決方案。
</div>
            `
          },
          {
            id: "sx9204-tuning-guidelines",
            title: "SX9204 參數調整實戰指南",
            description: "從零開始的完整調參步驟，教你如何科學化地設定 Threshold、HYST 與各項關鍵參數。",
            tags: ["SX9204", "Tuning", "參數調整", "實戰指南", "Threshold"],
            lastUpdated: "2026-04-14",
            content: `
<h1>SX9204 參數調整實戰指南</h1>

<p>將 SX9204 整合到產品後，必須在最終的機構環境中進行微調（Fine Tuning），才能達到最佳的偵測距離與抗干擾能力。以下是依據 Semtech 官方指南整理的標準調參 SOP。</p>

<h2>Step 1: 設定基礎參數與 Analog Gain</h2>

<p>首先，設定好基本的硬體配置：</p>
<ul>
  <li>設定 <code>PHEN</code> 啟用需要的 Phase。</li>
  <li>設定 <code>FREQ</code> 與 <code>RESOLUTION</code>，在功耗與雜訊間取得初步平衡。</li>
  <li><strong>最關鍵的一步：設定 AGAIN（Analog Gain）</strong>。
    <ul>
      <li>AGAIN 決定了系統的滿量程。</li>
      <li>將手（或測試假人）放在要求的最遠偵測距離。</li>
      <li>觀察 <code>PROXUSEFUL</code> 的數值。調整 AGAIN，確保數值夠大，但<strong>絕對不能達到飽和（Saturate，1,048,575 LSB）</strong>。</li>
    </ul>
  </li>
</ul>

<h2>Step 2: 測量環境基線與雜訊（L1 與 N）</h2>

<p>在<strong>沒有任何物體靠近</strong>的情況下（確保周圍淨空）：</p>
<ol>
  <li>強制執行一次補償（Compensation），讓 <code>PROXDIFF</code> 歸零。</li>
  <li>連續觀察 <code>PROXDIFF</code> 的數值一段時間。</li>
  <li>記錄平均值 <strong>L1</strong>（理想情況下應接近 0）。</li>
  <li>記錄這段時間內數值的最大跳動範圍，這就是<strong>峰對峰雜訊（Peak-to-Peak Noise, N）</strong>。例如數值在 -2 到 +3 之間跳動，則 N = 5。</li>
</ol>

<h2>Step 3: 測量目標信號強度（L2）</h2>

<p>將目標物（手或假人）放置在<strong>規格要求的最遠偵測距離</strong>：</p>
<ol>
  <li>觀察並記錄此時 <code>PROXDIFF</code> 的平均數值，記為 <strong>L2</strong>。</li>
  <li>例如，手在 15mm 處時，PROXDIFF 穩定在 136。則 L2 = 136。</li>
</ol>

<h2>Step 4: 計算並設定 Threshold</h2>

<p>閾值（Threshold）的理論最佳位置通常是背景與目標信號的中間值：</p>
<pre>理論 Threshold = (L1 + L2) / 2</pre>

<p>以 L1 = 0, L2 = 136 為例，理論 Threshold 為 68。您可以將 <code>PROXTHRESH1</code> 設定為最接近的可用數值（例如 72）。</p>

<h2>Step 5: 設定 HYST（遲滯）</h2>

<p>HYST 的設定必須滿足兩個條件：</p>
<ol>
  <li><strong>大於雜訊</strong>：HYST 必須大於峰對峰雜訊 N 的一半，否則無法防止抖動。</li>
  <li><strong>留有餘裕</strong>：<code>Threshold + HYST</code> 必須小於目標信號 L2，否則無法觸發。</li>
</ol>

<p>延續上面的例子（Threshold = 64，N = 5）：<br>
可以選擇 HYST 設定為 <code>b10</code>（約 ±9 LSB）。因為 9 > 5，足以覆蓋雜訊；且 64 + 9 = 73，遠小於目標信號 136，保證能穩定觸發。</p>

<h2>Step 6: 設定 Debouncer（防彈跳）</h2>

<p>為了進一步增強抗干擾能力，設定時間維度的濾波：</p>
<ul>
  <li><strong>CLOSEDEB</strong>（靠近防彈跳）：設定為 2 或 4 個採樣週期。這能過濾掉極短暫的雜訊突波，但會稍微增加反應時間。</li>
  <li><strong>FARDEB</strong>（離開防彈跳）：同樣設定為 2 或 4 個採樣週期。</li>
</ul>

<h2>Step 7: 實機驗證與微調</h2>

<p>完成上述設定後，進行實機測試：</p>
<ul>
  <li><strong>測試靈敏度</strong>：手慢慢靠近，確認是否在預期距離觸發。如果太近才觸發，嘗試調低 Threshold 或減小 HYST。</li>
  <li><strong>測試穩定性</strong>：手停留在觸發邊界，確認 PROXSTAT 是否會瘋狂跳動。如果會，增加 HYST 或加大 Debouncer。</li>
  <li><strong>測試抗干擾</strong>：開啟 Wi-Fi 傳輸或震動設備，觀察基線是否穩定。若雜訊過大，考慮增強 RAW Filter 或調整 FREQ 避開干擾頻段。</li>
</ul>
            `
          }]
          }
        ]
      },
      {
        id: "hall-sensor",
        title: "Hall Sensor",
        description: "霍爾效應磁場感測器的原理、暫存器與驅動開發",
        icon: "Magnet",
        chips: [
          {
            id: "ak09973d",
            title: "AK09973D",
            description: "AKM AK09973D 三軸霍爾磁場感測器",
            articles: [
          {
            id: "ak09973d-overview",
            title: "AK09973D 概覽與主要特性",
            description: "AKM AK09973D 三軸霍爾感測器的功能定位、規格一覽與功能方塊圖",
            tags: ["AK09973D", "Hall Sensor", "磁場感測", "AKM", "三軸"],
            lastUpdated: "2026-04-14",
            content: `
<h1>AK09973D 概覽與主要特性</h1>

<p>AK09973D 是 Asahi Kasei Microdevices（AKM）推出的<strong>高靈敏度三軸磁場感測器 IC</strong>，內建霍爾元件（Hall Element）可量測 X、Y、Z 三個方向的磁場強度。其設計針對低功耗行動裝置與穿戴式設備優化，常見應用包括智慧型手機翻蓋偵測、裝置姿態判斷以及通用三軸磁場量測。</p>

<h2>主要規格一覽</h2>

<table>
  <thead><tr><th>規格項目</th><th>數值</th></tr></thead>
  <tbody>
    <tr><td><strong>量測範圍</strong></td><td>±10.1 mT（X、Y、Z 三軸）</td></tr>
    <tr><td><strong>靈敏度</strong></td><td>1.1 µT/LSB（典型值）</td></tr>
    <tr><td><strong>解析度</strong></td><td>16-bit（每軸）</td></tr>
    <tr><td><strong>供電電壓（VDD）</strong></td><td>1.65 V ～ 1.95 V</td></tr>
    <tr><td><strong>介面電壓（VID）</strong></td><td>1.65 V ～ 1.95 V</td></tr>
    <tr><td><strong>待機電流</strong></td><td>0.5 µA（Power-down 模式）</td></tr>
    <tr><td><strong>量測電流</strong></td><td>1.5 mA（量測中）</td></tr>
    <tr><td><strong>通訊介面</strong></td><td>I2C（標準 / Fast / Fast Mode Plus，最高 1 MHz）</td></tr>
    <tr><td><strong>封裝</strong></td><td>6-pin WL-CSP（1.18 mm × 0.78 mm × 0.573 mm）</td></tr>
    <tr><td><strong>操作溫度</strong></td><td>-30°C ～ +85°C</td></tr>
  </tbody>
</table>

<h2>功能方塊圖架構</h2>

<p>AK09973D 的內部架構由以下主要功能模組組成：</p>

<pre>
磁場輸入（X / Y / Z 軸）
  ↓
霍爾元件（Hall Element）
  ↓
感測器驅動電路（Sensor Drive Circuit）
  ↓
信號放大鏈（Signal Amplifier Chain）
  ↓
16-bit ADC（類比數位轉換）
  ↓
控制邏輯與暫存器（Control Logic & Registers）
  ↓
I2C 介面（與主控 MCU/SoC 通訊）
</pre>

<h2>典型應用場景</h2>

<table>
  <thead><tr><th>應用場景</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td><strong>翻蓋偵測</strong></td><td>偵測手機保護殼或平板翻蓋的開合狀態，觸發螢幕開關</td></tr>
    <tr><td><strong>裝置姿態判斷</strong></td><td>搭配加速度計判斷裝置方向，輔助 UI 旋轉或省電策略</td></tr>
    <tr><td><strong>近接偵測</strong></td><td>偵測磁鐵靠近，用於按鍵、滑蓋等機械動作感測</td></tr>
    <tr><td><strong>通用磁場量測</strong></td><td>量測環境磁場強度，用於指南針或磁場干擾分析</td></tr>
  </tbody>
</table>

<h2>官方規格書下載</h2>

<p>以下為本知識庫所參考的 AKM 官方文件，可直接下載 PDF：</p>

<table>
  <thead><tr><th>文件名稱</th><th>版本</th><th>說明</th><th>下載</th></tr></thead>
  <tbody>
    <tr>
      <td>AK09973D Datasheet</td>
      <td>Rev. —</td>
      <td>完整硬體規格、暫存器地圖、電氣特性與封裝尺寸</td>
      <td><a href="https://d2xsxph8kpxj0f.cloudfront.net/310519663408076565/3qEFW4iCXc8PkkvG87arAD/ak09973d-en-datasheet-myakm_66fc696c.pdf" target="_blank" rel="noopener">📄 下載</a></td>
    </tr>
  </tbody>
</table>
`
          },
          {
            id: "ak09973d-registers",
            title: "暫存器地圖與量測流程",
            description: "AK09973D 的完整暫存器說明、操作模式切換與標準量測讀取流程",
            tags: ["AK09973D", "暫存器", "I2C", "量測流程", "DRDY"],
            lastUpdated: "2026-04-14",
            content: `
<h1>暫存器地圖與量測流程</h1>

<p>AK09973D 透過 I2C 介面存取內部暫存器，所有操作模式設定、量測資料讀取與狀態監控均透過暫存器完成。理解暫存器結構是正確驅動此感測器的基礎。</p>

<h2>主要暫存器一覽</h2>

<table>
  <thead><tr><th>位址</th><th>名稱</th><th>存取</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td><code>00h</code></td><td>WIA1</td><td>R</td><td>公司 ID（固定值 0x48，AKM 識別碼）</td></tr>
    <tr><td><code>01h</code></td><td>WIA2</td><td>R</td><td>裝置 ID（固定值 0xC1，AK09973D 識別碼）</td></tr>
    <tr><td><code>10h</code></td><td>ST1</td><td>R</td><td>狀態暫存器 1：Bit 0 = DRDY（資料就緒旗標）</td></tr>
    <tr><td><code>11h–12h</code></td><td>HXL / HXH</td><td>R</td><td>X 軸磁場量測資料（低位元組 / 高位元組）</td></tr>
    <tr><td><code>13h–14h</code></td><td>HYL / HYH</td><td>R</td><td>Y 軸磁場量測資料（低位元組 / 高位元組）</td></tr>
    <tr><td><code>15h–16h</code></td><td>HZL / HZH</td><td>R</td><td>Z 軸磁場量測資料（低位元組 / 高位元組）</td></tr>
    <tr><td><code>18h</code></td><td>ST2</td><td>R</td><td>狀態暫存器 2：Bit 3 = HOFL（磁場溢位旗標），讀取後解除資料鎖定</td></tr>
    <tr><td><code>20h</code></td><td>CNTL1</td><td>R/W</td><td>控制暫存器 1：設定操作模式（Power-down / Single / Continuous / Self-test）</td></tr>
    <tr><td><code>21h</code></td><td>CNTL2</td><td>R/W</td><td>控制暫存器 2：設定連續量測頻率（1/10/20/50/100 Hz）與量測範圍</td></tr>
    <tr><td><code>30h</code></td><td>SRST</td><td>W</td><td>軟體重置：寫入 0x01 觸發全暫存器重置</td></tr>
  </tbody>
</table>

<h2>操作模式</h2>

<table>
  <thead><tr><th>模式</th><th>CNTL1 設定值</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td><strong>Power-down</strong></td><td>0x00</td><td>預設狀態，最低功耗（0.5 µA），不進行量測</td></tr>
    <tr><td><strong>Single Measurement</strong></td><td>0x01</td><td>執行一次量測後自動回到 Power-down 模式</td></tr>
    <tr><td><strong>Continuous Mode 1</strong></td><td>0x02</td><td>連續量測，頻率由 CNTL2 設定（1/10/20/50/100 Hz）</td></tr>
    <tr><td><strong>Self-test</strong></td><td>0x10</td><td>內建自我測試，驗證感測器功能是否正常</td></tr>
  </tbody>
</table>

<h2>標準量測讀取流程</h2>

<pre>
1. 上電後，透過 I2C 讀取 WIA1（00h）= 0x48 及 WIA2（01h）= 0xC1
   確認裝置識別正確

2. 寫入 SRST（30h）= 0x01，執行軟體重置
   確保所有暫存器回到預設狀態

3. 設定 CNTL2（21h）：選擇量測頻率（例如 0x04 = 100 Hz）

4. 設定 CNTL1（20h）：切換至目標操作模式
   例如：0x02 = Continuous Measurement Mode

5. 輪詢或等待中斷：
   讀取 ST1（10h），確認 DRDY bit（Bit 0）= 1

6. 讀取量測資料：
   連續讀取 11h ～ 16h（HXL, HXH, HYL, HYH, HZL, HZH）
   共 6 個位元組，每軸為 16-bit 有號整數（Little-Endian）

7. 讀取 ST2（18h）：
   確認 HOFL bit（Bit 3）= 0（無溢位）
   此讀取動作同時解除資料鎖定，允許下次量測更新資料

8. 將原始值轉換為物理量：
   磁場（µT）= 原始值 × 靈敏度（1.1 µT/LSB）
</pre>

<div class="callout-warning">
  <strong>⚠️ 資料鎖定機制：</strong>讀取任何量測資料暫存器（11h～16h）後，資料會被鎖定，直到讀取 ST2（18h）才會解除。若未讀取 ST2，下一次量測的資料將無法更新到暫存器中，導致持續讀到舊資料。
</div>

<div class="callout-warning">
  <strong>⚠️ 磁場溢位（HOFL）：</strong>當磁場強度超過量測範圍（±10.1 mT）時，ST2 的 HOFL bit 會被設為 1，此時讀取的量測資料無效，應予以丟棄。
</div>

<h2>I2C 介面規格</h2>

<table>
  <thead><tr><th>項目</th><th>規格</th></tr></thead>
  <tbody>
    <tr><td>從機位址（Slave Address）</td><td>可透過腳位配置選擇 0x10 或 0x11</td></tr>
    <tr><td>支援速率</td><td>100 kHz（Standard）、400 kHz（Fast）、1 MHz（Fast Mode Plus）</td></tr>
    <tr><td>多位元組讀取</td><td>支援自動地址遞增，可連續讀取多個暫存器</td></tr>
  </tbody>
</table>
`
          },
          {
            id: "ak09973d-design-guidelines",
            title: "硬體設計指南與注意事項",
            description: "AK09973D 的 PCB 佈局建議、電源去耦、磁場干擾防護與封裝應力注意事項",
            tags: ["AK09973D", "硬體設計", "PCB", "去耦電容", "磁場干擾"],
            lastUpdated: "2026-04-14",
            content: `
<h1>硬體設計指南與注意事項</h1>

<p>AK09973D 採用極小的 WL-CSP 封裝，在 PCB 設計時需特別注意電源去耦、磁場干擾隔離以及機械應力控制，才能確保感測器的靈敏度與量測準確性。</p>

<h2>電源設計</h2>

<table>
  <thead><tr><th>設計要點</th><th>建議</th></tr></thead>
  <tbody>
    <tr><td><strong>去耦電容</strong></td><td>在 VDD 與 VSS 之間盡量靠近 IC 腳位放置 0.1 µF 陶瓷電容，抑制電源雜訊</td></tr>
    <tr><td><strong>電源電壓</strong></td><td>VDD 維持在 1.65 V ～ 1.95 V 範圍內，不可超過最大額定值</td></tr>
    <tr><td><strong>電源序列</strong></td><td>上電後建議執行軟體重置（SRST），確保暫存器初始狀態正確</td></tr>
  </tbody>
</table>

<h2>PCB 佈局建議</h2>

<ul>
  <li><strong>避免高電流走線</strong>：高電流走線（如電源 SMPS 開關節點）會產生磁場，應遠離 AK09973D 的感測區域，建議間距至少 5 mm</li>
  <li><strong>避免鐵磁性材料</strong>：PCB 附近的鐵磁性材料（如螺絲、屏蔽罩）會扭曲磁場，影響量測準確性，設計時應評估其影響</li>
  <li><strong>接地層</strong>：在感測器下方提供完整的接地層，有助於降低電磁干擾（EMI）</li>
  <li><strong>走線長度</strong>：I2C 走線應盡量短，並加入適當的上拉電阻（通常 4.7 kΩ），避免信號完整性問題</li>
</ul>

<h2>機械應力注意事項</h2>

<p>AK09973D 採用 WL-CSP（Wafer-Level Chip Scale Package）封裝，對機械應力極為敏感：</p>

<div class="callout-warning">
  <strong>⚠️ 封裝應力警告：</strong>WL-CSP 封裝在 PCB 回流焊（Reflow Soldering）過程中，若 PCB 彎曲或受到過大機械應力，可能導致感測器靈敏度偏移或永久損壞。建議在 PCB 設計時避免在感測器附近設置大型機械固定點或開孔。
</div>

<h2>磁場干擾來源與對策</h2>

<table>
  <thead><tr><th>干擾來源</th><th>影響</th><th>對策</th></tr></thead>
  <tbody>
    <tr><td>SMPS 開關電源</td><td>產生交變磁場，造成量測雜訊</td><td>增加物理距離，或使用磁屏蔽材料隔離</td></tr>
    <tr><td>馬達 / 線圈</td><td>強磁場可能超過量測範圍（HOFL 溢位）</td><td>評估最大磁場強度，確保不超過 ±10.1 mT</td></tr>
    <tr><td>鐵磁性元件</td><td>靜態磁場偏移，影響基線準確性</td><td>在軟體層面進行硬鐵（Hard Iron）校正</td></tr>
    <tr><td>溫度變化</td><td>靈敏度隨溫度略有變化</td><td>在極端溫度環境下考慮溫度補償</td></tr>
  </tbody>
</table>

<div class="callout-tip">
  <strong>✅ 最佳實踐：</strong>在系統初始化時，於無外部磁場干擾的環境下讀取三軸基線值並儲存，後續量測時減去此基線值，可有效消除靜態磁場偏移（Hard Iron Effect），提升偵測精度。
</div>
`
          }
        ]
          }
        ]
      }
    ]
  }
,
  {
    id: "pmic",
    title: "PMIC",
    description: "電源管理 IC（PMIC）架構、暫存器與 Linux 驅動程式解析，以 PMAR2230 為主要範例",
    icon: "Zap",
    color: "blue",
    subcategories: [
      {
        id: "pmar2230",
        title: "PMAR2230",
        description: "Qualcomm PMAR2230 PMIC 的硬體架構、電源軌、暫存器與 Linux 驅動程式",
        icon: "Battery",
        chips: [
          {
            id: "pmar2230",
            title: "PMAR2230",
            description: "Qualcomm PMAR2230 AR 眼鏡專用 PMIC",
            articles: [
          {
            id: "pmar2230-overview",
            title: "PMAR2230 概覽與主要特性",
            description: "PMAR2230 PMIC 的定位、功能方塊圖與主要規格一覽",
            tags: ["PMIC", "PMAR2230", "AR", "概覽"],
            lastUpdated: "2026-04-14",
            content: `
<h1>PMAR2230 概覽與主要特性</h1>

<p>PMAR2230 是 Qualcomm Technologies 針對<strong>擴增實境（AR）眼鏡與智慧眼鏡（Smart Glasses）</strong>晶片組所設計的高整合度混合訊號電源管理 IC（PMIC）。它將可攜式產品的電源管理、通用 Housekeeping 功能以及 IC 層級的介面支援，全部整合在單一 208-WLPSP（Fan-out Wafer-Level Pico-Scale Package）封裝中。</p>

<h2>設計定位</h2>

<p>PMAR2230 作為 AR/SG 平台的主 PMIC，負責為 SoC 及所有周邊子系統提供穩定、高效率的電源。其設計目標是在極小的封裝尺寸內，提供足夠多樣的電源軌以支援異構運算平台的複雜需求。</p>

<h2>主要規格一覽</h2>

<table>
  <thead><tr><th>功能類別</th><th>規格說明</th></tr></thead>
  <tbody>
    <tr><td><strong>SMPS 開關電源</strong></td><td>10 個 FTS533 Fast-Transient SMPS、1 個 Buck-or-Boost (BoB)、1 個 Centralized Boost (CBST)</td></tr>
    <tr><td><strong>LDO 線性穩壓</strong></td><td>19 個 LDO（含 LDO530 與 LDO515 兩種類型）</td></tr>
    <tr><td><strong>電壓軌總數</strong></td><td>31 個可程式化電壓軌</td></tr>
    <tr><td><strong>GPIO</strong></td><td>14 個可程式化 GPIO</td></tr>
    <tr><td><strong>通訊介面</strong></td><td>SPMI（與 SoC 通訊）、I2C（除錯用）</td></tr>
    <tr><td><strong>時鐘</strong></td><td>1 個 LN CLK 輸出、1 個 Sleep Clock 輸出，支援 38.4 MHz 晶振</td></tr>
    <tr><td><strong>Housekeeping</strong></td><td>片上 ADC（VADC）、類比多工器（AMUX）、雙推挽 DAC（DPPD，用於 AR 鏡片調光）</td></tr>
    <tr><td><strong>保護機制</strong></td><td>過溫保護（OTP）、欠壓鎖定（UVLO）</td></tr>
    <tr><td><strong>封裝</strong></td><td>208-WLPSP</td></tr>
    <tr><td><strong>電源輸入（VPH_PWR）</strong></td><td>典型 3.8 V，穩態範圍 2.5 V ～ 5.0 V</td></tr>
    <tr><td><strong>操作溫度</strong></td><td>環境溫度 -30°C ～ 接面溫度 +125°C</td></tr>
  </tbody>
</table>

<h2>功能方塊圖架構</h2>

<p>PMAR2230 的內部架構以一個共用的 <strong>Bandgap（MBG）</strong> 電壓參考為核心，驅動所有內部穩壓器。主要功能方塊包括：</p>

<pre>
VPH_PWR（電池/充電器輸入）
  ↓
輸入電源管理
  ├─ SMPS 陣列（10× FTS533 + BoB + CBST）
  └─ LDO 陣列（19× LDO530/LDO515）
       ↓
    各子系統電源軌

時鐘管理
  ├─ 38.4 MHz 晶振（XTAL_IN/OUT）
  └─ RF/LN 時鐘輸出

控制介面
  ├─ SPMI（主控 SoC 通訊）
  ├─ I2C（除錯介面）
  └─ PON/PBS（開機/電源匯流排序列器）

Housekeeping
  ├─ VADC（電壓 ADC）
  ├─ AMUX（類比多工器）
  └─ DPPD（雙推挽 DAC，AR 鏡片調光）
</pre>

<h2>與 PMAR2230M 的差異</h2>

<p>PMAR2230M 是 PMAR2230 的衍生型號，主要針對特定平台進行了微調。兩者在軟體介面（SPMI 暫存器映射）上高度相容，差異主要在於部分電源軌的預設電壓值與封裝規格。</p>

<div class="callout-info">
  <strong>ℹ️ 文件參考：</strong>本文內容主要來源於 PMAR2230 Data Sheet（80-85048-1 Rev. AC）第 1 章 Introduction 及 Section 3.1/3.2 電氣規格。
</div>

<h2>官方規格書下載</h2>

<p>以下為本知識庫所參考的 Qualcomm 官方文件，可直接下載 PDF：</p>

<table>
  <thead><tr><th>文件名稱</th><th>文件編號</th><th>說明</th><th>下載</th></tr></thead>
  <tbody>
    <tr>
      <td>PMAR2230 Data Sheet</td>
      <td>80-85048-1 Rev. AC</td>
      <td>硬體規格、電源軌、電氣特性</td>
      <td><a href="https://d2xsxph8kpxj0f.cloudfront.net/310519663408076565/3qEFW4iCXc8PkkvG87arAD/80-85048-1_REV_AC_PMAR2230_Data_Sheet_d9cb1b80.pdf" target="_blank" rel="noopener">📄 下載</a></td>
    </tr>
    <tr>
      <td>PMAR2230/PMAR2230M Design Guidelines</td>
      <td>80-85048-5 Rev. AA</td>
      <td>硬體設計指南訓練教材</td>
      <td><a href="https://d2xsxph8kpxj0f.cloudfront.net/310519663408076565/3qEFW4iCXc8PkkvG87arAD/80-85048-5_REV_AA_PMAR2230_PMAR2230M_Power_Management_IC_Design_Guidelines_Training_Slides_762253b9.pdf" target="_blank" rel="noopener">📄 下載</a></td>
    </tr>
    <tr>
      <td>Linux PMIC Software Overview</td>
      <td>80-85322-64 Rev. AB</td>
      <td>SAR2230P/SAR1250P Linux 軟體架構總覽</td>
      <td><a href="https://d2xsxph8kpxj0f.cloudfront.net/310519663408076565/3qEFW4iCXc8PkkvG87arAD/80-85322-64_REV_AB_SAR2230P_SAR1250P_Linux_PMIC_Software_Overview_21733883.pdf" target="_blank" rel="noopener">📄 下載</a></td>
    </tr>
    <tr>
      <td>PMIC Software User Guide</td>
      <td>80-85322-100 Rev. AA</td>
      <td>SAR2230P/SAR1250P 軟體使用者指南</td>
      <td><a href="https://d2xsxph8kpxj0f.cloudfront.net/310519663408076565/3qEFW4iCXc8PkkvG87arAD/80-85322-100_REV_AA_SAR2230P_SAR1250P_PMIC_Software_User_Guide_4632d755.pdf" target="_blank" rel="noopener">📄 下載</a></td>
    </tr>
    <tr>
      <td>PMAR2230 Hardware Register Description</td>
      <td>HRD-PMAR2230-S1 Rev. 1</td>
      <td>完整硬體暫存器說明</td>
      <td><a href="https://d2xsxph8kpxj0f.cloudfront.net/310519663408076565/3qEFW4iCXc8PkkvG87arAD/HRD-PMAR2230-S1_REV_1_PMAR2230_Hardware_Register_Description_74ccdece.pdf" target="_blank" rel="noopener">📄 下載</a></td>
    </tr>
  </tbody>
</table>
`
          },
          {
            id: "pmar2230-power-rails",
            title: "電源架構：SMPS 與 LDO 電源軌",
            description: "PMAR2230 的 SMPS（FTS533）與 LDO 電源軌詳解，包含預設電壓與典型用途",
            tags: ["SMPS", "LDO", "電源軌", "FTS533", "BoB"],
            lastUpdated: "2026-04-14",
            content: `
<h1>電源架構：SMPS 與 LDO 電源軌</h1>

<p>PMAR2230 共提供 31 個可程式化電壓軌，分為開關電源（SMPS）與線性穩壓（LDO）兩大類，分別針對高電流效率需求與低雜訊需求進行最佳化。</p>

<h2>SMPS 開關電源（FTS533）</h2>

<p><strong>FTS533</strong>（Fast-Transient SMPS）是 PMAR2230 的核心降壓轉換器，支援 PWM 模式、脈衝跳頻（Pulse-Skipping）模式，以及用於睡眠狀態的高效率保持（Retention）模式。</p>

<table>
  <thead><tr><th>特性</th><th>LV 範圍</th><th>MV 範圍</th></tr></thead>
  <tbody>
    <tr><td>輸出電壓範圍</td><td>0.300 V ～ 1.372 V</td><td>0.600 V ～ 2.744 V</td></tr>
    <tr><td>電壓步進</td><td>4 mV</td><td>8 mV</td></tr>
    <tr><td>操作模式</td><td colspan="2">PWM、Pulse-Skipping、Retention</td></tr>
  </tbody>
</table>

<h3>主要 SMPS 電源軌</h3>

<table>
  <thead><tr><th>電源軌名稱</th><th>預設電壓</th><th>典型用途</th></tr></thead>
  <tbody>
    <tr><td><code>S1A</code></td><td>0.876 V（APC）</td><td>應用處理器核心電壓（APC/CPU）</td></tr>
    <tr><td><code>S2A</code></td><td>0.876 V</td><td>SoC 核心子系統</td></tr>
    <tr><td><code>S3A</code></td><td>0.876 V</td><td>SoC 核心子系統</td></tr>
    <tr><td><code>S4A</code></td><td>0.752 V（CX）</td><td>SoC CX 電壓域（DSP、記憶體控制器）</td></tr>
    <tr><td><code>S5A</code></td><td>1.872 V</td><td>記憶體（DDR）電源</td></tr>
    <tr><td><code>S7A</code></td><td>1.256 V（HV Sub）</td><td>高壓子系統</td></tr>
    <tr><td><code>BoB</code></td><td>3.296 V</td><td>Buck-or-Boost，用於 RF 等需要穩定高壓的子系統</td></tr>
    <tr><td><code>CBST</code></td><td>5.1 V</td><td>集中式 Boost，用於需要高於 VPH_PWR 的負載</td></tr>
  </tbody>
</table>

<h2>LDO 線性穩壓器</h2>

<p>19 個 LDO 分為 <strong>LDO530</strong>（較高電流能力）和 <strong>LDO515</strong>（較低電流，低雜訊）兩種類型，為 SoC PHY、eMMC、I/O 等對雜訊敏感的負載提供乾淨電源。</p>

<table>
  <thead><tr><th>電源軌名稱</th><th>預設電壓</th><th>典型用途</th></tr></thead>
  <tbody>
    <tr><td><code>L1A</code></td><td>1.2 V</td><td>SoC 低電壓 I/O</td></tr>
    <tr><td><code>L2A</code></td><td>1.2 V</td><td>SoC 類比子系統</td></tr>
    <tr><td><code>L3A</code></td><td>1.8 V</td><td>VDD_IO（通用 I/O 電壓）</td></tr>
    <tr><td><code>L4A</code></td><td>1.8 V</td><td>eMMC/UFS 介面電源</td></tr>
    <tr><td><code>L5A</code></td><td>2.96 V</td><td>RF 類比電源</td></tr>
    <tr><td><code>L6A ～ L19A</code></td><td>各異</td><td>SoC PHY、感測器、攝影機、Wi-Fi 等</td></tr>
  </tbody>
</table>

<h2>電源軌命名規則</h2>

<p>PMAR2230 的電源軌命名遵循以下規則：</p>

<pre>
S{n}A  → SMPS（Buck）第 n 路，PMIC 實例 A
L{n}A  → LDO 第 n 路，PMIC 實例 A
BoB    → Buck-or-Boost 轉換器
CBST   → Centralized Boost 升壓轉換器
</pre>

<div class="callout-tip">
  <strong>✅ 設計提示：</strong>為了最大化效率，高電流數位核心（如 CPU、DSP）應優先使用 SMPS；對雜訊敏感的 RF 類比電路、PLL 等應使用 LDO，以避免開關雜訊干擾。
</div>

<div class="callout-warning">
  <strong>⚠️ 注意：</strong>VPH_PWR 穩態最高 5.0 V，瞬態（&lt;10 ms）最高 6.0 V。超過 6.0 V 穩態或 7.0 V 瞬態可能造成永久損壞。
</div>
`
          },
          {
            id: "pmar2230-pon-sequence",
            title: "Power-On 序列與 PON 狀態機",
            description: "PMAR2230 的開機序列、PON 狀態機、重置類型與 PS_HOLD 機制",
            tags: ["PON", "開機序列", "狀態機", "重置", "PS_HOLD"],
            lastUpdated: "2026-04-14",
            content: `
<h1>Power-On 序列與 PON 狀態機</h1>

<p>PMAR2230 的開機（Power-On）與關機（Power-Off）流程由內部的 <strong>PON 狀態機</strong>與 <strong>PBS（Programmable Boot Sequence）</strong>協同控制，確保所有電源軌按照嚴格的時序依序啟動，避免子系統因電源不穩定而損壞。</p>

<h2>PON 狀態機</h2>

<p>PON 狀態機定義了 PMIC 的完整生命週期狀態：</p>

<pre>
OFF（關機）
  ↓ PON 觸發（電源鍵 / KPDPWR）
PON（開機序列執行中）
  ↓ PBS 序列完成
ON（正常運作）
  ↓ POFF 觸發（軟體關機 / 電源鍵長按）
POFF（關機序列執行中）
  ↓ 序列完成
OFF

特殊路徑：
ON → FAULT（過溫 / UVLO / OCP）→ OFF
ON → WARM RESET（軟體重置）→ ON
</pre>

<h2>Power-On 序列（PBS 執行順序）</h2>

<p>PMAR2230 的開機序列分為三個階段：</p>

<table>
  <thead><tr><th>階段</th><th>動作</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td><strong>Pre-Trigger</strong></td><td>啟用 VREG_1P8_SYS、VREG_1P2_SYS</td><td>為 PMIC 內部數位邏輯供電</td></tr>
    <tr><td rowspan="4"><strong>PON 序列</strong></td><td>啟用 CBST（5.1 V Boost）</td><td>為需要高壓的負載預先充電</td></tr>
    <tr><td>啟用 S7A（HV Sub）</td><td>高壓子系統電源</td></tr>
    <tr><td>啟用 BoB → 各 SMPS → LDO</td><td>依序啟動各電源軌</td></tr>
    <tr><td>啟用 S1A（APC/CPU）</td><td>最後啟動應用處理器核心</td></tr>
    <tr><td><strong>完成</strong></td><td>拉高 PON_RESET_N</td><td>通知 SoC 電源就緒，SoC 開始啟動</td></tr>
  </tbody>
</table>

<h2>重置類型</h2>

<p>PMAR2230 支援多種重置類型，影響範圍各不相同：</p>

<table>
  <thead><tr><th>重置類型</th><th>觸發條件</th><th>效果</th></tr></thead>
  <tbody>
    <tr><td><strong>Warm Reset</strong></td><td>軟體指令、看門狗逾時（Stage 1）</td><td>SoC 重置，PMIC 暫存器保留（dVdd_rb 域除外）</td></tr>
    <tr><td><strong>Hard Reset</strong></td><td>電源鍵長按、看門狗逾時（Stage 2）</td><td>SoC 重置，PMIC 大部分暫存器清除</td></tr>
    <tr><td><strong>POFF（Shutdown）</strong></td><td>軟體關機、電源鍵長按</td><td>完整關機，所有電源軌關閉</td></tr>
    <tr><td><strong>Stage 3 Failsafe</strong></td><td>64 秒看門狗（獨立電路）</td><td>強制重置所有 PMIC 暫存器，保證系統恢復</td></tr>
  </tbody>
</table>

<h2>PS_HOLD 機制</h2>

<p>SoC 啟動後，必須在指定時間內拉高 <strong>PS_HOLD</strong> 訊號，告知 PMIC 系統已正常運作。若 PS_HOLD 未在時限內拉高，PMIC 將執行關機序列。</p>

<div class="callout-warning">
  <strong>⚠️ 已知問題（Known Issue）：</strong>在目前版本（PRR=000）中，DVDD 重置事件只會執行關機（Shutdown），而非完整的 POFF+PON 重置。PMIC 將保持 OFF 狀態，直到有新的 PON 觸發訊號。此外，在首次電池開機時，若 SoC 未能及時拉高 PS_HOLD，PON_RESET_N 可能異常保持 HIGH，導致無法正常關機。
</div>

<h2>三階段看門狗重置設計</h2>

<p>為了防止系統鎖死，PMAR2230 實作了三階段遞進式重置機制：</p>

<pre>
Stage 1（Bark）：S1 Timer 到期 → 發出中斷通知 SoC
  ↓ SoC 未回應
Stage 2（Bite）：S2 Timer 到期 → 執行 Hard Reset 或 Shutdown
  ↓ 仍未恢復
Stage 3（Failsafe）：64 秒獨立電路 → 強制重置所有 PMIC 暫存器
</pre>

<div class="callout-tip">
  <strong>✅ 最佳實踐：</strong>Stage 3 的 64 秒 Failsafe 是獨立電路，不依賴任何軟體，是系統從未知鎖死狀態恢復的最後保障。在設計時應確保此機制不被禁用。
</div>
`
          },
          {
            id: "pmar2230-gpio-spmi",
            title: "GPIO 與 SPMI 介面",
            description: "PMAR2230 的 14 個 GPIO 配置、SPMI 通訊協定與暫存器存取機制",
            tags: ["GPIO", "SPMI", "介面", "暫存器"],
            lastUpdated: "2026-04-14",
            content: `
<h1>GPIO 與 SPMI 介面</h1>

<p>PMAR2230 提供 14 個可程式化 GPIO，以及 SPMI（System Power Management Interface）作為與 SoC 的主要通訊介面。這兩個功能是 PMIC 軟硬體整合的關鍵橋樑。</p>

<h2>GPIO 功能概覽</h2>

<p>PMAR2230 的 GPIO 支援多種工作模式，可靈活配置為數位輸入、數位輸出或類比直通（Analog Pass-Through）：</p>

<table>
  <thead><tr><th>工作模式</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td><strong>Digital Input</strong></td><td>讀取外部數位訊號，支援可程式化上拉/下拉電阻</td></tr>
    <tr><td><strong>Digital Output</strong></td><td>輸出數位訊號，支援可程式化驅動強度</td></tr>
    <tr><td><strong>Digital In/Out</strong></td><td>雙向數位 I/O</td></tr>
    <tr><td><strong>Analog Pass-Through</strong></td><td>將 GPIO 作為類比訊號通道，連接至 AMUX</td></tr>
  </tbody>
</table>

<h3>GPIO 電氣特性</h3>

<table>
  <thead><tr><th>參數</th><th>規格</th></tr></thead>
  <tbody>
    <tr><td>預設狀態</td><td>數位輸入，10 µA 下拉</td></tr>
    <tr><td>上拉電流選項</td><td>1.5 µA ～ 31.5 µA（可程式化）</td></tr>
    <tr><td>驅動電流</td><td>可程式化，支援最高 4 MHz 訊號速率</td></tr>
    <tr><td>電壓源</td><td>VIN0 ～ VIN2（可選擇）</td></tr>
  </tbody>
</table>

<h3>GPIO 暫存器</h3>

<p>GPIO 的配置透過以下主要暫存器完成：</p>

<table>
  <thead><tr><th>暫存器</th><th>偏移量</th><th>功能</th></tr></thead>
  <tbody>
    <tr><td><code>MODE_CTL</code></td><td>0x40</td><td>選擇工作模式（Input/Output/In-Out/Analog）</td></tr>
    <tr><td><code>DIG_PULL_CTL</code></td><td>0x42</td><td>設定上拉/下拉電阻強度</td></tr>
    <tr><td><code>DIG_OUT_SRC_CTL</code></td><td>0x44</td><td>輸出訊號來源選擇（直接輸出 or 特殊功能）</td></tr>
    <tr><td><code>EN_CTL</code></td><td>0x46</td><td>啟用/禁用 GPIO</td></tr>
  </tbody>
</table>

<h2>SPMI 通訊介面</h2>

<p><strong>SPMI（System Power Management Interface）</strong>是 PMAR2230 與 SoC 之間的主要控制匯流排，遵循 MIPI Alliance 的 SPMI 規範。SoC 作為 Master，PMIC 作為 Slave，透過 SPMI 讀寫 PMIC 內部暫存器。</p>

<h3>SPMI 時鐘配置</h3>

<table>
  <thead><tr><th>SCLK 頻率</th><th>適用場景</th></tr></thead>
  <tbody>
    <tr><td>&lt;9.6 MHz</td><td>低速配置，省電模式</td></tr>
    <tr><td>19.2 MHz</td><td>標準操作模式</td></tr>
    <tr><td>38.4 MHz</td><td>高速操作模式</td></tr>
  </tbody>
</table>

<h3>APID 到 PPID 映射</h3>

<p>SPMI 框架使用 <strong>APID（Application Peripheral ID）</strong> 到 <strong>PPID（Physical Peripheral ID）</strong> 的映射表（共 512 個 APID），管理不同執行環境（Execution Environments, EEs）對 PMIC 周邊的存取權限。</p>

<pre>
SoC（Master）
  ↓ SPMI 匯流排
PMIC Arbiter（仲裁器）
  ↓ APID → PPID 映射
PMIC 周邊（GPIO / SMPS / LDO / PON / ...）
</pre>

<div class="callout-warning">
  <strong>⚠️ 存取控制：</strong>SPMI 周邊的存取由 MMU 強制執行。若 MMU 配置與 APID 所有權表不一致，將導致存取違規（Access Violation）。在 DTSI 的 <code>access.dtsi</code> 中設定正確的 DRV（Direct Resource Voter）權限至關重要。
</div>

<h2>I2C 除錯介面</h2>

<p>除了 SPMI 外，PMAR2230 還提供一個 <strong>I2C 介面</strong>，主要用於工廠測試與開發除錯階段，允許直接讀寫 PMIC 暫存器而不需要完整的 SoC 啟動流程。</p>

<div class="callout-tip">
  <strong>✅ 最佳實踐：</strong>未使用的 GPIO 應配置為數位輸入並啟用內部下拉電阻，以最小化漏電流，降低待機功耗。
</div>
`
          },
          {
            id: "pmar2230-linux-software",
            title: "Linux 軟體架構與驅動程式",
            description: "PMAR2230 的 Linux 驅動程式架構、RPMh 整合、Device Tree 配置與除錯方法",
            tags: ["Linux", "驅動程式", "RPMh", "Device Tree", "DTSI"],
            lastUpdated: "2026-04-14",
            content: `
<h1>Linux 軟體架構與驅動程式</h1>

<p>PMAR2230 的 Linux 軟體架構採用分層設計，透過標準 Linux 框架（Regulator、Clock、GPIO/pinctrl、IIO）與硬體互動，並以 RPMh（Resource Power Manager hardening）實現硬體加速的電源管理。</p>

<h2>軟體架構層次</h2>

<pre>
使用者空間（ADB / Android）
  ↓
Kernel（SysFS / DebugFS）
  ├─ Regulator Framework（regulator_set_voltage / regulator_set_load）
  ├─ Clock Framework（clk_set_rate）
  ├─ GPIO/pinctrl Framework（gpio_request / pinctrl_select_state）
  └─ IIO Framework（ADC 讀取）
       ↓
rpmh-regulator.c / clk-rpmh.c / pinctrl-spmi-gpio.c
       ↓
RPMh RSC（Resource State Coordinator）硬體
  ├─ VRM（Voltage Regulator Manager）：管理 Enable/Voltage/Mode
  └─ ARC（Aggregated Resource Controller）：管理電壓等級（0-15）
       ↓
PMIC Arbiter → SPMI → PMAR2230 硬體
</pre>

<h2>主要驅動程式</h2>

<table>
  <thead><tr><th>驅動程式</th><th>功能</th><th>對應 Linux 框架</th></tr></thead>
  <tbody>
    <tr><td><code>rpmh-regulator.c</code></td><td>電壓軌控制（SMPS/LDO/BoB）</td><td>Regulator Framework</td></tr>
    <tr><td><code>clk-rpmh.c</code></td><td>時鐘輸出控制</td><td>Clock Framework</td></tr>
    <tr><td><code>pinctrl-spmi-gpio.c</code></td><td>GPIO 配置與控制</td><td>GPIO/pinctrl Framework</td></tr>
    <tr><td><code>qcom-spmi-adc5.c</code></td><td>VADC 類比數位轉換</td><td>IIO Framework</td></tr>
    <tr><td><code>qcom-coincell.c</code></td><td>紐扣電池充電控制</td><td>Platform Driver</td></tr>
    <tr><td><code>qpnp-pon.c</code></td><td>PON/POFF/Reset 管理</td><td>Platform Driver</td></tr>
  </tbody>
</table>

<h2>Device Tree 配置（DTSI）</h2>

<p>PMAR2230 的所有電源軌、GPIO 與時鐘均在 Device Tree Source Include（DTSI）檔案中定義。主要配置檔案包括：</p>

<ul>
  <li><code>seraph-regulators.dtsi</code>（或對應平台名稱）：定義所有電壓軌的預設電壓、最小/最大電壓限制與操作模式</li>
  <li><code>seraph.dtsi</code>：定義 GPIO pinctrl 狀態與 SPMI 周邊節點</li>
  <li><code>access.dtsi</code>：定義各執行環境（EE）對 SPMI 周邊的存取權限（DRV 配置）</li>
</ul>

<h3>Regulator DTSI 範例</h3>

<pre>
&amp;L3A {
    regulator-min-microvolt = &lt;1800000&gt;;
    regulator-max-microvolt = &lt;1800000&gt;;
    qcom,init-voltage = &lt;1800000&gt;;
    regulator-always-on;
};

&amp;S4A {
    regulator-min-microvolt = &lt;600000&gt;;
    regulator-max-microvolt = &lt;1000000&gt;;
    qcom,init-voltage = &lt;752000&gt;;
};
</pre>

<h2>電壓聚合機制</h2>

<p>當多個子系統（Apps、Modem、DSP 等）同時請求同一電源軌時，RPMh 使用以下聚合策略：</p>

<table>
  <thead><tr><th>聚合類型</th><th>策略</th><th>適用場景</th></tr></thead>
  <tbody>
    <tr><td><strong>電壓聚合</strong></td><td>MAX（取最大值）</td><td>確保所有請求者都能獲得足夠電壓</td></tr>
    <tr><td><strong>電流聚合</strong></td><td>SUM（加總）</td><td>確保 LDO/SMPS 能提供足夠總電流</td></tr>
    <tr><td><strong>模式聚合</strong></td><td>MAX（取最高效能模式）</td><td>確保效能需求最高的請求者得到滿足</td></tr>
  </tbody>
</table>

<h2>ADC（VADC）使用</h2>

<p>PMAR2230 內建 VADC 提供系統電壓與溫度監控。Linux 中透過 IIO 框架存取：</p>

<ul>
  <li><strong>VADC 驅動</strong>提供 USR_RIF 通道存取，可讀取電池電壓、PMIC 溫度等</li>
  <li><strong>VADC TM（Threshold Monitor）</strong>支援週期性量測，避免軟體持續輪詢，降低 CPU 負擔</li>
  <li><strong>DPPD（雙推挽 DAC）</strong>用於 AR 鏡片調光控制，輸出範圍 -1.6 V ～ +1.575 V，步進 25 mV，最大電流 ±20 mA</li>
</ul>

<div class="callout-info">
  <strong>ℹ️ DPPD 量測注意：</strong>由於 ADC 只能量測單端輸入，軟體必須分別讀取 VDAC_P 和 VDAC_N 兩個通道，再進行相減計算，才能得到正確的差動電壓值。
</div>

<h2>除錯方法</h2>

<p>常用的 Linux 除錯工具與方法：</p>

<ul>
  <li><strong>DebugFS</strong>：掛載後可透過 <code>/sys/kernel/debug/regulator/</code> 查看所有電壓軌狀態</li>
  <li><strong>SysFS</strong>：<code>/sys/class/regulator/</code> 提供電壓軌的即時狀態讀取</li>
  <li><strong>動態除錯</strong>：透過 <code>echo &lt;target&gt; &gt; /sys/kernel/debug/dynamic_debug/control</code> 啟用 ADC 除錯日誌</li>
  <li><strong>PMIC_PON.bin</strong>：分析意外重置原因的關鍵檔案，記錄了 PON 歷史事件</li>
</ul>

<div class="callout-warning">
  <strong>⚠️ 注意：</strong>PON/POFF 觸發條件雖然可在 HLOS 中覆寫，但<strong>不建議</strong>這樣做。這些設定應保持在開機配置（Boot Configuration）中的程式化狀態，以確保系統穩定性。
</div>
`
          },
          {
            id: "pmar2230-register-map",
            title: "硬體暫存器地圖與關鍵暫存器",
            description: "PMAR2230 的暫存器組織架構、關鍵模組暫存器詳解與 SPMI 存取方式",
            tags: ["暫存器", "Register Map", "SPMI", "BUS Logger", "中斷控制器"],
            lastUpdated: "2026-04-14",
            content: `
<h1>硬體暫存器地圖與關鍵暫存器</h1>

<p>PMAR2230 的暫存器依功能模組組織，透過 SPMI 匯流排以 16 位元地址存取。每個模組（Peripheral）佔用 256 個位元組的地址空間，基底地址由模組類型決定。</p>

<h2>暫存器地址架構</h2>

<pre>
地址格式：[SID(4-bit)][PID(8-bit)][REG(8-bit)]

SID  = Slave ID（PMIC 實例識別碼）
PID  = Peripheral ID（功能模組識別碼）
REG  = 模組內暫存器偏移量（0x00 ～ 0xFF）
</pre>

<h2>主要功能模組基底地址</h2>

<table>
  <thead><tr><th>模組名稱</th><th>基底地址</th><th>功能說明</th></tr></thead>
  <tbody>
    <tr><td><strong>BUS（PBUS Logger）</strong></td><td>0x00000400</td><td>周邊匯流排交易記錄器</td></tr>
    <tr><td><strong>INT（中斷控制器）</strong></td><td>0x00000500</td><td>集中式中斷管理</td></tr>
    <tr><td><strong>SPMI Master</strong></td><td>0x00000700</td><td>SPMI 主控器配置</td></tr>
    <tr><td><strong>GPIO（各組）</strong></td><td>依 GPIO 編號</td><td>GPIO 模式、上下拉、驅動強度</td></tr>
    <tr><td><strong>RF Clock（CLK2/CLK3）</strong></td><td>依時鐘編號</td><td>RF 時鐘緩衝器配置</td></tr>
    <tr><td><strong>PON/PBS</strong></td><td>依模組</td><td>開機序列與重置控制</td></tr>
    <tr><td><strong>SMPS（S1A ～ S10A）</strong></td><td>依電源軌編號</td><td>SMPS 電壓、模式控制</td></tr>
    <tr><td><strong>LDO（L1A ～ L19A）</strong></td><td>依電源軌編號</td><td>LDO 電壓、使能控制</td></tr>
  </tbody>
</table>

<h2>通用電源軌暫存器（SMPS/LDO 共用）</h2>

<table>
  <thead><tr><th>暫存器名稱</th><th>偏移量</th><th>關鍵位元</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td><code>STATUS1</code></td><td>0x08</td><td>Bit 7: VREG_READY<br>Bit 6: VREG_ERROR<br>Bit 5: VREG_OCP</td><td>電源軌狀態讀取</td></tr>
    <tr><td><code>VSET_LB/UB</code></td><td>0x40/0x41</td><td>電壓設定值（低/高位元組）</td><td>設定輸出電壓（1 mV 精度）</td></tr>
    <tr><td><code>MODE_CTL1</code></td><td>0x45</td><td>操作模式選擇</td><td>PWM / Auto / Retention 模式切換</td></tr>
    <tr><td><code>EN_CTL</code></td><td>0x46</td><td>Bit 7: ENABLE</td><td>啟用/禁用電源軌</td></tr>
    <tr><td><code>OCP_CTL1</code></td><td>0x88</td><td>OCP 設定</td><td>過電流保護防彈跳時間與行為</td></tr>
    <tr><td><code>OCP_CTL2</code></td><td>0x89</td><td>OCP 廣播設定</td><td>是否觸發全域 PMIC 關機</td></tr>
  </tbody>
</table>

<h2>PBUS Logger 暫存器（BUS 模組）</h2>

<p>PBUS Logger 是 PMAR2230 的重要除錯工具，可記錄所有 SPMI 匯流排交易：</p>

<table>
  <thead><tr><th>暫存器</th><th>功能</th></tr></thead>
  <tbody>
    <tr><td><code>BUS_LOGGER_EN</code></td><td>Bit 7 = LOGGER_EN：啟用/禁用記錄器</td></tr>
    <tr><td><code>BUS_MEM_INTF_ADDR</code></td><td>記憶體介面地址指標（自動遞增）</td></tr>
    <tr><td><code>BUS_MEM_INTF_DATA0-7</code></td><td>8 位元組寬資料介面，讀取記錄內容</td></tr>
    <tr><td><code>BUS_CAPTURE_INC</code></td><td>寫入觸發地址指標遞增（自清除暫存器）</td></tr>
  </tbody>
</table>

<h3>PBUS Logger 使用步驟</h3>

<pre>
1. 確認 LOGGER_EN = 0（禁用狀態）
2. 將 MEM_INTF_ADDR 重置為 0
3. 設定 FIFO 大小（64×64 / 128×64 / 256×64）
4. 設定過濾條件（PID/SID 過濾、讀/寫過濾）
5. 設定 LOGGER_EN = 1 開始記錄
6. 觸發要觀察的操作
7. 設定 LOGGER_EN = 0 停止記錄
8. 透過 MEM_INTF_DATA 讀取記錄內容
</pre>

<h2>PON 暫存器</h2>

<table>
  <thead><tr><th>暫存器</th><th>功能</th></tr></thead>
  <tbody>
    <tr><td><code>PON_XXX_RESET_S1_TIMER</code></td><td>Stage 1 重置防彈跳時間（Bark 警告）</td></tr>
    <tr><td><code>PON_XXX_RESET_S2_TIMER</code></td><td>Stage 2 重置等待時間（Bite 執行）</td></tr>
    <tr><td><code>PMON_HIS.BIN</code></td><td>PON 歷史記錄，用於分析意外重置原因</td></tr>
  </tbody>
</table>

<div class="callout-warning">
  <strong>⚠️ 讀取注意：</strong>部分暫存器（如 <code>PBS_TIMERS2_TIMER_RDATA</code>）需要「雙重讀取（Double Read）」以確認資料有效性。此外，某些記憶體介面暫存器（如 <code>BUS_MEM_INTF_DATA</code>）的讀回值可能因內部硬體處理而與寫入值不同。
</div>

<div class="callout-tip">
  <strong>✅ 重置域（Reset Domain）：</strong>暫存器被分配到不同的重置域（如 dVdd_rb、xVdd_rb、PERPH_rb），決定在不同重置類型（Warm Reset vs. Hard Reset）下是否保留其值。在設計驅動程式時，必須了解目標暫存器所屬的重置域。
</div>
`
          },
          {
            id: "pmar2230-design-guidelines",
            title: "硬體設計指南",
            description: "PMAR2230 的 PCB 佈局、接地、去耦電容、時鐘電路與電源序列設計要點",
            tags: ["硬體設計", "PCB", "接地", "去耦電容", "時鐘"],
            lastUpdated: "2026-04-14",
            content: `
<h1>硬體設計指南</h1>

<p>PMAR2230 的硬體設計品質直接影響系統的電源穩定性、雜訊特性與可靠性。本文整理了 PCB 佈局、接地設計、去耦電容選擇、時鐘電路與電源序列的關鍵設計要點。</p>

<h2>接地設計</h2>

<p>PMAR2230 區分兩種接地：</p>

<table>
  <thead><tr><th>接地類型</th><th>說明</th><th>設計要求</th></tr></thead>
  <tbody>
    <tr><td><strong>CMN_GND（共用接地）</strong></td><td>訊號與類比電路的共用接地</td><td>低阻抗，避免與功率接地混用</td></tr>
    <tr><td><strong>GNDP（功率接地）</strong></td><td>SMPS 開關電流的返回路徑</td><td>寬銅皮，盡量短且直</td></tr>
  </tbody>
</table>

<p><strong>遠端接地感測（RMT_GND）</strong>：SMPS 的遠端接地感測線應與對應的 VREG 感測線（VREG_SENSE）以差動對（Differential Pair）方式佈線，以消除 PCB 走線電阻造成的電壓誤差。</p>

<h2>去耦電容設計</h2>

<table>
  <thead><tr><th>節點</th><th>建議電容值</th><th>注意事項</th></tr></thead>
  <tbody>
    <tr><td><strong>VPH_PWR</strong></td><td>依電流需求，通常 10 µF ～ 100 µF</td><td>盡量靠近 PMIC 放置，減少走線電感</td></tr>
    <tr><td><strong>SMPS 輸出</strong></td><td>依 FTS533 規格，通常 4.7 µF ～ 22 µF</td><td>使用低 ESR 陶瓷電容</td></tr>
    <tr><td><strong>LDO 輸出</strong></td><td>1 µF ～ 10 µF</td><td>靠近負載放置</td></tr>
    <tr><td><strong>REF_BYP（參考電壓旁路）</strong></td><td>0.1 µF</td><td>必須放置，不可省略</td></tr>
  </tbody>
</table>

<div class="callout-warning">
  <strong>⚠️ REF_BYP 限制：</strong>REF_BYP 腳位僅用於旁路濾波，<strong>不可</strong>作為外部參考電壓輸出使用。若需要在晶片外部使用參考電壓，應將一個 GPIO 配置為類比輸出模式。
</div>

<h2>時鐘電路設計</h2>

<p>PMAR2230 使用 38.4 MHz 晶體振盪器（XTAL）作為系統時鐘來源：</p>

<ul>
  <li><strong>XTAL_IN / XTAL_OUT</strong> 腳位對雜訊極為敏感，走線應盡量短，並在周圍加入接地護欄（Guard Ring）</li>
  <li>晶振腳位<strong>不可外部負載</strong>：若在 XTAL_IN/OUT 上加載外部電路，將破壞振盪器的正常工作</li>
  <li>晶振的負載電容（CL）應依晶振規格選擇，通常為 8 pF ～ 18 pF</li>
  <li>RF 時鐘輸出（CLK2_RF、CLK3_RF）具有邊緣速率控制與驅動強度調整功能，可在不同執行環境（EE）間保持時鐘穩定性</li>
</ul>

<h2>電源軌佈局原則</h2>

<table>
  <thead><tr><th>設計要點</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td><strong>SMPS 電感選擇</strong></td><td>依 FTS533 規格選擇適當電感值，過大的電感值會降低瞬態響應速度</td></tr>
    <tr><td><strong>電感佈局</strong></td><td>電感應靠近 PMIC 的 SW 腳位，減少開關節點的走線長度以降低 EMI</td></tr>
    <tr><td><strong>感測線佈線</strong></td><td>VREG_SENSE 線應從負載端引出，以補償走線壓降</td></tr>
    <tr><td><strong>熱管理</strong></td><td>高電流 SMPS 的散熱銅皮應足夠大，PMIC 下方應有散熱通孔（Thermal Via）連接到內層地平面</td></tr>
  </tbody>
</table>

<h2>電源序列設計要點</h2>

<p>嚴格遵守 PMAR2230 規定的電源序列（Power-On Sequence）是避免子系統損壞的關鍵：</p>

<ul>
  <li>不可修改 PBS 中定義的電源啟動順序，特別是 CBST → S7A → BoB → SMPS → LDO → S1A 的順序</li>
  <li>電源軌之間的時序間隔（Timing Margin）應符合 Data Sheet 規格，不可任意縮短</li>
  <li>關機序列（Power-Off Sequence）同樣重要，應確保 SoC 在電源軌關閉前已完成必要的狀態儲存</li>
</ul>

<h2>OCP（過電流保護）設計</h2>

<p>PMAR2230 的每個電源軌都有獨立的 OCP 機制：</p>

<ul>
  <li>OCP 防彈跳時間可透過 <code>OCP_CTL1</code> 暫存器配置，避免短暫的電流突波誤觸發</li>
  <li>若啟用 OCP 廣播（Broadcast）功能，單一電源軌的 OCP 事件將觸發整個 PMIC 關機，需謹慎評估是否啟用</li>
  <li>電池電流限制（BCL）應整合到系統熱管理框架中，以確保在高負載瞬態時不觸發電池保護電路</li>
</ul>

<div class="callout-tip">
  <strong>✅ 安全設計提示：</strong>在 VCCA 之前正確放置保護 FET（Protection FET），是功能安全（Functional Safety）應用的必要設計。確保在設計審查時驗證此保護電路的正確性。
</div>
`
          }
        ]
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

export function getChipById(catId: string, subId: string, chipId: string): ChipModel | undefined {
  const sub = getSubCategoryById(catId, subId);
  return sub?.chips?.find(c => c.id === chipId);
}

export function getArticleById(catId: string, subId: string, artOrChipId: string, artId?: string): Article | undefined {
  const sub = getSubCategoryById(catId, subId);
  if (sub?.chips && artId) {
    // Three-level: catId/subId/chipId/artId
    const chip = sub.chips.find(c => c.id === artOrChipId);
    return chip?.articles.find(a => a.id === artId);
  }
  // Two-level legacy: catId/subId/artId
  return sub?.articles?.find(a => a.id === artOrChipId);
}

export function getAllArticles(): Array<Article & { categoryId: string; subcategoryId: string; chipId?: string }> {
  const result: Array<Article & { categoryId: string; subcategoryId: string; chipId?: string }> = [];
  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      if (sub.chips) {
        for (const chip of sub.chips) {
          for (const art of chip.articles) {
            result.push({ ...art, categoryId: cat.id, subcategoryId: sub.id, chipId: chip.id });
          }
        }
      } else if (sub.articles) {
        for (const art of sub.articles) {
          result.push({ ...art, categoryId: cat.id, subcategoryId: sub.id });
        }
      }
    }
  }
  return result;
}
