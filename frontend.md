frontend.md 2025-06-05
1 / 8
⼀、⼀般使⽤者入⼝（/app）
1.0 未連接錢包
──────────────────────────────────────
⼀般使⽤者 Landing Page
──────────────────────────────────────
【⾴⾸區（Header）】
--------------------------------------
• DApp Logo｜數位遺囑系統
• 「連結錢包」按鈕（Connect Wallet）
1.1 連結錢包後 → ⼀般使⽤者 Dashboard
──────────────────────────────────────
⼀般使⽤者 Dashboard
──────────────────────────────────────
【⾴⾸區（Header）】
--------------------------------------
• DApp Logo｜數位遺囑系統 — ⼀般使⽤者
• 已連結錢包︰did:ethr:0xAAA…
• [登出]
【側邊選單（Sidebar）】
--------------------------------------
• 【撰寫並打包遺囑 (Generate BundleA)】
• 【提出預覽／下載請求 (Request Preview/Download)】
• 【我的請求狀態 (My Requests)】
• 【個⼈設定 (Profile)】
【Main Content 區塊】
--------------------------------------
▶ 預設顯⽰「撰寫並打包遺囑 (Generate BundleA)」
1. **撰寫並打包遺囑 (Generate BundleA)**
 ┌───────────────────────────────────────────┐
 │ [拖曳或點擊上傳檔案] │
 │ ⽀援：Markdown / PDF / JPG / PNG / MP4 │
 └───────────────────────────────────────────┘
 • 上傳後即顯⽰檔名與⼤⼩，可刪除或重新上傳。
 **(步驟 a) ⽣成 BundleA**
 ┌───────────────────────────────────────────┐
 │ [計算 ContentHash 並簽章 → ⽣成 BundleA] │
 └───────────────────────────────────────────┘
 • 觸發流程：
frontend.md 2025-06-05
2 / 8
 1. 前端讀取 `rawFileBytes` → 計算 `contentHash = keccak256(rawFileBytes)`
 2. 前端呼叫錢包 (`eth_signTypedData`) → 取得 `signatureTestator`
 3. 本地打包 `BundleA = { rawFileBytes, contentHash, signatureTestator,
publicKeyTestator, uploaderDID }`
 4. **將 BundleA 轉成 JSON** （預覽⽤）
 **(步驟 b) 選擇後續動作（⾮強制，可⼆選⼀或兩都做）**
 ┌───────────────────────────────────────────┐
 │ 1) 指定 Notary（選單/地址） │
 │ ■ [下拉選單] 或 ■ [⼿動輸⼊ Notary DID] │
 │ 2) 下載 BundleA JSON（本機下載） │
 │ [下載 BundleA (JSON)] 按鈕 │
 │ 3) **提交 BundleA 給指定 Notary**（若選擇） │
 │ [提交給 Notary] 按鈕 │
 └───────────────────────────────────────────┘
 • **若使⽤者只想離線與律師交流**，可直接按「下載 BundleA (JSON)」 → 得到
`bundleA_0xXYZ.json`。
 • **若使⽤者想⾛完整公證流程**，必須：
 - 指定 Notary DID（可從選單挑選已註冊 Notary，或直接⼿動貼⼊地址）。
 - 按「提交給 Notary」→ 前端呼 `POST /api/submitBundleA`，攜帶 `{ bundleA_JSON,
notaryDID }`。
 - 後端將此筆存資料庫 `pending_bundles`，狀態設為 `pending`，並推播通知給指定
Notary。
 • **若使⽤者既要下載⼜要提交**，可先按「下載 BundleA」，再按「提交給 Notary」；兩者互不
衝突。
 **(顯⽰註解/提醒)**
 > • **未提交給 Notary 前，您暫時不會成為 Testator**
 > 只有等 Notary 在「遺囑審核」項中將其上鏈、審核通過後，您才正式獲得 Testator ⾝分。
 > • 如果未來想修改遺囑，只要在此重新上傳檔案，重新打包、指派 Notary 即可。
 > • 所有 BundleA 將暫存在本地或使⽤者⾃⾏備份；若不提交，伺服器不保留任何未提交的原始
