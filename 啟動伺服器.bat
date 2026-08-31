@echo off
chcp 65001 >nul 2>&1
title ♠ Poker Pro Academy - 本機伺服器

echo.
echo  ============================================================
echo    ^|  ♠  POKER PRO ACADEMY  -  MTT 訓練學院                 ^|
echo  ============================================================
echo.

:: 切換到批次檔所在資料夾（確保路徑正確）
cd /d "%~dp0"

:: ─── 檢查 Node.js 是否已安裝 ────────────────────────────────────
where node >nul 2>&1
if errorlevel 1 (
    echo  [錯誤] 找不到 Node.js！
    echo.
    echo  請先至 https://nodejs.org 下載並安裝 Node.js（建議 v20+）
    echo.
    pause
    exit /b 1
)

:: ─── 檢查 node_modules 是否存在 ──────────────────────────────────
if not exist "node_modules\" (
    echo  [1/3] 首次啟動：正在安裝依賴套件（約需 1~2 分鐘）...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo  [錯誤] 套件安裝失敗，請檢查網路連線。
        pause
        exit /b 1
    )
    echo.
    echo  依賴安裝完成！
    echo.
)

:: ─── 檢查 dist 是否已建置 ────────────────────────────────────────
if not exist "dist\index.html" (
    echo  [2/3] 首次啟動：正在建置專案（約需 30 秒）...
    echo.
    call npm run build
    if errorlevel 1 (
        echo.
        echo  [錯誤] 建置失敗！請確認 TypeScript 沒有語法錯誤。
        pause
        exit /b 1
    )
    echo.
    echo  建置完成！
    echo.
) else (
    echo  [✓] 偵測到已建置的版本，直接啟動伺服器...
    echo.
)

:: ─── 啟動 Preview Server 並自動開啟瀏覽器 ───────────────────────
echo  [3/3] 啟動本機伺服器中...
echo.
echo  ┌─────────────────────────────────────┐
echo  │   瀏覽器即將自動開啟               │
echo  │   手動網址：http://localhost:4173   │
echo  │                                     │
echo  │   ◉ 關閉此視窗 = 停止伺服器        │
echo  └─────────────────────────────────────┘
echo.

:: 延遲 2 秒後開啟瀏覽器（給 server 啟動時間）
timeout /t 2 /nobreak >nul
start "" "http://localhost:4173"

:: 前景執行 preview（關閉視窗就自動停止服務）
call npm run preview

echo.
echo  伺服器已停止。按任意鍵關閉視窗。
pause >nul
