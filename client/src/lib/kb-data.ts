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
        articles: [
          {
            id: "sx9204-overview",
            title: "SX9204 架構總覽",
            description: "Semtech SX9204 SAR 近接感測器的硬體架構、Channel 設計與 Phase 概念",
            tags: ["SX9204", "CapSense", "SAR", "Phase", "Channel"],
            lastUpdated: "2026-04-14",
            content: `
<h1>SX9204 架構總覽</h1>

<p>SX9204 是 Semtech 推出的 4 通道電容式近接感測器（SAR / CapSense），廣泛用於手機、穿戴裝置的人體近接偵測（SAR 功率控制）。</p>

<h2>硬體架構</h2>

<p>SX9204 擁有 4 個感測通道（CSIO-0 到 CSIO-3），每個通道對應一個 Phase（掃描階段）。晶片透過 I2C 介面與主處理器通訊，並可透過中斷腳位（NIRQ）通知主機偵測狀態改變。</p>

<h2>核心信號流程</h2>

<pre>PCB 感測電極（Sensor Pad）
        ↓ 電容量測
AFE（Analog Front End）
  - 自動偏移補償（Auto-Offset Compensation）
  - 去除環境電容 CEnv
        ↓
PROXRAW（原始量測值）
        ↓ RAW Filter
PROXUSEFUL（去雜訊後的量測值）
        ↓ USE Filter → AVG Filter
PROXAVG（環境基線）
        ↓ PROXUSEFUL - PROXAVG
PROXDIFF（純近接信號）
        ↓ 與 Threshold 比較
PROXSTAT（偵測狀態：0 = 無人 / 1 = 有人）</pre>

<h2>關鍵暫存器</h2>

<table>
  <thead><tr><th>暫存器</th><th>功能</th></tr></thead>
  <tbody>
    <tr><td><code>PHEN</code></td><td>Phase Enable：啟用哪幾個 Phase（Channel）</td></tr>
    <tr><td><code>FREQ</code></td><td>Sampling Frequency：採樣頻率</td></tr>
    <tr><td><code>RESOLUTION</code></td><td>解析度：影響每次採樣的平均次數</td></tr>
    <tr><td><code>SCANPERIOD</code></td><td>掃描週期：控制 Scan Period 與 Idle Time</td></tr>
    <tr><td><code>PROXTHRESH</code></td><td>近接偵測閾值</td></tr>
    <tr><td><code>HYST</code></td><td>遲滯值：防止狀態抖動</td></tr>
    <tr><td><code>PAUSEIRQEN</code></td><td>暫停 IRQ：避免 I2C 讀取與 ADC 採樣衝突</td></tr>
  </tbody>
</table>
            `
          },
          {
            id: "sx9204-shield",
            title: "Shield 電極的用途",
            description: "為什麼 SX9204 需要 Shield 電極，以及它如何消除環境干擾",
            tags: ["SX9204", "Shield", "寄生電容", "EMI", "感測器設計"],
            lastUpdated: "2026-04-14",
            content: `
<h1>Shield 電極的用途</h1>

<p>Shield 是 SX9204 硬體設計中非常重要但容易被忽略的一個元件。它的核心目的是<strong>消除感測器背面的寄生電容干擾</strong>，讓感測器只對正面（朝向人體的方向）的電容變化有反應。</p>

<h2>問題的根源：寄生電容</h2>

<p>PCB 上的感測電極（Sensor Pad）是一塊導體，它不只對正面的空氣和人體有電容，也會對背面的 PCB 走線、電池、金屬外殼等產生<strong>寄生電容（Parasitic Capacitance）</strong>。</p>

<p>這些背面的寄生電容會：</p>
<ul>
  <li>讓感測器的基線（PROXAVG）偏高，降低動態範圍</li>
  <li>當手機彎曲、溫度變化時，背面電容也會改變，造成<strong>誤觸發</strong></li>
  <li>讓感測器對「人體靠近」的靈敏度下降</li>
</ul>

<h2>Shield 的解決方案</h2>

<p>Shield 是一塊放在感測電極<strong>背面</strong>的導體層，SX9204 會驅動它輸出與感測電極<strong>完全相同的電壓波形</strong>（等電位驅動，Guard Drive）。</p>

<div class="callout-tip">
  <strong>✅ 核心原理：</strong>兩個電位完全相同的導體之間，電場為零，因此電容也為零。Shield 讓感測電極「看不見」背面的任何東西，只對正面的電容變化有反應。
</div>

<h2>Shield 的效果</h2>

<table>
  <thead><tr><th>情況</th><th>沒有 Shield</th><th>有 Shield</th></tr></thead>
  <tbody>
    <tr><td>背面寄生電容</td><td>存在，影響基線</td><td>被消除，基線更低更穩定</td></tr>
    <tr><td>對人體靠近的靈敏度</td><td>較低（被背景雜訊稀釋）</td><td>較高（只感應正面）</td></tr>
    <tr><td>溫度/彎曲造成的漂移</td><td>較大</td><td>較小</td></tr>
    <tr><td>EMI 抗干擾能力</td><td>較弱</td><td>較強（Shield 也有屏蔽效果）</td></tr>
  </tbody>
</table>

<h2>PCB 設計建議</h2>

<ul>
  <li>Shield 層放在感測電極的正下方（背面），面積略大於感測電極</li>
  <li>Shield 與感測電極之間的間距越小越好（通常 0.1~0.2 mm）</li>
  <li>Shield 連接到 SX9204 的 Shield 腳位，由晶片驅動</li>
  <li>感測電極正面不需要 Shield（否則會屏蔽掉人體信號）</li>
</ul>
            `
          },
          {
            id: "sx9204-digital-filtering",
            title: "數位濾波流程：RAW / USE / AVG Filter",
            description: "SX9204 三個數位濾波器的真實用途與協作關係",
            tags: ["SX9204", "Digital Filter", "PROXAVG", "PROXDIFF", "PROXUSEFUL"],
            lastUpdated: "2026-04-14",
            content: `
<h1>數位濾波流程：RAW / USE / AVG Filter</h1>

<p>SX9204 的數位處理鏈包含三個濾波器，它們各司其職，共同確保 PROXDIFF（近接信號）的準確性。</p>

<h2>整體流程</h2>

<pre>PROXRAW
  ↓ RAW Filter
PROXUSEFUL
  ↓ USE Filter
PROXUSEOUT
  ↓ AVG Filter
PROXAVG

PROXDIFF = PROXUSEFUL - PROXAVG</pre>

<h2>三個 Filter 的真實用途</h2>

<table>
  <thead><tr><th>Filter</th><th>True Purpose</th></tr></thead>
  <tbody>
    <tr><td><strong>RAW Filter</strong></td><td>Removes circuit-level noise to stabilize PROXUSEFUL</td></tr>
    <tr><td><strong>USE Filter</strong></td><td>Prevents PROXAVG from chasing the "user proximity" signal</td></tr>
    <tr><td><strong>AVG Filter</strong></td><td>Slowly tracks genuine environmental drift (temperature, humidity, etc.)</td></tr>
  </tbody>
</table>

<h2>RAW Filter：去除電路雜訊</h2>

<p>RAW Filter 是一個對 PROXUSEFUL 做多次採樣平均的低通濾波器，去掉電路本身產生的高頻雜訊（每次採樣都可能有一點點誤差）。</p>

<div class="callout-warning">
  <strong>⚠️ 注意：</strong>RAW Filter 設得太強（平均次數太多），快速的短暫接觸可能被平滑掉，導致 PROXUSEFUL 的峰值變低，靈敏度下降。
</div>

<h2>USE Filter：保護 PROXAVG 不被污染</h2>

<p>USE Filter 是一個指數移動平均（Exponential Moving Average），它的輸出（PROXUSEOUT）只餵給 AVG Filter，<strong>不參與偵測判斷</strong>。</p>

<p>USE Filter 的時間常數比 AVG Filter 短，它的作用是：當人快速靠近時，PROXUSEFUL 快速上升，但 USE Filter 的輸出（PROXUSEOUT）變化很慢，因此 AVG Filter 幾乎看不到這個快速變化，PROXAVG 保持穩定。</p>

<div class="callout-tip">
  <strong>✅ 關鍵理解：</strong>USE Filter 不影響偵測靈敏度，因為偵測用的是 PROXUSEFUL（不是 PROXUSEOUT）。USE Filter 只影響 PROXAVG 的追蹤速度。
</div>

<h2>AVG Filter：追蹤環境基線</h2>

<p>AVG Filter 是一個時間常數非常長的低通濾波器，用來追蹤「沒有人靠近時的環境電容基線」（溫度、濕度、PCB 形變等造成的緩慢漂移）。</p>

<h2>為什麼需要相減？</h2>

<p>PROXDIFF = PROXUSEFUL − PROXAVG，這個相減的目的是：</p>
<ul>
  <li>PROXUSEFUL 包含「環境背景 + 人體靠近的信號」</li>
  <li>PROXAVG 代表「環境背景」</li>
  <li>相減後只剩下「人體靠近的信號」</li>
</ul>

<p>如果沒有這個相減機制，溫度升高導致電容增加，系統就會誤判為有人靠近。</p>
            `
          },
          {
            id: "sx9204-proxavg-freeze",
            title: "PROXAVG 凍結機制",
            description: "為什麼 PROXSTAT=1 時要凍結 PROXAVG，PROXSTAT=0 時要解凍",
            tags: ["SX9204", "PROXAVG", "PROXSTAT", "凍結", "基線"],
            lastUpdated: "2026-04-14",
            content: `
<h1>PROXAVG 凍結機制</h1>

<p>SX9204 有一個重要的設計：當偵測到有人靠近（PROXSTAT = 1）時，PROXAVG 會被<strong>凍結（Frozen）</strong>；當沒有人靠近（PROXSTAT = 0）時，PROXAVG 會<strong>自由追蹤（Free）</strong>環境變化。</p>

<h2>為什麼 PROXSTAT = 1 時要凍結 PROXAVG？</h2>

<p>當偵測到有人靠近，PROXUSEFUL 會持續偏高。如果這時候不凍結 PROXAVG，它就會慢慢跟著 PROXUSEFUL 往上爬，把「有人靠近」的狀態誤認為是新的環境基線。</p>

<p>結果：PROXAVG 越來越接近 PROXUSEFUL，PROXDIFF 越來越小，最終低於 threshold，系統誤判為沒人，PROXSTAT 錯誤變回 0。</p>

<div class="callout-warning">
  <strong>⚠️ 不凍結的後果：</strong>人還在那裡，但系統以為沒人了（False Negative）。這在 SAR 功率控制應用中會造成嚴重問題——人體還在旁邊，但手機已經提高了發射功率。
</div>

<h2>為什麼 PROXSTAT = 0 時要解凍 PROXAVG？</h2>

<p>當沒有人靠近，環境可能因為溫度、濕度、PCB 形變等原因緩慢漂移。這時候需要讓 PROXAVG 自由追蹤這些緩慢的環境變化，保持基線準確。</p>

<p>如果這時候也凍結 PROXAVG，基線就會越來越不準，導致 PROXDIFF 出現偏差，引發誤觸發（False Positive）。</p>

<h2>狀態機邏輯</h2>

<pre>PROXSTAT = 0（無人）
  PROXAVG 自由追蹤環境
  PROXDIFF 上升，超過 Threshold + HYST
        ↓
PROXSTAT = 1（有人）
  PROXAVG 凍結，不再更新
  PROXDIFF 下降，低於 Threshold - HYST
        ↓
PROXSTAT = 0（無人）
  PROXAVG 解凍，繼續追蹤環境</pre>

<h2>一句話總結</h2>

<p>凍結是為了「<strong>保護已偵測到的狀態不被自己吃掉</strong>」；解凍是為了「<strong>讓基線跟上真實環境，避免雜訊誤觸發</strong>」。</p>
            `
          },
          {
            id: "sx9204-threshold-hyst",
            title: "Threshold 與 HYST 的協作",
            description: "為什麼有了 Threshold 還需要 HYST，以及 HYST 設定的注意事項",
            tags: ["SX9204", "Threshold", "HYST", "Schmitt Trigger", "抖動"],
            lastUpdated: "2026-04-14",
            content: `
<h1>Threshold 與 HYST 的協作</h1>

<p>SX9204 的偵測判斷使用兩個參數：Threshold（閾值）和 HYST（遲滯值）。兩者缺一不可。</p>

<h2>只有 Threshold 會發生什麼問題？</h2>

<p>如果 PROXDIFF 的值在 threshold 附近因為雜訊上下抖動：</p>

<pre>PROXDIFF:  99 → 101 → 99 → 101 → 99 → 101 ...
Threshold: 100

結果：PROXSTAT 不停地 0 → 1 → 0 → 1 → 0 → 1（Chattering）</pre>

<p>這種快速抖動會讓系統完全不穩定，無法正常使用。</p>

<h2>加入 HYST 後的效果</h2>

<p>HYST 讓「進入」和「離開」偵測狀態使用不同的門檻：</p>

<table>
  <thead><tr><th>動作</th><th>條件</th></tr></thead>
  <tbody>
    <tr><td><strong>進入偵測（PROXSTAT 0→1）</strong></td><td>PROXDIFF &gt; Threshold + HYST</td></tr>
    <tr><td><strong>離開偵測（PROXSTAT 1→0）</strong></td><td>PROXDIFF &lt; Threshold − HYST</td></tr>
  </tbody>
</table>

<p>以數字舉例（Threshold = 100，HYST = 10）：</p>
<ul>
  <li>進入條件：PROXDIFF &gt; 110</li>
  <li>離開條件：PROXDIFF &lt; 90</li>
  <li>緩衝區間（90 ~ 110）：在此區間內 PROXSTAT 不改變</li>
</ul>

<div class="callout-tip">
  <strong>✅ 類比：</strong>這個設計在電子電路中叫做 <strong>Schmitt Trigger（施密特觸發器）</strong>，是消除雜訊抖動的經典方法。Threshold 是中心點，HYST 是在中心點兩側加上的緩衝距離。
</div>

<h2>HYST 設定的注意事項</h2>

<div class="callout-warning">
  <strong>⚠️ 重要：</strong>進入偵測的條件是 PROXDIFF &gt; Threshold + HYST。如果您的目標物靠近時只能讓 PROXDIFF 上升到 Threshold 和 Threshold + HYST 之間，系統永遠偵測不到！
</div>

<p>HYST 設定原則：</p>
<ul>
  <li>先量測實際信號強度（PROXDIFF 在目標靠近時能達到多少）</li>
  <li>HYST 設定為信號強度的 10% ~ 20% 左右</li>
  <li>設太大 → 靈敏度下降，弱信號偵測不到</li>
  <li>設太小 → 雜訊容易造成抖動</li>
</ul>
            `
          },
          {
            id: "sx9204-scan-period-power",
            title: "Scan Period、功耗與 FREQ/RESOLUTION 的關係",
            description: "SX9204 的掃描週期計算、Idle Time 設定，以及 FREQ 與功耗的反直覺關係",
            tags: ["SX9204", "Scan Period", "SCANPERIOD", "FREQ", "RESOLUTION", "功耗"],
            lastUpdated: "2026-04-14",
            content: `
<h1>Scan Period、功耗與 FREQ/RESOLUTION 的關係</h1>

<p>SX9204 的功耗管理圍繞著 Scan Period 的設計，理解這個機制對於省電優化至關重要。</p>

<h2>Scan Period 的組成</h2>

<pre>Scan Period = 所有啟用 Phase 的 sensing/processing 時間總和 + Idle Time</pre>

<p>每個 Phase 的 sensing duration 取決於：</p>
<ul>
  <li><strong>FREQ（Sampling Frequency）</strong>：採樣頻率越高，每次充放電週期越短</li>
  <li><strong>RESOLUTION</strong>：解析度越高，需要更多次平均，時間越長</li>
</ul>

<h2>Idle Time 的設定</h2>

<p>Idle Time 無法直接設定，而是透過 <strong>SCANPERIOD 暫存器</strong>間接控制：</p>

<pre>Idle Time = SCANPERIOD − 實際量測時間</pre>

<p>SCANPERIOD 可設定範圍：約 2 ms 到 4 s（共 16 個 step，以 2 的倍數遞增）。</p>

<ul>
  <li>想要更長的 Idle Time（省電）→ 把 SCANPERIOD 設大</li>
  <li>如果量測時間超過 SCANPERIOD → 晶片直接連續掃描，沒有 Idle</li>
</ul>

<h2>RESOLUTION 越高，功耗越大</h2>

<p>RESOLUTION 越高，每個 Phase 需要的採樣次數越多，sensing duration 越長，整個 Scan Period 中量測佔的比例越高，Idle 越少，功耗越大。這個關係是直覺的。</p>

<h2>FREQ 越高，功耗不一定越大</h2>

<div class="callout-warning">
  <strong>⚠️ 反直覺：</strong>FREQ 越高，每次充放電週期更短，單個 Phase 的 sensing duration 反而縮短。
</div>

<table>
  <thead><tr><th>情境</th><th>說明</th></tr></thead>
  <tbody>
    <tr><td><strong>SCANPERIOD 固定不變</strong></td><td>Sensing 時間縮短 → Idle 時間變長 → 整體功耗降低</td></tr>
    <tr><td><strong>SCANPERIOD 也跟著縮短</strong></td><td>掃描更頻繁 → Idle 時間不變或更短 → 整體功耗上升</td></tr>
  </tbody>
</table>

<h2>FREQ 與 RESOLUTION 的 Trade-off</h2>

<p>提高 FREQ 的代價是<strong>抗雜訊能力下降</strong>（因為每次採樣時間短，對干擾更敏感），所以通常需要搭配提高 RESOLUTION 來補償，而 RESOLUTION 越高又會讓 sensing 時間拉長，兩者之間需要平衡。</p>

<div class="callout-tip">
  <strong>✅ 設計建議：</strong>在 SCANPERIOD 固定的前提下，提高 FREQ 反而可以降低功耗，因為 sensing 佔整個 scan period 的比例下降，idle 時間更長。但需要同步評估 RESOLUTION 是否足夠。
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