檔案。
▶ 切換⾄「提出預覽／下載請求 (Request Preview/Download)」
2. **提出預覽／下載請求（Request Pre-view/Download）**
 ┌───────────────────────────────────────────┐
 │ ⽬標 Testator DID： [下拉或輸⼊] │
 │ 版本號 (version)： [下拉] │
 │ 申請類型： ( ) 預覽（Preview） │
 │ ( ) 下載（Download） │
 │ 申請原因： [多⾏⽂字輸⼊] │
 │ [提交申請] │
 └───────────────────────────────────────────┘
 • Flow：
 1. 使⽤者填寫完畢後 → 前端本地簽「Third-Party Request VC」 → 呼 `POST
/api/createRequest` → 後端存 `requests`，`status="pending"` → 通知 Notary。
 2. 前端顯⽰「申請已送出，請等待 Notary 審核」。
▶ 切換⾄「我的請求狀態 (My Requests)」
3. **我的請求狀態 (My Requests)**
 ┌───────────────────────────────────────────┐
frontend.md 2025-06-05
3 / 8
重點說明：
1. ⽣成 BundleA → 任意下載／任意提交
BundleA 的產⽣完全在前端完成（包含簽章）。
「下載 BundleA」讓使⽤者可⾃⾏離線保存／轉寄律師。
「提交給 Notary」後，才會串後端流程，交由 Notary 審核。
2. Testator ⾝分只有在 Notary 審核並完成上鏈後才算正式擁有
當 Notary 在⾃⼰的專屬入⼝將該 BundleA 審核通過並呼叫 publishWill 上鏈：
後端收到鏈上事件 → 更新 bundle_records 狀態為 published → 同步標記該 DID 具有
Testator Capability，前端下次連線才會顯⽰「您是 Testator」並在 Profile 中標註。
3. 「我的請求狀態」 可顯⽰ Notary 審核遺囑時所填的備註
若 Notary 在審核過程中「不通過」，會填寫 notaryRemark，被申請⼈可在此看到。
⼆、Notary 獨立入⼝（/notary）
 │ 表格⁚My Requests │
 │ ┌───┬───────────────┬─────────┬───────────┬───────────┐ │
 │ │id │ testatorDID │ version │ type │ status │ │
 │ ├───┼───────────────┼─────────┼───────────┼───────────┤ │
 │ │ 1 │ did:ethr:0xBBB… │ 2 │ preview │ pending │ │
 │ │ 2 │ did:ethr:0xCCC… │ 1 │ download │ approved │ │
 │ └───┴───────────────┴─────────┴───────────┴───────────┘ │
 └───────────────────────────────────────────┘
 • 若 `status = "approved"` 且 `type = "preview"` → 顯⽰「下載 Pre-view VC」按鈕；
 • 點擊後可呼 `/api/getPreviewBundle?requestId=…` → 後端驗證 VC → 解鎖加密包（若
尚未上鏈則顯⽰「尚未審核上鏈」）。
 • 若 `status = "approved"` 且 `type = "download"` → 顯⽰「下載 Will 原⽂」按鈕；
 • 點擊後可呼 `/api/getDownloadBundle?requestId=…` → 後端傳回已解鎖的明⽂檔案。
 • 若 `status = "rejected"` → 顯⽰「申請被拒絕，理由：{notaryRemark}」。
▶ 切換⾄「個⼈設定 (Profile)」
4. **個⼈設定 (Profile)**
 • 顯⽰：
 - `DID: did:ethr:0xAAA…`
 - 是否已成為 Testator（只有等 Notary 審核「遺囑上鏈」後才顯⽰「已成為 Testator」。）
 • 更新 Email／電話（如要發通知）。
 • 列出「我的 Testator VC」（僅供參考，⾮上鏈憑證）。
 • 列出「我的 Third-Party VC」。
