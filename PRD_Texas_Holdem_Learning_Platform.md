# 德州撲克專業錦標賽學習平台 (Poker Pro Tournament Academy)
## 產品需求文檔 (PRD - Product Requirements Document)

---

## 1. 文檔概覽與專案背景

### 1.1 專案背景
德州撲克（Texas Hold'em）特別是錦標賽（MTT - Multi-Table Tournament）是一項結合了**博弈論（GTO）**、**機率統計**、**籌碼量深淺動態**、**ICM（獨立籌碼模型）獨立決策**以及**現場/線上心理抗壓**的智力競技運動。
目前市場上的學習資源分散（英文為主的培訓網站、複雜的 Solver 軟體、厚重的理論書籍、零散的手牌覆盤影片），缺乏一套**「以通往線下/線上專業錦標賽（如 WSOP, WPT, APT, APPT）為目標導向」**的體系化、互動式實戰培訓平台。

### 1.2 產品願景與定位
- **定位**：一站式德州撲克錦標賽專業訓練系統（從新手到具備賽事奪冠競爭力的 Pro）。
- **核心價值**：
  1. **體系化知識庫**：整合全球頂尖理論，轉化為漸進式學習路徑。
  2. **互動式決策訓練器 (Drills)**：不只是看影片，而是做百萬手特定場景的高頻即時決策練習。
  3. **實戰工具箱**：提供賽前範圍表、ICM 計算、盲注動態計算與資金紀錄。
  4. **賽事作戰指南**：涵蓋線上 MTT 與線下 Live 賽事實戰禮儀、身體管理、心理建設與賽程攻略。

---

## 2. 全球頂級德州撲克學習資源盤點與整合規劃

本平台將吸納並整合以下國際與華語圈頂尖體系的精華架構：

| 資源分類 | 代表來源 / 工具 | 核心收錄與轉化要點 |
| :--- | :--- | :--- |
| **經典理論書籍** | 《Harrington on Hold'em》<br>《The Theory of Poker》(David Sklansky)<br>《Modern Poker Theory》(Michael Acevedo)<br>《Play Optimal Poker》(Andrew Brokos)<br>《The Mental Game of Poker》(Jared Tendler) | - 撲克基礎數學與底池賠率<br>- 現代 GTO 翻前與翻後理論基礎<br>- 錦標賽不同階段（早期、泡沫期、FT決賽桌）策略<br>- 情緒管理與抗波動心理系統 |
| **頂尖線上培訓網站** | Raise Your Edge (Bencb - MTT 權威)<br>Upswing Poker (Doug Polk, Nick Petrangelo)<br>Run It Once (Phil Galfond)<br>PokerCoaching (Jonathan Little) | - 籌碼深度策略 (15bb/25bb/40bb/100bb+)<br>- PKO (獵頭/賞金賽) 數學與調整<br>- 剝削策略 (Exploitative Play) 與池底對抗 |
| **Solver 算力與分析工具** | GTO Wizard / PioSolver<br>ICMIZER 3 / HRC (Holdem Resources Calculator)<br>Equilab / Flopzilla Pro | - 翻前 GTO 矩陣與頻率<br>- Push/Fold 殘局與短籌碼偷盲/跟注臨界值<br>- 翻後 C-bet 尺度與下注頻率分布 |
| **賽事實戰與選手社群** | WSOP / WPT / APT 賽事官方轉播手牌<br>國際頂尖牌手 (如 Linus, Fedor Holz, Addamo) 深度覆盤 | - 實戰手牌解析 (Hand Breakdown)<br>- 現場 Read 與 Tell 辨識技巧 |

---

## 3. 目標用戶畫像 (Target Personas)

1. **進階新手 (The Ambitious Beginner)**：
   - 特徵：懂基本規則與牌型，但缺乏翻前範圍概念，常憑感覺下注或盲目跟注。
   - 訴求：建立穩固的基礎數學觀念、標準起手牌範圍，避免常見燒錢錯誤。
2. **常規轉賽事玩家 (Cash-to-MTT / Intermediate)**：
   - 特徵：打過線上或朋友局 Cash，但對錦標賽的盲注結構、短籌碼推折、ICM 壓力極度不熟悉。
   - 訴求：精通 10~30bb 短籌碼殘局、泡沫期施壓與防守、ICM 模型換算。
3. **職業志向/線下賽事巡迴選手 (Semi-Pro / Tournament Grinder)**：
   - 特徵：目標前往 APT、WPT、WSOP 等國際大賽參賽，尋求決策邊際優勢（Edge）。
   - 訴求：GTO 與剝削策略平衡、決賽桌（FT）高額跳獎策略、長達數天的體力與心態控管。

---

## 4. 平台功能模組架構 (Feature Modules)

