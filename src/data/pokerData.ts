// Texas Hold'em Academy Data Structures & Curriculum

export interface Card {
  rank: string; // 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'
  suit: 's' | 'h' | 'd' | 'c'; // spades, hearts, diamonds, clubs
}

export interface RangeActionDetail {
  action: 'raise' | 'raise-allin' | 'call' | 'fold' | 'mixed';
  frequency: number; // 0 to 100%
  description?: string;
}

export type Position = 'UTG' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';
export type StackDepth = '100bb' | '40bb' | '20bb' | '12bb' | '8bb';
export type ScenarioType = 'RFI' | 'vs3Bet' | 'PushFold';

// Ranks array in descending order
export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const;

// Helper to generate standard 13x13 grid labels (e.g. AKs, AKo, AA)
export function getHandLabel(row: number, col: number): string {
  const rank1 = RANKS[row];
  const rank2 = RANKS[col];
  if (row === col) {
    return `${rank1}${rank2}`;
  } else if (row < col) {
    // Upper right: Suited
    return `${rank1}${rank2}s`;
  } else {
    // Lower left: Offsuit
    return `${rank2}${rank1}o`;
  }
}

// 1. Comprehensive Curriculum
export interface CourseChapter {
  id: string;
  level: number;
  levelTitle: string;
  title: string;
  readTime: string;
  category: 'Basics' | 'Math' | 'Preflop' | 'Postflop' | 'ICM' | 'Live & Mental';
  summary: string;
  keyTakeaways: string[];
  content: string;
}

