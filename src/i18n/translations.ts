export type Language = 'zh-TW' | 'en' | 'zh-CN';

export interface TranslationDict {
  brand: {
    title: string;
    badge: string;
    sub: string;
  };
  warningBanner: string;
  nav: {
    course: string;
    matrix: string;
    drills: string;
    quiz: string;
    toolbox: string;
    mental: string;
    share: string;
    lang: string;
  };
  disclaimer: {
    title: string;
    subtitle: string;
    header: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
    point4Title: string;
    point4Desc: string;
    agreeCheckbox: string;
    confirmBtn: string;
  };
  shareModal: {
    title: string;
    subtitle: string;
    qrTitle: string;
    qrDesc: string;
    socialTitle: string;
    copyLink: string;
    copied: string;
    emailSubject: string;
    emailBody: string;
    close: string;
  };
  course: {
    badge: string;
    progress: string;
    title: string;
    desc: string;
    completionRate: string;
    syllabusTitle: string;
    readTime: string;
    keyTakeawaysTitle: string;
    markComplete: string;
    markIncomplete: string;
    nextChapter: string;
  };
  matrix: {
    badge: string;
    sub: string;
    title: string;
    heroPos: string;
    stackDepth: string;
    scenario: string;
    scenarios: {
      rfi: string;
      vs3bet: string;
      pushfold: string;
    };
    legend: {
      raise: string;
      allin: string;
      call: string;
      mixed: string;
      fold: string;
    };
    statsTitle: string;
    totalFreq: string;
    combosCount: string;
    raiseFreq: string;
    callFreq: string;
    inspectorTitle: string;
    inspectorEmpty: string;
    suggestedAction: string;
    execFreq: string;
    theoryEV: string;
    matrixTip: string;
  };
  drills: {
    badge: string;
    soundOn: string;
    soundOff: string;
    title: string;
    score: string;
    streak: string;
    accuracy: string;
    heroPos: string;
    chips: string;
    blindsLabel: string;
    allinBtn: string;
    foldBtn: string;
    callBtn: string;
    correctTitle: string;
    wrongTitle: string;
    yourChoice: string;
    pushEV: string;
    nextBtn: string;
    gtoAnalysis: string;
  };
  quiz: {
    badge: string;
    scenarioCount: string;
    title: string;
    stage: string;
    hero: string;
    villain: string;
    pot: string;
    communityBoard: string;
    heroHand: string;
    villainActionTitle: string;
    nextBtn: string;
  };
  toolbox: {
    oddsTab: string;
    sprTab: string;
    trackerTab: string;
    clockTab: string;
    oddsTitle: string;
    oddsDesc: string;
    currentPot: string;
    betToCall: string;
    requiredEquity: string;
    oddsRatio: string;
    callSuggestion: string;
    sprTitle: string;
    sprDesc: string;
    effectiveStack: string;
    flopPot: string;
    sprIndex: string;
    sprLow: string;
    sprMed: string;
    sprHigh: string;
    trackerTitle: string;
    trackerDesc: string;
    totalEvents: string;
    netProfit: string;
    roi: string;
    itmRate: string;
    formName: string;
    formBuyin: string;
    formPayout: string;
    recordBtn: string;
    tableDate: string;
    tableName: string;
    tableBuyin: string;
    tablePayout: string;
    tableResult: string;
    tableAction: string;
    clockTitle: string;
    clockDesc: string;
    level: string;
    ante: string;
    startBtn: string;
    pauseBtn: string;
    resetBtn: string;
  };
  mental: {
    badge: string;
    title: string;
    desc: string;
    categoryTitle: string;
    triggerTitle: string;
    symptomTitle: string;
    remedyTitle: string;
    checklistTitle: string;
  };
  footer: {
    brandDesc: string;
    complianceTitle: string;
    complianceDesc: string;
    shortcutsTitle: string;
    copyright: string;
    tagline: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  'zh-TW': {
    brand: {
      title: 'POKER PRO',
      badge: 'MTT 訓練學院',
      sub: '國際錦標賽競技培訓系統'
    },
    warningBanner: '【嚴正聲明】本平台僅供數學博弈論研究與合法合規競技賽事自我訓練，絕不鼓勵賭博行為，嚴禁涉足地下賭博，請理性評估個人財務風險。',
    nav: {
      course: '階梯課程',
      matrix: '13x13 翻前矩陣',
      drills: 'Push/Fold 快打',
      quiz: '翻後 GTO 決策',
      toolbox: '賽事工具箱',
      mental: '心態與現場錦囊',
      share: '分享平台',
      lang: '語言'
    },
    disclaimer: {
      title: '重要免責聲明與風險揭露',
      subtitle: '進入本系統前，請詳閱並確認以下使用者條款',
      header: '🚨 【純興趣開發與學術研究聲明】',
      point1Title: '非賭博平台',
      point1Desc: '本專案為個人開源愛好與博弈論 (Game Theory)、機率統計學研發成果，不涉及任何真錢儲值、下注或賭博交易。',
      point2Title: '不鼓勵賭博',
      point2Desc: '作者與團隊絕不鼓勵任何形式的賭博行為。撲克競技具備極高的資金波動與心理壓力，使用者應嚴格控管個人財務風險。',
      point3Title: '嚴禁地下賭博',
      point3Desc: '嚴正警告使用者切勿涉足任何未經許可之非法地下賭局、非法賭場或無牌照線上博弈平台。',
      point4Title: '倡導合規智力運動',
      point4Desc: '本平台所培育之目標，僅指遵循國際 TDA 規範之公開透明、合法合規體育錦標賽（如 WSOP, WPT, APT 等）。',
      agreeCheckbox: '我已完整閱讀並理解上述免責聲明，我承諾將本系統僅用於數學戰術研究與合法合規賽事自我訓練，絕不參與地下非法賭博並自負個人風險。',
      confirmBtn: '確認理解並進入平台'
    },
    shareModal: {
      title: '分享德州撲克專業訓練系統',
      subtitle: '邀請牌友一起精進 GTO 戰術與錦標賽奪冠思維',
      qrTitle: '手機掃描 QR Code 隨時隨地刷題',
      qrDesc: '使用手機相機掃描，立即在行動裝置開啟 13x13 矩陣與 Push/Fold 訓練器。',
      socialTitle: '快速分享至社群平台',
      copyLink: '複製平台連結',
      copied: '已複製連結！',
      emailSubject: '推薦德州撲克專業錦標賽訓練系統 (Poker Pro Academy)',
      emailBody: '嗨！推薦你這個非常專業的德州撲克錦標賽學習平台，整合了 13x13 翻前 GTO 矩陣、Push/Fold 殘局快打訓練器、賠率計算機與賽事戰略體系：',
      close: '關閉'
    },
    course: {
      badge: 'Masterclass Curriculum',
      progress: '進度',
      title: '德州撲克大師階梯通關手冊（零基礎入門到進階實戰）',
      desc: '專為零基礎到進階玩家打造：涵蓋 10 大牌型、四輪發牌流程、術語大字典、底池賠率、100bb~8bb 籌碼深度、翻後 GTO 與現場 TDA 規程。',
      completionRate: '學習完成率',
      syllabusTitle: '課綱章節一覽',
      readTime: '閱讀時間',
      keyTakeawaysTitle: '本章核心決策精華 (Key Takeaways)',
      markComplete: '標記此章節為已掌握',
      markIncomplete: '已完成學習 (點擊取消)',
      nextChapter: '下一章節'
    },
    matrix: {
      badge: 'GTO Solved Range',
      sub: '169 組合動態矩陣',
      title: '13x13 翻前起手牌範圍查看器',
      heroPos: '英雄位置 (Hero Position)',
      stackDepth: '籌碼深度 (Stack Depth)',
      scenario: '情境動作 (Scenario)',
      scenarios: {
        rfi: 'RFI 開池',
        vs3bet: '面對 3-Bet',
        pushfold: 'Push/Fold 殘局'
      },
      legend: {
        raise: 'Raise / Open',
        allin: 'All-in Shove',
        call: 'Call / Defend',
        mixed: 'Mixed (混合策略)',
        fold: 'Fold (棄牌)'
      },
      statsTitle: '範圍統計',
      totalFreq: '入池總頻率',
      combosCount: '組合',
      raiseFreq: '加注 (Raise/Jam)',
      callFreq: '跟注 (Call)',
      inspectorTitle: '起手牌即時解析',
      inspectorEmpty: '滑鼠移至 13x13 矩陣上的任何手牌查看詳細 GTO 決策數據',
      suggestedAction: '建議行動：',
      execFreq: '執行頻率：',
      theoryEV: '理論期望值 (EV)：',
      matrixTip: '💡 新手小秘訣：對角線為口袋對 (AA-22)；右上角帶 s 為同花 (Suited，如 AKs)；左下角帶 o 為雜色 (Offsuit，如 AKo)。'
    },
    drills: {
      badge: '5-Second Speed Trainer',
      soundOn: '音效已開啟',
      soundOff: '靜音',
      title: 'Push / Fold 殘局極速快打訓練器',
      score: '總積分',
      streak: '連勝 (Streak)',
      accuracy: '準確率',
      heroPos: '英雄位置',
      chips: '籌碼',
      blindsLabel: '盲注結構',
      allinBtn: '[1] ALL-IN (Push)',
      foldBtn: '[2] FOLD (棄牌)',
      callBtn: '[3] CALL (跟注)',
      correctTitle: '決策正確！(+EV 期望值領先)',
      wrongTitle: '決策失誤！最佳行動為：',
      yourChoice: '你的選擇',
      pushEV: 'Push EV',
      nextBtn: '下一題 (Space)',
      gtoAnalysis: 'GTO 深度解析'
    },
    quiz: {
      badge: 'Postflop Decision Trees',
      scenarioCount: '情境',
      title: '翻後 GTO 決策情境模擬測驗',
      stage: '階段',
      hero: 'Hero',
      villain: 'Villain',
      pot: '底池',
      communityBoard: '公共牌 (Community Board)',
      heroHand: '英雄手牌 (Hero Hole Cards)',
      villainActionTitle: '⚡ 對手行動：',
      nextBtn: '下一題測驗'
    },
    toolbox: {
      oddsTab: '底池賠率 & 必要勝率',
      sprTab: 'SPR 籌碼底池比',
      trackerTab: '賽事資金與 ROI 記帳',
      clockTab: '錦標賽盲注時鐘',
      oddsTitle: '底池賠率 (Pot Odds) & 必要勝率計算機',
      oddsDesc: '輸入當前底池與對手下注量，立即得知你面臨跟注時所需的理論「打平勝率 (Break-even Equity)」。',
      currentPot: '當前底池大小 (Current Pot)',
      betToCall: '對手下注額 / 你需跟注額 (Bet to Call)',
      requiredEquity: '必要最低勝率 (Required Equity)',
      oddsRatio: '底池賠率比 (Pot Odds Ratio)',
      callSuggestion: '跟注判定建議',
      sprTitle: 'SPR (Stack-to-Pot Ratio) 決策指針',
      sprDesc: 'SPR 衡量翻牌圈有效籌碼與底池的比例，直接指引你在該手牌的套池 (Commitment) 意願。',
      effectiveStack: '翻牌圈有效籌碼量 (Effective Stack)',
      flopPot: '翻牌前底池大小 (Flop Pot)',
      sprIndex: '當前 SPR 指數',
      sprLow: '低 SPR (套池區間)',
      sprMed: '中 SPR (謹慎控池區間)',
      sprHigh: '高 SPR (深籌碼暗三條投機區間)',
      trackerTitle: '錦標賽資金管理 (BRM) & 參賽記帳本',
      trackerDesc: '追蹤你的錦標賽 ROI (投資報酬率) 與 ITM% (進圈率)，確保資金符合 50~100 ABI 安全標準。',
      totalEvents: '總參賽場次',
      netProfit: '淨盈虧 (Net Profit)',
      roi: '錦標賽 ROI',
      itmRate: '進圈率 (ITM%)',
      formName: '賽事名稱 (e.g. APT Main Event)',
      formBuyin: '買入額 ($ Buy-in)',
      formPayout: '獲得獎金 ($ Payout)',
      recordBtn: '記錄',
      tableDate: '賽事日期',
      tableName: '賽事名稱',
      tableBuyin: '買入',
      tablePayout: '獎金',
      tableResult: '結果',
      tableAction: '操作',
      clockTitle: '錦標賽盲注計時器 (Tournament Clock)',
      clockDesc: '適用於現場模擬賽與實體賽事計時，自動進階盲注與 Ante。',
      level: 'LEVEL',
      ante: 'Big Blind Ante',
      startBtn: '開始計時',
      pauseBtn: '暫停',
      resetBtn: '重置本級別'
    },
    mental: {
      badge: 'Mental Mastery & Live Pro',
      title: '錦標賽心理抗波系統與現場作戰手冊',
      desc: '技術決定你的上限，心態與體能決定你的下限。辨識「上頭 (Tilt)」誘發因子，在連續數天的國際高壓大賽中維持 A-Game。',
      categoryTitle: '撲克常見「上頭」型態數據庫',
      triggerTitle: '⚡ 典型誘發因子 (The Trigger)',
      symptomTitle: '⚠️ 行為症狀 (Symptoms & Leak)',
      remedyTitle: '職業平復 SOP (Pro Remedy & Reset)',
      checklistTitle: '📋 賽前身心狀態 A-Game 檢核清單'
    },
    footer: {
      brandDesc: '以博弈論 (GTO)、獨立籌碼模型 (ICM) 與大賽實戰為核心的現代化德州撲克訓練系統。致力於普及合規體育智力競技與科學決策。',
      complianceTitle: '法律與合規原則 (Compliance)',
      complianceDesc: '本專案純屬個人興趣與學術演算法研發，無任何金流儲值或博弈交易。請嚴格遵守所在地區法律法規，切勿參與任何未受監管之地下賭局。',
      shortcutsTitle: '專項訓練通道',
      copyright: '© 2026 Poker Pro Tournament Academy. Open Source & Academic Research Purpose.',
      tagline: 'Designed with Game Theory & Math Excellence'
    }
  },
  'en': {
    brand: {
      title: 'POKER PRO',
      badge: 'MTT ACADEMY',
      sub: 'Tournament Strategy Training System'
    },
    warningBanner: '[DISCLAIMER] This platform is for Game Theory research and legal athletic tournament training only. Strictly no gambling. Underground illegal games are strictly forbidden.',
    nav: {
      course: 'Curriculum',
      matrix: '13x13 Matrix',
      drills: 'Push/Fold Drills',
      quiz: 'Postflop GTO',
      toolbox: 'Toolbox',
      mental: 'Mental & Live',
      share: 'Share',
      lang: 'Language'
    },
    disclaimer: {
      title: 'Important Disclaimer & Risk Disclosure',
      subtitle: 'Please review and accept user terms before entering',
      header: '🚨 [Academic & Hobby Research Disclaimer]',
      point1Title: 'Non-Gambling Platform',
      point1Desc: 'This project is created for open-source passion, game theory, and probability research. No real money or betting involved.',
      point2Title: 'Zero Endorsement of Gambling',
      point2Desc: 'We strictly discourage gambling. Poker involves high financial and psychological variance. Please manage personal risks responsibly.',
      point3Title: 'Illegal Underground Games Forbidden',
      point3Desc: 'Users are strictly warned not to engage in unauthorized illegal underground casinos or unregulated online gambling sites.',
      point4Title: 'Promoting Mind Sports',
      point4Desc: 'Our focus is strictly on regulated, transparent, TDA-governed athletic tournaments (such as WSOP, WPT, APT).',
      agreeCheckbox: 'I have read and fully understood the disclaimer above. I commit to using this system solely for math research and legitimate tournament practice.',
      confirmBtn: 'I Understand & Enter Platform'
    },
    shareModal: {
      title: 'Share Poker Pro Academy',
      subtitle: 'Invite your poker friends to master GTO MTT strategies together',
      qrTitle: 'Scan QR Code on Mobile',
      qrDesc: 'Scan with your smartphone camera to practice 13x13 ranges and Push/Fold drills on the go.',
      socialTitle: 'Share to Social Platforms',
      copyLink: 'Copy Link',
      copied: 'Link Copied!',
      emailSubject: 'Recommended: Poker Pro Tournament Academy System',
      emailBody: 'Hey! Check out this Texas Hold\'em tournament training system featuring 13x13 GTO matrix, Push/Fold speed drills, odds calculators and tournament syllabus:',
      close: 'Close'
    },
    course: {
      badge: 'Masterclass Curriculum',
      progress: 'Progress',
      title: 'Texas Hold\'em Masterclass (Beginner to Advanced)',
      desc: 'Designed for beginners to advanced players: Covers 10 hand rankings, 4-street game flow, jargon glossary, pot odds math, GTO postflop, and tournament dynamics.',
      completionRate: 'Completion Rate',
      syllabusTitle: 'Syllabus Overview',
      readTime: 'Read Time',
      keyTakeawaysTitle: 'Key Takeaways',
      markComplete: 'Mark as Mastered',
      markIncomplete: 'Completed (Click to undo)',
      nextChapter: 'Next Chapter'
    },
    matrix: {
      badge: 'GTO Solved Range',
      sub: '169 Hand Matrix',
      title: '13x13 Preflop Range Viewer',
      heroPos: 'Hero Position',
      stackDepth: 'Stack Depth',
      scenario: 'Scenario',
      scenarios: {
        rfi: 'RFI (Open)',
        vs3bet: 'vs 3-Bet',
        pushfold: 'Push/Fold'
      },
      legend: {
        raise: 'Raise / Open',
        allin: 'All-in Shove',
        call: 'Call / Defend',
        mixed: 'Mixed Strategy',
        fold: 'Fold'
      },
      statsTitle: 'Range Statistics',
      totalFreq: 'Total Play %',
      combosCount: 'combos',
      raiseFreq: 'Raise / Jam',
      callFreq: 'Call',
      inspectorTitle: 'Instant Hand Inspector',
      inspectorEmpty: 'Hover over any cell in the 13x13 matrix to view GTO frequencies and theoretical EV',
      suggestedAction: 'Suggested Action: ',
      execFreq: 'Frequency: ',
      theoryEV: 'Theoretical EV: ',
      matrixTip: '💡 Pro Tip: Diagonal = Pocket Pairs (AA-22); Top-Right with "s" = Suited (e.g. AKs); Bottom-Left with "o" = Offsuit (e.g. AKo).'
    },
    drills: {
      badge: '5-Second Speed Trainer',
      soundOn: 'Audio Enabled',
      soundOff: 'Muted',
      title: 'Push / Fold Endgame Speed Trainer',
      score: 'Score',
      streak: 'Streak',
      accuracy: 'Accuracy',
      heroPos: 'Hero Pos',
      chips: 'Stack',
      blindsLabel: 'Blinds Structure',
      allinBtn: '[1] ALL-IN (Push)',
      foldBtn: '[2] FOLD',
      callBtn: '[3] CALL',
      correctTitle: 'Correct Decision! (+EV Lead)',
      wrongTitle: 'Mistake! Optimal action was:',
      yourChoice: 'Your Choice',
      pushEV: 'Push EV',
      nextBtn: 'Next Hand (Space)',
      gtoAnalysis: 'GTO Deep Breakdown'
    },
    quiz: {
      badge: 'Postflop Decision Trees',
      scenarioCount: 'Scenario',
      title: 'Postflop GTO Decision Simulator',
      stage: 'Street',
      hero: 'Hero',
      villain: 'Villain',
      pot: 'Pot',
      communityBoard: 'Community Board',
      heroHand: 'Hero Hole Cards',
      villainActionTitle: '⚡ Villain Action: ',
      nextBtn: 'Next Scenario'
    },
    toolbox: {
      oddsTab: 'Pot Odds & Equity',
      sprTab: 'SPR Ratio',
      trackerTab: 'BRM & ROI Tracker',
      clockTab: 'Tournament Clock',
      oddsTitle: 'Pot Odds & Required Equity Calculator',
      oddsDesc: 'Input current pot and opponent bet to immediately calculate break-even equity requirements.',
      currentPot: 'Current Pot Size',
      betToCall: 'Opponent Bet / Call Amount',
      requiredEquity: 'Required Equity',
      oddsRatio: 'Pot Odds Ratio',
      callSuggestion: 'Call EV Advice',
      sprTitle: 'SPR (Stack-to-Pot Ratio) Pointer',
      sprDesc: 'Measures effective stack vs flop pot to guide postflop commitment level.',
      effectiveStack: 'Flop Effective Stack',
      flopPot: 'Flop Pot Size',
      sprIndex: 'Current SPR Value',
      sprLow: 'Low SPR (Commitment Zone)',
      sprMed: 'Mid SPR (Pot Control Zone)',
      sprHigh: 'High SPR (Deep Stack Speculative Zone)',
      trackerTitle: 'Bankroll Management (BRM) & ROI Tracker',
      trackerDesc: 'Track your tournament ROI and ITM% to ensure compliance with 50~100 ABI safety guidelines.',
      totalEvents: 'Total Events',
      netProfit: 'Net Profit',
      roi: 'Tournament ROI',
      itmRate: 'ITM Rate',
      formName: 'Event Name (e.g. APT Main Event)',
      formBuyin: 'Buy-in ($)',
      formPayout: 'Payout ($)',
      recordBtn: 'Add Record',
      tableDate: 'Date',
      tableName: 'Tournament Name',
      tableBuyin: 'Buy-in',
      tablePayout: 'Payout',
      tableResult: 'Result',
      tableAction: 'Action',
      clockTitle: 'Live Tournament Clock',
      clockDesc: 'Ideal for live simulations and home tournaments with automated blind level progressions.',
      level: 'LEVEL',
      ante: 'Big Blind Ante',
      startBtn: 'Start Timer',
      pauseBtn: 'Pause',
      resetBtn: 'Reset Level'
    },
    mental: {
      badge: 'Mental Mastery & Live Pro',
      title: 'Mental Game Resilience & Live Tour Guide',
      desc: 'Technical edge sets your ceiling; mindset and stamina define your floor. Identify tilt triggers and maintain your A-Game.',
      categoryTitle: 'Tilt Categories Database',
      triggerTitle: '⚡ The Trigger',
      symptomTitle: '⚠️ Symptoms & Leaks',
      remedyTitle: 'Pro Reset SOP',
      checklistTitle: '📋 Pre-Game A-Game Checklist'
    },
    footer: {
      brandDesc: 'Modern poker tournament academy combining Game Theory Optimal (GTO), ICM dynamics, and live tournament mastery.',
      complianceTitle: 'Compliance & Legal Integrity',
      complianceDesc: 'This project is strictly for academic and algorithmic research with zero gambling transactions. Always comply with local regulations.',
      shortcutsTitle: 'Quick Navigation',
      copyright: '© 2026 Poker Pro Tournament Academy. Open Source & Academic Research Purpose.',
      tagline: 'Designed with Game Theory & Math Excellence'
    }
  },
  'zh-CN': {
    brand: {
      title: 'POKER PRO',
      badge: 'MTT 训练学院',
      sub: '国际锦标赛竞技培训系统'
    },
    warningBanner: '【严正声明】本平台仅供数学博弈论研究与合法合规竞技赛事自我训练，绝不鼓励赌博行为，严禁涉足地下赌博，请理性评估个人财务风险。',
    nav: {
      course: '阶梯课程',
      matrix: '13x13 翻前矩阵',
      drills: 'Push/Fold 快打',
      quiz: '翻后 GTO 决策',
      toolbox: '赛事工具箱',
      mental: '心态与现场锦囊',
      share: '分享平台',
      lang: '语言'
    },
    disclaimer: {
      title: '重要免责声明与风险揭露',
      subtitle: '进入本系统前，请详阅并确认以下使用者条款',
      header: '🚨 【纯兴趣开发与学术研究声明】',
      point1Title: '非赌博平台',
      point1Desc: '本项目为个人开源爱好与博弈论 (Game Theory)、概率统计学研发成果，不涉及任何真钱充值、下注或赌博交易。',
      point2Title: '不鼓励赌博',
      point2Desc: '作者与团队绝不鼓励任何形式的赌博行为。扑克竞技具备极高的资金波动与心理压力，使用者应严格控管个人财务风险。',
      point3Title: '严禁地下赌博',
      point3Desc: '严正警告使用者切勿涉足任何未经许可之非法地下赌局、非法赌场或无牌照线上博弈平台。',
      point4Title: '倡导合规智力运动',
      point4Desc: '本平台所培育之目标，仅指遵循国际 TDA 规范之公开透明、合法合规体育锦标赛（如 WSOP, WPT, APT 等）。',
      agreeCheckbox: '我已完整阅读并理解上述免责声明，我承诺将本系统仅用于数学战术研究与合法合规赛事自我训练，绝不参与地下非法赌博并自负个人风险。',
      confirmBtn: '确认理解并进入平台'
    },
    shareModal: {
      title: '分享德州扑克专业训练系统',
      subtitle: '邀请牌友一起精进 GTO 战术与锦标赛夺冠思维',
      qrTitle: '手机扫描 QR Code 随时随地刷题',
      qrDesc: '使用手机相机扫描，立即在移动设备开启 13x13 矩阵与 Push/Fold 训练器。',
      socialTitle: '快速分享至社交平台',
      copyLink: '复制平台链接',
      copied: '已复制链接！',
      emailSubject: '推荐德州扑克专业锦标赛训练系统 (Poker Pro Academy)',
      emailBody: '嗨！推荐你这个非常专业的德州扑克锦标赛学习平台，整合了 13x13 翻前 GTO 矩阵、Push/Fold 残局快打训练器、赔率计算器与赛事战略体系：',
      close: '关闭'
    },
    course: {
      badge: 'Masterclass Curriculum',
      progress: '进度',
      title: '德州扑克大师阶梯通关手册（零基础入门到进阶实战）',
      desc: '专为零基础到进阶玩家打造：涵盖 10 大牌型、四轮发牌流程、术语大字典、底池赔率、100bb~8bb 筹码深度、翻后 GTO 与现场 TDA 规程。',
      completionRate: '学习完成率',
      syllabusTitle: '课纲章节一览',
      readTime: '阅读时间',
      keyTakeawaysTitle: '本章核心决策精华 (Key Takeaways)',
      markComplete: '标记此章节为已掌握',
      markIncomplete: '已完成学习 (点击取消)',
      nextChapter: '下一章节'
    },
    matrix: {
      badge: 'GTO Solved Range',
      sub: '169 组合动态矩阵',
      title: '13x13 翻前起手牌范围查看器',
      heroPos: '英雄位置 (Hero Position)',
      stackDepth: '筹码深度 (Stack Depth)',
      scenario: '情境动作 (Scenario)',
      scenarios: {
        rfi: 'RFI 开池',
        vs3bet: '面对 3-Bet',
        pushfold: 'Push/Fold 残局'
      },
      legend: {
        raise: 'Raise / Open',
        allin: 'All-in Shove',
        call: 'Call / Defend',
        mixed: 'Mixed (混合策略)',
        fold: 'Fold (弃牌)'
      },
      statsTitle: '范围统计',
      totalFreq: '入池总频率',
      combosCount: '组合',
      raiseFreq: '加注 (Raise/Jam)',
      callFreq: '跟注 (Call)',
      inspectorTitle: '起手牌即时解析',
      inspectorEmpty: '鼠标移至 13x13 矩阵上的任何手牌查看详细 GTO 决策数据',
      suggestedAction: '建议行动：',
      execFreq: '执行频率：',
      theoryEV: '理论期望值 (EV)：',
      matrixTip: '💡 新手小秘诀：对角线为口袋对 (AA-22)；右上角带 s 为同花 (Suited，如 AKs)；左下角带 o 为杂色 (Offsuit，如 AKo)。'
    },
    drills: {
      badge: '5-Second Speed Trainer',
      soundOn: '音效已开启',
      soundOff: '静音',
      title: 'Push / Fold 残局极速快打训练器',
      score: '总积分',
      streak: '连胜 (Streak)',
      accuracy: '准确率',
      heroPos: '英雄位置',
      chips: '筹码',
      blindsLabel: '盲注结构',
      allinBtn: '[1] ALL-IN (Push)',
      foldBtn: '[2] FOLD (弃牌)',
      callBtn: '[3] CALL (跟注)',
      correctTitle: '决策正确！(+EV 期望值领先)',
      wrongTitle: '决策失误！最佳行动为：',
      yourChoice: '你的选择',
      pushEV: 'Push EV',
      nextBtn: '下一题 (Space)',
      gtoAnalysis: 'GTO 深度解析'
    },
    quiz: {
      badge: 'Postflop Decision Trees',
      scenarioCount: '情境',
      title: '翻后 GTO 决策情境模拟测验',
      stage: '阶段',
      hero: 'Hero',
      villain: 'Villain',
      pot: '底池',
      communityBoard: '公共牌 (Community Board)',
      heroHand: '英雄手牌 (Hero Hole Cards)',
      villainActionTitle: '⚡ 对手行动：',
      nextBtn: '下一题测验'
    },
    toolbox: {
      oddsTab: '底池赔率 & 必要胜率',
      sprTab: 'SPR 筹码底池比',
      trackerTab: '赛事资金与 ROI 记账',
      clockTab: '锦标赛盲注时钟',
      oddsTitle: '底池赔率 (Pot Odds) & 必要胜率计算器',
      oddsDesc: '输入当前底池与对手下注量，立即得知你面临跟注时所需的理论“打平胜率 (Break-even Equity)”。',
      currentPot: '当前底池大小 (Current Pot)',
      betToCall: '对手下注额 / 你需跟注额 (Bet to Call)',
      requiredEquity: '必要最低胜率 (Required Equity)',
      oddsRatio: '底池赔率比 (Pot Odds Ratio)',
      callSuggestion: '跟注判定建议',
      sprTitle: 'SPR (Stack-to-Pot Ratio) 决策指针',
      sprDesc: 'SPR 衡量翻牌圈有效筹码与底池的比例，直接指引你在该手牌的套池 (Commitment) 意愿。',
      effectiveStack: '翻牌圈有效筹码量 (Effective Stack)',
      flopPot: '翻牌前底池大小 (Flop Pot)',
      sprIndex: '当前 SPR 指数',
      sprLow: '低 SPR (套池区间)',
      sprMed: '中 SPR (谨慎控池区间)',
      sprHigh: '高 SPR (深筹码暗三条投机区间)',
      trackerTitle: '锦标赛资金管理 (BRM) & 参赛记账本',
      trackerDesc: '追踪你的锦标赛 ROI (投资回报率) 与 ITM% (进圈率)，确保资金符合 50~100 ABI 安全标准。',
      totalEvents: '总参赛场次',
      netProfit: '净盈亏 (Net Profit)',
      roi: '锦标赛 ROI',
      itmRate: '进圈率 (ITM%)',
      formName: '赛事名称 (e.g. APT Main Event)',
      formBuyin: '买入额 ($ Buy-in)',
      formPayout: '获得奖金 ($ Payout)',
      recordBtn: '记录',
      tableDate: '赛事日期',
      tableName: '赛事名称',
      tableBuyin: '买入',
      tablePayout: '奖金',
      tableResult: '结果',
      tableAction: '操作',
      clockTitle: '锦标赛盲注计时器 (Tournament Clock)',
      clockDesc: '适用于现场模拟赛与实体赛事计时，自动进阶盲注与 Ante。',
      level: 'LEVEL',
      ante: 'Big Blind Ante',
      startBtn: '开始计时',
      pauseBtn: '暂停',
      resetBtn: '重置本级别'
    },
    mental: {
      badge: 'Mental Mastery & Live Pro',
      title: '锦标赛心理抗波系统与现场作战手册',
      desc: '技术决定你的上限，心态与体能决定你的下限。辨识“上头 (Tilt)”诱发因子，在连续数天的国际高压大赛中维持 A-Game。',
      categoryTitle: '扑克常见“上头”型态数据库',
      triggerTitle: '⚡ 典型诱发因子 (The Trigger)',
      symptomTitle: '⚠️ 行为症状 (Symptoms & Leak)',
      remedyTitle: '职业平复 SOP (Pro Remedy & Reset)',
      checklistTitle: '📋 赛前身心状态 A-Game 检核清单'
    },
    footer: {
      brandDesc: '以博弈论 (GTO)、独立筹码模型 (ICM) 与大赛实战为核心的现代化德州扑克训练系统。致力于普及合规体育智力竞技与科学决策。',
      complianceTitle: '法律与合规原则 (Compliance)',
      complianceDesc: '本项目纯属个人兴趣与学术算法研发，无任何金流充值或博弈交易。请严格遵守所在地区法律法规，切勿参与任何未受监管之地下赌局。',
      shortcutsTitle: '专项训练通道',
      copyright: '© 2026 Poker Pro Tournament Academy. Open Source & Academic Research Purpose.',
      tagline: 'Designed with Game Theory & Math Excellence'
    }
  }
};
