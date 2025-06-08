(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "User Dashboard - Request Preview/Download";
  dashboard.layoutMode = 'VERTICAL';
  dashboard.primaryAxisSizingMode = 'FIXED';
  dashboard.counterAxisSizingMode = 'FIXED';
  dashboard.resize(1440, 1104);
  dashboard.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
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
  header.fills = [{type: 'SOLID', color: {r:1, g:1, b:1}}];
  header.strokes = [{type: 'SOLID', color: {r:0.9, g:0.9, b:0.95}}];
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
    `<svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\">` +
    `<path d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\" ` +
    `stroke=\"#3B82F6\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>` +
    `</svg>`
  );
  const logoText = figma.createText();
  logoText.name = "Logo Text";
  logoText.fontName = {family: 'Inter', style: 'Bold'};
  logoText.characters = "數位遺囑系統 — 一般使用者";
  logoText.fontSize = 20;
  logoText.fills = [{type: 'SOLID', color: {r:0.1, g:0.1, b:0.2}}];
  logoSection.appendChild(logoIcon);
  logoSection.appendChild(logoText);

  // User Info
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
  walletInfo.fills = [{type: 'SOLID', color: {r:0.4, g:0.4, b:0.5}}];
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
  logoutButton.fills = [{type: 'SOLID', color: {r:0.95, g:0.95, b:0.97}}];
  const logoutText = figma.createText();
  logoutText.name = "Logout Text";
  logoutText.fontName = {family: 'Inter', style: 'Medium'};
  logoutText.characters = "登出";
  logoutText.fontSize = 14;
  logoutText.fills = [{type: 'SOLID', color: {r:0.4, g:0.4, b:0.5}}];
  logoutButton.appendChild(logoutText);
  userSection.appendChild(walletInfo);
  userSection.appendChild(logoutButton);
  header.appendChild(logoSection);
  header.appendChild(userSection);

  // Main Content & Sidebar
  const mainContent = figma.createFrame();
  mainContent.name = "Main Content";
  mainContent.layoutMode = 'HORIZONTAL';
  mainContent.primaryAxisSizingMode = 'FIXED';
  mainContent.counterAxisSizingMode = 'FIXED';
  mainContent.resize(1440, 944);
  mainContent.itemSpacing = 0;
  mainContent.fills = [{type:'SOLID', color:{r:0.98, g:0.98, b:1}}];
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
  sidebar.fills = [{type:'SOLID', color:{r:1, g:1, b:1}}];
  sidebar.strokes = [{type:'SOLID', color:{r:0.9, g:0.9, b:0.95}}];
  sidebar.strokeWeight = 1;

  // Sidebar Menu Items
  const menuItems = [
    { name: "撰寫並打包遺囑", active: false, icon: "📝" },
    { name: "提出預覽／下載請求", active: true, icon: "👁️" },
    { name: "我的請求狀態", active: false, icon: "📋" },
    { name: "個人設定", active: false, icon: "⚙️" }
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
      menuItem.fills = [{ type: 'SOLID', color: { r: 0.23, g: 0.51, b: 1 }, opacity: 0.1 }];
      menuItem.strokes = [{ type: 'SOLID', color: { r: 0.23, g: 0.51, b: 1 } }];
      menuItem.strokeWeight = 1;
    } else {
      menuItem.fills = [];
    }
    const menuText = figma.createText();
    menuText.name = "Menu Text";
    menuText.fontName = { family: 'Inter', style: item.active ? 'Medium' : 'Regular' };
    menuText.characters = item.name;
    menuText.fontSize = 14;
    menuText.fills = [{ type: 'SOLID', color: item.active ? { r: 0.23, g: 0.51, b: 1 } : { r: 0.4, g: 0.4, b: 0.5 } }];
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
  contentArea.itemSpacing = 24;

  // Page Title
  const pageTitle = figma.createText();
  pageTitle.name = "Page Title";
  pageTitle.fontName = { family: 'Inter', style: 'Bold' };
  pageTitle.characters = "提出預覽／下載請求 (Request Preview/Download)";
  pageTitle.fontSize = 28;
  pageTitle.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.2 } }];

  // Testator DID Field
  const didSection = figma.createFrame();
  didSection.name = "Testator DID Section";
  didSection.layoutMode = 'HORIZONTAL';
  didSection.primaryAxisSizingMode = 'AUTO';
  didSection.counterAxisSizingMode = 'AUTO';
  didSection.counterAxisAlignItems = 'CENTER';
  didSection.itemSpacing = 16;
  const didLabel = figma.createText();
  didLabel.name = "DID Label";
  didLabel.fontName = { family: 'Inter', style: 'Medium' };
  didLabel.characters = "目標 Testator DID：";
  didLabel.fontSize = 16;
  didLabel.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.2 } }];
  const didInput = figma.createFrame();
  didInput.name = "DID Input";
  didInput.layoutMode = 'HORIZONTAL';
  didInput.primaryAxisSizingMode = 'FIXED';
  didInput.counterAxisSizingMode = 'AUTO';
  didInput.resize(300, 40);
  didInput.counterAxisAlignItems = 'CENTER';
  didInput.paddingLeft = 12;
  didInput.paddingRight = 12;
  didInput.cornerRadius = 6;
  didInput.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 1 } }];
  didInput.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.95 } }];
  didInput.strokeWeight = 1;
  const didPlaceholder = figma.createText();
  didPlaceholder.name = "DID Placeholder";
  didPlaceholder.fontName = { family: 'Inter', style: 'Regular' };
  didPlaceholder.characters = "選擇或輸入 Testator DID";
  didPlaceholder.fontSize = 14;
  didPlaceholder.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.65 } }];
  didInput.appendChild(didPlaceholder);
  // Dropdown icon for DID input
  const didDropdownIcon = figma.createNodeFromSvg(`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polyline points="6,9 12,15 18,9" stroke="#94A3B8" stroke-width="2"/>
    </svg>
  `);
  didInput.appendChild(didDropdownIcon);
  didSection.appendChild(didLabel);
  didSection.appendChild(didInput);

  // Version Field
  const versionSection = figma.createFrame();
  versionSection.name = "Version Section";
  versionSection.layoutMode = 'HORIZONTAL';
  versionSection.primaryAxisSizingMode = 'AUTO';
  versionSection.counterAxisSizingMode = 'AUTO';
  versionSection.counterAxisAlignItems = 'CENTER';
  versionSection.itemSpacing = 16;
  const versionLabel = figma.createText();
  versionLabel.name = "Version Label";
  versionLabel.fontName = { family: 'Inter', style: 'Medium' };
  versionLabel.characters = "版本：";
  versionLabel.fontSize = 16;
  versionLabel.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.2 } }];
  const versionInput = didInput.clone();
  versionInput.name = "Version Input";
  versionInput.children[0].characters = "選擇版本號";
  // Dropdown icon for Version input
  const versionDropdownIcon = figma.createNodeFromSvg(`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polyline points="6,9 12,15 18,9" stroke="#94A3B8" stroke-width="2"/>
    </svg>
  `);
  versionInput.appendChild(versionDropdownIcon);
  versionSection.appendChild(versionLabel);
  versionSection.appendChild(versionInput);

  // Request Type
  const typeSection = figma.createFrame();
  typeSection.name = "Request Type Section";
  typeSection.layoutMode = 'HORIZONTAL';
  typeSection.primaryAxisSizingMode = 'AUTO';
  typeSection.counterAxisSizingMode = 'AUTO';
  typeSection.counterAxisAlignItems = 'CENTER';
  typeSection.itemSpacing = 24;
  const previewRadio = figma.createFrame();
  previewRadio.name = "Preview Radio";
  previewRadio.layoutMode = 'HORIZONTAL';
  previewRadio.primaryAxisSizingMode = 'FIXED';
  previewRadio.counterAxisSizingMode = 'FIXED';
  previewRadio.resize(16,16);
  previewRadio.cornerRadius = 8;
  previewRadio.strokes = [{ type: 'SOLID', color: { r: 0.23, g: 0.51, b: 1 } }];
  previewRadio.strokeWeight = 2;
  // Selected state dot for Preview
  const previewDot = figma.createFrame();
  previewDot.name = "Selected Dot";
  previewDot.primaryAxisSizingMode = 'FIXED';
  previewDot.counterAxisSizingMode = 'FIXED';
  previewDot.resize(8, 8);
  previewDot.cornerRadius = 4;
  previewDot.fills = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}}];
  previewRadio.appendChild(previewDot);
  const previewLabel = figma.createText();
  previewLabel.name = "Preview Label";
  previewLabel.fontName = { family: 'Inter', style: 'Regular' };
  previewLabel.characters = "預覽";
  previewLabel.fontSize = 16;
  previewLabel.fills = previewRadio.strokes;
  const downloadRadio = previewRadio.clone();
  downloadRadio.name = "Download Radio";
  downloadRadio.strokes = [{ type:'SOLID', color:{r:0.6,g:0.4,b:1}}];
  const downloadLabel = previewLabel.clone();
  downloadLabel.name = "Download Label";
  downloadLabel.characters = "下載";
  downloadLabel.fills = downloadRadio.strokes;
  typeSection.appendChild(previewRadio);
  typeSection.appendChild(previewLabel);
  typeSection.appendChild(downloadRadio);
  typeSection.appendChild(downloadLabel);

  // Remark Field
  const remarkSection = figma.createFrame();
  remarkSection.name = "Remark Section";
  remarkSection.layoutMode = 'VERTICAL';
  remarkSection.primaryAxisSizingMode = 'AUTO';
  remarkSection.counterAxisSizingMode = 'AUTO';
  remarkSection.itemSpacing = 8;
  const remarkLabel = figma.createText();
  remarkLabel.name = "Remark Label";
  remarkLabel.fontName = { family: 'Inter', style: 'Medium' };
  remarkLabel.characters = "申請原因：";
  remarkLabel.fontSize = 16;
  remarkLabel.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.2 } }];
  const remarkInput = figma.createFrame();
  remarkInput.name = "Remark Input";
  remarkInput.layoutMode = 'VERTICAL';
  remarkInput.primaryAxisSizingMode = 'FIXED';
  remarkInput.counterAxisSizingMode = 'FIXED';
  remarkInput.resize(1096, 120);
  remarkInput.paddingLeft = 12;
  remarkInput.paddingRight = 12;
  remarkInput.paddingTop = 12;
  remarkInput.paddingBottom = 12;
  remarkInput.cornerRadius = 6;
  remarkInput.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 1 } }];
  remarkInput.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.95 } }];
  remarkInput.strokeWeight = 1;
  const remarkPlaceholder = figma.createText();
  remarkPlaceholder.name = "Remark Placeholder";
  remarkPlaceholder.fontName = { family: 'Inter', style: 'Regular' };
  remarkPlaceholder.characters = "請填寫申請原因...";
  remarkPlaceholder.fontSize = 14;
  remarkPlaceholder.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.65 } }];
  remarkInput.appendChild(remarkPlaceholder);
  remarkSection.appendChild(remarkLabel);
  remarkSection.appendChild(remarkInput);

  // Submit Button
  const submitButton = figma.createFrame();
  submitButton.name = "Submit Request Button";
  submitButton.layoutMode = 'HORIZONTAL';
  submitButton.primaryAxisSizingMode = 'AUTO';
  submitButton.counterAxisSizingMode = 'AUTO';
  submitButton.counterAxisAlignItems = 'CENTER';
  submitButton.itemSpacing = 8;
  submitButton.paddingTop = 14;
  submitButton.paddingBottom = 14;
  submitButton.paddingLeft = 24;
  submitButton.paddingRight = 24;
  submitButton.cornerRadius = 8;
  submitButton.fills = [{ type: 'SOLID', color: { r: 0.23, g: 0.51, b: 1 } }];
  const submitText = figma.createText();
  submitText.name = "Submit Text";
  submitText.fontName = { family: 'Inter', style: 'Bold' };
  submitText.characters = "提交申請";
  submitText.fontSize = 16;
  submitText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  submitButton.appendChild(submitText);

  // Assemble Content
  contentArea.appendChild(pageTitle);
  contentArea.appendChild(didSection);
  contentArea.appendChild(versionSection);
  contentArea.appendChild(typeSection);
  contentArea.appendChild(remarkSection);
  contentArea.appendChild(submitButton);

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