export const COURSE_CHAPTERS: CourseChapter[] = [
  {
    id: 'lvl0-rules-hands',
    level: 0,
    levelTitle: '新手入門：規則流程與牌型大小',
    title: '0.1 德州撲克核心玩法、四輪發牌流程與 10 大牌型階梯',
    readTime: '7 分鐘',
    category: 'Basics',
    summary: '德州撲克（Texas Hold\'em）是全世界最受歡迎的智力競技。本篇專為零基礎打造，帶你迅速掌握核心目標、四條發牌街與 10 種牌型大小順序。',
    keyTakeaways: [
      '核心目標：每位玩家拿到 2 張私人底牌，與桌上 5 張公共牌，組合成最強的 5 張牌組合',
      '四輪流程 (Streets)：翻牌前 (Preflop) → 翻牌 (Flop) → 轉牌 (Turn) → 河牌 (River) → 攤牌 (Showdown)',
      '10 大牌型順序：皇家同花順 > 同花順 > 四條 > 葫蘆 > 同花 > 順子 > 三條 > 兩對 > 單對 > 高牌',
      '六大基本行動：棄牌 (Fold)、過牌 (Check)、跟注 (Call)、下注 (Bet)、加注 (Raise)、全下 (All-in)'
    ],
    content: `
### 一、德州撲克的最核心目標（用 7 張選 5 張）
德州撲克不是看誰手上的 2 張底牌大，而是看**「你的 2 張底牌」加上「桌上的 5 張公共牌」**，一共 7 張牌中挑選出**「最強的 5 張組合」**！
- 你的 5 張組合可以使用 2 張底牌 + 3 張公共牌。
- 也可以使用 1 張底牌 + 4 張公共牌。
- 甚至可以 0 張底牌，直接使用桌上的 5 張公共牌（稱為「用公共牌 Play the Board」）。

### 二、10 大牌型大小階梯（從最強到最弱）
1. **皇家同花順 (Royal Flush)**：同花色的 A-K-Q-J-10。撲克中最強神牌，無可匹敵！
2. **同花順 (Straight Flush)**：任何 5 張點數連續且同花色的牌（如 ♠9-♠8-♠7-♠6-♠5）。
3. **四條 / 鐵支 (Four of a Kind / Quads)**：4 張相同點數的牌（如 8-8-8-8-K）。
4. **葫蘆 / 三帶二 (Full House / Boat)**：3 張相同點數 + 2 張相同點數（如 K-K-K-7-7）。
5. **同花 (Flush)**：任意 5 張相同花色但點數不相連的牌（如 ♥A-♥J-♥8-♥5-♥2）。雙方皆同花時比最大單張。
6. **順子 (Straight)**：5 張點數相連但花色不同的牌（如 8-7-6-5-4）。*特別注意：A 既可當最大（A-K-Q-J-10），也可當最小（5-4-3-2-A 輪子）。*
7. **三條 (Three of a Kind / Set / Trips)**：3 張相同點數的牌（如 Q-Q-Q-9-4）。
8. **兩對 (Two Pair)**：兩個不同點數的對子（如 J-J-5-5-A）。
9. **一對 / 單對 (One Pair)**：2 張相同點數的牌（如 A-A-K-9-3）。
10. **高牌 (High Card / 烏龍)**：無任何對子或連張花色，純比最大單張（如 A-K-J-8-4 稱為 A 高牌）。

### 三、標準發牌四輪流程 (Four Streets)
一局標準的德州撲克分為四個下注輪次：
1. **翻前 (Preflop)**：荷官向每位玩家發發 2 張面朝下的私人底牌。玩家根據起手牌質量決定是否下注。
2. **翻牌圈 (Flop)**：荷官銷一張牌後，在桌面中央翻開 **3 張公共牌**，展開第一輪翻後下注。
3. **轉牌圈 (Turn)**：翻開第 **4 張公共牌**，進行第二輪翻後下注。
4. **河牌圈 (River)**：翻開第 **5 張（最後一張）公共牌**，進行最終輪下注。
5. **攤牌 (Showdown)**：如果河牌下注後仍有兩位以上玩家未棄牌，大家亮牌比大小，最大牌型者贏得底池 (Pot) 內所有籌碼！

### 四、牌桌六大基本行動術語
- **棄牌 (Fold)**：把手牌扔回荷官，放棄這手牌的爭奪與已投入的籌碼（無需花費額外代價）。
- **過牌 (Check)**：若當前輪次前人未下注，你可選擇不投籌碼直接「敲桌過牌」，將行動權交給下一位。
- **跟注 (Call)**：投入與上一位玩家下注額相同的籌碼以留在局中。
- **下注 (Bet)**：在當前街還無人下注時，第一個主動投入籌碼建立底池。
- **加注 (Raise)**：在前一位玩家下注後，投入更多籌碼提高下注金額，給其他人施加壓力。
- **全下 (All-in / Shove)**：將面前所有的籌碼一次性全部推入底池！
    `
  },
  {
    id: 'lvl0-positions-table',
    level: 0,
    levelTitle: '新手入門：規則流程與牌型大小',
    title: '0.2 牌桌位置分佈 (Position)、盲注機制與「位置即權力」',
    readTime: '9 分鐘',
    category: 'Basics',
    summary: '德州撲克有一句名言：「位置甚至比手牌更重要 (Position is King)」。了解按鈕位、盲注與各個位置的優劣勢。',
    keyTakeaways: [
      '盲注 (Blinds)：莊家左側兩位必須強制投入小盲 (SB) 與大盲 (BB) 以提供底池初始死錢',
      '槍口位 (UTG)：翻前第一個行動，身後所有人都能看著你打，是最劣勢、最危險的位置',
      '按鈕位 (BTN / 莊位)：全桌最強位置！翻後永遠最後一個行動，具備最高資訊紅利',
      '位置優勢 (In Position, IP)：最後行動者可以先看對手是否過牌或下注，再做最優決策'
    ],
    content: `
### 一、為什麼要設置莊家 (Button) 與盲注 (Blinds)？
撲克是輪流坐莊的遊戲。桌面上有一個圓形按鈕標記 **莊位 (Dealer Button, 簡稱 BTN)**，每打完一手牌就順時針移動給下一位。
- **小盲位 (Small Blind, SB)**：莊家左邊第一位，每手牌開始前強制投入 **0.5 個大盲 (0.5 BB)**。
- **大盲位 (Big Blind, BB)**：小盲左邊第一位，每手牌開始前強制投入 **1 個大盲 (1.0 BB)**。
- **盲注的目的**：防止所有人都只等最強牌 AA 才玩。有了盲注，桌上每一把都有籌碼可搶，激勵戰鬥！

### 二、牌桌 6 大核心位置解析（依行動順序）
1. **UTG (Under the Gun, 槍口位 / 前位 EP)**：
   - 翻牌前第一個發話！就像被槍頂著頭一樣危險，身後所有人都能制裁你。
   - **新手原則**：只玩頂級手牌（AA, KK, QQ, AK 等），垃圾牌絕對秒棄。
2. **HJ (Hijack, 劫持位 / 中位 MP)**：
   - 中間位置，身後還有 3 位玩家。可適度增加一些強同花高張。
3. **CO (Cutoff, 關煞位 / 後位 LP)**：
   - 莊家右手邊，已經是非常強大的位置，偷盲與加注成功率大幅提升。
4. **BTN (Button, 按鈕位 / 莊位)**：
   - **全桌最尊貴、最強大的 VIP 寶座**！
   - 翻前雖然倒數第三個行動，但翻後每一條街（翻牌、轉牌、河牌）你都是**最後一個行動**！
   - 你能看清所有對手的舉動後再決定下注、詐唬或過牌。
5. **SB (Small Blind, 小盲位)**：
   - 翻前倒數第二個行動，但翻後永遠是**第一個先行動**（沒有位置 Out of Position, OOP），極容易被後位玩家剝削。
6. **BB (Big Blind, 大盲位)**：
   - 翻前最後一個行動，因為已經投入了 1BB，面對小額加注時擁有最好的「底池賠率」進行防守跟注。

### 三、新手白話圖解：為什麼後位 (In Position) 優勢巨大？
想像你在玩一個「猜拳」遊戲：
- **前位玩家 (OOP)**：必須先出拳（或先表態）。
- **後位玩家 (IP)**：先看對手出什麼拳、表情是什麼、下注籌碼輕不輕，再決定自己要出什麼！
這就是為什麼撲克 Pro 總是說：**在 BTN 拿普通牌往往比在 UTG 拿好牌還賺錢**。
    `
  },
  {
    id: 'lvl0-poker-dictionary',
    level: 0,
    levelTitle: '新手入門：規則流程與牌型大小',
    title: '0.3 德州撲克 Pro 必備專有名詞與黑話全解大字典 (Glossary)',
    readTime: '11 分鐘',
    category: 'Basics',
    summary: '聽懂德州撲克比賽解說與高手覆盤的關鍵！收錄 EV、GTO、SPR、ICM、C-Bet 等所有核心術語的通俗白話解釋。',
    keyTakeaways: [
      'EV (期望值)：衡量一個決策長期是賺是賠的黃金指標，撲克只追求 +EV 決策',
      'GTO (博弈論最優解)：數學上無法被對手針對與剝削的完美平衡策略',
      'Suited (s) vs Offsuit (o)：同花手牌 vs 雜色手牌的簡寫代號',
      'Outs (出路數)：牌堆裡能幫你翻盤升級成超強牌的張數'
    ],
    content: `
### 一、數學與決策核心術語
- **EV (Expected Value, 期望值)**：
  - **白話解釋**：如果同樣的情境打一萬次，這個動作平均能幫你賺錢還是賠錢？
  - **+EV** = 長期賺錢的明智決策（就算這把運氣差輸了，長期也是贏家）。
  - **-EV** = 長期賠錢的盲目決策（就算這把僥倖贏了，長期必定輸光）。
- **GTO (Game Theory Optimal, 博弈論最優解)**：
  - **白話解釋**：透過電腦超級算力求解出的「數學最完美打法」。不管對手怎麼變換打法，對手都不可能從你的策略中佔到便宜。
- **Equity (勝率 / 底牌權益)**：
  - 當前你的手牌在最終攤牌時贏得底池的理論百分比機率（例如你有 60% 勝率 = 60% Equity）。
- **Outs (出路數 / 補牌)**：
  - 牌堆中還沒發出的牌裡，有哪幾張翻出來能讓你瞬間湊成大牌？（例如同花聽牌通常有 9 張 Outs）。

### 二、起手牌代號與牌力術語
- **AKs (Suited, 同花手牌)**：兩張手牌**同花色**（如 ♠A-♠K），標註為小寫 **s**。同花牌具備極高翻出同花與聽牌的潛力。
- **AKo (Offsuit, 雜色手牌)**：兩張手牌**不同花色**（如 ♠A-♥K），標註為小寫 **o**。
- **Pocket Pair (口袋對子)**：起手底牌就是一對（如 AA, KK, 77, 22）。
- **Connectors (連張)**：點數相連的手牌（如 98s, JTs），容易擊中順子與後門聽牌。
- **Kicker (踢腳牌)**：雙方組成相同大牌時用來比大小的第二大單張（例如你拿 A-K，對手拿 A-Q，翻牌開 A-7-2，雙方都是一對 A，但你的 K 踢腳大於 Q，由你獲勝）。
- **Nuts (堅果 / 果仁)**：當前公共牌面上「理論上最強、不可能被任何牌擊敗」的絕對第一神牌。

### 三、下注動作與戰術黑話
- **RFI (Raise First In, 翻前率先開池)**：前面所有人都棄牌，輪到你時你是全場第一個主動加注進池。
- **Limp (平跟 / 跛入)**：翻前不加注，只付 1 個大盲平跟進池。*新手大忌！高手通常不 Limp，因為無法主動爭取棄牌率。*
- **3-Bet (三注 / 再加注)**：有人先加注 (2-Bet)，你再進行一次更大的反加注。
- **C-Bet (Continuation Bet, 持續下注)**：你在翻牌前是加注進攻方，翻牌開出後你不管有沒有中牌，繼續開火下注。
- **Check-Raise (過牌加注 / 埋伏)**：輪到你時你先過牌示弱，等對手下注後，你再狠狠反加注。
- **Push / Fold (全下或棄牌)**：短籌碼（通常少於 12BB）殘局時的極簡戰術，要麼直接 All-in 全下，要麼直接棄牌，不留模糊跟注空間。

### 四、錦標賽與籌碼專用術語
- **BB (Big Blind, 大盲倍數)**：用來衡量你擁有多深籌碼的計量單位（例如大盲是 1000，你有 40,000 籌碼，代表你的籌碼深度為 40BB）。
- **Ante (前注)**：每把發牌前所有人（或大盲注）強制繳納的一筆額外底池籌碼。
- **SPR (Stack-to-Pot Ratio, 籌碼底池比)**：有效籌碼 ÷ 翻牌前底池。SPR 越小代表越容易打完全部籌碼。
- **ICM (Independent Chip Model, 獨立籌碼模型)**：錦標賽中將「籌碼顆數」換算成「真實獎金價值 ($EV)」的數學模型。
- **ITM (In The Money, 進錢圈)**：錦標賽淘汰到只剩特定人數（如前 15% 玩家），確保能領到獎金的及格線。
- **Bubble (泡沫期)**：進錢圈前的最後 1~2 個人淘汰階段，此時出局一分錢都沒有，心理壓力最大。
- **Tilt (上頭 / 失去理智)**：因遭受倒楣逆轉或失誤，情緒失控開始胡亂下注送籌碼的心理失衡狀態。
    `
  },
  {
    id: 'lvl1-pot-odds',
    level: 1,
    levelTitle: '錦標賽基石與數學引擎',
    title: '1.1 底池賠率 (Pot Odds)、必要勝率與 2/4 法則',
    readTime: '8 分鐘',
    category: 'Math',
    summary: '建立一切錦標賽決策的數學基石。掌握即時勝率計算與是否該跟注的期望值底線。',
    keyTakeaways: [
      '底池賠率公式：必要勝率 = 跟注額 / (目前底池 + 對手下注額 + 你的跟注額)',
      '2/4 法則：翻牌後 (Flop) 出路數 × 4 ≈ 到河牌勝率；轉牌後 (Turn) 出路數 × 2 ≈ 河牌勝率',
      '隱含賠率 (Implied Odds)：當前賠率不足時，考量後續街可能贏得的額外籌碼。'
    ],
    content: `
### 一、為什麼德州撲克是數學博弈而非運氣賭博？
在長期的錦標賽競爭中，運氣會被大數法則撫平，決定勝負的是每一手決策的**期望值 (Expected Value, EV)**。

#### 💡 【新手白話比喻：買打折彩券】
想像一張彩券售價 500 元，開獎頭獎有 2,000 元，中獎機率高達 35%。
- 你花 500 元有 35% 機率拿回 2000 元（平均可拿 $2000 \\times 35\\% = 700$ 元）。
- 每次買你現賺 200 元期望值！**底池賠率就是幫你算這張彩券值不值得買的工具**。

### 二、底池賠率 (Pot Odds) 核心計算
當對手下注時，你面臨跟注的決定，底池賠率告訴你「需要多少勝率才能打平 (Break-even)」：
$$\\text{Required Equity} = \\frac{\\text{Call Amount}}{\\text{Current Pot} + \\text{Bet Amount} + \\text{Call Amount}}$$

#### 實戰範例：
- 底池已累積 **1,000** 籌碼。
- 對手在翻牌圈下注 **500**。
- 你需要跟注 **500** 才能看下一張牌。
- **計算**：$500 / (1000 + 500 + 500) = 500 / 2000 = 25\\%$
- **結論**：如果你的手牌獲勝機率 **> 25%**，跟注長期來看就是 **+EV**。

### 三、出路數 (Outs) 與 2/4 法則速算
- **同花聽牌 (Flush Draw)**：手上有 2 張同花，桌上有 2 張同花，牌堆剩 9 張同花牌可幫你湊成同花。
  - 出路數：9 張 $\\rightarrow 9 \\times 4 = 36\\%$ (翻牌到河牌) / $9 \\times 2 = 18\\%$ (轉牌到河牌)。
- **兩頭順子聽牌 (OESD)**：如手上 98，桌面 762，需要 5 或 10 湊順子（共 8 張出路）。
  - 出路數：8 張 $\\rightarrow 8 \\times 4 = 32\\%$ (翻牌到河牌) / $8 \\times 2 = 16\\%$ (轉牌到河牌)。
- **卡順 (Gutshot)**：手上 98，桌面 652，只缺 7 湊順子（共 4 張出路）。
  - 出路數：4 張 $\\rightarrow 4 \\times 4 = 16\\%$。
- **兩頭順 + 同花大聽牌 (Monster Draw)**：15 張出路 $\\rightarrow 15 \\times 4 = 60\\%$ (勝率甚至超越頂對！)。
    `
  },
  {
    id: 'lvl1-spr-mratio',
    level: 1,
    levelTitle: '錦標賽基石與數學引擎',
    title: '1.2 錦標賽生命線：SPR 與 M-Ratio 動態管理',
    readTime: '10 分鐘',
    category: 'Math',
    summary: '錦標賽與現金桌最大的差別在於「籌碼生命值不可再生」。學習如何根據 SPR 與 M-Ratio 調整策略。',
    keyTakeaways: [
      'SPR (Stack-to-Pot Ratio) = 有效籌碼量 / 翻牌前底池大小',
      'SPR < 3：容易套池 (Committed)，頂對或超強聽牌通常願意打光籌碼',
      'SPR > 13：深籌碼環境，需要大牌型（暗三條、同花順）才能支撐打完全部籌碼',
      'M-Ratio (Dan Harrington 定理)：衡量你在不打任何一手牌的情況下能撐幾個軌道'
    ],
    content: `
### 一、SPR (籌碼底池比) 與翻後承諾
SPR 是決定翻後計畫的核心指標：
- **低 SPR (1 ~ 3)**：超強頂對、高踢腳、兩對可以直接打光 (Shove)，不用過度擔心被反超。
- **中 SPR (4 ~ 7)**：危險區間！單對牌型極容易在此區間輸掉大量籌碼，需要精確控池 (Pot Control)。
- **高 SPR (8+)**：隱含賠率高，小口袋對 (Set-mining)、同花連張 (Suited Connectors) 價值極大。

#### 💡 【新手白話比喻：汽車煞車距離】
- **低 SPR** 就像開慢車（剩餘籌碼很少，底池很大），隨便一踩就到底，既然停不下來就放膽跟對手推完全部籌碼！
- **高 SPR** 就像在高速公路奔馳（手頭有上百個大盲），如果不小心追撞可能直接出局，因此單對牌型要隨時踩煞車控池。

### 二、Harrington 錦標賽 M-Ratio 分區理論
$$M = \\frac{\\text{Your Stack}}{\\text{Small Blind} + \\text{Big Blind} + \\text{Total Antes}}$$

1. **綠色區域 (M > 20, 約 40bb+)**：籌碼充裕，可採用全方位 GTO 與深籌碼剝削，打翻後技術。
2. **黃色區域 (10 < M < 20, 約 20-35bb)**：喪失小牌投機空間，重點轉為 3-Bet Shove、偷盲與壓迫 (Squeeze)。
3. **橙色區域 (5 < M < 10, 約 10-18bb)**：只能打 Push/Fold 或 Min-Raise/Fold，絕不能平跟 (Limp/Flat)。
4. **紅色區域 (M < 5, < 10bb)**：瀕死狀態，尋找任何 +EV 的 Push 機會全下！
    `
  },
  {
    id: 'lvl2-preflop-ranges',
    level: 2,
    levelTitle: '翻前範圍矩陣與籌碼深度',
    title: '2.1 翻前 RFI (Raise First In) 開池範圍解析',
    readTime: '12 分鐘',
    category: 'Preflop',
    summary: '不同位置的翻前標準開池範圍，從 UTG (14%) 到 BTN (45%) 的漸進式範圍邏輯。',
    keyTakeaways: [
      '位置是德州撲克最大的優勢：後位可以玩更寬 (Looser) 的範圍',
      'UTG (槍口位) 開池約 13~15%，主要由高對子、大高張 (AQ+, KQs) 組成',
      'BTN (按鈕位) 開池可達 42~50%，包含各類同花 AX、同花連張與投機牌',
      '尺寸標準化：深籌碼開 2.2~2.5bb，短籌碼 (20bb以下) 一律開 2.0~2.1bb'
    ],
    content: `
### 一、為什麼要嚴格遵守翻前範圍？
翻前的每一個鬆散決策（如在 UTG 玩 KJo、Q8s），都會在翻後為你帶來巨大的負 EV 災難。

#### 💡 【新手常見大漏洞 (Leaks)】
- **錯誤 1：每一把都想看翻牌**（入池率 VPIP 高達 50%+）：這是在給全桌送籌碼。職業選手在 9 人桌通常棄掉 75%~80% 的起手牌！
- **錯誤 2：用爛牌平跟 (Limp)**：平跟只會招來後位玩家的大額加注，讓自己陷入被動。

### 二、各位置 GTO 開池比例速查
1. **UTG / UTG+1 (早期位置 EP)**：約 **14% - 16%**
   - 包含：22+ (部分小對混合), ATs+, KTs+, QTs+, JTs, AJo+, KQo
2. **HJ / LJ (中位 MP)**：約 **20% - 24%**
   - 增加：A8s+, K9s+, Q9s, J9s, T9s, 98s, ATo, KJo
3. **CO (Cutoff 關煞位)**：約 **28% - 32%**
   - 增加：A2s+, K5s+, 各類一隔同花連張 (J8s, 86s)
4. **BTN (Button 莊位)**：約 **45% - 52%**
   - 最寬位置！對盲注兩位玩家進行高強度偷盲施壓。
5. **SB (Small Blind 小盲位)**：
   - 面對 Fold to you：通常採用 Raise 3bb 或 混合 Limp 策略（約 35~45%）。
    `
  },
  {
    id: 'lvl3-postflop-cbet',
    level: 3,
    levelTitle: '翻後 GTO 與動態剝削決策',
    title: '3.1 持續下注 (C-Bet) 頻率、尺度與牌面乾濕度',
    readTime: '15 分鐘',
    category: 'Postflop',
    summary: '如何根據牌面結構 (Dry vs Wet)、範圍優勢 (Range Advantage) 與果仁優勢 (Nut Advantage) 制定精確 C-bet 策略。',
    keyTakeaways: [
      '乾燥高張牌面 (如 A-7-2r, K-8-3r)：攻擊方具備巨大範圍優勢，適合高頻率小尺度 (25~33% Pot) C-bet',
      '濕潤連張牌面 (如 9-8-7ss, J-T-9r)：防守方具備兩對/順子優勢，攻擊方需大量過牌 (Check) 控池',
      '單色牌面 (Monotone)：大幅降低下注頻率，下注尺度需增大以保護強手牌'
    ],
    content: `
### 一、持續下注 (C-Bet) 的三大依據
1. **範圍優勢 (Range Advantage)**：誰的整體範圍在這個牌面上更強？
2. **堅果優勢 (Nut Advantage)**：誰擁有更多兩對、暗三、順子等頂級牌力？
3. **位置優勢 (Position)**：翻後最後一個行動具有巨大資訊紅利。

#### 💡 【新手專有名詞小卡片：什麼是乾燥面 vs 濕潤面？】
- **乾燥牌面 (Dry Board, 如 A♠-8♦-2♣)**：牌與牌之間點數不連貫、花色完全不同，對手極難湊成順子或同花聽牌。此時翻前加注方可以直接用小注 (33% 底池) 帶走底池。
- **濕潤牌面 (Wet Board, 如 J♠-10♠-9♦)**：牌面點數緊密且有同花可能，對手很容易擊中順子、兩對或強聽牌。此時盲目下注很容易被對手加注擊潰。

### 二、標準下注尺度 (Bet Sizing) 指南
- **小尺度 (25% ~ 33% 底池)**：
  - 適用：乾燥面、高張面、有利於攻擊方範圍但不需要保護的情況。
  - 目的：極低成本逼迫對手放棄未中牌的垃圾牌。
- **中尺度 (50% ~ 66% 底池)**：
  - 適用：動態中等牌面、需要保護的頂對弱踢腳。
- **大尺度 (75% ~ 125% / Overbet)**：
  - 適用：極度兩極化 (Polarized) 範圍——你只有堅果或強純詐唬 (Bluff)。
    `
  },
  {
    id: 'lvl4-icm-bubble',
    level: 4,
    levelTitle: '錦標賽靈魂：ICM 與賽事動力學',
    title: '4.1 錢圈泡沫期 (Bubble) 施壓與決賽桌 (FT) 跳獎作戰',
    readTime: '18 分鐘',
    category: 'ICM',
    summary: 'ICM (獨立籌碼模型) 是錦標賽 Pro 與普通玩家最大的分水嶺。理解籌碼非線性價值，在泡沫期收割無數盲注。',
    keyTakeaways: [
      'Chip EV ≠ $EV：錦標賽中，你贏得的最後一顆籌碼價值遠低於你輸掉的最後一顆籌碼（輸掉就出局）',
      '風險溢價 (Risk Premium)：面對 All-in，你需要遠高於常規底池賠率的勝率才能跟注 (通常需 60%~70%+ 勝率)',
      '大籌碼在泡沫期與決賽桌擁有近乎無限的施壓權力，中籌碼彼此牽制受壓最深'
    ],
    content: `
### 一、什麼是 ICM (Independent Chip Model)？
在現金桌，1,000 籌碼始終等於 1,000 現金。
在錦標賽中，隨著玩家被淘汰與獎金階梯逼近，**籌碼的現金價值 (Real Money Value) 是非線性的**。
- **第一名的籌碼總量是 100%，但拿到的獎金可能只有總獎池的 20%**。
- 這意味著：**保住現有籌碼的價值 > 盲目追求贏得額外籌碼**。

#### 💡 【新手白話比喻：生存淘汰大逃殺】
在進錢圈的關鍵時刻（例如再淘汰 1 個人，剩下 20 個人每人都能拿到 3 萬元獎金）：
- 如果你身為中等籌碼，用 50% 的勝率跟大籌碼全下，贏了籌碼翻倍但獎金只稍微多一點點；輸了你直接第 21 名出局，**獎金 0 元**！
- 這就是為什麼在泡沫期「活著比賺籌碼更重要」。

### 二、泡沫期 (Bubble Play) 三種籌碼階層的作戰準則
1. **大籌碼 (Chipleader, 60bb+)**：
   - 瘋狂開池 (RFI 70%+)，狂推中籌碼。
   - 只要中籌碼敢跟注，他們出局就拿不到任何獎金，因此中籌碼只能棄掉 85% 以上的手牌。
2. **中等籌碼 (20~35bb)**：
   - 最危險的一群！切忌和大籌碼硬碰硬。
   - 嚴格避開 50/50 拋硬幣局 (Flip)，等待短籌碼出局以確保進圈。
3. **超短籌碼 (< 8bb)**：
   - 沒有 ICM 負擔，因為不推也是等死，尋找最優的 Nash Push 儘快翻倍。
    `
  },
  {
    id: 'lvl5-live-poker',
    level: 5,
    levelTitle: '現場大賽實戰與身心管理',
    title: '5.1 國際錦標賽 (WSOP/APT) 實戰規程、TDA 與 現場 Tells',
    readTime: '14 分鐘',
    category: 'Live & Mental',
    summary: '走向實體線下大賽必備：TDA 裁判規則、口頭承諾效力、實體 Tells 辨識與多日長跑身心調節。',
    keyTakeaways: [
      'TDA 核心原則：口頭宣告 (Verbal Declaration) 具備最高約束力，大於推籌碼動作',
      '單一籌碼規則 (One Chip Rule)：未宣告情況下丟入單枚大面額籌碼一律視為 Call（跟注），非 Raise',
      '現場 Tells：真強牌通常放鬆呼吸、動作從容；詐唬或弱牌常出現短暫屏息、僵硬或刻意瞪人',
      '多日賽體力調配：每 2 小時休息 15 分鐘，補充水分與低 GI 堅果，避免高糖導致腦霧'
    ],
    content: `
### 一、線下錦標賽必知 TDA (Tournament Directors Association) 規則
1. **下注動作必須一次性完成 (String Bet 違規)**：
   - 禁止先抓一把籌碼放進底池，又回頭抓第二把。必須一次性推入，或先口頭清晰宣告「Raise to 12,000」。
2. **保護你的手牌 (Protect Your Hand)**：
   - 請隨身攜帶 Hand Protector (壓牌石)。如果發牌員誤收你未壓住的手牌，裁判通常判手牌死亡 (Dead Hand)。
3. **Showdown 開牌順序**：
   - 河牌最後一個主動激進下注者必須先開牌；若河牌皆過牌，則從小盲/前位順時針開牌。

### 二、現場肢體心理學 (Physical Tells)
- **眼球與視線**：
  - 翻牌一開，選手立刻偷看自己剩餘籌碼堆 $\\rightarrow$ 通常是擊中強牌，正在盤算下注尺度。
  - 刻意盯著對手臉看 $\\rightarrow$ 通常是弱牌試圖展現威懾力（Weak means Strong, Strong means Weak 原則）。
- **呼吸頻率**：
  - 胸口起伏劇烈、頸部動脈明顯搏動 $\\rightarrow$ 腎上腺素飆升，常見於巨大詐唬或一手超級堅果。
    `
  }
];