```mermaid
graph TD
    Platform[德州撲克專業錦標賽學習平台]
    
    Platform --> M1[模組一: 階梯式課程體系 Syllabus]
    Platform --> M2[模組二: 互動決策訓練器 Drills]
    Platform --> M3[模組三: 錦標賽實用工具箱 Toolbox]
    Platform --> M4[模組四: 賽事實戰與覆盤系統 Replay & Review]
    Platform --> M5[模組五: 心理建設與賽事錦囊 Mental & Live Guide]

    M1 --> M1_1[Level 1: 錦標賽數學與基礎]
    M1 --> M1_2[Level 2: 籌碼深度與翻前範圍]
    M1 --> M1_3[Level 3: 翻後 GTO 與剝削決策]
    M1 --> M1_4[Level 4: 錦標賽核心動力 (ICM/PKO/FT)]
    M1 --> M1_5[Level 5: 實戰現場 (Live Tells & 賽事節奏)]

    M2 --> M2_1[Push/Fold 殘局快打訓練]
    M2 --> M2_2[翻前範圍閃卡 (RFI / 3-Bet / Flat)]
    M2 --> M2_3[翻後 C-Bet & 防守情境測驗]
    M2 --> M2_4[ICM 決賽桌關鍵決策模擬]

    M3 --> M3_1[動態 Preflop Range Viewer]
    M3 --> M3_2[即時底池賠率 & 隱含賠率計算器]
    M3 --> M3_3[ICM / EV 試算器]
    M3 --> M3_4[賽事資金 (BRM) & ROI 追蹤器]
    M3 --> M3_5[錦標賽計時器與盲注結構模擬器]

    M4 --> M4_1[經典經典手牌互動拆解 (WSOP/APT 案例)]
    M4 --> M4_2[個人手牌紀錄與 GTO 偏差分析]

    M5 --> M5_1[情緒抗波動 (Tilt Management) 訓練]
    M5 --> M5_2[現場賽事 SOP (作息/飲食/籌碼管理)]
```

---

## 5. 詳細功能需求說明 (Detailed Functional Specs)

### 5.1 模組一：階梯式錦標賽課程體系 (Curriculum)
- **Level 1: 撲克數學與錦標賽基石**
  - 出路計算 (Outs) 與 2/4 法則、底池賠率 (Pot Odds) 與跟注期望值 (EV)。
  - 錦標賽生命線 (M-Ratio, Effective Stack, BB 計算法)。
- **Level 2: 翻前範圍與籌碼深度矩陣 (Preflop Mastery)**
  - 100bb+ 深籌碼：開池 (RFI)、面對 3-Bet 的防守/4-Bet 範圍。
  - 30~50bb 中籌碼：3-Bet Shove、Squeeze 與 Flat 調整。
  - 15~25bb 淺籌碼：3-Bet Jam、Resteal、Min-raise/Fold 精準界限。
  - 5~14bb 殘局：Nash 均衡 Push/Fold 表與常見漏洞。
- **Level 3: 翻後理論與動態作戰 (Postflop Strategy)**
  - 牌面結構分類 (Dry vs Wet, Monotone, Paired, High Card)。
  - 持續下注 (C-Bet) 頻率與尺度設計 (Small 25~33% / Medium 50~75% / Overbet 120%+)。
  - 轉牌與河牌決策樹：Triple Barrel、Bluff Catcher、Blocker（阻斷牌）理論。
- **Level 4: 錦標賽靈魂——ICM 與特殊賽制 (ICM & Tournament Dynamics)**
  - 什麼是 ICM？籌碼與現金價值的非線性關係（Chip EV vs $EV）。
  - 錢圈泡沫期 (Bubble Play)：大籌碼施壓、中等籌碼生存策略。
  - 決賽桌 (Final Table) 階梯跳獎作戰手冊。
  - PKO / Mystery Bounty 獵頭賞金賽：數學折算 (Bounty Factor) 與激進調整。
- **Level 5: 線下賽事實戰 (Live Tournament Masterclass)**
  - 線下實體賽事流程與規範（TDA 規則、口頭宣告、籌碼疊法、下注動作合法性）。
  - 觀察與反觀察：物理 Tells、呼吸、視線、籌碼操作行為學。
  - 多日賽（Day 1/2/3）體能分配、賽間休息調整與時差/飲食準備。

---

### 5.2 模組二：高強度決策訓練器 (Interactive Training Drills)
1. **Push/Fold 殘局快打**：
   - 系統隨機生成位置、手牌、有效盲注（e.g., UTG+1 11BB A5s）、桌上對手分佈與獎金結構。
   - 用戶需在 5 秒內判斷 `Push`、`Fold` 或 `Call`。
   - 即時給出 EV 差異（e.g., Push: +0.42 BB, Fold: 0.00 BB），並給予評分。
2. **翻前範圍閃卡 (Flashcard Trainer)**：
   - 考驗玩家在不同位置（UTG, HJ, CO, BTN, SB, BB）面對 Open / 3-Bet / 4-Bet 的標準動作。
3. **情境題庫與 GTO 決策評分**：
   - 包含 Flop, Turn, River 的實戰模擬題。
   - 提交下注動作與尺度後，展示 GTO 頻率分佈（e.g., Check 65%, Bet 33% 30%, Bet 75% 5%）。

---

