(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Page Frame
  const page = figma.createFrame();
  page.name = "Notary Landing Page";
  page.layoutMode = 'VERTICAL';
  page.primaryAxisSizingMode = 'AUTO';
  page.counterAxisSizingMode = 'FIXED';
  page.resize(1440, 1024);
  page.fills = [{type: 'SOLID', color: {r: 0.97, g: 0.98, b: 1}}];
  page.itemSpacing = 0;

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

  // Notary-specific logo icon (scales of justice)
  const logoIcon = figma.createNodeFromSvg(`
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v18m-4-8a4 4 0 100-8 4 4 0 000 8zm8 0a4 4 0 100-8 4 4 0 000 8z" stroke="#8B5CF6" stroke-width="2"/>
      <path d="M8 7h8" stroke="#8B5CF6" stroke-width="2"/>
      <path d="M12 21h6" stroke="#8B5CF6" stroke-width="2"/>
    </svg>
  `);

  const logoText = figma.createText();
  logoText.name = "Logo Text";
  logoText.fontName = {family: 'Inter', style: 'Bold'};
  logoText.characters = "數位遺囑系統 — Notary 入口";
  logoText.fontSize = 24;
  logoText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  logoSection.appendChild(logoIcon);
  logoSection.appendChild(logoText);

  // Connect Wallet Button
  const connectButton = figma.createFrame();
  connectButton.name = "Connect Wallet Button";
  connectButton.layoutMode = 'HORIZONTAL';
  connectButton.primaryAxisSizingMode = 'AUTO';
  connectButton.counterAxisSizingMode = 'AUTO';
  connectButton.counterAxisAlignItems = 'CENTER';
  connectButton.itemSpacing = 8;
  connectButton.paddingTop = 12;
  connectButton.paddingBottom = 12;
  connectButton.paddingLeft = 24;
  connectButton.paddingRight = 24;
  connectButton.cornerRadius = 8;
  connectButton.fills = [{type: 'SOLID', color: {r: 0.55, g: 0.36, b: 1}}];

  const walletIcon = figma.createNodeFromSvg(`
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0h3.75A2.25 2.25 0 0115 12z" stroke="white" stroke-width="1.5"/>
      <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0z" fill="white"/>
    </svg>
  `);

  const buttonText = figma.createText();
  buttonText.name = "Button Text";
  buttonText.fontName = {family: 'Inter', style: 'Medium'};
  buttonText.characters = "連結錢包";
  buttonText.fontSize = 16;
  buttonText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  connectButton.appendChild(walletIcon);
  connectButton.appendChild(buttonText);

  header.appendChild(logoSection);
  header.appendChild(connectButton);

  // Main Content Section
  const mainContent = figma.createFrame();
  mainContent.name = "Main Content";
  mainContent.layoutMode = 'VERTICAL';
  mainContent.primaryAxisSizingMode = 'FIXED';
  mainContent.counterAxisSizingMode = 'AUTO';
  mainContent.resize(1440, 864);
  mainContent.primaryAxisAlignItems = 'CENTER';
  mainContent.counterAxisAlignItems = 'CENTER';
  mainContent.itemSpacing = 48;
  mainContent.paddingTop = 120;
  mainContent.paddingBottom = 120;
  mainContent.paddingLeft = 64;
  mainContent.paddingRight = 64;

  // Access Control Card
  const accessCard = figma.createFrame();
  accessCard.name = "Access Control Card";
  accessCard.layoutMode = 'VERTICAL';
  accessCard.primaryAxisSizingMode = 'AUTO';
  accessCard.counterAxisSizingMode = 'AUTO';
  accessCard.primaryAxisAlignItems = 'CENTER';
  accessCard.counterAxisAlignItems = 'CENTER';
  accessCard.itemSpacing = 32;
  accessCard.paddingTop = 64;
  accessCard.paddingBottom = 64;
  accessCard.paddingLeft = 64;
  accessCard.paddingRight = 64;
  accessCard.cornerRadius = 16;
  accessCard.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  accessCard.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  accessCard.strokeWeight = 2;

  // Security Icon
  const securityIcon = figma.createNodeFromSvg(`
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#8B5CF6" stroke-width="1.5"/>
      <path d="M15 10l-3 3-2-2" stroke="#8B5CF6" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `);

  // Main Title
  const mainTitle = figma.createText();
  mainTitle.name = "Main Title";
  mainTitle.fontName = {family: 'Inter', style: 'Bold'};
  mainTitle.characters = "公證人專屬入口";
  mainTitle.fontSize = 40;
  mainTitle.textAlignHorizontal = 'CENTER';
  mainTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Access Notice
  const accessNotice = figma.createFrame();
  accessNotice.name = "Access Notice";
  accessNotice.layoutMode = 'VERTICAL';
  accessNotice.primaryAxisSizingMode = 'AUTO';
  accessNotice.counterAxisSizingMode = 'AUTO';
  accessNotice.primaryAxisAlignItems = 'CENTER';
  accessNotice.itemSpacing = 16;

  const noticeText = figma.createText();
  noticeText.name = "Notice Text";
  noticeText.fontName = {family: 'Inter', style: 'Regular'};
  noticeText.characters = "此專屬入口僅限受授權之公證人（Notary）";
  noticeText.fontSize = 20;
  noticeText.textAlignHorizontal = 'CENTER';
  noticeText.fills = [{type: 'SOLID', color: {r: 0.3, g: 0.3, b: 0.4}}];

  const instructionText = figma.createText();
  instructionText.name = "Instruction Text";
  instructionText.fontName = {family: 'Inter', style: 'Regular'};
  instructionText.characters = "請先連結在後端已被授權為 Notary 的錢包";
  instructionText.fontSize = 16;
  instructionText.textAlignHorizontal = 'CENTER';
  instructionText.fills = [{type: 'SOLID', color: {r: 0.5, g: 0.5, b: 0.6}}];

  accessNotice.appendChild(noticeText);
  accessNotice.appendChild(instructionText);

  // Warning Section
  const warningSection = figma.createFrame();
  warningSection.name = "Warning Section";
  warningSection.layoutMode = 'HORIZONTAL';
  warningSection.primaryAxisSizingMode = 'AUTO';
  warningSection.counterAxisSizingMode = 'AUTO';
  warningSection.counterAxisAlignItems = 'CENTER';
  warningSection.itemSpacing = 12;
  warningSection.paddingTop = 16;
  warningSection.paddingBottom = 16;
  warningSection.paddingLeft = 20;
  warningSection.paddingRight = 20;
  warningSection.cornerRadius = 8;
  warningSection.fills = [{type: 'SOLID', color: {r: 0.99, g: 0.95, b: 0.82}}];
  warningSection.strokes = [{type: 'SOLID', color: {r: 0.97, g: 0.85, b: 0.16}}];
  warningSection.strokeWeight = 1;

  const warningIcon = figma.createNodeFromSvg(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#D97706" stroke-width="2"/>
      <line x1="12" y1="9" x2="12" y2="13" stroke="#D97706" stroke-width="2"/>
      <path d="M12 17h.01" stroke="#D97706" stroke-width="2"/>
    </svg>
  `);

  const warningText = figma.createText();
  warningText.name = "Warning Text";
  warningText.fontName = {family: 'Inter', style: 'Medium'};
  warningText.characters = "未授權的錢包將無法存取 Notary 功能";
  warningText.fontSize = 14;
  warningText.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.45, b: 0.1}}];

  warningSection.appendChild(warningIcon);
  warningSection.appendChild(warningText);

  // Authorization Features
  const featuresSection = figma.createFrame();
  featuresSection.name = "Features Section";
  featuresSection.layoutMode = 'VERTICAL';
  featuresSection.primaryAxisSizingMode = 'AUTO';
  featuresSection.counterAxisSizingMode = 'AUTO';
  featuresSection.primaryAxisAlignItems = 'CENTER';
  featuresSection.itemSpacing = 24;

  const featuresTitle = figma.createText();
  featuresTitle.name = "Features Title";
  featuresTitle.fontName = {family: 'Inter', style: 'Bold'};
  featuresTitle.characters = "Notary 權限功能";
  featuresTitle.fontSize = 20;
  featuresTitle.textAlignHorizontal = 'CENTER';
  featuresTitle.fills = [{type: 'SOLID', color: {r: 0.2, g: 0.2, b: 0.3}}];

  // Features Grid
  const featuresGrid = figma.createFrame();
  featuresGrid.name = "Features Grid";
  featuresGrid.layoutMode = 'HORIZONTAL';
  featuresGrid.primaryAxisSizingMode = 'AUTO';
  featuresGrid.counterAxisSizingMode = 'AUTO';
  featuresGrid.itemSpacing = 24;

  const features = [
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke="#8B5CF6" stroke-width="2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="#8B5CF6" stroke-width="2"/>
        <path d="M9 12l2 2 4-4" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      title: "遺囑審核",
      description: "審核並發布遺囑至區塊鏈"
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#10B981" stroke-width="2"/>
        <circle cx="8.5" cy="7" r="4" stroke="#10B981" stroke-width="2"/>
        <path d="M20 8v6m-3-3h6" stroke="#10B981" stroke-width="2"/>
      </svg>`,
      title: "VC 簽發",
      description: "簽發數位憑證與權限管理"
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" stroke="#F59E0B" stroke-width="2"/>
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" stroke="#F59E0B" stroke-width="2"/>
        <path d="M12 7v4" stroke="#F59E0B" stroke-width="2"/>
      </svg>`,
      title: "解鎖管理",
      description: "死亡後遺囑解鎖與公開"
    }
  ];

  features.forEach(feature => {
    const featureCard = figma.createFrame();
    featureCard.name = "Feature Card";
    featureCard.layoutMode = 'VERTICAL';
    featureCard.primaryAxisSizingMode = 'AUTO';
    featureCard.counterAxisSizingMode = 'AUTO';
    featureCard.primaryAxisAlignItems = 'CENTER';
    featureCard.itemSpacing = 12;
    featureCard.paddingTop = 24;
    featureCard.paddingBottom = 24;
    featureCard.paddingLeft = 20;
    featureCard.paddingRight = 20;
    featureCard.cornerRadius = 8;
    featureCard.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
    featureCard.strokes = [{type: 'SOLID', color: {r: 0.92, g: 0.92, b: 0.97}}];
    featureCard.strokeWeight = 1;

    const featureIcon = figma.createNodeFromSvg(feature.icon);

    const featureTitle = figma.createText();
    featureTitle.name = "Feature Title";
    featureTitle.fontName = {family: 'Inter', style: 'Bold'};
    featureTitle.characters = feature.title;
    featureTitle.fontSize = 16;
    featureTitle.textAlignHorizontal = 'CENTER';
    featureTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

    const featureDesc = figma.createText();
    featureDesc.name = "Feature Description";
    featureDesc.fontName = {family: 'Inter', style: 'Regular'};
    featureDesc.characters = feature.description;
    featureDesc.fontSize = 13;
    featureDesc.textAlignHorizontal = 'CENTER';
    featureDesc.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

    featureCard.appendChild(featureIcon);
    featureCard.appendChild(featureTitle);
    featureCard.appendChild(featureDesc);
    featuresGrid.appendChild(featureCard);
  });

  featuresSection.appendChild(featuresTitle);
  featuresSection.appendChild(featuresGrid);

  // Assemble Access Card
  accessCard.appendChild(securityIcon);
  accessCard.appendChild(mainTitle);
  accessCard.appendChild(accessNotice);
  accessCard.appendChild(warningSection);
  accessCard.appendChild(featuresSection);

  mainContent.appendChild(accessCard);

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

  // Assemble Page
  page.appendChild(header);
  page.appendChild(mainContent);
  page.appendChild(footer);
  
  figma.currentPage.appendChild(page);
})(); 