// 2. Preflop Ranges Dataset for 13x13 Viewer
export interface PreflopRangeMap {
  [hand: string]: {
    action: 'raise' | 'raise-allin' | 'call' | 'fold' | 'mixed';
    frequency: number; // 0 to 100
    ev?: number;
  };
}

// Generate default mock range with high accuracy for specific positions
export function getPreflopRange(pos: Position, depth: StackDepth, scenario: ScenarioType): PreflopRangeMap {
  const result: PreflopRangeMap = {};

  // Standard strong hands in all ranges
  const premium = ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AKo'];
  const strong = ['TT', '99', '88', 'AQs', 'AJs', 'ATs', 'KQs', 'KJs', 'AQo'];
  const playable = ['77', '66', '55', '44', '33', '22', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'KTs', 'QJs', 'QTs', 'JTs', 'T9s', '98s', '87s', '76s', 'AJo', 'KQo', 'KJo', 'QJo'];
  const wide = ['K9s', 'K8s', 'K7s', 'Q9s', 'Q8s', 'J9s', 'J8s', 'T8s', '86s', '75s', '65s', '54s', 'ATo', 'KTo', 'QTo', 'JTo', 'A9o', 'A8o'];

  for (let r = 0; r < 13; r++) {
    for (let c = 0; c < 13; c++) {
      const hand = getHandLabel(r, c);

      if (scenario === 'PushFold' || depth === '12bb' || depth === '8bb') {
        // Short stack push/fold
        if (premium.includes(hand) || strong.includes(hand)) {
          result[hand] = { action: 'raise-allin', frequency: 100, ev: 1.85 };
        } else if (playable.includes(hand) && (pos === 'BTN' || pos === 'CO' || pos === 'SB')) {
          result[hand] = { action: 'raise-allin', frequency: 100, ev: 0.65 };
        } else if (wide.includes(hand) && (pos === 'BTN' || pos === 'SB')) {
          result[hand] = { action: 'raise-allin', frequency: 80, ev: 0.22 };
        } else {
          result[hand] = { action: 'fold', frequency: 100, ev: 0 };
        }
      } else if (scenario === 'vs3Bet') {
        if (premium.includes(hand)) {
          result[hand] = { action: 'raise', frequency: 100, ev: 3.4 };
        } else if (strong.includes(hand)) {
          result[hand] = { action: 'call', frequency: 85, ev: 0.8 };
        } else if (['A5s', 'A4s', 'KQs', 'QJs', 'JTs'].includes(hand)) {
          result[hand] = { action: 'mixed', frequency: 50, ev: 0.15 };
        } else {
          result[hand] = { action: 'fold', frequency: 100, ev: 0 };
        }
      } else {
        // RFI Standard
        if (premium.includes(hand)) {
          result[hand] = { action: 'raise', frequency: 100, ev: 2.5 };
        } else if (strong.includes(hand)) {
          result[hand] = { action: 'raise', frequency: 100, ev: 1.2 };
        } else if (playable.includes(hand)) {
          if (pos === 'UTG') {
            const utgOk = ['77', '66', 'A9s', 'A8s', 'A5s', 'A4s', 'KTs', 'QJs', 'JTs', 'T9s', 'AJo', 'KQo'];
            result[hand] = utgOk.includes(hand) ? { action: 'raise', frequency: 100, ev: 0.4 } : { action: 'fold', frequency: 100, ev: 0 };
          } else {
            result[hand] = { action: 'raise', frequency: 100, ev: 0.6 };
          }
        } else if (wide.includes(hand)) {
          if (pos === 'BTN' || pos === 'CO' || pos === 'SB') {
            result[hand] = { action: 'raise', frequency: 90, ev: 0.3 };
          } else {
            result[hand] = { action: 'fold', frequency: 100, ev: 0 };
          }
        } else {
          result[hand] = { action: 'fold', frequency: 100, ev: 0 };
        }
      }
    }
  }

  return result;
}

