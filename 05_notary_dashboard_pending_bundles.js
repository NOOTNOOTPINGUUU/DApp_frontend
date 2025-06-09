(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "Notary Dashboard - Pending Bundles";
  dashboard.layoutMode = 'VERTICAL';
  dashboard.primaryAxisSizingMode = 'FIXED';
  dashboard.counterAxisSizingMode = 'FIXED';
  dashboard.resize(1440, 1024);
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
  logoText.characters = "Digital Will System — Notary";
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
  walletInfo.characters = "Connected Wallet: did:ethr:0xNotaryXYZ…";
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
  logoutText.characters = "Logout";
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

  // Navigation Items
  const navItems = [
    { name: "Pending Wills for Review", active: true },
    { name: "Manual Upload Will Package", active: false },
    { name: "Review Preview/Download Requests", active: false },
    { name: "Issued VC Management", active: false },
    { name: "Post-Mortem Unlock", active: false },
    { name: "System Settings", active: false }
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
  mainContent.resize(1440, 800);
  mainContent.itemSpacing = 24;
  mainContent.paddingTop = 32;
  mainContent.paddingLeft = 32;
  mainContent.paddingRight = 32;
  mainContent.paddingBottom = 32;
  mainContent.fills = [{type: 'SOLID', color: {r: 0.97, g: 0.98, b: 1}}];

  // Bundles List Section
  const bundlesSection = figma.createFrame();
  bundlesSection.name = "Bundles Section";
  bundlesSection.layoutMode = 'VERTICAL';
  bundlesSection.primaryAxisSizingMode = 'FIXED';
  bundlesSection.counterAxisSizingMode = 'FIXED';
  bundlesSection.resize(700, 736);
  bundlesSection.itemSpacing = 24;

  // Section Title
  const sectionTitle = figma.createText();
  sectionTitle.name = "Section Title";
  sectionTitle.fontName = {family: 'Inter', style: 'Bold'};
  sectionTitle.characters = "Pending Wills for Review (Pending Bundles)";
  sectionTitle.fontSize = 28;
  sectionTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Bundles Table
  const bundlesTable = figma.createFrame();
  bundlesTable.name = "Bundles Table";
  bundlesTable.layoutMode = 'VERTICAL';
  bundlesTable.primaryAxisSizingMode = 'AUTO';
  bundlesTable.counterAxisSizingMode = 'FIXED';
  bundlesTable.resize(700, 400);
  bundlesTable.paddingTop = 24;
  bundlesTable.paddingLeft = 24;
  bundlesTable.paddingRight = 24;
  bundlesTable.paddingBottom = 24;
  bundlesTable.itemSpacing = 0;
  bundlesTable.cornerRadius = 12;
  bundlesTable.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  bundlesTable.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  bundlesTable.strokeWeight = 1;

  // Table Header
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

  // Header Columns
  const headerColumns = [
    { name: "Bundle ID", width: 120 },
    { name: "Testator DID", width: 250 },
    { name: "Content Hash", width: 150 },
    { name: "Action", width: 132 }
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

  // Sample Data Rows
  const sampleBundles = [
    {
      bundleId: "bnd-123",
      testatorDID: "did:ethr:0xAAA…",
      contentHash: "0xABC123…"
    },
    {
      bundleId: "bnd-456",
      testatorDID: "did:ethr:0xBBB…",
      contentHash: "0xDEF456…"
    }
  ];

  // Create data rows
  sampleBundles.forEach((bundle, index) => {
    const dataRow = figma.createFrame();
    dataRow.name = `Bundle Row ${index + 1}`;
    dataRow.layoutMode = 'HORIZONTAL';
    dataRow.primaryAxisSizingMode = 'FIXED';
    dataRow.counterAxisSizingMode = 'AUTO';
    dataRow.resize(652, 64);
    dataRow.counterAxisAlignItems = 'CENTER';
    dataRow.paddingLeft = 16;
    dataRow.paddingRight = 16;
    dataRow.paddingTop = 16;
    dataRow.paddingBottom = 16;
    
    if (index % 2 === 0) {
      dataRow.fills = [{type: 'SOLID', color: {r: 0.99, g: 0.99, b: 1}}];
    } else {
      dataRow.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    }
    
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
    bundleIdText.characters = bundle.bundleId;
    bundleIdText.fontSize = 14;
    bundleIdText.fills = [{type: 'SOLID', color: {r: 0.55, g: 0.36, b: 1}}];

    bundleIdCell.appendChild(bundleIdText);

    // Testator DID Cell
    const didCell = figma.createFrame();
    didCell.name = "DID Cell";
    didCell.layoutMode = 'HORIZONTAL';
    didCell.primaryAxisSizingMode = 'FIXED';
    didCell.counterAxisSizingMode = 'AUTO';
    didCell.resize(250, 32);
    didCell.counterAxisAlignItems = 'CENTER';
    didCell.paddingLeft = 8;
    didCell.paddingRight = 8;

    const didText = figma.createText();
    didText.name = "DID Text";
    didText.fontName = {family: 'Inter', style: 'Regular'};
    didText.characters = bundle.testatorDID;
    didText.fontSize = 14;
    didText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

    didCell.appendChild(didText);

    // Content Hash Cell
    const hashCell = figma.createFrame();
    hashCell.name = "Hash Cell";
    hashCell.layoutMode = 'HORIZONTAL';
    hashCell.primaryAxisSizingMode = 'FIXED';
    hashCell.counterAxisSizingMode = 'AUTO';
    hashCell.resize(150, 32);
    hashCell.counterAxisAlignItems = 'CENTER';
    hashCell.paddingLeft = 8;
    hashCell.paddingRight = 8;

    const hashText = figma.createText();
    hashText.name = "Hash Text";
    hashText.fontName = {family: 'Inter', style: 'Regular'};
    hashText.characters = bundle.contentHash;
    hashText.fontSize = 12;
    hashText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

    hashCell.appendChild(hashText);

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

    const selectButton = figma.createFrame();
    selectButton.name = "Select Button";
    selectButton.layoutMode = 'HORIZONTAL';
    selectButton.primaryAxisSizingMode = 'AUTO';
    selectButton.counterAxisSizingMode = 'AUTO';
    selectButton.counterAxisAlignItems = 'CENTER';
    selectButton.paddingTop = 6;
    selectButton.paddingBottom = 6;
    selectButton.paddingLeft = 12;
    selectButton.paddingRight = 12;
    selectButton.cornerRadius = 6;
    selectButton.fills = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}}];

    const selectText = figma.createText();
    selectText.name = "Select Text";
    selectText.fontName = {family: 'Inter', style: 'Medium'};
    selectText.characters = "Select";
    selectText.fontSize = 12;
    selectText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

    selectButton.appendChild(selectText);
    actionCell.appendChild(selectButton);

    // Assemble row
    dataRow.appendChild(bundleIdCell);
    dataRow.appendChild(didCell);
    dataRow.appendChild(hashCell);
    dataRow.appendChild(actionCell);

    bundlesTable.appendChild(dataRow);
  });

  bundlesTable.insertChild(0, tableHeader);

  bundlesSection.appendChild(sectionTitle);
  bundlesSection.appendChild(bundlesTable);

  // Review Panel Section
  const reviewPanel = figma.createFrame();
  reviewPanel.name = "Review Panel";
  reviewPanel.layoutMode = 'VERTICAL';
  reviewPanel.primaryAxisSizingMode = 'FIXED';
  reviewPanel.counterAxisSizingMode = 'FIXED';
  reviewPanel.resize(684, 736);
  reviewPanel.paddingTop = 24;
  reviewPanel.paddingLeft = 24;
  reviewPanel.paddingRight = 24;
  reviewPanel.paddingBottom = 24;
  reviewPanel.itemSpacing = 24;
  reviewPanel.cornerRadius = 12;
  reviewPanel.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  reviewPanel.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  reviewPanel.strokeWeight = 1;

  // Review Title
  const reviewTitle = figma.createText();
  reviewTitle.name = "Review Title";
  reviewTitle.fontName = {family: 'Inter', style: 'Bold'};
  reviewTitle.characters = "Review Panel";
  reviewTitle.fontSize = 24;
  reviewTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Selected Bundle Info
  const bundleInfo = figma.createFrame();
  bundleInfo.name = "Bundle Info";
  bundleInfo.layoutMode = 'VERTICAL';
  bundleInfo.primaryAxisSizingMode = 'AUTO';
  bundleInfo.counterAxisSizingMode = 'AUTO';
  bundleInfo.itemSpacing = 12;
  bundleInfo.paddingTop = 16;
  bundleInfo.paddingLeft = 16;
  bundleInfo.paddingRight = 16;
  bundleInfo.paddingBottom = 16;
  bundleInfo.cornerRadius = 8;
  bundleInfo.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];

  const selectedBundleText = figma.createText();
  selectedBundleText.name = "Selected Bundle";
  selectedBundleText.fontName = {family: 'Inter', style: 'Medium'};
  selectedBundleText.characters = "Selected: Bundle ID bnd-123";
  selectedBundleText.fontSize = 16;
  selectedBundleText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const bundleDetails = figma.createText();
  bundleDetails.name = "Bundle Details";
  bundleDetails.fontName = {family: 'Inter', style: 'Regular'};
  bundleDetails.characters = "Testator: did:ethr:0xAAA…\nContent Hash: 0xABC123…";
  bundleDetails.fontSize = 14;
  bundleDetails.lineHeight = {unit: 'PIXELS', value: 20};
  bundleDetails.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

  bundleInfo.appendChild(selectedBundleText);
  bundleInfo.appendChild(bundleDetails);

  // Action Buttons Section
  const actionsSection = figma.createFrame();
  actionsSection.name = "Actions Section";
  actionsSection.layoutMode = 'VERTICAL';
  actionsSection.primaryAxisSizingMode = 'AUTO';
  actionsSection.counterAxisSizingMode = 'AUTO';
  actionsSection.itemSpacing = 16;

  const actionsTitle = figma.createText();
  actionsTitle.name = "Actions Title";
  actionsTitle.fontName = {family: 'Inter', style: 'Bold'};
  actionsTitle.characters = "Action Options";
  actionsTitle.fontSize = 18;
  actionsTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Action Buttons Grid
  const actionButtons = figma.createFrame();
  actionButtons.name = "Action Buttons";
  actionButtons.layoutMode = 'VERTICAL';
  actionButtons.primaryAxisSizingMode = 'AUTO';
  actionButtons.counterAxisSizingMode = 'AUTO';
  actionButtons.itemSpacing = 12;

  // Download Will Package Button
  const downloadButton = figma.createFrame();
  downloadButton.name = "Download Will Package Button";
  downloadButton.layoutMode = 'HORIZONTAL';
  downloadButton.primaryAxisSizingMode = 'AUTO';
  downloadButton.counterAxisSizingMode = 'AUTO';
  downloadButton.counterAxisAlignItems = 'CENTER';
  downloadButton.itemSpacing = 8;
  downloadButton.paddingTop = 12;
  downloadButton.paddingBottom = 12;
  downloadButton.paddingLeft = 20;
  downloadButton.paddingRight = 20;
  downloadButton.cornerRadius = 8;
  downloadButton.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.4, b: 1}}];

  const downloadIcon = figma.createNodeFromSvg(`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="white" stroke-width="2"/>
      <polyline points="7,10 12,15 17,10" stroke="white" stroke-width="2"/>
      <line x1="12" y1="15" x2="12" y2="3" stroke="white" stroke-width="2"/>
    </svg>
  `);

  const downloadText = figma.createText();
  downloadText.name = "Download Text";
  downloadText.fontName = {family: 'Inter', style: 'Medium'};
  downloadText.characters = "Download Will Package JSON";
  downloadText.fontSize = 16;
  downloadText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  downloadButton.appendChild(downloadIcon);
  downloadButton.appendChild(downloadText);

  // Preview Raw Files Button
  const previewButton = figma.createFrame();
  previewButton.name = "Preview Button";
  previewButton.layoutMode = 'HORIZONTAL';
  previewButton.primaryAxisSizingMode = 'AUTO';
  previewButton.counterAxisSizingMode = 'AUTO';
  previewButton.counterAxisAlignItems = 'CENTER';
  previewButton.itemSpacing = 8;
  previewButton.paddingTop = 12;
  previewButton.paddingBottom = 12;
  previewButton.paddingLeft = 20;
  previewButton.paddingRight = 20;
  previewButton.cornerRadius = 8;
  previewButton.fills = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}}];

  const previewIcon = figma.createNodeFromSvg(`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" stroke="white" stroke-width="2"/>
    </svg>
  `);

  const previewText = figma.createText();
  previewText.name = "Preview Text";
  previewText.fontName = {family: 'Inter', style: 'Medium'};
  previewText.characters = "View Original File";
  previewText.fontSize = 16;
  previewText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  previewButton.appendChild(previewIcon);
  previewButton.appendChild(previewText);

  // Verify Signature Button
  const verifyButton = figma.createFrame();
  verifyButton.name = "Verify Button";
  verifyButton.layoutMode = 'HORIZONTAL';
  verifyButton.primaryAxisSizingMode = 'AUTO';
  verifyButton.counterAxisSizingMode = 'AUTO';
  verifyButton.counterAxisAlignItems = 'CENTER';
  verifyButton.itemSpacing = 8;
  verifyButton.paddingTop = 12;
  verifyButton.paddingBottom = 12;
  verifyButton.paddingLeft = 20;
  verifyButton.paddingRight = 20;
  verifyButton.cornerRadius = 8;
  verifyButton.fills = [{type: 'SOLID', color: {r: 0.16, g: 0.74, b: 0.51}}];

  const verifyIcon = figma.createNodeFromSvg(`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" stroke-width="2"/>
      <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `);

  const verifyText = figma.createText();
  verifyText.name = "Verify Text";
  verifyText.fontName = {family: 'Inter', style: 'Medium'};
  verifyText.characters = "Verify Signature";
  verifyText.fontSize = 16;
  verifyText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  verifyButton.appendChild(verifyIcon);
  verifyButton.appendChild(verifyText);

  actionButtons.appendChild(downloadButton);
  actionButtons.appendChild(previewButton);
  actionButtons.appendChild(verifyButton);

  actionsSection.appendChild(actionsTitle);
  actionsSection.appendChild(actionButtons);

  // Review Decision Section
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

  const decisionTitle = figma.createText();
  decisionTitle.name = "Decision Title";
  decisionTitle.fontName = {family: 'Inter', style: 'Bold'};
  decisionTitle.characters = "Review Decision";
  decisionTitle.fontSize = 18;
  decisionTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Radio Options
  const radioOptions = figma.createFrame();
  radioOptions.name = "Radio Options";
  radioOptions.layoutMode = 'VERTICAL';
  radioOptions.primaryAxisSizingMode = 'AUTO';
  radioOptions.counterAxisSizingMode = 'AUTO';
  radioOptions.itemSpacing = 12;

  // Approve Option
  const approveOption = figma.createFrame();
  approveOption.name = "Approve Option";
  approveOption.layoutMode = 'HORIZONTAL';
  approveOption.primaryAxisSizingMode = 'AUTO';
  approveOption.counterAxisSizingMode = 'AUTO';
  approveOption.counterAxisAlignItems = 'CENTER';
  approveOption.itemSpacing = 8;

  const approveRadio = figma.createFrame();
  approveRadio.name = "Approve Radio";
  approveRadio.layoutMode = 'HORIZONTAL';
  approveRadio.primaryAxisSizingMode = 'FIXED';
  approveRadio.counterAxisSizingMode = 'FIXED';
  approveRadio.resize(16, 16);
  approveRadio.cornerRadius = 8;
  approveRadio.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  approveRadio.strokes = [{type: 'SOLID', color: {r: 0.16, g: 0.74, b: 0.51}}];
  approveRadio.strokeWeight = 2;

  const approveText = figma.createText();
  approveText.name = "Approve Text";
  approveText.fontName = {family: 'Inter', style: 'Medium'};
  approveText.characters = "Approve & Publish";
  approveText.fontSize = 16;
  approveText.fills = [{type: 'SOLID', color: {r: 0.16, g: 0.74, b: 0.51}}];

  approveOption.appendChild(approveRadio);
  approveOption.appendChild(approveText);

  // Reject Option
  const rejectOption = figma.createFrame();
  rejectOption.name = "Reject Option";
  rejectOption.layoutMode = 'HORIZONTAL';
  rejectOption.primaryAxisSizingMode = 'AUTO';
  rejectOption.counterAxisSizingMode = 'AUTO';
  rejectOption.counterAxisAlignItems = 'CENTER';
  rejectOption.itemSpacing = 8;

  const rejectRadio = figma.createFrame();
  rejectRadio.name = "Reject Radio";
  rejectRadio.layoutMode = 'HORIZONTAL';
  rejectRadio.primaryAxisSizingMode = 'FIXED';
  rejectRadio.counterAxisSizingMode = 'FIXED';
  rejectRadio.resize(16, 16);
  rejectRadio.cornerRadius = 8;
  rejectRadio.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  rejectRadio.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  rejectRadio.strokeWeight = 2;

  const rejectText = figma.createText();
  rejectText.name = "Reject Text";
  rejectText.fontName = {family: 'Inter', style: 'Regular'};
  rejectText.characters = "Reject";
  rejectText.fontSize = 16;
  rejectText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

  rejectOption.appendChild(rejectRadio);
  rejectOption.appendChild(rejectText);

  radioOptions.appendChild(approveOption);
  radioOptions.appendChild(rejectOption);

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
  remarkLabel.characters = "Remarks (If rejected, please provide a reason):";
  remarkLabel.fontSize = 14;
  remarkLabel.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const remarkTextarea = figma.createFrame();
  remarkTextarea.name = "Remark Textarea";
  remarkTextarea.layoutMode = 'HORIZONTAL';
  remarkTextarea.primaryAxisSizingMode = 'FIXED';
  remarkTextarea.counterAxisSizingMode = 'FIXED';
  remarkTextarea.resize(600, 80);
  remarkTextarea.paddingTop = 12;
  remarkTextarea.paddingLeft = 12;
  remarkTextarea.paddingRight = 12;
  remarkTextarea.paddingBottom = 12;
  remarkTextarea.cornerRadius = 6;
  remarkTextarea.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
  remarkTextarea.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  remarkTextarea.strokeWeight = 1;

  const remarkPlaceholder = figma.createText();
  remarkPlaceholder.name = "Remark Placeholder";
  remarkPlaceholder.fontName = {family: 'Inter', style: 'Regular'};
  remarkPlaceholder.characters = "Please fill in review remarks...";
  remarkPlaceholder.fontSize = 14;
  remarkPlaceholder.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.65}}];

  remarkTextarea.appendChild(remarkPlaceholder);
  remarkField.appendChild(remarkLabel);
  remarkField.appendChild(remarkTextarea);

  // Submit Button
  const submitButton = figma.createFrame();
  submitButton.name = "Submit Decision Button";
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
  submitButton.fills = [{type: 'SOLID', color: {r: 0.55, g: 0.36, b: 1}}];

  const submitIcon = figma.createNodeFromSvg(`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fill="white"/>
    </svg>
  `);

  const submitText = figma.createText();
  submitText.name = "Submit Text";
  submitText.fontName = {family: 'Inter', style: 'Bold'};
  submitText.characters = "Submit Review Decision";
  submitText.fontSize = 16;
  submitText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  submitButton.appendChild(submitIcon);
  submitButton.appendChild(submitText);

  decisionSection.appendChild(decisionTitle);
  decisionSection.appendChild(radioOptions);
  decisionSection.appendChild(remarkField);
  decisionSection.appendChild(submitButton);

  // Assemble Review Panel
  reviewPanel.appendChild(reviewTitle);
  reviewPanel.appendChild(bundleInfo);
  reviewPanel.appendChild(actionsSection);
  reviewPanel.appendChild(decisionSection);

  // Assemble Main Content
  mainContent.appendChild(bundlesSection);
  mainContent.appendChild(reviewPanel);

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