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
  mainContent.counterAxisSizingMode = 'AUTO';
  mainContent.resize(1440, 944);
  mainContent.paddingTop = 32;
  mainContent.paddingLeft = 32;
  mainContent.paddingRight = 32;
  mainContent.paddingBottom = 32;
  mainContent.itemSpacing = 24;
  mainContent.fills = [{type: 'SOLID', color: {r: 0.97, g: 0.98, b: 1}}];

  // Unlocks List Section
  const unlockSection = figma.createFrame();
  unlockSection.name = "Unlocks Section";
  unlockSection.layoutMode = 'VERTICAL';
  unlockSection.primaryAxisSizingMode = 'AUTO';
  unlockSection.counterAxisSizingMode = 'FIXED';
  unlockSection.resize(700, 736);
  unlockSection.itemSpacing = 24;
  const sectionTitle = figma.createText();
  sectionTitle.name = "Section Title";
  sectionTitle.fontName = {family: 'Inter', style: 'Bold'};
  sectionTitle.characters = "待解鎖遺囑列表 (Pending Unlocks)";
  sectionTitle.fontSize = 28;
  sectionTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Unlocks Table
  const unlocksTable = figma.createFrame();
  unlocksTable.name = "Unlocks Table";
  unlocksTable.layoutMode = 'VERTICAL';
  unlocksTable.primaryAxisSizingMode = 'AUTO';
  unlocksTable.counterAxisSizingMode = 'FIXED';

  // Add Table Header
  const tableHeader = figma.createFrame();
  tableHeader.name = "Table Header";
  tableHeader.layoutMode = 'HORIZONTAL';
  tableHeader.primaryAxisSizingMode = 'FIXED';
  tableHeader.counterAxisSizingMode = 'AUTO';
  tableHeader.resize(652, 48);
  tableHeader.counterAxisAlignItems = 'CENTER';
  tableHeader.paddingLeft = 16;
  tableHeader.paddingRight = 16;
  tableHeader.paddingTop = 12;
  tableHeader.paddingBottom = 12;
  tableHeader.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
  tableHeader.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  tableHeader.strokeWeight = 1;

  const headerColumns = [
    { name: "Bundle ID", width: 120 },
    { name: "Unlock Condition", width: 250 },
    { name: "IPFS Hash", width: 200 },
    { name: "操作", width: 132 }
  ];

  headerColumns.forEach(column => {
    const headerCell = figma.createFrame();
    headerCell.name = `Header ${column.name}`;
    headerCell.layoutMode = 'HORIZONTAL';
    headerCell.primaryAxisSizingMode = 'FIXED';
    headerCell.counterAxisSizingMode = 'AUTO';
    headerCell.resize(column.width, 24);
    headerCell.counterAxisAlignItems = 'CENTER';
    headerCell.paddingLeft = 8;
    headerCell.paddingRight = 8;

    const headerText = figma.createText();
    headerText.name = "Header Text";
    headerText.fontName = {family: 'Inter', style: 'Bold'};
    headerText.characters = column.name;
    headerText.fontSize = 14;
    headerText.fills = [{type: 'SOLID', color: {r: 0.2, g: 0.2, b: 0.3}}];

    headerCell.appendChild(headerText);
    tableHeader.appendChild(headerCell);
  });

  unlocksTable.appendChild(tableHeader);

  // Add Sample Unlock Rows
  const sampleUnlocks = [
    { bundleId: "bnd-123", unlockCondition: "死亡確定", ipfsHash: "QmABC123..." }
  ];
  sampleUnlocks.forEach((unlock, index) => {
    const dataRow = figma.createFrame();
    dataRow.name = `Unlock Row ${index + 1}`;
    dataRow.layoutMode = 'HORIZONTAL';
    dataRow.primaryAxisSizingMode = 'FIXED';
    dataRow.counterAxisSizingMode = 'AUTO';
    dataRow.resize(652, 64);
    dataRow.counterAxisAlignItems = 'CENTER';
    dataRow.paddingLeft = 16;
    dataRow.paddingRight = 16;
    dataRow.paddingTop = 16;
    dataRow.paddingBottom = 16;
    dataRow.fills = [{type: 'SOLID', color: index % 2 === 0 ? {r: 0.99, g: 0.99, b: 1} : {r: 1, g: 1, b: 1}}];
    dataRow.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
    dataRow.strokeWeight = 1;

    // Bundle ID Cell
    const bundleIdCell = figma.createFrame();
    bundleIdCell.name = "Bundle ID Cell";
    bundleIdCell.layoutMode = 'HORIZONTAL';
    bundleIdCell.primaryAxisSizingMode = 'FIXED';
    bundleIdCell.counterAxisSizingMode = 'AUTO';
    bundleIdCell.resize(120, 32);
    bundleIdCell.counterAxisAlignItems = 'CENTER';
    bundleIdCell.paddingLeft = 8;
    bundleIdCell.paddingRight = 8;
    const bundleIdText = figma.createText();
    bundleIdText.name = "Bundle ID Text";
    bundleIdText.fontName = {family: 'Inter', style: 'Medium'};
    bundleIdText.characters = unlock.bundleId;
    bundleIdText.fontSize = 14;
    bundleIdText.fills = [{type: 'SOLID', color: {r: 0.55, g: 0.36, b: 1}}];
    bundleIdCell.appendChild(bundleIdText);
    dataRow.appendChild(bundleIdCell);

    // Unlock Condition Cell
    const conditionCell = figma.createFrame();
    conditionCell.name = "Condition Cell";
    conditionCell.layoutMode = 'HORIZONTAL';
    conditionCell.primaryAxisSizingMode = 'FIXED';
    conditionCell.counterAxisSizingMode = 'AUTO';
    conditionCell.resize(250, 32);
    conditionCell.counterAxisAlignItems = 'CENTER';
    conditionCell.paddingLeft = 8;
    conditionCell.paddingRight = 8;
    const conditionText = figma.createText();
    conditionText.name = "Condition Text";
    conditionText.fontName = {family: 'Inter', style: 'Regular'};
    conditionText.characters = unlock.unlockCondition;
    conditionText.fontSize = 14;
    conditionText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];
    conditionCell.appendChild(conditionText);
    dataRow.appendChild(conditionCell);

    // IPFS Hash Cell
    const hashCell = figma.createFrame();
    hashCell.name = "Hash Cell";
    hashCell.layoutMode = 'HORIZONTAL';
    hashCell.primaryAxisSizingMode = 'FIXED';
    hashCell.counterAxisSizingMode = 'AUTO';
    hashCell.resize(200, 32);
    hashCell.counterAxisAlignItems = 'CENTER';
    hashCell.paddingLeft = 8;
    hashCell.paddingRight = 8;
    const hashText = figma.createText();
    hashText.name = "Hash Text";
    hashText.fontName = {family: 'Inter', style: 'Regular'};
    hashText.characters = unlock.ipfsHash;
    hashText.fontSize = 14;
    hashText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];
    hashCell.appendChild(hashText);
    dataRow.appendChild(hashCell);

    // Action Cell
    const actionCell = figma.createFrame();
    actionCell.name = "Action Cell";
    actionCell.layoutMode = 'HORIZONTAL';
    actionCell.primaryAxisSizingMode = 'FIXED';
    actionCell.counterAxisSizingMode = 'AUTO';
    actionCell.resize(132, 32);
    actionCell.counterAxisAlignItems = 'CENTER';
    actionCell.paddingLeft = 8;
    actionCell.paddingRight = 8;
    const openButton = figma.createFrame();
    openButton.name = "Open Button";
    openButton.layoutMode = 'HORIZONTAL';
    openButton.primaryAxisSizingMode = 'AUTO';
    openButton.counterAxisSizingMode = 'AUTO';
    openButton.counterAxisAlignItems = 'CENTER';
    openButton.paddingTop = 6;
    openButton.paddingBottom = 6;
    openButton.paddingLeft = 12;
    openButton.paddingRight = 12;
    openButton.cornerRadius = 6;
    openButton.fills = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}}];
    const openText = figma.createText();
    openText.name = "Open Text";
    openText.fontName = {family: 'Inter', style: 'Medium'};
    openText.characters = "查看";
    openText.fontSize = 12;
    openText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    openButton.appendChild(openText);
    actionCell.appendChild(openButton);
    dataRow.appendChild(actionCell);

    unlocksTable.appendChild(dataRow);
  });

  // Assemble Unlock Section
  unlockSection.appendChild(sectionTitle);
  unlockSection.appendChild(unlocksTable);
  // Assemble Main Content
  mainContent.appendChild(unlockSection);
  // Assemble Dashboard
  dashboard.appendChild(header);
  dashboard.appendChild(topNav);
  dashboard.appendChild(mainContent);
  // Append dashboard to page
  figma.currentPage.appendChild(dashboard);
})(); 