// 3. Push/Fold Trainer Quizzes
export interface PushFoldQuizItem {
  id: string;
  heroPosition: Position;
  stackBB: number;
  hand: [Card, Card];
  blinds: string;
  tableDesc: string;
  correctAction: 'Push' | 'Fold' | 'Call';
  pushEV: number; // in BB
  foldEV: number; // in BB
  explanation: string;
}

export const PUSH_FOLD_DRILLS: PushFoldQuizItem[] = [
  {
    id: 'drill-1',
    heroPosition: 'BTN',
    stackBB: 11,
    hand: [
      { rank: 'A', suit: 's' },
      { rank: '5', suit: 's' }
    ],
    blinds: '500 / 1000 (Ante 1000)',
    tableDesc: '前面玩家全部棄牌到按鈕位。小盲 (18BB) 與大盲 (25BB) 打法偏緊。',
    correctAction: 'Push',
    pushEV: 0.84,
    foldEV: 0.00,
    explanation: 'A5s 在 BTN 11BB 屬於極度暴利的 Standard Shove (+0.84 BB)。阻斷了盲注的 AA/AK，且具備極佳的同花與輪子順子勝率。'
  },
  {
    id: 'drill-2',
    heroPosition: 'UTG',
    stackBB: 9,
    hand: [
      { rank: 'K', suit: 'd' },
      { rank: '9', suit: 'c' }
    ],
    blinds: '1000 / 2000 (Ante 2000)',
    tableDesc: '9人桌槍口位，後面還有 8 位玩家尚未行動。',
    correctAction: 'Fold',
    pushEV: -0.65,
    foldEV: 0.00,
    explanation: '在 UTG 9 人桌推 K9o 是嚴重的 -EV 錯誤 (-0.65 BB)。身後 8 個人拿到比你強的牌（大對子、高張）機率超過 45%，被跟注時被嚴重壓制 (Dominated)。'
  },
  {
    id: 'drill-3',
    heroPosition: 'SB',
    stackBB: 8,
    hand: [
      { rank: 'Q', suit: 'h' },
      { rank: '7', suit: 'h' }
    ],
    blinds: '1500 / 3000 (Ante 3000)',
    tableDesc: '所有人棄牌到小盲位。大盲籌碼 30BB，只需面對一位對手。',
    correctAction: 'Push',
    pushEV: 0.48,
    foldEV: -0.50, // Losing half blind
    explanation: 'SB vs BB 殘局，Q7s 擁有超過 65% 的偷盲成功率，即使被跟注也有 38%+ 對抗常規跟注範圍的勝率。'
  },
  {
    id: 'drill-4',
    heroPosition: 'CO',
    stackBB: 13,
    hand: [
      { rank: '7', suit: 's' },
      { rank: '7', suit: 'c' }
    ],
    blinds: '2000 / 4000 (Ante 4000)',
    tableDesc: 'UTG, MP 棄牌，輪到你在 Cutoff。按鈕位籌碼 12BB，盲注各約 20BB。',
    correctAction: 'Push',
    pushEV: 1.15,
    foldEV: 0.00,
    explanation: '中等對子 77 在 13BB 籌碼深度下，直接 All-in 可以最大化棄牌率，同時在被跟注時面對 AK/AQ 等高張依然保有約 53% 的拋硬幣優勢。'
  },
  {
    id: 'drill-5',
    heroPosition: 'BB',
    stackBB: 10,
    hand: [
      { rank: 'K', suit: 's' },
      { rank: 'Q', suit: 'd' }
    ],
    blinds: '2500 / 5000 (Ante 5000)',
    tableDesc: '按鈕位 (有效 10BB) 直接 All-in，小盲棄牌，輪到你在大盲位決策。',
    correctAction: 'Call',
    pushEV: 0.92, // Here Call EV
    foldEV: -1.00,
    explanation: 'BTN 推入的範圍非常寬 (約 40%+)，KQo 在大盲位擁有超過 55% 的領先勝率，且底池已經有 Ante 與 SB，跟注極具正期望值。'
  }
];