【⾴尾區（Footer）】
--------------------------------------
• © 2025 Digital Will DApp
frontend.md 2025-06-05
4 / 8
2.1 連結錢包前 → Notary Landing Page
──────────────────────────────────────────────
Notary ⾸⾴（未連錢包／未驗證 Notary）
──────────────────────────────────────────────
【⾴⾸區（Header）】
----------------------------------------------
• DApp Logo｜數位遺囑系統 — Notary ⼊⼝
• 「連結錢包」按鈕
【內容區（Content）】
----------------------------------------------
• 「此專屬⼊⼝僅限受授權之公證⼈（Notary）。
 請先連結在後端已被授權為 Notary 的錢包。」
【⾴尾區（Footer）】
----------------------------------------------
• © 2025 Digital Will DApp
2.2 連結錢包後 → Notary Dashboard
【⾴⾸區（Header）】
-------------------------------------------------------
• DApp Logo｜數位遺囑系統 — Notary
• 已連結錢包︰did:ethr:0xNotaryXYZ…
• [登出]
【橫向選單（Top Navigation）】
-------------------------------------------------------
• 【待審核上傳遺囑 (Pending Bundles)】
• 【⼿動上傳 BundleA (Upload BundleA)】
• 【審核預覽／下載申請 (Pending Requests)】
• 【簽發 VC 管理 (VC Management)】
• 【死亡後解鎖 (Post-Unlock)】
• 【系統設定 (Settings)】
【Main Content 區塊】
-------------------------------------------------------
#### (A) 待審核上傳遺囑（Pending Bundles）
1. **所有由 Testator 透過「提交給 Notary」上傳的 BundleA**
 ┌───────────────────────────────────────────┐
 │ 表格⁚Pending Bundles │
 │ ┌──────┬───────────────┬─────────────┐ │
 │ │bundleId│ testatorDID │ contentHash │ │
 │ ├──────┼───────────────┼─────────────┤ │
 │ │bnd-123 │ did:ethr:… │ 0xABC… │ │
 │ │bnd-456 │ did:ethr:… │ 0xDEF… │ │
frontend.md 2025-06-05
5 / 8
 │ └──────┴───────────────┴─────────────┘ │
 └───────────────────────────────────────────┘
2. **操作區（當選擇⼀筆）**
 • [下載 BundleA JSON]：
 - 從後端 GET `/api/downloadBundleA?bundleId=bnd-123` → 讓 Notary 下載相同的
JSON。
 • [查看原始檔案 (Preview Raw Files)]：
 - 後端解 `BundleA.rawFileBytes` → 將其放到前端 Viewer 中：
 - **PDF**：內嵌 PDF.js 或 `<embed>` 直接預覽。
 - **MP4**：內嵌 `<video>` 元素播放。
 - **圖片**：`<img>` 顯⽰。
 - **Markdown / ⽂字**：轉成 HTML 後渲染。
 • [驗證簽章 (Verify Signature)]：
 - 後端⽤ `publicKeyTestator` 驗 `signatureTestator` → 返回 `success` 或
`failed`。
 - **若驗簽失敗** → 顯⽰「驗簽失敗，請聯絡 Testator 重新上傳。」
 • [審核結果 (Review Decision)]：
 ┌───────────────────────────────────────────┐
 │ ( ) 通過並上鏈（Approve & Publish） │
 │ ( ) 不通過 (Reject) │
 │ │
 │ 如果選「不通過」，請填寫備註 (notaryRemark)： │
 │ [多⾏⽂字輸⼊框] │
 │ │
 │ [提交審核結果] │
 └───────────────────────────────────────────┘
 **處理邏輯**：
 - **若選「通過並上鏈」**：
 1. 後端產⽣ `AESKey` → `cipherBundle = AES-256-GCM(AESKey, rawFileBytes)` →
`encKey = ECIES_Encrypt(AESKey, PK_Notary)`。
 2. 上傳 `cipherBundle` 到 IPFS → 得到 `ipfsCID`；計算 `bundleHash =
keccak256(cipherBundle)`。
 3. 呼智能合約 `publishWill(testatorAddress, ipfsCID, contentHash, bundleHash)`
