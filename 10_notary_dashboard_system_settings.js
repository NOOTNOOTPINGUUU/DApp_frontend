(async () => {
  // Load Inter font family
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "Notary Dashboard - System Settings";
  dashboard.layoutMode = 'VERTICAL';
  dashboard.primaryAxisSizingMode = 'FIXED';
  dashboard.counterAxisSizingMode = 'FIXED';
  dashboard.resize(1440, 1024);
  dashboard.fills = [{ type: 'SOLID', color: { r: 0.97, g: 0.98, b: 1 } }];
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
  header.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  header.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.95 }, opacity: 1 }];
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
  logoText.fontName = { family: 'Inter', style: 'Bold' };
  logoText.characters = "Digital Will System — Notary";
  logoText.fontSize = 20;
  logoText.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.2 } }];
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
  walletInfo.fontName = { family: 'Inter', style: 'Medium' };
  walletInfo.characters = "Connected Wallet: did:ethr:0xNotaryXYZ…";
  walletInfo.fontSize = 14;
  walletInfo.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.5 } }];
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
  logoutButton.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.97 } }];
  const logoutText = figma.createText();
  logoutText.name = "Logout Text";
  logoutText.fontName = { family: 'Inter', style: 'Medium' };
  logoutText.characters = "Logout";
  logoutText.fontSize = 14;
  logoutText.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.5 } }];
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
  topNav.fills = [{ type: 'SOLID', color: { r: 0.99, g: 0.99, b: 1 } }];
  topNav.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.95 }, opacity: 1 }];
  topNav.strokeWeight = 1;
  const navItems = [
    { name: "Pending Wills for Review", active: false },
    { name: "Manual Upload Will Package", active: false },
    { name: "Review Preview/Download Requests", active: false },
    { name: "Issued VC Management", active: false },
    { name: "Post-Mortem Unlock", active: false },
    { name: "System Settings", active: true }
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
      navItem.fills = [{ type: 'SOLID', color: { r: 0.55, g: 0.36, b: 1 }, opacity: 0.1 }];
      navItem.strokes = [{ type: 'SOLID', color: { r: 0.55, g: 0.36, b: 1 }, opacity: 1 }];
      navItem.strokeWeight = 2;
    } else {
      navItem.fills = [];
    }
    const navText = figma.createText();
    navText.name = "Nav Text";
    navText.fontName = { family: 'Inter', style: item.active ? 'Medium' : 'Regular' };
    navText.characters = item.name;
    navText.fontSize = 14;
    navText.fills = [{ type: 'SOLID', color: item.active ? { r: 0.55, g: 0.36, b: 1 } : { r: 0.4, g: 0.4, b: 0.5 } }];
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
  mainContent.itemSpacing = 32;
  mainContent.paddingTop = 32;
  mainContent.paddingLeft = 32;
  mainContent.paddingRight = 32;
  mainContent.paddingBottom = 32;
  mainContent.fills = [{ type: 'SOLID', color: { r: 0.97, g: 0.98, b: 1 } }];

  // Personal Settings Section
  const personalSection = figma.createFrame();
  personalSection.name = "Personal Settings Section";
  personalSection.layoutMode = 'VERTICAL';
  personalSection.primaryAxisSizingMode = 'FIXED';
  personalSection.counterAxisSizingMode = 'AUTO';
  personalSection.resize(700, 736);
  personalSection.paddingTop = 24;
  personalSection.paddingLeft = 24;
  personalSection.paddingRight = 24;
  personalSection.paddingBottom = 24;
  personalSection.itemSpacing = 20;
  personalSection.cornerRadius = 12;
  personalSection.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  personalSection.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.95 }, opacity: 1 }];
  personalSection.strokeWeight = 1;
  const personalTitle = figma.createText();
  personalTitle.name = "Section Title";
  personalTitle.fontName = { family: 'Inter', style: 'Bold' };
  personalTitle.characters = "Personal Settings";
  personalTitle.fontSize = 28;
  personalTitle.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.2 } }];
  // Email Field
  const emailLabel = figma.createText();
  emailLabel.name = "Email Label";
  emailLabel.fontName = { family: 'Inter', style: 'Medium' };
  emailLabel.characters = "Email:";
  emailLabel.fontSize = 16;
  emailLabel.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.2 } }];
  const emailInput = figma.createFrame();
  emailInput.name = "Email Input";
  emailInput.layoutMode = 'HORIZONTAL';
  emailInput.primaryAxisSizingMode = 'FIXED';
  emailInput.counterAxisSizingMode = 'FIXED';
  emailInput.resize(300, 40);
  emailInput.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  emailInput.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.95 }, opacity: 1 }];
  emailInput.strokeWeight = 1;
  const emailPlaceholder = figma.createText();
  emailPlaceholder.name = "Email Placeholder";
  emailPlaceholder.fontName = { family: 'Inter', style: 'Regular' };
  emailPlaceholder.characters = "Enter your email";
  emailPlaceholder.fontSize = 14;
  emailPlaceholder.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.5 } }];
  emailInput.appendChild(emailPlaceholder);
  personalSection.appendChild(emailLabel);
  personalSection.appendChild(emailInput);

  // Insert Phone Field
  const phoneLabel = figma.createText();
  phoneLabel.name = "Phone Label";
  phoneLabel.fontName = { family: 'Inter', style: 'Medium' };
  phoneLabel.characters = "Phone:";
  phoneLabel.fontSize = 16;
  phoneLabel.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.2 } }];
  const phoneInput = figma.createFrame();
  phoneInput.name = "Phone Input";
  phoneInput.layoutMode = 'HORIZONTAL';
  phoneInput.primaryAxisSizingMode = 'FIXED';
  phoneInput.counterAxisSizingMode = 'FIXED';
  phoneInput.resize(300, 40);
  phoneInput.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  phoneInput.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.95 }, opacity: 1 }];
  phoneInput.strokeWeight = 1;
  const phonePlaceholder = figma.createText();
  phonePlaceholder.name = "Phone Placeholder";
  phonePlaceholder.fontName = { family: 'Inter', style: 'Regular' };
  phonePlaceholder.characters = "Enter phone number";
  phonePlaceholder.fontSize = 14;
  phonePlaceholder.fills = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.5 } }];
  phoneInput.appendChild(phonePlaceholder);
  personalSection.appendChild(phoneLabel);
  personalSection.appendChild(phoneInput);

  mainContent.appendChild(personalSection);

  // Insert Credential Section
  const credentialSection = figma.createFrame();
  credentialSection.name = "Credential Section";
  credentialSection.layoutMode = 'VERTICAL';
  credentialSection.primaryAxisSizingMode = 'FIXED';
  credentialSection.counterAxisSizingMode = 'AUTO';
  credentialSection.resize(700, 736);
  credentialSection.paddingTop = 24;
  credentialSection.paddingLeft = 24;
  credentialSection.paddingRight = 24;
  credentialSection.paddingBottom = 24;
  credentialSection.itemSpacing = 20;
  credentialSection.cornerRadius = 12;
  credentialSection.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  credentialSection.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.95 }, opacity: 1 }];
  credentialSection.strokeWeight = 1;
  const credentialTitle = figma.createText();
  credentialTitle.name = "Section Title";
  credentialTitle.fontName = { family: 'Inter', style: 'Bold' };
  credentialTitle.characters = "Notary Credential";
  credentialTitle.fontSize = 28;
  credentialTitle.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.2 } }];
  const downloadCredButton = figma.createFrame();
  downloadCredButton.name = "Download Credential Button";
  downloadCredButton.layoutMode = 'HORIZONTAL';
  downloadCredButton.primaryAxisSizingMode = 'AUTO';
  downloadCredButton.counterAxisSizingMode = 'AUTO';
  downloadCredButton.counterAxisAlignItems = 'CENTER';
  downloadCredButton.itemSpacing = 8;
  downloadCredButton.paddingTop = 14;
  downloadCredButton.paddingBottom = 14;
  downloadCredButton.paddingLeft = 24;
  downloadCredButton.paddingRight = 24;
  downloadCredButton.cornerRadius = 8;
  downloadCredButton.fills = [{ type: 'SOLID', color: { r: 0.23, g: 0.51, b: 1 } }];
  const downloadCredText = figma.createText();
  downloadCredText.name = "Download Credential Text";
  downloadCredText.fontName = { family: 'Inter', style: 'Medium' };
  downloadCredText.characters = "Download Notary Credential (JSON-LD)";
  downloadCredText.fontSize = 16;
  downloadCredText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  downloadCredButton.appendChild(downloadCredText);
  credentialSection.appendChild(credentialTitle);
  credentialSection.appendChild(downloadCredButton);
  mainContent.appendChild(credentialSection);

  dashboard.appendChild(header);
  dashboard.appendChild(topNav);
  dashboard.appendChild(mainContent);
  figma.currentPage.appendChild(dashboard);
})(); 