// 4. Postflop GTO Scenarios
export interface PostflopScenario {
  id: string;
  title: string;
  stage: 'Flop' | 'Turn' | 'River';
  heroHand: [Card, Card];
  board: Card[];
  potSize: number;
  heroStack: number;
  villainAction: string;
  heroPosition: string;
  villainPosition: string;
  options: {
    label: string;
    action: string;
    isGTO: boolean;
    frequency: string;
    explanation: string;
  }[];
}

export const POSTFLOP_SCENARIOS: PostflopScenario[] = [
  {
    id: 'postflop-1',
    title: '乾燥 A 高張牌面之 C-Bet 策略',
    stage: 'Flop',
    heroHand: [
      { rank: 'K', suit: 's' },
      { rank: 'Q', suit: 's' }
    ],
    board: [
      { rank: 'A', suit: 'd' },
      { rank: '8', suit: 'c' },
      { rank: '3', suit: 'h' }
    ],
    potSize: 6500,
    heroStack: 45000,
    heroPosition: 'BTN (翻前 Open 2.5bb)',
    villainPosition: 'BB (翻前 Defend 跟注)',
    villainAction: 'BB 玩家在翻牌圈 Check (過牌) 到你。',
    options: [
      {
        label: 'C-Bet 下注 25%~33% 底池 (1,800~2,200)',
        action: 'Bet Small',
        isGTO: true,
        frequency: '85% GTO 頻率 (最優)',
        explanation: 'A-8-3r 是最典型的極致乾燥面，BTN 擁有壓倒性的範圍優勢。即使你沒中 A，小額 C-bet 也能迫使 BB 棄掉所有非對子非聽牌手牌。'
      },
      {
        label: '過牌 (Check Back) 控池',
        action: 'Check',
        isGTO: false,
        frequency: '15% GTO 頻率',
        explanation: '雖然可以實現後門轉牌免費看牌，但在此牌面放棄下注會給予 BB 免費看轉牌反超的機會。'
      },
      {
        label: '下注 80% 底池 (5,200)',
        action: 'Bet Large',
        isGTO: false,
        frequency: '0% GTO 頻率 (嚴重漏水)',
        explanation: '在乾燥面使用大尺度毫無必要，只會把對手比你弱的牌都打跑，留下來跟注你的全是比你強的 Ax 牌。'
      }
    ]
  },
  {
    id: 'postflop-2',
    title: '濕潤連張牌面防守方的 Check-Raise 應對',
    stage: 'Flop',
    heroHand: [
      { rank: 'T', suit: 's' },
      { rank: '9', suit: 's' }
    ],
    board: [
      { rank: '8', suit: 's' },
      { rank: '7', suit: 'd' },
      { rank: '2', suit: 'c' }
    ],
    potSize: 5500,
    heroStack: 32000,
    heroPosition: 'BB (防守方)',
    villainPosition: 'CO (翻前加注方)',
    villainAction: 'CO 翻前加注，你在 BB 防守。翻牌圈你過牌，CO 下注 33% 底池 (1,800)。',
    options: [
      {
        label: 'Check-Raise 加注到 6,000 (激進反擊)',
        action: 'Raise',
        isGTO: true,
        frequency: '75% GTO 頻率 (推薦)',
        explanation: 'T9s 擊中了頂級 OESD (兩頭順聽牌) + 後門花，BB 在此牌面擁有大量兩對與順子聽牌優勢，Check-Raise 能施加巨大棄牌壓力，即使被跟注也有 32%+ 勝率！'
      },
      {
        label: '跟注 (Call) 1,800',
        action: 'Call',
        isGTO: true,
        frequency: '25% GTO 頻率',
        explanation: '跟注也是 +EV 的標準打法，但相比 Check-Raise 喪失了翻牌直接收下底池與轉牌開火的主動權。'
      },
      {
        label: '棄牌 (Fold)',
        action: 'Fold',
        isGTO: false,
        frequency: '0% GTO 頻率 (致命錯誤)',
        explanation: '面對 1,800 的小注棄掉 8 張堅果出路的強聽牌是不可接受的巨大負 EV 決策。'
      }
    ]
  }
];

