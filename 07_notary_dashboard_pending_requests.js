(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "Notary Dashboard - Pending Requests";
  dashboard.layoutMode = 'VERTICAL';
  dashboard.primaryAxisSizingMode = 'FIXED';
  dashboard.counterAxisSizingMode = 'FIXED';
  dashboard.resize(1440, 1168);
  dashboard.fills = [{type: 'SOLID', color: {r: 0.97, g: 0.98, b: 1}}];
  dashboard.itemSpacing = 0;

  // Header Section
  const header = figma.createFrame();
  header.name = "Header";
  header.layoutMode = 'HORIZONTAL'; header.primaryAxisSizingMode = 'FIXED'; header.counterAxisSizingMode = 'AUTO';
  header.resize(1440, 80); header.primaryAxisAlignItems = 'SPACE_BETWEEN'; header.counterAxisAlignItems = 'CENTER';
  header.paddingLeft = 32; header.paddingRight = 32; header.paddingTop = 16; header.paddingBottom = 16;
  header.fills = [{type: 'SOLID', color: {r:1,g:1,b:1}}]; header.strokes = [{type:'SOLID', color:{r:0.9,g:0.9,b:0.95}}]; header.strokeWeight = 1;
  const logoSection = figma.createFrame(); logoSection.name = "Logo Section"; logoSection.layoutMode='HORIZONTAL'; logoSection.primaryAxisSizingMode='AUTO'; logoSection.counterAxisSizingMode='AUTO'; logoSection.counterAxisAlignItems='CENTER'; logoSection.itemSpacing=12;
  const logoIcon = figma.createNodeFromSvg(
    `<svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\">`+
    `<path d=\"M12 3v18m-4-8a4 4 0 100-8 4 4 0 000 8zm8 0a4 4 0 100-8 4 4 0 000 8z\" stroke=\"#8B5CF6\" stroke-width=\"2\"/>`+
    `<path d=\"M8 7h8\" stroke=\"#8B5CF6\" stroke-width=\"2\"/>`+
    `</svg>`
  );
  const logoText = figma.createText(); logoText.name="Logo Text"; logoText.fontName={family:'Inter',style:'Bold'}; logoText.characters="數位遺囑系統 — Notary"; logoText.fontSize=20; logoText.fills=[{type:'SOLID',color:{r:0.1,g:0.1,b:0.2}}];
  logoSection.appendChild(logoIcon); logoSection.appendChild(logoText);
  const userSection = figma.createFrame(); userSection.name="User Section"; userSection.layoutMode='HORIZONTAL'; userSection.primaryAxisSizingMode='AUTO'; userSection.counterAxisSizingMode='AUTO'; userSection.counterAxisAlignItems='CENTER'; userSection.itemSpacing=16;
  const walletInfo = figma.createText(); walletInfo.name="Wallet Info"; walletInfo.fontName={family:'Inter',style:'Medium'}; walletInfo.characters="已連結錢包：did:ethr:0xNotaryXYZ…"; walletInfo.fontSize=14; walletInfo.fills=[{type:'SOLID',color:{r:0.4,g:0.4,b:0.5}}];
  const logoutButton = figma.createFrame(); logoutButton.name="Logout Button"; logoutButton.layoutMode='HORIZONTAL'; logoutButton.primaryAxisSizingMode='AUTO'; logoutButton.counterAxisSizingMode='AUTO'; logoutButton.counterAxisAlignItems='CENTER'; logoutButton.paddingTop=8; logoutButton.paddingBottom=8; logoutButton.paddingLeft=16; logoutButton.paddingRight=16; logoutButton.cornerRadius=6; logoutButton.fills=[{type:'SOLID',color:{r:0.95,g:0.95,b:0.97}}];
  const logoutText = figma.createText(); logoutText.name="Logout Text"; logoutText.fontName={family:'Inter',style:'Medium'}; logoutText.characters="登出"; logoutText.fontSize=14; logoutText.fills=[{type:'SOLID',color:{r:0.4,g:0.4,b:0.5}}];
  logoutButton.appendChild(logoutText); userSection.appendChild(walletInfo); userSection.appendChild(logoutButton);
  header.appendChild(logoSection); header.appendChild(userSection);

  // Top Navigation
  const topNav = figma.createFrame(); topNav.name="Top Navigation"; topNav.layoutMode='HORIZONTAL'; topNav.primaryAxisSizingMode='FIXED'; topNav.counterAxisSizingMode='AUTO'; topNav.resize(1440,64); topNav.counterAxisAlignItems='CENTER'; topNav.paddingLeft=32; topNav.paddingRight=32; topNav.paddingTop=16; topNav.paddingBottom=16; topNav.itemSpacing=32; topNav.fills=[{type:'SOLID',color:{r:0.99,g:0.99,b:1}}]; topNav.strokes=[{type:'SOLID',color:{r:0.9,g:0.9,b:0.95}}]; topNav.strokeWeight=1;
  const navItems = [
    {name:"待審核上傳遺囑",active:false},
    {name:"手動上傳 BundleA",active:false},
    {name:"審核預覽／下載申請",active:true},
    {name:"簽發 VC 管理",active:false},
    {name:"死亡後解鎖",active:false},
    {name:"系統設定",active:false}
  ];
  navItems.forEach(item=>{ const navItem=figma.createFrame(); navItem.name=`Nav - ${item.name}`; navItem.layoutMode='HORIZONTAL'; navItem.primaryAxisSizingMode='AUTO'; navItem.counterAxisSizingMode='AUTO'; navItem.counterAxisAlignItems='CENTER'; navItem.paddingTop=8; navItem.paddingBottom=8; navItem.paddingLeft=16; navItem.paddingRight=16; navItem.cornerRadius=6; if(item.active){ navItem.fills=[{type:'SOLID',color:{r:0.55,g:0.36,b:1},opacity:0.1}]; navItem.strokes=[{type:'SOLID',color:{r:0.55,g:0.36,b:1}}]; navItem.strokeWeight=2;} else { navItem.fills=[];} const navText=figma.createText(); navText.name="Nav Text"; navText.fontName={family:'Inter',style:item.active?'Medium':'Regular'}; navText.characters=item.name; navText.fontSize=14; navText.fills=[{type:'SOLID',color:item.active?{r:0.55,g:0.36,b:1}:{r:0.4,g:0.4,b:0.5}}]; navItem.appendChild(navText); topNav.appendChild(navItem); });

  // Main Content Area
  const mainContent = figma.createFrame();
  mainContent.name = "Main Content";
  mainContent.layoutMode = 'HORIZONTAL';
  mainContent.primaryAxisSizingMode = 'FIXED';
  mainContent.counterAxisSizingMode = 'FIXED';
  mainContent.resize(1440, 944);
  mainContent.paddingTop = 32;
  mainContent.paddingLeft = 32;
  mainContent.paddingRight = 32;
  mainContent.paddingBottom = 32;
  mainContent.itemSpacing = 24;
  mainContent.fills = [{type:'SOLID',color:{r:0.97,g:0.98,b:1}}];

  // Pending Requests Section
  const reqSection = figma.createFrame(); reqSection.name="Pending Requests Section"; reqSection.layoutMode='VERTICAL'; reqSection.primaryAxisSizingMode='AUTO'; reqSection.counterAxisSizingMode='FIXED'; reqSection.resize(700,736); reqSection.itemSpacing=24;
  const sectionTitle = figma.createText(); sectionTitle.name="Section Title"; sectionTitle.fontName={family:'Inter',style:'Bold'}; sectionTitle.characters="待審核預覽／下載申請 (Pending Requests)"; sectionTitle.fontSize=28; sectionTitle.fills=[{type:'SOLID',color:{r:0.1,g:0.1,b:0.2}}];
  const tableContainer = figma.createFrame(); tableContainer.name="Requests Table"; tableContainer.layoutMode='VERTICAL'; tableContainer.primaryAxisSizingMode='AUTO'; tableContainer.counterAxisSizingMode='FIXED'; tableContainer.resize(652,400); tableContainer.paddingTop=24; tableContainer.paddingLeft=24; tableContainer.paddingRight=24; tableContainer.paddingBottom=24; tableContainer.itemSpacing=0; tableContainer.cornerRadius=12; tableContainer.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}]; tableContainer.strokes=[{type:'SOLID',color:{r:0.9,g:0.9,b:0.95}}]; tableContainer.strokeWeight=1;
  // Table Header
  const tableHeader = figma.createFrame(); tableHeader.name="Table Header"; tableHeader.layoutMode='HORIZONTAL'; tableHeader.primaryAxisSizingMode='FIXED'; tableHeader.counterAxisSizingMode='AUTO'; tableHeader.resize(600,48); tableHeader.counterAxisAlignItems='CENTER'; tableHeader.paddingLeft=16; tableHeader.paddingRight=16; tableHeader.paddingTop=12; tableHeader.paddingBottom=12; tableHeader.fills=[{type:'SOLID',color:{r:0.98,g:0.98,b:1}}]; tableHeader.strokes=[{type:'SOLID',color:{r:0.9,g:0.9,b:0.95}}]; tableHeader.strokeWeight=1;
  const cols=[{name:'ID',width:80},{name:'Testator DID',width:220},{name:'Version',width:100},{name:'Type',width:100},{name:'Reason',width:152}]; cols.forEach(c=>{ const cell=figma.createFrame(); cell.name=`Header ${c.name}`; cell.layoutMode='HORIZONTAL'; cell.primaryAxisSizingMode='FIXED'; cell.counterAxisSizingMode='AUTO'; cell.resize(c.width,24); cell.counterAxisAlignItems='CENTER'; cell.paddingLeft=8; cell.paddingRight=8; const txt=figma.createText(); txt.name='Header Text'; txt.fontName={family:'Inter',style:'Bold'}; txt.characters=c.name; txt.fontSize=14; txt.fills=[{type:'SOLID',color:{r:0.2,g:0.2,b:0.3}}]; cell.appendChild(txt); tableHeader.appendChild(cell);} );
  tableContainer.appendChild(tableHeader);
  // Sample Rows
  const sample = [ {id:'1',did:'did:ethr:0xBBB…',version:'2',type:'preview',reason:'查看預覽'}, {id:'2',did:'did:ethr:0xCCC…',version:'1',type:'download',reason:'下載原文'} ];
  sample.forEach((r,i)=>{ const row=figma.createFrame(); row.name=`Row ${i+1}`; row.layoutMode='HORIZONTAL'; row.primaryAxisSizingMode='FIXED'; row.counterAxisSizingMode='AUTO'; row.resize(600,64); row.counterAxisAlignItems='CENTER'; row.paddingLeft=16; row.paddingRight=16; row.paddingTop=16; row.paddingBottom=16; row.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}]; row.strokes=[{type:'SOLID',color:{r:0.9,g:0.9,b:0.95}}]; row.strokeWeight=1; [r.id,r.did,r.version,r.type,r.reason].forEach((val,idx)=>{ const w=cols[idx].width; const cell=figma.createFrame(); cell.name=`Cell ${cols[idx].name}`; cell.layoutMode='HORIZONTAL'; cell.primaryAxisSizingMode='FIXED'; cell.counterAxisSizingMode='AUTO'; cell.resize(w,32); cell.counterAxisAlignItems='CENTER'; cell.paddingLeft=8; cell.paddingRight=8; const t=figma.createText(); t.name=`${cols[idx].name} Text`; t.fontName={family:'Inter',style:idx<3?'Regular':'Medium'}; t.characters=val; t.fontSize=14; t.fills=[{type:'SOLID',color:{r:0.1,g:0.1,b:0.2}}]; cell.appendChild(t); row.appendChild(cell);} ); tableContainer.appendChild(row);} );
  reqSection.appendChild(sectionTitle); reqSection.appendChild(tableContainer);

  // Review Panel Section (copy pattern from Pending Bundles)
  const reviewPanel = figma.createFrame(); reviewPanel.name="Review Panel"; reviewPanel.layoutMode='VERTICAL'; reviewPanel.primaryAxisSizingMode='FIXED'; reviewPanel.counterAxisSizingMode='FIXED'; reviewPanel.resize(684,736); reviewPanel.paddingTop=24; reviewPanel.paddingLeft=24; reviewPanel.paddingRight=24; reviewPanel.paddingBottom=24; reviewPanel.itemSpacing=24; reviewPanel.cornerRadius=12; reviewPanel.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}]; reviewPanel.strokes=[{type:'SOLID',color:{r:0.9,g:0.9,b:0.95}}]; reviewPanel.strokeWeight=1;
  const reviewTitle=figma.createText(); reviewTitle.name="Review Title"; reviewTitle.fontName={family:'Inter',style:'Bold'}; reviewTitle.characters="審核操作區"; reviewTitle.fontSize=24; reviewTitle.fills=[{type:'SOLID',color:{r:0.1,g:0.1,b:0.2}}];
  reviewPanel.appendChild(reviewTitle);

  // Decision Section
  const decisionSection = figma.createFrame();
  decisionSection.name = "Decision Section";
  decisionSection.layoutMode = 'VERTICAL';
  decisionSection.primaryAxisSizingMode = 'AUTO';
  decisionSection.counterAxisSizingMode = 'AUTO';
  decisionSection.itemSpacing = 16;
  decisionSection.paddingTop = 20;
  decisionSection.paddingLeft = 20;
  decisionSection.paddingRight = 20;
  decisionSection.paddingBottom = 20;
  decisionSection.cornerRadius = 8;
  decisionSection.fills = [{type: 'SOLID', color: {r: 0.99, g: 0.99, b: 1}}];
  decisionSection.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  decisionSection.strokeWeight = 1;

  // Buttons
  const buttonSection = figma.createFrame();
  buttonSection.name = "Button Section";
  buttonSection.layoutMode = 'HORIZONTAL';
  buttonSection.primaryAxisSizingMode = 'AUTO';
  buttonSection.counterAxisSizingMode = 'AUTO';
  buttonSection.itemSpacing = 16;

  const approveButton = figma.createFrame();
  approveButton.name = "Approve Button";
  approveButton.layoutMode = 'HORIZONTAL';
  approveButton.primaryAxisSizingMode = 'AUTO';
  approveButton.counterAxisSizingMode = 'AUTO';
  approveButton.counterAxisAlignItems = 'CENTER';
  approveButton.itemSpacing = 8;
  approveButton.paddingTop = 14;
  approveButton.paddingBottom = 14;
  approveButton.paddingLeft = 24;
  approveButton.paddingRight = 24;
  approveButton.cornerRadius = 8;
  approveButton.fills = [{type: 'SOLID', color: {r: 0.16, g: 0.74, b: 0.51}}];
  const approveText = figma.createText();
  approveText.name = "Approve Text";
  approveText.fontName = {family: 'Inter', style: 'Medium'};
  approveText.characters = "同意";
  approveText.fontSize = 16;
  approveText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  approveButton.appendChild(approveText);

  const rejectButton = figma.createFrame();
  rejectButton.name = "Reject Button";
  rejectButton.layoutMode = 'HORIZONTAL';
  rejectButton.primaryAxisSizingMode = 'AUTO';
  rejectButton.counterAxisSizingMode = 'AUTO';
  rejectButton.counterAxisAlignItems = 'CENTER';
  rejectButton.itemSpacing = 8;
  rejectButton.paddingTop = 14;
  rejectButton.paddingBottom = 14;
  rejectButton.paddingLeft = 24;
  rejectButton.paddingRight = 24;
  rejectButton.cornerRadius = 8;
  rejectButton.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  const rejectText = figma.createText();
  rejectText.name = "Reject Text";
  rejectText.fontName = {family: 'Inter', style: 'Regular'};
  rejectText.characters = "拒絕";
  rejectText.fontSize = 16;
  rejectText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];
  rejectButton.appendChild(rejectText);

  buttonSection.appendChild(approveButton);
  buttonSection.appendChild(rejectButton);
  decisionSection.appendChild(buttonSection);

  // Remark Field
  const remarkField = figma.createFrame();
  remarkField.name = "Remark Field";
  remarkField.layoutMode = 'VERTICAL';
  remarkField.primaryAxisSizingMode = 'AUTO';
  remarkField.counterAxisSizingMode = 'AUTO';
  remarkField.itemSpacing = 8;
  const remarkLabel = figma.createText();
  remarkLabel.name = "Remark Label";
  remarkLabel.fontName = {family: 'Inter', style: 'Medium'};
  remarkLabel.characters = "不通過原因 (notaryRemark)：";
  remarkLabel.fontSize = 14;
  remarkLabel.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];
  const remarkTextarea = figma.createFrame();
  remarkTextarea.name = "Remark Textarea";
  remarkTextarea.layoutMode = 'HORIZONTAL';
  remarkTextarea.primaryAxisSizingMode = 'FIXED';
  remarkTextarea.counterAxisSizingMode = 'FIXED';
  remarkTextarea.resize(600, 80);
  remarkTextarea.paddingTop = 12;
  remarkTextarea.paddingBottom = 12;
  remarkTextarea.paddingLeft = 12;
  remarkTextarea.paddingRight = 12;
  remarkTextarea.cornerRadius = 6;
  remarkTextarea.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
  remarkTextarea.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  remarkTextarea.strokeWeight = 1;
  const remarkPlaceholder = figma.createText();
  remarkPlaceholder.name = "Remark Placeholder";
  remarkPlaceholder.fontName = {family: 'Inter', style: 'Regular'};
  remarkPlaceholder.characters = "請填寫不通過原因...";
  remarkPlaceholder.fontSize = 14;
  remarkPlaceholder.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.65}}];
  remarkTextarea.appendChild(remarkPlaceholder);
  remarkField.appendChild(remarkLabel);
  remarkField.appendChild(remarkTextarea);
  decisionSection.appendChild(remarkField);

  // Confirm Reject Button
  const confirmRejectButton = figma.createFrame();
  confirmRejectButton.name = "Confirm Reject Button";
  confirmRejectButton.layoutMode = 'HORIZONTAL';
  confirmRejectButton.primaryAxisSizingMode = 'AUTO';
  confirmRejectButton.counterAxisSizingMode = 'AUTO';
  confirmRejectButton.counterAxisAlignItems = 'CENTER';
  confirmRejectButton.itemSpacing = 8;
  confirmRejectButton.paddingTop = 14;
  confirmRejectButton.paddingBottom = 14;
  confirmRejectButton.paddingLeft = 24;
  confirmRejectButton.paddingRight = 24;
  confirmRejectButton.cornerRadius = 8;
  confirmRejectButton.fills = [{type: 'SOLID', color: {r: 0.55, g: 0.36, b: 1}}];
  const confirmRejectText = figma.createText();
  confirmRejectText.name = "Confirm Reject Text";
  confirmRejectText.fontName = {family: 'Inter', style: 'Medium'};
  confirmRejectText.characters = "確認拒絕";
  confirmRejectText.fontSize = 16;
  confirmRejectText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  confirmRejectButton.appendChild(confirmRejectText);
  decisionSection.appendChild(confirmRejectButton);

  reviewPanel.appendChild(decisionSection);

  // Assemble Main Content
  mainContent.appendChild(reqSection);
  mainContent.appendChild(reviewPanel);

  dashboard.appendChild(header);
  dashboard.appendChild(topNav);
  dashboard.appendChild(mainContent);

  // Footer
  const footer = figma.createFrame(); footer.name="Footer"; footer.layoutMode='HORIZONTAL'; footer.primaryAxisSizingMode='FIXED'; footer.counterAxisSizingMode='AUTO'; footer.resize(1440,80); footer.primaryAxisAlignItems='CENTER'; footer.counterAxisAlignItems='CENTER'; footer.paddingLeft=32; footer.paddingRight=32; footer.fills=[{type:'SOLID',color:{r:0.95,g:0.95,b:0.97}}]; const fText=figma.createText(); fText.name="Footer Text"; fText.fontName={family:'Inter',style:'Regular'}; fText.characters="© 2025 Digital Will DApp - Notary Portal"; fText.fontSize=14; fText.fills=[{type:'SOLID',color:{r:0.4,g:0.4,b:0.5}}]; footer.appendChild(fText); dashboard.appendChild(footer);

  figma.currentPage.appendChild(dashboard);
})(); 