### 5.3 模組三：賽事实用工具箱 (Tournament Pro Toolbox)
1. **互動式起手牌矩陣查看器 (Preflop Matrix Viewer)**：
   - 支援 13x13 矩陣互動切換（Hero 位置、Villain 位置、籌碼量 BB、行動類型）。
   - 色彩分明標示 Raise/Fold/Call/All-in 比例。
2. **即時賠率與勝率計算器 (Odds & Equity Calculator)**：
   - 輸入手牌、牌面、底池大小、下注額，即時計算必要勝率 (Required Equity) 與 SPR (Stack-to-Pot Ratio)。
3. **錦標賽資金管理 (Bankroll Management) 與參賽記帳**：
   - 提供 ABI (Average Buy-In) 試算，建議安全資金準備量（線上建議 100~200 ABI，線下建議 50~100 ABI）。
   - 參賽記錄本：記錄比賽名稱、買入、名次、獎金、ROI 與 ITM% 統計圖表。
4. **錦標賽盲注計時器 (Tournament Blinds Clock)**：
   - 供線下模擬賽使用，支援自訂升盲時間、Ante 結構、Break 休息時間提醒。

---

### 5.4 模組四：賽事錦囊與線下實戰指南 (Live Tour Handbook)
- **全球主要賽事指南**：
  - WSOP (世界撲克大賽)、WPT (世界撲克巡迴賽)、APT (亞洲撲克巡迴賽)、APPT、國內外熱門盃賽簡介與特點分析。
- **心理抗波系統 (Mental Game System)**：
  - 辨識 7 種常見上頭 (Tilt)：Bad Beat Tilt、Injustice Tilt、Mistake Tilt 等應對策略。
  - A-Game / B-Game / C-Game 自我狀態檢核表。

---

## 6. 技術架構與技術選型建議 (Tech Stack & Architecture)

| 層級 | 推薦技術 | 說明 |
| :--- | :--- | :--- |
| **前端架構** | **Next.js / React (TypeScript) + Vanilla CSS / Modern UI** | 快速響應、高互動性、支援現代深色電競風介面與平滑動畫。 |
| **圖表與視覺化** | **Canvas / SVG + Lucide Icons + D3.js / Chart.js** | 用於渲染 13x13 牌手矩陣、EV 曲線、勝率分佈圖與戰績報表。 |
| **演算法與計算引擎** | **撲克獨立核心邏輯庫 (TypeScript / WebAssembly)** | 包含撲克牌型比大小算法、手牌組合生成、勝率蒙特卡羅模擬與 Nash 均衡簡化查表。 |
| **資料儲存 (本機/雲端)** | **LocalStorage / IndexedDB (單機版) -> Supabase / PostgreSQL (聯網版)** | 支援無聯網本機離線刷題與個人進度永久保存。 |

---

## 7. 產品視覺風格與設計規範 (Design & UX Specification)

1. **視覺風格**：
   - **主題**：現代高級黑金/深海藍風格 (Dark Mode with Emerald / Gold / Cyber Blue accents)。
   - **撲克撲克牌 UI**：清晰四色牌（黑桃♠黑、紅心♥紅、方塊♦藍、梅花♣綠），大幅降低多桌與快打練習時的視覺辨識負擔。
2. **互動體驗**：
   - 鍵盤快捷鍵支援（如 1=Fold, 2=Call/Check, 3=Raise, Space=Next Hand），實現極致流暢的練習速度。
   - 動態籌碼音效與翻牌動畫（可切換靜音/沉浸模式）。

---

## 8. 開發路線圖 (Product Roadmap)

- **Phase 1 (MVP 第一階段 - 核心學習與基礎工具)**：
  - 完整全階段教學文章與結構化課綱系統。
  - 13x13 翻前動態範圍查看器 (Preflop Range Matrix)。
  - 核心計算工具：底池賠率/SPR 計算機、Push/Fold 殘局速查。
  - 參賽資金記帳與 ROI 追蹤工具。
- **Phase 2 (第二階段 - 互動式訓練器強化)**：
  - Push/Fold 殘局計時測驗訓練器。
  - 翻前範圍閃卡練習模式與即時評分系統。
  - 錦標賽盲注計時器 (Live Clock)。
- **Phase 3 (第三階段 - 進階 GTO 情境題與賽事實戰)**：
  - 翻後典型牌面（Flop/Turn/River）C-Bet 與防守互動情境題庫。
  - 國際知名賽事實戰經典牌局覆盤專題。
  - 離線 PWA 支援，方便選手在線下賽場隨時利用手機/平板查閱。

---

## 9. 驗收標準 (Acceptance Criteria)

1. **準確性**：所有起手牌範圍、底池賠率、EV 公式、Nash 均衡數據均經專業理論與數學校驗。
2. **易用性**：介面直觀，從首頁可在 3 步之內進入任何專項訓練或工具。
3. **效能**：13x13 矩陣點選與切換無延遲（<50ms），計算器即時輸出結果。
4. **實用性**：使用者透過本平台學習與刷題後，能清晰理解錦標賽各階段策略，並在實體或線上比賽中做出具有正期望值 (+EV) 的決策。
