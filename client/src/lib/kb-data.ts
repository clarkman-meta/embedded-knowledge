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
