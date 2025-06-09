(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "Notary Dashboard - Upload BundleA";
  dashboard.layoutMode = 'VERTICAL';
  dashboard.primaryAxisSizingMode = 'FIXED';
  dashboard.counterAxisSizingMode = 'FIXED';
  dashboard.resize(1440, 1168);
  dashboard.fills = [{type: 'SOLID', color: {r: 0.97, g: 0.98, b: 1}}];
  dashboard.itemSpacing = 0;

  // Header Section
  const header = figma.createFrame();
  header.name = "Header";
  header.layoutMode = 'HORIZONTAL';
  header.primaryAxisSizingMode = 'FIXED';
  header.counterAxisSizingMode = 'AUTO';
  header.resize(1440, 80);
  header.primaryAxisAlignItems = 'SPACE_BETWEEN';
  header.counterAxisAlignItems = 'CENTER';
  header.paddingLeft = 32;
  header.paddingRight = 32;
  header.paddingTop = 16;
  header.paddingBottom = 16;
  header.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  header.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  header.strokeWeight = 1;
  
  // Logo Section
  const logoSection = figma.createFrame();
  logoSection.name = "Logo Section";
  logoSection.layoutMode = 'HORIZONTAL';
  logoSection.primaryAxisSizingMode = 'AUTO';
  logoSection.counterAxisSizingMode = 'AUTO';
  logoSection.counterAxisAlignItems = 'CENTER';
  logoSection.itemSpacing = 12;
  const logoIcon = figma.createNodeFromSvg(`
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v18m-4-8a4 4 0 100-8 4 4 0 000 8zm8 0a4 4 0 100-8 4 4 0 000 8z" stroke="#8B5CF6" stroke-width="2"/>
      <path d="M8 7h8" stroke="#8B5CF6" stroke-width="2"/>
    </svg>
  `);
  const logoText = figma.createText();
  logoText.name = "Logo Text";
  logoText.fontName = {family: 'Inter', style: 'Bold'};
  logoText.characters = "數位遺囑系統 — Notary";
  logoText.fontSize = 20;
  logoText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];
  logoSection.appendChild(logoIcon);
  logoSection.appendChild(logoText);
  
  // User Info Section
  const userSection = figma.createFrame();
  userSection.name = "User Section";
  userSection.layoutMode = 'HORIZONTAL';
  userSection.primaryAxisSizingMode = 'AUTO';
  userSection.counterAxisSizingMode = 'AUTO';
  userSection.counterAxisAlignItems = 'CENTER';
  userSection.itemSpacing = 16;
  const walletInfo = figma.createText();
  walletInfo.name = "Wallet Info";
  walletInfo.fontName = {family: 'Inter', style: 'Medium'};
  walletInfo.characters = "已連結錢包：did:ethr:0xNotaryXYZ…";
  walletInfo.fontSize = 14;
  walletInfo.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];
  const logoutButton = figma.createFrame();
  logoutButton.name = "Logout Button";
  logoutButton.layoutMode = 'HORIZONTAL';
  logoutButton.primaryAxisSizingMode = 'AUTO';
  logoutButton.counterAxisSizingMode = 'AUTO';
  logoutButton.counterAxisAlignItems = 'CENTER';
  logoutButton.paddingTop = 8;
  logoutButton.paddingBottom = 8;
  logoutButton.paddingLeft = 16;
  logoutButton.paddingRight = 16;
  logoutButton.cornerRadius = 6;
  logoutButton.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.97}}];
  const logoutText = figma.createText();
  logoutText.name = "Logout Text";
  logoutText.fontName = {family: 'Inter', style: 'Medium'};
  logoutText.characters = "登出";
  logoutText.fontSize = 14;
  logoutText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];
  logoutButton.appendChild(logoutText);
  userSection.appendChild(walletInfo);
  userSection.appendChild(logoutButton);
  
  header.appendChild(logoSection);
  header.appendChild(userSection);
  
  // Top Navigation
  const topNav = figma.createFrame();
  topNav.name = "Top Navigation";
  topNav.layoutMode = 'HORIZONTAL';
  topNav.primaryAxisSizingMode = 'FIXED';
  topNav.counterAxisSizingMode = 'AUTO';
  topNav.resize(1440, 64);
  topNav.counterAxisAlignItems = 'CENTER';
  topNav.paddingLeft = 32;
  topNav.paddingRight = 32;
  topNav.paddingTop = 16;
  topNav.paddingBottom = 16;
  topNav.itemSpacing = 32;
  topNav.fills = [{type: 'SOLID', color: {r: 0.99, g: 0.99, b: 1}}];
  topNav.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  topNav.strokeWeight = 1;
  const navItems = [
    { name: "待審核上傳遺囑", active: false },
    { name: "手動上傳 BundleA", active: true },
    { name: "審核預覽／下載申請", active: false },
    { name: "簽發 VC 管理", active: false },
    { name: "死亡後解鎖", active: false },
    { name: "系統設定", active: false }
  ];
  navItems.forEach(item => {
    const navItem = figma.createFrame();
    navItem.name = `Nav - ${item.name}`;
    navItem.layoutMode = 'HORIZONTAL';
    navItem.primaryAxisSizingMode = 'AUTO';
    navItem.counterAxisSizingMode = 'AUTO';
    navItem.counterAxisAlignItems = 'CENTER';
    navItem.paddingTop = 8;
    navItem.paddingBottom = 8;
    navItem.paddingLeft = 16;
    navItem.paddingRight = 16;
    navItem.cornerRadius = 6;
    if (item.active) {
      navItem.fills = [{type: 'SOLID', color: {r: 0.55, g: 0.36, b: 1}, opacity: 0.1}];
      navItem.strokes = [{type: 'SOLID', color: {r: 0.55, g: 0.36, b: 1}}];
      navItem.strokeWeight = 2;
    } else {
      navItem.fills = [];
    }
    const navText = figma.createText();
    navText.name = "Nav Text";
    navText.fontName = {family: 'Inter', style: item.active ? 'Medium' : 'Regular'};
    navText.characters = item.name;
    navText.fontSize = 14;
    navText.fills = [{type: 'SOLID', color: item.active ? {r: 0.55, g: 0.36, b: 1} : {r: 0.4, g: 0.4, b: 0.5}}];
    navItem.appendChild(navText);
    topNav.appendChild(navItem);
  });
  
  // Main Content Area
  const mainContent = figma.createFrame();
  mainContent.name = "Main Content";
  mainContent.layoutMode = 'VERTICAL';
  mainContent.primaryAxisSizingMode = 'FIXED';
  mainContent.counterAxisSizingMode = 'FIXED';
  mainContent.resize(1440, 944);
  mainContent.paddingTop = 32;
  mainContent.paddingLeft = 32;
  mainContent.paddingRight = 32;
  mainContent.paddingBottom = 32;
  mainContent.itemSpacing = 24;
  mainContent.fills = [{type: 'SOLID', color: {r: 0.97, g: 0.98, b: 1}}];

  // Upload BundleA Section (styled like Step 1 - File Upload)
  const uploadSection = figma.createFrame();
  uploadSection.name = "Upload BundleA Section";
  uploadSection.layoutMode = 'VERTICAL';
  uploadSection.primaryAxisSizingMode = 'AUTO';
  uploadSection.counterAxisSizingMode = 'FIXED';
  uploadSection.resize(1096, 300);
  uploadSection.paddingTop = 24;
  uploadSection.paddingLeft = 24;
  uploadSection.paddingRight = 24;
  uploadSection.paddingBottom = 24;
  uploadSection.itemSpacing = 20;
  uploadSection.cornerRadius = 12;
  uploadSection.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  uploadSection.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}, opacity: 1}];
  uploadSection.strokeWeight = 1;

  // Section Title
  const sectionTitle = figma.createText();
  sectionTitle.name = "Section Title";
  sectionTitle.fontName = {family: 'Inter', style: 'Bold'};
  sectionTitle.characters = "上傳 BundleA";
  sectionTitle.fontSize = 28;
  sectionTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];
  uploadSection.appendChild(sectionTitle);

  // Upload Area
  const uploadArea = figma.createFrame();
  uploadArea.name = "Upload BundleA Area";
  uploadArea.layoutMode = 'VERTICAL';
  uploadArea.primaryAxisSizingMode = 'AUTO';
  uploadArea.counterAxisSizingMode = 'FIXED';
  uploadArea.resize(1048, 180);
  uploadArea.primaryAxisAlignItems = 'CENTER';
  uploadArea.counterAxisAlignItems = 'CENTER';
  uploadArea.paddingTop = 40;
  uploadArea.paddingBottom = 40;
  uploadArea.paddingLeft = 32;
  uploadArea.paddingRight = 32;
  uploadArea.itemSpacing = 16;
  uploadArea.cornerRadius = 8;
  uploadArea.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
  uploadArea.strokes = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}, opacity: 1}];
  uploadArea.strokeWeight = 2;
  uploadArea.strokeDashPattern = [8, 8];

  const uploadIcon = figma.createNodeFromSvg(`
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#3B82F6" stroke-width="2"/>
      <polyline points="14,2 14,8 20,8" stroke="#3B82F6" stroke-width="2"/>
      <line x1="16" y1="13" x2="8" y2="13" stroke="#3B82F6" stroke-width="2"/>
      <line x1="16" y1="17" x2="8" y2="17" stroke="#3B82F6" stroke-width="2"/>
      <polyline points="10,9 9,9 8,9" stroke="#3B82F6" stroke-width="2"/>
    </svg>
  `);
  const uploadText = figma.createText();
  uploadText.name = "Upload Text";
  uploadText.fontName = {family: 'Inter', style: 'Medium'};
  uploadText.characters = "點擊或拖曳上傳 BundleA JSON";
  uploadText.fontSize = 18;
  uploadText.fills = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}}];
  const supportedFormats = figma.createText();
  supportedFormats.name = "Supported Formats";
  supportedFormats.fontName = {family: 'Inter', style: 'Regular'};
  supportedFormats.characters = "支援：JSON";
  supportedFormats.fontSize = 14;
  supportedFormats.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];
  uploadArea.appendChild(uploadIcon);
  uploadArea.appendChild(uploadText);
  uploadArea.appendChild(supportedFormats);

  uploadSection.appendChild(uploadArea);
  mainContent.appendChild(uploadSection);
  // Info Note
  const infoNote = figma.createFrame();
  infoNote.name = "Info Note";
  infoNote.layoutMode = 'VERTICAL';
  infoNote.primaryAxisSizingMode = 'AUTO';
  infoNote.counterAxisSizingMode = 'FIXED';
  infoNote.resize(1096, 104);
  infoNote.paddingTop = 16;
  infoNote.paddingBottom = 16;
  infoNote.paddingLeft = 16;
  infoNote.paddingRight = 16;
  infoNote.itemSpacing = 8;
  infoNote.cornerRadius = 8;
  infoNote.fills = [{type: 'SOLID', color: {r: 0.9, g: 0.95, b: 1}}];
  infoNote.strokes = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}, opacity: 0.3}];
  infoNote.strokeWeight = 1;
  const noteText = figma.createText();
  noteText.name = "Note Text";
  noteText.fontName = {family: 'Inter', style: 'Regular'};
  noteText.characters =
    `• 若您在律師或其他管道收到一份 BundleA JSON，可透過此介面上傳，系統會自動結構化並讓您審核。
• 上傳後就會與「待審核上傳遺囑 (Pending Bundles)」共用同一份列表，只是 status=\"pending_external\"，標籤不同以利辨識。`;
  noteText.fontSize = 14;
  noteText.lineHeight = {unit: 'PIXELS', value: 20};
  noteText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];
  infoNote.appendChild(noteText);
  mainContent.appendChild(infoNote);

  dashboard.appendChild(header);
  dashboard.appendChild(topNav);
  dashboard.appendChild(mainContent);
  // Footer
  const footer = figma.createFrame();
  footer.name = "Footer";
  footer.layoutMode = 'HORIZONTAL';
  footer.primaryAxisSizingMode = 'FIXED';
  footer.counterAxisSizingMode = 'AUTO';
  footer.resize(1440, 80);
  footer.primaryAxisAlignItems = 'CENTER';
  footer.counterAxisAlignItems = 'CENTER';
  footer.paddingLeft = 32;
  footer.paddingRight = 32;
  footer.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.97}}];
  const footerText = figma.createText();
  footerText.name = "Footer Text";
  footerText.fontName = {family: 'Inter', style: 'Regular'};
  footerText.characters = "© 2025 Digital Will DApp - Notary Portal";
  footerText.fontSize = 14;
  footerText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];
  footer.appendChild(footerText);
  dashboard.appendChild(footer);

  figma.currentPage.appendChild(dashboard);
})(); 