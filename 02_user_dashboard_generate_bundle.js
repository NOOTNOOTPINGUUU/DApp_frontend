(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "User Dashboard - Generate Will Package";
  dashboard.layoutMode = 'VERTICAL';
  dashboard.primaryAxisSizingMode = 'FIXED';
  dashboard.counterAxisSizingMode = 'FIXED';
  dashboard.resize(1440, 1224);
  dashboard.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
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

  // Logo Section (Left)
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
  logoText.characters = "Digital Will System — User";
  logoText.fontSize = 20;
  logoText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  logoSection.appendChild(logoIcon);
  logoSection.appendChild(logoText);

  // User Info Section (Right)
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
  walletInfo.characters = "Connected Wallet: did:ethr:0xAAA…";
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
    { name: "Compose and Package Will", active: true, icon: "📝" },
    { name: "Request Preview/Download", active: false, icon: "👁️" },
    { name: "My Request Status", active: false, icon: "📋" },
    { name: "Personal Settings", active: false, icon: "⚙️" }
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
  contentArea.itemSpacing = 32;

  // Page Title
  const pageTitle = figma.createText();
  pageTitle.name = "Page Title";
  pageTitle.fontName = {family: 'Inter', style: 'Bold'};
  pageTitle.characters = "Compose and Package Will (Generate Will Package)";
  pageTitle.fontSize = 28;
  pageTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Step 1: File Upload Section
  const step1Section = figma.createFrame();
  step1Section.name = "Step 1 - File Upload";
  step1Section.layoutMode = 'VERTICAL';
  step1Section.primaryAxisSizingMode = 'AUTO';
  step1Section.counterAxisSizingMode = 'FIXED';
  step1Section.resize(1096, 300);
  step1Section.paddingTop = 24;
  step1Section.paddingLeft = 24;
  step1Section.paddingRight = 24;
  step1Section.paddingBottom = 24;
  step1Section.itemSpacing = 20;
  step1Section.cornerRadius = 12;
  step1Section.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  step1Section.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  step1Section.strokeWeight = 1;

  const step1Title = figma.createText();
  step1Title.name = "Step 1 Title";
  step1Title.fontName = {family: 'Inter', style: 'Bold'};
  step1Title.characters = "Step 1: Upload Will File";
  step1Title.fontSize = 20;
  step1Title.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Upload Area
  const uploadArea = figma.createFrame();
  uploadArea.name = "Upload Area";
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
  uploadArea.strokes = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}}];
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
  uploadText.characters = "Drag and drop or click to upload file";
  uploadText.fontSize = 18;
  uploadText.textAlignHorizontal = 'CENTER';
  uploadText.fills = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}}];

  const supportedFormats = figma.createText();
  supportedFormats.name = "Supported Formats";
  supportedFormats.fontName = {family: 'Inter', style: 'Regular'};
  supportedFormats.characters = "Supports: Markdown / PDF / JPG / PNG / MP4";
  supportedFormats.fontSize = 14;
  supportedFormats.textAlignHorizontal = 'CENTER';
  supportedFormats.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

  uploadArea.appendChild(uploadIcon);
  uploadArea.appendChild(uploadText);
  uploadArea.appendChild(supportedFormats);

  step1Section.appendChild(step1Title);
  step1Section.appendChild(uploadArea);

  // Step 1.5: Uploaded Files List
  const fileList = figma.createFrame();
  fileList.name = "Uploaded Files";
  fileList.layoutMode = 'VERTICAL';
  fileList.primaryAxisSizingMode = 'AUTO';
  fileList.counterAxisSizingMode = 'FIXED';
  fileList.resize(1048, 120);
  fileList.paddingTop = 12;
  fileList.paddingBottom = 12;
  fileList.paddingLeft = 16;
  fileList.paddingRight = 16;
  fileList.itemSpacing = 8;
  fileList.cornerRadius = 8;
  fileList.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  fileList.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  fileList.strokeWeight = 1;
  const fileRow = figma.createFrame();
  fileRow.name = "File Row 1";
  fileRow.layoutMode = 'HORIZONTAL';
  fileRow.primaryAxisSizingMode = 'AUTO';
  fileRow.counterAxisSizingMode = 'AUTO';
  fileRow.counterAxisAlignItems = 'CENTER';
  fileRow.itemSpacing = 16;
  const fileName = figma.createText();
  fileName.name = "File Name";
  fileName.fontName = {family: 'Inter', style: 'Regular'};
  fileName.characters = "will.md (2.3 MB)";
  fileName.fontSize = 14;
  fileName.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];
  const deleteIcon = figma.createNodeFromSvg(`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <line x1="18" y1="6" x2="6" y2="18" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/>
      <line x1="6" y1="6" x2="18" y2="18" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `);
  fileRow.appendChild(fileName);
  fileRow.appendChild(deleteIcon);
  fileList.appendChild(fileRow);

  // Adjust Heights
  contentArea.resize(1160, 1064);
  mainContent.resize(1440, 1064);
  dashboard.resize(1440, 1124);

  // Step 2: Generate Will Package Section
  const step2Section = figma.createFrame();
  step2Section.name = "Step 2 - Generate Will Package";
  step2Section.layoutMode = 'VERTICAL';
  step2Section.primaryAxisSizingMode = 'AUTO';
  step2Section.counterAxisSizingMode = 'FIXED';
  step2Section.resize(1096, 200);
  step2Section.paddingTop = 24;
  step2Section.paddingLeft = 24;
  step2Section.paddingRight = 24;
  step2Section.paddingBottom = 24;
  step2Section.itemSpacing = 20;
  step2Section.cornerRadius = 12;
  step2Section.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  step2Section.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  step2Section.strokeWeight = 1;

  const step2Title = figma.createText();
  step2Title.name = "Step 2 Title";
  step2Title.fontName = {family: 'Inter', style: 'Bold'};
  step2Title.characters = "Step 2: Generate Will Package";
  step2Title.fontSize = 20;
  step2Title.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const generateButton = figma.createFrame();
  generateButton.name = "Generate Will Package Button";
  generateButton.layoutMode = 'HORIZONTAL';
  generateButton.primaryAxisSizingMode = 'AUTO';
  generateButton.counterAxisSizingMode = 'AUTO';
  generateButton.counterAxisAlignItems = 'CENTER';
  generateButton.itemSpacing = 8;
  generateButton.paddingTop = 14;
  generateButton.paddingBottom = 14;
  generateButton.paddingLeft = 24;
  generateButton.paddingRight = 24;
  generateButton.cornerRadius = 8;
  generateButton.fills = [{type: 'SOLID', color: {r: 0.16, g: 0.74, b: 0.51}}];

  const generateIcon = figma.createNodeFromSvg(`
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 12l2 2 4-4" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fill="white"/>
    </svg>
  `);

  const generateText = figma.createText();
  generateText.name = "Generate Text";
  generateText.fontName = {family: 'Inter', style: 'Medium'};
  generateText.characters = "Calculate ContentHash and Sign → Generate Will Package";
  generateText.fontSize = 16;
  generateText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  generateButton.appendChild(generateIcon);
  generateButton.appendChild(generateText);

  const processInfo = figma.createText();
  processInfo.name = "Process Info";
  processInfo.fontName = {family: 'Inter', style: 'Regular'};
  processInfo.characters = "This process will: Calculate file Hash → Wallet signature → Package into Will Package JSON";
  processInfo.fontSize = 14;
  processInfo.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

  step2Section.appendChild(step2Title);
  step2Section.appendChild(generateButton);
  step2Section.appendChild(processInfo);

  // Step 3: Actions Section
  const step3Section = figma.createFrame();
  step3Section.name = "Step 3 - Actions";
  step3Section.layoutMode = 'VERTICAL';
  step3Section.primaryAxisSizingMode = 'AUTO';
  step3Section.counterAxisSizingMode = 'FIXED';
  step3Section.resize(1096, 300);
  step3Section.paddingTop = 24;
  step3Section.paddingLeft = 24;
  step3Section.paddingRight = 24;
  step3Section.paddingBottom = 24;
  step3Section.itemSpacing = 20;
  step3Section.cornerRadius = 12;
  step3Section.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  step3Section.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  step3Section.strokeWeight = 1;

  const step3Title = figma.createText();
  step3Title.name = "Step 3 Title";
  step3Title.fontName = {family: 'Inter', style: 'Bold'};
  step3Title.characters = "Step 3: Choose subsequent action";
  step3Title.fontSize = 20;
  step3Title.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Notary Selection
  const notarySection = figma.createFrame();
  notarySection.name = "Notary Selection";
  notarySection.layoutMode = 'HORIZONTAL';
  notarySection.primaryAxisSizingMode = 'AUTO';
  notarySection.counterAxisSizingMode = 'AUTO';
  notarySection.counterAxisAlignItems = 'CENTER';
  notarySection.itemSpacing = 16;

  const notaryLabel = figma.createText();
  notaryLabel.name = "Notary Label";
  notaryLabel.fontName = {family: 'Inter', style: 'Medium'};
  notaryLabel.characters = "Assign Notary:";
  notaryLabel.fontSize = 16;
  notaryLabel.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  const notaryDropdown = figma.createFrame();
  notaryDropdown.name = "Notary Dropdown";
  notaryDropdown.layoutMode = 'HORIZONTAL';
  notaryDropdown.primaryAxisSizingMode = 'FIXED';
  notaryDropdown.counterAxisSizingMode = 'AUTO';
  notaryDropdown.resize(300, 40);
  notaryDropdown.counterAxisAlignItems = 'CENTER';
  notaryDropdown.primaryAxisAlignItems = 'SPACE_BETWEEN';
  notaryDropdown.paddingLeft = 12;
  notaryDropdown.paddingRight = 12;
  notaryDropdown.cornerRadius = 6;
  notaryDropdown.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
  notaryDropdown.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  notaryDropdown.strokeWeight = 1;

  const dropdownText = figma.createText();
  dropdownText.name = "Dropdown Text";
  dropdownText.fontName = {family: 'Inter', style: 'Regular'};
  dropdownText.characters = "Select Notary or enter DID";
  dropdownText.fontSize = 14;
  dropdownText.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.6, b: 0.65}}];

  const dropdownIcon = figma.createNodeFromSvg(`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polyline points="6,9 12,15 18,9" stroke="#94A3B8" stroke-width="2"/>
    </svg>
  `);

  notaryDropdown.appendChild(dropdownText);
  notaryDropdown.appendChild(dropdownIcon);

  notarySection.appendChild(notaryLabel);
  notarySection.appendChild(notaryDropdown);

  // Action Buttons
  const actionButtons = figma.createFrame();
  actionButtons.name = "Action Buttons";
  actionButtons.layoutMode = 'HORIZONTAL';
  actionButtons.primaryAxisSizingMode = 'AUTO';
  actionButtons.counterAxisSizingMode = 'AUTO';
  actionButtons.itemSpacing = 16;

  // Download Button
  const downloadButton = figma.createFrame();
  downloadButton.name = "Download Button";
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
  downloadText.characters = "Download Will Package (JSON)";
  downloadText.fontSize = 16;
  downloadText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  downloadButton.appendChild(downloadIcon);
  downloadButton.appendChild(downloadText);

  // Submit Button
  const submitButton = figma.createFrame();
  submitButton.name = "Submit Button";
  submitButton.layoutMode = 'HORIZONTAL';
  submitButton.primaryAxisSizingMode = 'AUTO';
  submitButton.counterAxisSizingMode = 'AUTO';
  submitButton.counterAxisAlignItems = 'CENTER';
  submitButton.itemSpacing = 8;
  submitButton.paddingTop = 12;
  submitButton.paddingBottom = 12;
  submitButton.paddingLeft = 20;
  submitButton.paddingRight = 20;
  submitButton.cornerRadius = 8;
  submitButton.fills = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}}];

  const submitIcon = figma.createNodeFromSvg(`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <line x1="22" y1="2" x2="11" y2="13" stroke="white" stroke-width="2"/>
      <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="white" stroke-width="2" fill="white"/>
    </svg>
  `);

  const submitText = figma.createText();
  submitText.name = "Submit Text";
  submitText.fontName = {family: 'Inter', style: 'Medium'};
  submitText.characters = "Submit to Notary";
  submitText.fontSize = 16;
  submitText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  submitButton.appendChild(submitIcon);
  submitButton.appendChild(submitText);

  actionButtons.appendChild(downloadButton);
  actionButtons.appendChild(submitButton);

  // Important Note
  const importantNote = figma.createFrame();
  importantNote.name = "Important Note";
  importantNote.layoutMode = 'VERTICAL';
  importantNote.primaryAxisSizingMode = 'AUTO';
  importantNote.counterAxisSizingMode = 'FIXED';
  importantNote.resize(1048, 160);
  importantNote.paddingTop = 16;
  importantNote.paddingBottom = 16;
  importantNote.paddingLeft = 16;
  importantNote.paddingRight = 16;
  importantNote.itemSpacing = 8;
  importantNote.cornerRadius = 8;
  importantNote.fills = [{type: 'SOLID', color: {r: 0.99, g: 0.95, b: 0.82}}];
  importantNote.strokes = [{type: 'SOLID', color: {r: 0.97, g: 0.85, b: 0.16}}];
  importantNote.strokeWeight = 1;

  const noteText = figma.createText();
  noteText.name = "Note Text";
  noteText.fontName = {family: 'Inter', style: 'Regular'};
  noteText.characters =
    `💡 Important Reminder:
• You will not become a Testator until you submit to the Notary.
  You will only officially obtain Testator status after the Notary has reviewed and approved it on the chain.
• If you want to modify the will in the future, just re-upload the file here, repackage, and assign a Notary.
• All Will Package will be temporarily stored locally or backed up by the user; if not submitted, the server will not retain any unsubmitted original files.`;
  noteText.fontSize = 14;
  noteText.lineHeight = {unit: 'PIXELS', value: 20};
  noteText.fills = [{type: 'SOLID', color: {r: 0.6, g: 0.45, b: 0.1}}];

  importantNote.appendChild(noteText);

  step3Section.appendChild(step3Title);
  step3Section.appendChild(notarySection);
  step3Section.appendChild(actionButtons);
  step3Section.appendChild(importantNote);

  // Assemble Content
  contentArea.appendChild(pageTitle);
  contentArea.appendChild(step1Section);
  contentArea.appendChild(fileList);
  contentArea.appendChild(step2Section);
  contentArea.appendChild(step3Section);

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

  // After appending to the canvas, log the hierarchy for debugging
  console.log('Dashboard children:', dashboard.children.map(n => n.name));
  console.log('Header children:', header.children.map(n => n.name));
  console.log('MainContent children:', mainContent.children.map(n => n.name));
  console.log('Sidebar children:', sidebar.children.map(n => n.name));
  console.log('ContentArea children:', contentArea.children.map(n => n.name));
})();