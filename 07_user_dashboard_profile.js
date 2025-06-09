(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "User Dashboard - Profile";
  dashboard.layoutMode = 'VERTICAL';
  dashboard.primaryAxisSizingMode = 'FIXED';
  dashboard.counterAxisSizingMode = 'FIXED';
  dashboard.resize(1440, 1104);
  dashboard.fills = [{type: 'SOLID', color: {r: 0.97, g: 0.98, b: 1}}];
  dashboard.itemSpacing = 0;

  // Header
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

  const logoIcon = figma.createNodeFromSvg(
    `<svg width="32" height="32" viewBox="0 0 24 24" fill="none">` +
    `<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" ` +
    `stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
    `</svg>`
  );

  const logoText = figma.createText();
  logoText.name = "Logo Text";
  logoText.fontName = {family: 'Inter', style: 'Bold'};
  logoText.characters = "數位遺囑系統 — 一般使用者";
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
  walletInfo.characters = "已連結錢包：did:ethr:0xAAA…";
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

  // Main Content Area
  const mainContent = figma.createFrame();
  mainContent.name = "Main Content";
  mainContent.layoutMode = 'HORIZONTAL';
  mainContent.primaryAxisSizingMode = 'FIXED';
  mainContent.counterAxisSizingMode = 'FIXED';
  mainContent.resize(1440, 944);
  mainContent.itemSpacing = 0;
  mainContent.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];

  // Sidebar
  const sidebar = figma.createFrame();
  sidebar.name = "Sidebar";
  sidebar.layoutMode = 'VERTICAL';
  sidebar.primaryAxisSizingMode = 'FIXED';
  sidebar.counterAxisSizingMode = 'FIXED';
  sidebar.resize(280, 944);
  sidebar.paddingTop = 24;
  sidebar.paddingLeft = 24;
  sidebar.paddingRight = 24;
  sidebar.itemSpacing = 8;
  sidebar.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  sidebar.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  sidebar.strokeWeight = 1;

  const menuItems = [
    {name: "撰寫並打包遺囑", active: false, icon: "📝"},
    {name: "提出預覽／下載請求", active: false, icon: "👁️"},
    {name: "我的請求狀態", active: false, icon: "📋"},
    {name: "個人設定", active: true, icon: "⚙️"}
  ];

  menuItems.forEach(item => {
    const menuItem = figma.createFrame();
    menuItem.name = `Menu - ${item.name}`;
    menuItem.layoutMode = 'HORIZONTAL';
    menuItem.primaryAxisSizingMode = 'FIXED';
    menuItem.counterAxisSizingMode = 'AUTO';
    menuItem.resize(232, 48);
    menuItem.counterAxisAlignItems = 'CENTER';
    menuItem.paddingLeft = 16;
    menuItem.paddingRight = 16;
    menuItem.paddingTop = 12;
    menuItem.paddingBottom = 12;
    menuItem.itemSpacing = 12;
    menuItem.cornerRadius = 8;

    if (item.active) {
      menuItem.fills = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}, opacity: 0.1}];
      menuItem.strokes = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}}];
      menuItem.strokeWeight = 1;
    } else {
      menuItem.fills = [];
    }

    const menuText = figma.createText();
    menuText.name = "Menu Text";
    menuText.fontName = {family: 'Inter', style: item.active ? 'Medium' : 'Regular'};
    menuText.characters = item.name;
    menuText.fontSize = 14;
    menuText.fills = [{type: 'SOLID', color: item.active ? {r: 0.23, g: 0.51, b: 1} : {r: 0.4, g: 0.4, b: 0.5}}];

    menuItem.appendChild(menuText);
    sidebar.appendChild(menuItem);
  });

  // Content Area
  const contentArea = figma.createFrame();
  contentArea.name = "Content Area";
  contentArea.layoutMode = 'VERTICAL';
  contentArea.primaryAxisSizingMode = 'FIXED';
  contentArea.counterAxisSizingMode = 'FIXED';
  contentArea.resize(1160, 944);
  contentArea.paddingTop = 32;
  contentArea.paddingLeft = 32;
  contentArea.paddingRight = 32;
  contentArea.paddingBottom = 32;
  contentArea.itemSpacing = 32;

  // Page Title
  const pageTitle = figma.createText();
  pageTitle.name = "Page Title";
  pageTitle.fontName = {family: 'Inter', style: 'Bold'};
  pageTitle.characters = "個人設定 (Profile)";
  pageTitle.fontSize = 28;
  pageTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // DID Field
  const didFrame = figma.createFrame();
  didFrame.name = "DID Field";
  didFrame.layoutMode = 'HORIZONTAL';
  didFrame.primaryAxisSizingMode = 'AUTO';
  didFrame.counterAxisSizingMode = 'AUTO';
  didFrame.itemSpacing = 16;

  const didLabel = figma.createText();
  didLabel.name = "DID Label";
  didLabel.fontName = {family: 'Inter', style: 'Medium'};
  didLabel.characters = "DID：";
  didLabel.fontSize = 16;
  didLabel.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const didValue = figma.createText();
  didValue.name = "DID Value";
  didValue.fontName = {family: 'Inter', style: 'Regular'};
  didValue.characters = "did:ethr:0xAAA…";
  didValue.fontSize = 16;
  didValue.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

  didFrame.appendChild(didLabel);
  didFrame.appendChild(didValue);

  // Status Field
  const statusFrame = figma.createFrame();
  statusFrame.name = "Status Field";
  statusFrame.layoutMode = 'HORIZONTAL';
  statusFrame.primaryAxisSizingMode = 'AUTO';
  statusFrame.counterAxisSizingMode = 'AUTO';
  statusFrame.itemSpacing = 16;

  const statusLabel = figma.createText();
  statusLabel.name = "Status Label";
  statusLabel.fontName = {family: 'Inter', style: 'Medium'};
  statusLabel.characters = "Testator 身分：";
  statusLabel.fontSize = 16;
  statusLabel.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const statusValue = figma.createText();
  statusValue.name = "Status Value";
  statusValue.fontName = {family: 'Inter', style: 'Regular'};
  statusValue.characters = "未成為 Testator";
  statusValue.fontSize = 16;
  statusValue.fills = [{type: 'SOLID', color: {r: 0.94, g: 0.26, b: 0.21}}];

  statusFrame.appendChild(statusLabel);
  statusFrame.appendChild(statusValue);

  // Contact Info
  const contactFrame = figma.createFrame();
  contactFrame.name = "Contact Fields";
  contactFrame.layoutMode = 'VERTICAL';
  contactFrame.primaryAxisSizingMode = 'AUTO';
  contactFrame.counterAxisSizingMode = 'AUTO';
  contactFrame.itemSpacing = 16;

  ['Email', '電話'].forEach(field => {
    const row = figma.createFrame();
    row.name = `${field} Row`;
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO';
    row.itemSpacing = 16;

    const lbl = figma.createText();
    lbl.name = `${field} Label`;
    lbl.fontName = {family: 'Inter', style: 'Medium'};
    lbl.characters = `${field}：`;
    lbl.fontSize = 16;
    lbl.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

    const val = figma.createText();
    val.name = `${field} Value`;
    val.fontName = {family: 'Inter', style: 'Regular'};
    val.characters = `請填寫${field}`;
    val.fontSize = 16;
    val.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

    row.appendChild(lbl);
    row.appendChild(val);
    contactFrame.appendChild(row);
  });

  // VCs Section
  const vcSection = figma.createFrame();
  vcSection.name = "VC Section";
  vcSection.layoutMode = 'VERTICAL';
  vcSection.primaryAxisSizingMode = 'AUTO';
  vcSection.counterAxisSizingMode = 'AUTO';
  vcSection.itemSpacing = 24;

  ['Testator VC', 'Third-Party VC'].forEach(title => {
    const titleTxt = figma.createText();
    titleTxt.name = `${title} Title`;
    titleTxt.fontName = {family: 'Inter', style: 'Bold'};
    titleTxt.characters = title;
    titleTxt.fontSize = 18;
    titleTxt.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

    const listFrame = figma.createFrame();
    listFrame.name = `${title} List`;
    listFrame.layoutMode = 'VERTICAL';
    listFrame.primaryAxisSizingMode = 'AUTO';
    listFrame.counterAxisSizingMode = 'AUTO';
    listFrame.itemSpacing = 8;

    // Sample Items
    ['VC1', 'VC2'].forEach(v => {
      const item = figma.createText();
      item.name = `VC Item`;
      item.fontName = {family: 'Inter', style: 'Regular'};
      item.characters = v;
      item.fontSize = 14;
      item.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];
      listFrame.appendChild(item);
    });

    vcSection.appendChild(titleTxt);
    vcSection.appendChild(listFrame);
  });

  // Assemble Content
  contentArea.appendChild(pageTitle);
  contentArea.appendChild(didFrame);
  contentArea.appendChild(statusFrame);
  contentArea.appendChild(contactFrame);
  contentArea.appendChild(vcSection);

  mainContent.appendChild(sidebar);
  mainContent.appendChild(contentArea);

  dashboard.appendChild(header);
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
  footerText.characters = "© 2025 Digital Will DApp";
  footerText.fontSize = 14;
  footerText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

  footer.appendChild(footerText);
  dashboard.appendChild(footer);

  figma.currentPage.appendChild(dashboard);
})(); 