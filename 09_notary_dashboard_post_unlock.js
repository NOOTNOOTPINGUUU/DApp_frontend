(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "Notary Dashboard - Post-Unlock";
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

  // User Section
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
    { name: "手動上傳 BundleA", active: false },
    { name: "審核預覽／下載申請", active: false },
    { name: "簽發 VC 管理", active: false },
    { name: "死亡後解鎖", active: true },
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
  mainContent.layoutMode = 'HORIZONTAL';
  mainContent.primaryAxisSizingMode = 'FIXED';
  mainContent.counterAxisSizingMode = 'FIXED';
  mainContent.resize(1440, 944);
  mainContent.paddingTop = 32;
  mainContent.paddingLeft = 32;
  mainContent.paddingRight = 32;
  mainContent.paddingBottom = 32;
  mainContent.itemSpacing = 24;
  mainContent.fills = [{type: 'SOLID', color: {r: 0.97, g: 0.98, b: 1}}];

  // Unlocks List Section
  const unlocksSection = figma.createFrame();
  unlocksSection.name = "Unlocks Section";
  unlocksSection.layoutMode = 'VERTICAL';
  unlocksSection.primaryAxisSizingMode = 'FIXED';
  unlocksSection.counterAxisSizingMode = 'FIXED';
  unlocksSection.resize(700, 736);
  unlocksSection.itemSpacing = 24;

  const sectionTitle = figma.createText();
  sectionTitle.name = "Section Title";
  sectionTitle.fontName = {family: 'Inter', style: 'Bold'};
  sectionTitle.characters = "待解鎖遺囑列表 (Pending Unlocks)";
  sectionTitle.fontSize = 28;
  sectionTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const unlocksTable = figma.createFrame();
  unlocksTable.name = "Unlocks Table";
  unlocksTable.layoutMode = 'VERTICAL';
  unlocksTable.primaryAxisSizingMode = 'AUTO';
  unlocksTable.counterAxisSizingMode = 'FIXED';
  unlocksTable.resize(652, 400);
  unlocksTable.paddingTop = 24;
  unlocksTable.paddingLeft = 24;
  unlocksTable.paddingRight = 24;
  unlocksTable.paddingBottom = 24;
  unlocksTable.itemSpacing = 0;
  unlocksTable.cornerRadius = 12;
  unlocksTable.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  unlocksTable.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  unlocksTable.strokeWeight = 1;

  // Table Header
  const tableHeader = figma.createFrame();
  tableHeader.name = "Table Header";
  tableHeader.layoutMode = 'HORIZONTAL';
  tableHeader.primaryAxisSizingMode = 'FIXED';
  tableHeader.counterAxisSizingMode = 'AUTO';
  tableHeader.resize(600, 48);
  tableHeader.counterAxisAlignItems = 'CENTER';
  tableHeader.paddingLeft = 16;
  tableHeader.paddingRight = 16;
  tableHeader.paddingTop = 12;
  tableHeader.paddingBottom = 12;
  tableHeader.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
  tableHeader.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  tableHeader.strokeWeight = 1;

  const headerCols = [
    {name: 'Testator DID', width: 220},
    {name: '版本', width: 100},
    {name: '狀態', width: 100}
  ];

  headerCols.forEach(col => {
    const cell = figma.createFrame();
    cell.name = `Header ${col.name}`;
    cell.layoutMode = 'HORIZONTAL';
    cell.primaryAxisSizingMode = 'FIXED';
    cell.counterAxisSizingMode = 'AUTO';
    cell.resize(col.width, 24);
    cell.counterAxisAlignItems = 'CENTER';
    cell.paddingLeft = 8;
    cell.paddingRight = 8;

    const txt = figma.createText();
    txt.name = "Header Text";
    txt.fontName = {family: 'Inter', style: 'Bold'};
    txt.characters = col.name;
    txt.fontSize = 14;
    txt.fills = [{type: 'SOLID', color: {r: 0.2, g: 0.2, b: 0.3}}];

    cell.appendChild(txt);
    tableHeader.appendChild(cell);
  });

  unlocksTable.appendChild(tableHeader);

  // Sample Rows
  const sampleUnlocks = [
    {did: "did:ethr:0xBBB…", version: "2", status: "pending"}
  ];

  sampleUnlocks.forEach((unlock, i) => {
    const row = figma.createFrame();
    row.name = `Unlock Row ${i + 1}`;
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.resize(600, 64);
    row.counterAxisAlignItems = 'CENTER';
    row.paddingLeft = 16;
    row.paddingRight = 16;
    row.paddingTop = 16;
    row.paddingBottom = 16;
    row.fills = [{type: 'SOLID', color: i % 2 === 0 ? {r: 0.99, g: 0.99, b: 1} : {r: 1, g: 1, b: 1}}];
    row.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
    row.strokeWeight = 1;

    // DID Cell
    const didCell = figma.createFrame();
    didCell.name = "DID Cell";
    didCell.layoutMode = 'HORIZONTAL';
    didCell.primaryAxisSizingMode = 'FIXED';
    didCell.counterAxisSizingMode = 'AUTO';
    didCell.resize(220, 32);
    didCell.counterAxisAlignItems = 'CENTER';
    didCell.paddingLeft = 8;
    didCell.paddingRight = 8;
    const didText = figma.createText();
    didText.name = "DID Text";
    didText.fontName = {family: 'Inter', style: 'Regular'};
    didText.characters = unlock.did;
    didText.fontSize = 14;
    didText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];
    didCell.appendChild(didText);
    row.appendChild(didCell);

    // Version Cell
    const verCell = figma.createFrame();
    verCell.name = "Version Cell";
    verCell.layoutMode = 'HORIZONTAL';
    verCell.primaryAxisSizingMode = 'FIXED';
    verCell.counterAxisSizingMode = 'AUTO';
    verCell.resize(100, 32);
    verCell.counterAxisAlignItems = 'CENTER';
    verCell.paddingLeft = 8;
    verCell.paddingRight = 8;
    const verText = figma.createText();
    verText.name = "Version Text";
    verText.fontName = {family: 'Inter', style: 'Regular'};
    verText.characters = unlock.version;
    verText.fontSize = 14;
    verText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];
    verCell.appendChild(verText);
    row.appendChild(verCell);

    // Status Cell
    const statCell = figma.createFrame();
    statCell.name = "Status Cell";
    statCell.layoutMode = 'HORIZONTAL';
    statCell.primaryAxisSizingMode = 'FIXED';
    statCell.counterAxisSizingMode = 'AUTO';
    statCell.resize(100, 32);
    statCell.counterAxisAlignItems = 'CENTER';
    statCell.paddingLeft = 8;
    statCell.paddingRight = 8;
    const statText = figma.createText();
    statText.name = "Status Text";
    statText.fontName = {family: 'Inter', style: 'Regular'};
    statText.characters = unlock.status;
    statText.fontSize = 14;
    statText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];
    statCell.appendChild(statText);
    row.appendChild(statCell);

    unlocksTable.appendChild(row);
  });

  unlocksSection.appendChild(sectionTitle);
  unlocksSection.appendChild(unlocksTable);

  // Unlock Panel Section
  const unlockPanel = figma.createFrame();
  unlockPanel.name = "Unlock Panel";
  unlockPanel.layoutMode = 'VERTICAL';
  unlockPanel.primaryAxisSizingMode = 'FIXED';
  unlockPanel.counterAxisSizingMode = 'FIXED';
  unlockPanel.resize(684, 736);
  unlockPanel.paddingTop = 24;
  unlockPanel.paddingLeft = 24;
  unlockPanel.paddingRight = 24;
  unlockPanel.paddingBottom = 24;
  unlockPanel.itemSpacing = 24;
  unlockPanel.cornerRadius = 12;
  unlockPanel.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  unlockPanel.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  unlockPanel.strokeWeight = 1;

  const panelTitle = figma.createText();
  panelTitle.name = "Panel Title";
  panelTitle.fontName = {family: 'Inter', style: 'Bold'};
  panelTitle.characters = "操作區";
  panelTitle.fontSize = 24;
  panelTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const selectedInfo = figma.createText();
  selectedInfo.name = "Selected Unlock";
  selectedInfo.fontName = {family: 'Inter', style: 'Medium'};
  selectedInfo.characters = "已選擇：bnd-123";
  selectedInfo.fontSize = 16;
  selectedInfo.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const unlockButton = figma.createFrame();
  unlockButton.name = "Unlock Button";
  unlockButton.layoutMode = 'HORIZONTAL';
  unlockButton.primaryAxisSizingMode = 'AUTO';
  unlockButton.counterAxisSizingMode = 'AUTO';
  unlockButton.counterAxisAlignItems = 'CENTER';
  unlockButton.itemSpacing = 8;
  unlockButton.paddingTop = 14;
  unlockButton.paddingBottom = 14;
  unlockButton.paddingLeft = 24;
  unlockButton.paddingRight = 24;
  unlockButton.cornerRadius = 8;
  unlockButton.fills = [{type: 'SOLID', color: {r: 0.16, g: 0.74, b: 0.51}}];

  const unlockText = figma.createText();
  unlockText.name = "Unlock Button Text";
  unlockText.fontName = {family: 'Inter', style: 'Medium'};
  unlockText.characters = "解鎖並上傳明文";
  unlockText.fontSize = 16;
  unlockText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  unlockButton.appendChild(unlockText);
  unlockPanel.appendChild(panelTitle);
  unlockPanel.appendChild(selectedInfo);
  unlockPanel.appendChild(unlockButton);

  // Assemble Main Content
  mainContent.appendChild(unlocksSection);
  mainContent.appendChild(unlockPanel);

  // Assemble Dashboard
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