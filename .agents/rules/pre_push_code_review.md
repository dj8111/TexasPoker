# Pre-Push Code Review & Security Audit Rule

## 觸發條件
當使用者要求「上傳」、「git push」、「提交遠端」或類似操作時，**必須在執行 git push 之前主動完成完整的程式品質審查 (Code Review) 與資安審查 (Security Audit)**。

## 檢查清單 (SOP)

### 1. 資安審核 (Security Audit)
- [ ] **敏感資訊洩漏檢查**：確認無硬編碼之 API Key、Token、密碼、內部連線字串或個人隱私資料。
- [ ] **XSS / 注入攻擊防護**：
  - 檢查 `dangerouslySetInnerHTML`、`innerHTML` 或動態 HTML 渲染，確保無未經過濾之外部使用者輸入。
  - 檢查所有外部連結 `<a>` 標籤是否有加上 `rel="noopener noreferrer"`。
- [ ] **跨站防護與本機儲存安全**：檢查 `localStorage` / `sessionStorage` 讀取時是否有完整的 `try-catch` 容錯與型別驗證。
- [ ] **第三方依賴安全**：確認 `package.json` 中無已知重大漏洞套件。

### 2. 程式品質與穩定性 (Code Quality)
- [ ] **TypeScript 類型與打包驗證**：在 push 前執行 `npm run build` 確認零編譯與類型錯誤。
- [ ] **記憶體洩漏與清理 (Cleanup)**：檢查 `useEffect`、`setInterval`、`setTimeout`、`addEventListener` 與 `AudioContext` 是否皆在 unmount 時正確清理。
- [ ] **效能與重渲染 (Performance)**：檢查高頻計算（如矩陣、計算器）是否有適當使用 `useMemo` / `useCallback`。
- [ ] **.gitignore 完整性**：確認 `node_modules`、`.env`、編譯產物 `dist/`、log 等檔案未被意外追蹤。
