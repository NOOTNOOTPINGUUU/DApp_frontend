(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "Notary Dashboard - System Settings";
  dashboard.layoutMode = 'VERTICAL';
  dashboard.primaryAxisSizingMode = 'FIXED';
  dashboard.counterAxisSizingMode = 'FIXED';
  dashboard.resize(1440, 1104);
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

  // Logo and User Info
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
    { name: "死亡後解鎖", active: false },
    { name: "系統設定", active: true }
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

  // Main Content
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
  mainContent.itemSpacing = 32;
  mainContent.fills = [{type: 'SOLID', color: {r: 0.97, g: 0.98, b: 1}}];

  // Page Title
  const pageTitle = figma.createText();
  pageTitle.name = "Page Title";
  pageTitle.fontName = {family: 'Inter', style: 'Bold'};
  pageTitle.characters = "系統設定 (Settings)";
  pageTitle.fontSize = 28;
  pageTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Network Setting Field
  const networkFrame = figma.createFrame();
  networkFrame.name = "Network Setting";

  // Add Network Controls
  networkFrame.layoutMode = 'HORIZONTAL';
  networkFrame.primaryAxisSizingMode = 'AUTO';
  networkFrame.counterAxisSizingMode = 'AUTO';
  networkFrame.counterAxisAlignItems = 'CENTER';
  networkFrame.itemSpacing = 16;
  networkFrame.paddingTop = 16;
  networkFrame.paddingBottom = 16;

  const networkLabel = figma.createText();
  networkLabel.name = "Network Label";
  networkLabel.fontName = {family: 'Inter', style: 'Medium'};
  networkLabel.characters = "Network:";
  networkLabel.fontSize = 16;
  networkLabel.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const networkDropdown = figma.createFrame();
  networkDropdown.name = "Network Dropdown";
  networkDropdown.layoutMode = 'HORIZONTAL';
  networkDropdown.primaryAxisSizingMode = 'FIXED';
  networkDropdown.counterAxisSizingMode = 'AUTO';
  networkDropdown.resize(300, 40);
  networkDropdown.counterAxisAlignItems = 'CENTER';
  networkDropdown.primaryAxisAlignItems = 'SPACE_BETWEEN';
  networkDropdown.paddingLeft = 12;
  networkDropdown.paddingRight = 12;
  networkDropdown.cornerRadius = 6;
  networkDropdown.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
  networkDropdown.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  networkDropdown.strokeWeight = 1;

  const dropdownText = figma.createText();
  dropdownText.name = "Dropdown Text";
  dropdownText.fontName = {family: 'Inter', style: 'Regular'};
  dropdownText.characters = "Mainnet";
  dropdownText.fontSize = 14;
  dropdownText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

  const dropdownIcon = figma.createNodeFromSvg(`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polyline points="6,9 12,15 18,9" stroke="#94A3B8" stroke-width="2"/>
    </svg>
  `);

  networkDropdown.appendChild(dropdownText);
  networkDropdown.appendChild(dropdownIcon);

  // Assemble networkFrame
  networkFrame.appendChild(networkLabel);
  networkFrame.appendChild(networkDropdown);

  // Assemble Main Content
  mainContent.appendChild(pageTitle);
  mainContent.appendChild(networkFrame);

  // Assemble Dashboard
  dashboard.appendChild(header);
  dashboard.appendChild(topNav);
  dashboard.appendChild(mainContent);

  // Append dashboard to page
  figma.currentPage.appendChild(dashboard);
})(); 