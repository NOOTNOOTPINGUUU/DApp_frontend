(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "User Dashboard - My Requests";
  dashboard.layoutMode = 'VERTICAL';
  dashboard.primaryAxisSizingMode = 'FIXED';
  dashboard.counterAxisSizingMode = 'FIXED';
  dashboard.resize(1440, 1104);
  dashboard.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
  dashboard.itemSpacing = 0;

  // Header Section (Reuse from previous dashboard)
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
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

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

  // Sidebar Menu Items
  const menuItems = [
    { name: "撰寫並打包遺囑", active: false, icon: "📝" },
    { name: "提出預覽／下載請求", active: false, icon: "👁️" },
    { name: "我的請求狀態", active: true, icon: "📋" },
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
  contentArea.primaryAxisSizingMode = 'AUTO';
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
  pageTitle.fontName = {family: 'Inter', style: 'Bold'};
  pageTitle.characters = "我的請求狀態 (My Requests)";
  pageTitle.fontSize = 28;
  pageTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Requests Table Container
  const tableContainer = figma.createFrame();
  tableContainer.name = "Requests Table";
  tableContainer.layoutMode = 'VERTICAL';
  tableContainer.primaryAxisSizingMode = 'AUTO';
  tableContainer.counterAxisSizingMode = 'FIXED';
  tableContainer.resize(1096, 600);
  tableContainer.paddingTop = 24;
  tableContainer.paddingLeft = 24;
  tableContainer.paddingRight = 24;
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
  tableHeader.resize(1048, 48);
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
    { name: "ID", width: 80 },
    { name: "目標 Testator DID", width: 250 },
    { name: "版本", width: 100 },
    { name: "申請類型", width: 120 },
    { name: "狀態", width: 120 },
    { name: "操作", width: 378 }
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
  const sampleRequests = [
    {
      id: "1",
      testatorDID: "did:ethr:0xBBB…",
      version: "2",
      type: "preview",
      status: "pending",
      statusColor: {r: 0.97, g: 0.85, b: 0.16}
    },
    {
      id: "2", 
      testatorDID: "did:ethr:0xCCC…",
      version: "1",
      type: "download",
      status: "approved",
      statusColor: {r: 0.16, g: 0.74, b: 0.51}
    },
    {
      id: "3",
      testatorDID: "did:ethr:0xDDD…",
      version: "1",
      type: "preview",
      status: "rejected",
      statusColor: {r: 0.94, g: 0.26, b: 0.21}
    }
  ];

  // Create data rows
  sampleRequests.forEach((request, index) => {
    const dataRow = figma.createFrame();
    dataRow.name = `Data Row ${index + 1}`;
    dataRow.layoutMode = 'HORIZONTAL';
    dataRow.primaryAxisSizingMode = 'FIXED';
    dataRow.counterAxisSizingMode = 'AUTO';
    dataRow.resize(1048, 64);
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

    // ID Cell
    const idCell = figma.createFrame();
    idCell.name = "ID Cell";
    idCell.layoutMode = 'HORIZONTAL';
    idCell.primaryAxisSizingMode = 'FIXED';
    idCell.counterAxisSizingMode = 'AUTO';
    idCell.resize(80, 32);
    idCell.counterAxisAlignItems = 'CENTER';
    idCell.paddingLeft = 8;
    idCell.paddingRight = 8;

    const idText = figma.createText();
    idText.name = "ID Text";
    idText.fontName = {family: 'Inter', style: 'Regular'};
    idText.characters = request.id;
    idText.fontSize = 14;
    idText.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

    idCell.appendChild(idText);

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
    didText.characters = request.testatorDID;
    didText.fontSize = 14;
    didText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

    didCell.appendChild(didText);

    // Version Cell
    const versionCell = figma.createFrame();
    versionCell.name = "Version Cell";
    versionCell.layoutMode = 'HORIZONTAL';
    versionCell.primaryAxisSizingMode = 'FIXED';
    versionCell.counterAxisSizingMode = 'AUTO';
    versionCell.resize(100, 32);
    versionCell.counterAxisAlignItems = 'CENTER';
    versionCell.paddingLeft = 8;
    versionCell.paddingRight = 8;

    const versionText = figma.createText();
    versionText.name = "Version Text";
    versionText.fontName = {family: 'Inter', style: 'Regular'};
    versionText.characters = request.version;
    versionText.fontSize = 14;
    versionText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

    versionCell.appendChild(versionText);

    // Type Cell
    const typeCell = figma.createFrame();
    typeCell.name = "Type Cell";
    typeCell.layoutMode = 'HORIZONTAL';
    typeCell.primaryAxisSizingMode = 'FIXED';
    typeCell.counterAxisSizingMode = 'AUTO';
    typeCell.resize(120, 32);
    typeCell.counterAxisAlignItems = 'CENTER';
    typeCell.paddingLeft = 8;
    typeCell.paddingRight = 8;

    const typeBadge = figma.createFrame();
    typeBadge.name = "Type Badge";
    typeBadge.layoutMode = 'HORIZONTAL';
    typeBadge.primaryAxisSizingMode = 'AUTO';
    typeBadge.counterAxisSizingMode = 'AUTO';
    typeBadge.counterAxisAlignItems = 'CENTER';
    typeBadge.paddingTop = 4;
    typeBadge.paddingBottom = 4;
    typeBadge.paddingLeft = 8;
    typeBadge.paddingRight = 8;
    typeBadge.cornerRadius = 4;
    typeBadge.fills = [{type: 'SOLID', color: request.type === 'preview' ? {r: 0.23, g: 0.51, b: 1} : {r: 0.6, g: 0.4, b: 1}, opacity: 0.1}];

    const typeText = figma.createText();
    typeText.name = "Type Text";
    typeText.fontName = {family: 'Inter', style: 'Medium'};
    typeText.characters = request.type === 'preview' ? '預覽' : '下載';
    typeText.fontSize = 12;
    typeText.fills = [{type: 'SOLID', color: request.type === 'preview' ? {r: 0.23, g: 0.51, b: 1} : {r: 0.6, g: 0.4, b: 1}}];

    typeBadge.appendChild(typeText);
    typeCell.appendChild(typeBadge);

    // Status Cell
    const statusCell = figma.createFrame();
    statusCell.name = "Status Cell";
    statusCell.layoutMode = 'HORIZONTAL';
    statusCell.primaryAxisSizingMode = 'FIXED';
    statusCell.counterAxisSizingMode = 'AUTO';
    statusCell.resize(120, 32);
    statusCell.counterAxisAlignItems = 'CENTER';
    statusCell.paddingLeft = 8;
    statusCell.paddingRight = 8;

    const statusBadge = figma.createFrame();
    statusBadge.name = "Status Badge";
    statusBadge.layoutMode = 'HORIZONTAL';
    statusBadge.primaryAxisSizingMode = 'AUTO';
    statusBadge.counterAxisSizingMode = 'AUTO';
    statusBadge.counterAxisAlignItems = 'CENTER';
    statusBadge.paddingTop = 4;
    statusBadge.paddingBottom = 4;
    statusBadge.paddingLeft = 8;
    statusBadge.paddingRight = 8;
    statusBadge.cornerRadius = 12;
    statusBadge.fills = [{type: 'SOLID', color: request.statusColor, opacity: 0.1}];

    const statusText = figma.createText();
    statusText.name = "Status Text";
    statusText.fontName = {family: 'Inter', style: 'Medium'};
    statusText.characters = request.status === 'pending' ? '待審核' : request.status === 'approved' ? '已通過' : '已拒絕';
    statusText.fontSize = 12;
    statusText.fills = [{type: 'SOLID', color: request.statusColor}];

    statusBadge.appendChild(statusText);
    statusCell.appendChild(statusBadge);

    // Action Cell
    const actionCell = figma.createFrame();
    actionCell.name = "Action Cell";
    actionCell.layoutMode = 'HORIZONTAL';
    actionCell.primaryAxisSizingMode = 'FIXED';
    actionCell.counterAxisSizingMode = 'AUTO';
    actionCell.resize(378, 32);
    actionCell.counterAxisAlignItems = 'CENTER';
    actionCell.paddingLeft = 8;
    actionCell.paddingRight = 8;
    actionCell.itemSpacing = 8;

    // Action buttons based on status
    if (request.status === 'approved') {
      const actionButton = figma.createFrame();
      actionButton.name = "Action Button";
      actionButton.layoutMode = 'HORIZONTAL';
      actionButton.primaryAxisSizingMode = 'AUTO';
      actionButton.counterAxisSizingMode = 'AUTO';
      actionButton.counterAxisAlignItems = 'CENTER';
      actionButton.itemSpacing = 6;
      actionButton.paddingTop = 6;
      actionButton.paddingBottom = 6;
      actionButton.paddingLeft = 12;
      actionButton.paddingRight = 12;
      actionButton.cornerRadius = 6;
      actionButton.fills = [{type: 'SOLID', color: {r: 0.16, g: 0.74, b: 0.51}}];

      const actionIcon = figma.createNodeFromSvg(`
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="white" stroke-width="2"/>
          <polyline points="7,10 12,15 17,10" stroke="white" stroke-width="2"/>
          <line x1="12" y1="15" x2="12" y2="3" stroke="white" stroke-width="2"/>
        </svg>
      `);

      const actionText = figma.createText();
      actionText.name = "Action Text";
      actionText.fontName = {family: 'Inter', style: 'Medium'};
      actionText.characters = request.type === 'preview' ? '下載 Preview VC' : '下載遺囑原文';
      actionText.fontSize = 12;
      actionText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

      actionButton.appendChild(actionIcon);
      actionButton.appendChild(actionText);
      actionCell.appendChild(actionButton);
    } else if (request.status === 'rejected') {
      const rejectReason = figma.createText();
      rejectReason.name = "Reject Reason";
      rejectReason.fontName = {family: 'Inter', style: 'Regular'};
      rejectReason.characters = "申請被拒絕，理由：資料不完整";
      rejectReason.fontSize = 12;
      rejectReason.fills = [{type: 'SOLID', color: {r: 0.94, g: 0.26, b: 0.21}}];

      actionCell.appendChild(rejectReason);
    } else {
      const pendingText = figma.createText();
      pendingText.name = "Pending Text";
      pendingText.fontName = {family: 'Inter', style: 'Regular'};
      pendingText.characters = "等待 Notary 審核中...";
      pendingText.fontSize = 12;
      pendingText.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.45, b: 0.1}}];

      actionCell.appendChild(pendingText);
    }

    // Assemble row
    dataRow.appendChild(idCell);
    dataRow.appendChild(didCell);
    dataRow.appendChild(versionCell);
    dataRow.appendChild(typeCell);
    dataRow.appendChild(statusCell);
    dataRow.appendChild(actionCell);

    tableContainer.appendChild(dataRow);
  });

  tableContainer.insertChild(0, tableHeader);

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
  noteText.characters = "📋 申請狀態說明：\n• 已通過的 Preview 申請可下載 Preview VC，用於查看遺囑摘要\n• 已通過的 Download 申請可下載完整遺囑原文\n• 被拒絕的申請會顯示 Notary 填寫的拒絕原因";
  noteText.fontSize = 14;
  noteText.lineHeight = {unit: 'PIXELS', value: 20};
  noteText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.2, b: 0.4}}];

  infoNote.appendChild(noteText);

  // Assemble Content
  contentArea.appendChild(pageTitle);
  contentArea.appendChild(tableContainer);
  contentArea.appendChild(infoNote);

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