→ 上鏈，拿到 `txHash` → 後端更新 `bundles` 表：
 ```text
 bundles:

┌───────────┬──────────────────┬──────────────┬──────────────┬────────────┐
 │ bundleId │ testatorDID │ status │ ipfsCID │ txHash
│

├───────────┼──────────────────┼──────────────┼──────────────┼────────────┤
 │ bnd-123 │ did:ethr:0xAAA… │ published │ Qm… │ 0xTx…
│

└───────────┴──────────────────┴──────────────┴──────────────┴────────────┘
 ```
 4. 同時建立 `user_roles` 表：表⽰ `did:ethr:0xAAA…` 已成為 Testator，前端下次連
線才會顯⽰「您是 Testator」標記。
 5. 通知該 Testator：您的遺囑已上鏈，正式獲得 Testator ⾝分。
 - **若選「不通過」**：
 1. 後端更新 `bundles` 表 `status = "rejected"`，`notaryRemark` 欄填⼊理由；
frontend.md 2025-06-05
6 / 8
 2. 通知 Testator：您的遺囑審核不通過，理由：{notaryRemark}。
#### (B) ⼿動上傳 BundleA（Upload BundleA from External Source）
────────────────────────────────────────────────
⼿動上傳 BundleA （供 Notary 處理其他管道取得的 JSON）
────────────────────────────────────────────────
## 【內容區（Content）】
1. **選擇 BundleA JSON 檔案上傳**
 ┌──────────────────────────────────────┐
 │ \[點擊或拖曳上傳 BundleA JSON] │
 └──────────────────────────────────────┘
2. **後端解析並暫存**
 • 後端收到 JSON → 驗證其結構、驗簽（`signatureTestator`）、解析 `rawFileBytes` →
若驗簽成功，⾃動放⼊ `bundles` 表 `status="pending_external"`，並顯⽰該 BundleA 內容
摘要（與 Pending Bundles 共⽤列表）。
 • 若驗簽失敗 → 顯⽰「此 BundleA 簽章驗證失敗，請確認是否從正確來源取得」。
3. **Notary 可於 Pending Bundles 分⾴中進⾏同樣的審核／上鏈／拒絕流程**
## 【提⽰⽂字】
> • 若您在律師或其他管道收到⼀份 BundleA JSON，可透過此介⾯上傳，系統會⾃動結構化並讓您
審核。
> • 上傳後就會與「待審核上傳遺囑 (Pending Bundles)」共⽤同⼀份列表，只是
`status="pending_external"`，標籤不同以利辨識。
#### (C) 審核預覽／下載申請（Review Preview/Download Requests）
───────────────────────────────────────────
審核預覽／下載申請 (Pending Requests)
───────────────────────────────────────────
## 【內容區（Content）】
1. **待審核申請列表（Pending Requests）**
 ┌────────────────────────────────────────────────┐
 │ 表格⁚Pending Preview/Download Requests │
 │ ┌───┬───────────────┬─────────┬───────────┬───────┐ │
 │ │id │ testatorDID │ version │ type │ reason│ │
 │ ├───┼───────────────┼─────────┼───────────┼───────┤ │
 │ │ 1 │ did\:ethr:0xBBB… │ 2 │ preview │ … │ │
 │ │ 2 │ did\:ethr:0xCCC… │ 1 │ download │ … │ │
 │ └───┴───────────────┴─────────┴───────────┴───────┘ │
 └────────────────────────────────────────────────┘
2. **選擇⼀筆後**
 • \[同意] 按鈕：
 * 後端以 Notary 私鑰簽發對應的「Pre-view VC」或「Download VC」。
 * 更新該筆 `requests.status = "approved"`，`notaryRemark = null`。
frontend.md 2025-06-05
7 / 8
 * 通知申請⼈：若 `preview` → 可呼 `/api/getPreviewBundle`；若 `download` → 可呼
