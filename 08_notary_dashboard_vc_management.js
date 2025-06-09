(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "Notary Dashboard - VC Management";
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
    {name: "待審核上傳遺囑", active: false},
    {name: "手動上傳 BundleA", active: false},
    {name: "審核預覽／下載申請", active: false},
    {name: "簽發 VC 管理", active: true},
    {name: "死亡後解鎖", active: false},
    {name: "系統設定", active: false}
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

  // Issued Credentials Section
  const issuedSection = figma.createFrame();
  issuedSection.name = "Issued Credentials Section";
  issuedSection.layoutMode = 'VERTICAL';
  issuedSection.primaryAxisSizingMode = 'AUTO';
  issuedSection.counterAxisSizingMode = 'FIXED';
  issuedSection.resize(700, 736);
  issuedSection.itemSpacing = 24;

  const issuedTitle = figma.createText();
  issuedTitle.name = "Section Title";
  issuedTitle.fontName = {family: 'Inter', style: 'Bold'};
  issuedTitle.characters = "已簽發 VC 列表 (Issued Credentials)";
  issuedTitle.fontSize = 28;
  issuedTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const tableContainer = figma.createFrame();
  tableContainer.name = "Issued Table";
  tableContainer.layoutMode = 'VERTICAL';
  tableContainer.primaryAxisSizingMode = 'AUTO';
  tableContainer.counterAxisSizingMode = 'FIXED';
  tableContainer.resize(652, 400);
  tableContainer.paddingTop = 24;
  tableContainer.paddingRight = 24;
  tableContainer.paddingLeft = 24;
  tableContainer.paddingBottom = 24;
  tableContainer.itemSpacing = 0;
  tableContainer.cornerRadius = 12;
  tableContainer.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  tableContainer.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  tableContainer.strokeWeight = 1;

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

  const cols = [
    {name: 'Credential ID', width: 300},
    {name: 'Type', width: 150},
    {name: 'Status', width: 150}
  ];

  cols.forEach(c => {
    const cell = figma.createFrame();
    cell.name = `Header ${c.name}`;
    cell.layoutMode = 'HORIZONTAL';
    cell.primaryAxisSizingMode = 'FIXED';
    cell.counterAxisSizingMode = 'AUTO';
    cell.resize(c.width, 24);
    cell.counterAxisAlignItems = 'CENTER';
    cell.paddingLeft = 8;
    cell.paddingRight = 8;

    const txt = figma.createText();
    txt.name = 'Header Text';
    txt.fontName = {family: 'Inter', style: 'Bold'};
    txt.characters = c.name;
    txt.fontSize = 14;
    txt.fills = [{type: 'SOLID', color: {r: 0.2, g: 0.2, b: 0.3}}];

    cell.appendChild(txt);
    tableHeader.appendChild(cell);
  });

  tableContainer.appendChild(tableHeader);

  // Sample Rows
  const sampleVCs = [
    {id: 'urn:uuid:1234', type: 'Notary', status: 'valid'},
    {id: 'urn:uuid:5678', type: 'Download', status: 'revoked'}
  ];

  sampleVCs.forEach((vc, i) => {
    const row = figma.createFrame();
    row.name = `Row ${i + 1}`;
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.resize(600, 64);
    row.counterAxisAlignItems = 'CENTER';
    row.paddingLeft = 16;
    row.paddingRight = 16;
    row.paddingTop = 16;
    row.paddingBottom = 16;
    row.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    row.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
    row.strokeWeight = 1;

    [vc.id, vc.type, vc.status].forEach((val, idx) => {
      const w = cols[idx].width;
      const cell = figma.createFrame();
      cell.name = `Cell ${cols[idx].name}`;
      cell.layoutMode = 'HORIZONTAL';
      cell.primaryAxisSizingMode = 'FIXED';
      cell.counterAxisSizingMode = 'AUTO';
      cell.resize(w, 32);
      cell.counterAxisAlignItems = 'CENTER';
      cell.paddingLeft = 8;
      cell.paddingRight = 8;

      const t = figma.createText();
      t.name = `${cols[idx].name} Text`;
      t.fontName = {family: 'Inter', style: idx === 2 ? 'Medium' : 'Regular'};
      t.characters = val;
      t.fontSize = 14;
      t.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

      cell.appendChild(t);
      row.appendChild(cell);
    });
    tableContainer.appendChild(row);
  });

  issuedSection.appendChild(issuedTitle);
  issuedSection.appendChild(tableContainer);

  // Revoke Panel Section
  const revokePanel = figma.createFrame();
  revokePanel.name = "Revoke Panel";
  revokePanel.layoutMode = 'VERTICAL';
  revokePanel.primaryAxisSizingMode = 'FIXED';
  revokePanel.counterAxisSizingMode = 'FIXED';
  revokePanel.resize(684, 736);
  revokePanel.paddingTop = 24;
  revokePanel.paddingLeft = 24;
  revokePanel.paddingRight = 24;
  revokePanel.paddingBottom = 24;
  revokePanel.itemSpacing = 24;
  revokePanel.cornerRadius = 12;
  revokePanel.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  revokePanel.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  revokePanel.strokeWeight = 1;

  const panelTitle = figma.createText();
  panelTitle.name = "Panel Title";
  panelTitle.fontName = {family: 'Inter', style: 'Bold'};
  panelTitle.characters = "操作區";
  panelTitle.fontSize = 24;
  panelTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const vcInfo = figma.createText();
  vcInfo.name = "Selected VC";
  vcInfo.fontName = {family: 'Inter', style: 'Medium'};
  vcInfo.characters = "已選擇：Credential ID urn:uuid:1234";
  vcInfo.fontSize = 16;
  vcInfo.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const revokeButton = figma.createFrame();
  revokeButton.name = "Revoke Button";
  revokeButton.layoutMode = 'HORIZONTAL';
  revokeButton.primaryAxisSizingMode = 'AUTO';
  revokeButton.counterAxisSizingMode = 'AUTO';
  revokeButton.counterAxisAlignItems = 'CENTER';
  revokeButton.itemSpacing = 8;
  revokeButton.paddingTop = 14;
  revokeButton.paddingBottom = 14;
  revokeButton.paddingLeft = 24;
  revokeButton.paddingRight = 24;
  revokeButton.cornerRadius = 8;
  revokeButton.fills = [{type: 'SOLID', color: {r: 0.93, g: 0.26, b: 0.21}}];

  const revokeText = figma.createText();
  revokeText.name = "Revoke Text";
  revokeText.fontName = {family: 'Inter', style: 'Medium'};
  revokeText.characters = "撤銷 VC";
  revokeText.fontSize = 16;
  revokeText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  revokeButton.appendChild(revokeText);
  revokePanel.appendChild(panelTitle);
  revokePanel.appendChild(vcInfo);
  revokePanel.appendChild(revokeButton);

  // Assemble Main Content
  mainContent.appendChild(issuedSection);
  mainContent.appendChild(revokePanel);

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

  const fText = figma.createText();
  fText.name = "Footer Text";
  fText.fontName = {family: 'Inter', style: 'Regular'};
  fText.characters = "© 2025 Digital Will DApp - Notary Portal";
  fText.fontSize = 14;
  fText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

  footer.appendChild(fText);
  dashboard.appendChild(footer);

  figma.currentPage.appendChild(dashboard);
})(); 