// 5. Mental Game Tilt Triggers
export interface TiltItem {
  id: string;
  name: string;
  chineseName: string;
  trigger: string;
  symptom: string;
  remedy: string;
}

export const TILT_DATABASE: TiltItem[] = [
  {
    id: 'bad-beat-tilt',
    name: 'Running Bad / Bad Beat Tilt',
    chineseName: '被中 River 倒楣上頭',
    trigger: '領先 90% 勝率的手牌在河牌被對手 2 Out 逆轉（如 AA 被 KK 河牌反抽）。',
    symptom: '內心充滿憤怒與不公感，下一把盲目用弱牌 Raise 想「贏回來」。',
    remedy: '理解方差 (Variance)。你的決策是 +EV 的，短期波動不可控，專注於決策品質而非單一結果。深呼吸 3 次，暫時離桌去洗手間洗臉。'
  },
  {
    id: 'mistake-tilt',
    name: 'Mistake Tilt',
    chineseName: '自責失誤上頭',
    trigger: '自己看錯牌面、算錯籌碼或做出了明顯的 -EV 蠢決策。',
    symptom: '不斷沉溺在上一手的懊悔中，無法專注於當前手牌。',
    remedy: '賽事進行中「嚴禁覆盤」！告訴自己：「錯誤已經發生，比賽還沒結束，打好手頭這把就是對籌碼最大的尊重。」'
  },
  {
    id: 'desperation-tilt',
    name: 'Desperation Tilt',
    chineseName: '絕望短籌碼急躁上頭',
    trigger: '籌碼從 50BB 掉到剩下 8BB，感覺大勢已去。',
    symptom: '胡亂用 J3o、95s 等無效牌 All-in 自殺。',
    remedy: '1 顆籌碼與一張椅子就有奇蹟！嚴格執行 Nash Push/Fold 表，等待標準位置與牌型，翻倍只需一次成功的翻倍。'
  },
  {
    id: 'revenge-tilt',
    name: 'Revenge Tilt',
    chineseName: '復仇針對上頭',
    trigger: '某位選手頻繁 3-Bet 你，或是抓了你的詐唬並亮牌嘲諷。',
    symptom: '不看位置和牌力，死盯著該選手進行毫無理性的反加注與孤立。',
    remedy: '撲克只對籌碼負責，不對情緒負責。對手激進往往暴露出更大的 GTO 漏洞，冷靜佈局等待其失誤進行致命打擊。'
  }
];