`/api/getDownloadBundle`。
 • \[拒絕] 按鈕：會展開「填寫備註」區塊：
 ┌───────────────────────────────────────────┐
 │ 不通過原因 (notaryRemark)： │
 │ \[多⾏⽂字輸⼊框] │
 │ \[確認拒絕] │
 └───────────────────────────────────────────┘
 * 後端更新 `requests.status="rejected"`, `requests.notaryRemark=…` → 通知申請
⼈：「申請被拒絕，理由：…」。
#### (D) 簽發 VC 管理（Issue & Revoke VC）
1. **已簽發 VC 列表（Issued Credentials）**
 ┌───────────────────────────────────────────┐
 │ 表格⁚Issued VC │
 │ ┌───────────────┬───────────────┬─────────┐ │
 │ │ Credential ID │ 類型 │ 狀態 │ │
 │ ├───────────────┼───────────────┼─────────┤ │
 │ │ urn:uuid:… │ Notary │ valid │ │
 │ │ urn:uuid:… │ Pre-view │ revoked │ │
 │ │ urn:uuid:… │ Download │ valid │ │
 │ └───────────────┴───────────────┴─────────┘ │
 └───────────────────────────────────────────┘
2. **操作**
 • 選取⼀筆 → [撤銷 VC] → 後端更新該 VC 為 `revoked` → 記錄撤銷時間 → 通知相關使⽤者
（若有需要）。
#### (E) 死亡後解鎖（Post-Unlock）
1. **待解鎖列表（Pending Unlocks）**
 ┌──────────────────────────────────────────────┐
 │ 表格⁚Pending Unlocks │
 │ ┌───────────────┬───────────────┬─────────┐ │
 │ │ testatorDID │ version │ 狀態 │ │
 │ ├───────────────┼───────────────┼─────────┤ │
 │ │ did:ethr:0xBBB… │ 2 │ pending │ │
 │ └───────────────┴───────────────┴─────────┘ │
 └──────────────────────────────────────────────┘
2. **操作區**
 • 選取⼀筆 → [解鎖並上傳明⽂]
 1. 後端呼 `unlockWill(testatorAddress, version)` → 智能合約觸發 `WillUnlocked`
事件。
 2. 後端監聽事件 → 從 IPFS 下載對應的 `cipherBundle` → HSM 解密 → 取得
`rawFileBytes` → 上傳明⽂ `plainBundle` ⾄ IPFS → 拿到 `plainCID` → 更新
`unlock_records` 表，`status="unlocked"`。
 3. 同步更新 `bundle_records` 表 `status="unlocked"` 並記錄 `plainCID`。
 4. 通知相關的 Third-Party（若有）或 Testator（記錄）。
#### (F) 系統設定（Settings）
- 查看/更新 Notary ⾃⼰的 Email、電話。
- 查看⾃⼰的 Notary Credential（可下載 JSON-LD）。
- 若需要新增其他 Notary，仍由 Admin 後端介⾯操作（此處僅能「查看」，無法「新增
Notary」）。
frontend.md 2025-06-05
8 / 8
三、整體⾴⾯列表總覽
1. ⼀般使⽤者入⼝ (/app)
Landing Page（未連錢包）
⼀般使⽤者 Dashboard（連錢包後）
1. 撰寫並打包遺囑 (Generate BundleA)
2. 提出預覽／下載請求 (Request Preview/Download)
3. 我的請求狀態 (My Requests)
4. 個⼈設定 (Profile)
2. 公證⼈獨立入⼝ (/notary)
Notary Landing Page（未連錢包）
Notary Dashboard（連錢包後）
1. 待審核上傳遺囑 (Pending Bundles)
2. ⼿動上傳 BundleA (Upload BundleA)
3. 審核預覽／下載申請 (Pending Preview/Download Requests)
4. 簽發 VC 管理 (VC Management)
5. 死亡後解鎖 (Post-Unlock)
6. 系統設定 (Settings)