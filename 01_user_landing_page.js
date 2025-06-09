(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Page Frame
  const page = figma.createFrame();
  page.name = "User Landing Page";
  page.layoutMode = 'VERTICAL';
  page.primaryAxisSizingMode = 'AUTO';
  page.counterAxisSizingMode = 'FIXED';
  page.resize(1440, 1024);
  page.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
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
  
  // Add subtle border
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

  // Logo Icon
  const logoIcon = figma.createNodeFromSvg(`
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 6v6l4 2" stroke="#3B82F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  const logoText = figma.createText();
  logoText.name = "Logo Text";
  logoText.fontName = {family: 'Inter', style: 'Bold'};
  logoText.characters = "Digital Will System";
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
  connectButton.fills = [{type: 'SOLID', color: {r: 0.23, g: 0.51, b: 1}}];

  // Wallet Icon
  const walletIcon = figma.createNodeFromSvg(`
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0h3.75A2.25 2.25 0 0115 12z" stroke="white" stroke-width="1.5"/>
      <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0z" fill="white"/>
    </svg>
  `);

  const buttonText = figma.createText();
  buttonText.name = "Button Text";
  buttonText.fontName = {family: 'Inter', style: 'Medium'};
  buttonText.characters = "Connect Wallet";
  buttonText.fontSize = 16;
  buttonText.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];

  connectButton.appendChild(walletIcon);
  connectButton.appendChild(buttonText);

  header.appendChild(logoSection);
  header.appendChild(connectButton);

  // Hero Section
  const heroSection = figma.createFrame();
  heroSection.name = "Main Content";
  heroSection.layoutMode = 'VERTICAL';
  heroSection.primaryAxisSizingMode = 'FIXED';
  heroSection.counterAxisSizingMode = 'AUTO';
  heroSection.resize(1440, 864);
  heroSection.primaryAxisAlignItems = 'CENTER';
  heroSection.counterAxisAlignItems = 'CENTER';
  heroSection.itemSpacing = 48;
  heroSection.paddingTop = 120;
  heroSection.paddingBottom = 120;
  heroSection.paddingLeft = 64;
  heroSection.paddingRight = 64;

  // Main Title
  const mainTitle = figma.createText();
  mainTitle.name = "Main Title";
  mainTitle.fontName = {family: 'Inter', style: 'Bold'};
  mainTitle.characters = "Digital Will System";
  mainTitle.fontSize = 48;
  mainTitle.textAlignHorizontal = 'CENTER';
  mainTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Subtitle
  const subtitle = figma.createText();
  subtitle.name = "Subtitle";
  subtitle.fontName = {family: 'Inter', style: 'Regular'};
  subtitle.characters = "A decentralized will management system based on blockchain technology\\nMaking the inheritance of your digital assets safer and more reliable";
  subtitle.fontSize = 20;
  subtitle.textAlignHorizontal = 'CENTER';
  subtitle.lineHeight = {unit: 'PIXELS', value: 32};
  subtitle.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

  // Features Grid
  const featuresGrid = figma.createFrame();
  featuresGrid.name = "Features Grid";
  featuresGrid.layoutMode = 'HORIZONTAL';
  featuresGrid.primaryAxisSizingMode = 'AUTO';
  featuresGrid.counterAxisSizingMode = 'AUTO';
  featuresGrid.itemSpacing = 32;

  // Feature Cards
  const features = [
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#10B981" stroke-width="2"/>
        <path d="M9 12l2 2 4-4" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      title: "Blockchain Security",
      description: "Uses Ethereum blockchain technology\\nEnsuring wills cannot be tampered with"
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke="#8B5CF6" stroke-width="2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="#8B5CF6" stroke-width="2"/>
        <path d="M9 12l2 2 4-4" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      title: "Notary Auditing",
      description: "Professional notary review mechanism\\nEnsuring wills are legal and valid"
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
        <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fill="#F59E0B"/>
        <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fill="#F59E0B"/>
        <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fill="#F59E0B"/>
        <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" fill="#F59E0B"/>
      </svg>`,
      title: "Intelligent Management",
      description: "Multimedia file support\\nIntelligent encryption and decryption"
    }
  ];

  features.forEach(feature => {
    const featureCard = figma.createFrame();
    featureCard.name = "Feature Card";
    featureCard.layoutMode = 'VERTICAL';
    featureCard.primaryAxisSizingMode = 'AUTO';
    featureCard.counterAxisSizingMode = 'AUTO';
    featureCard.primaryAxisAlignItems = 'CENTER';
    featureCard.itemSpacing = 16;
    featureCard.paddingTop = 32;
    featureCard.paddingBottom = 32;
    featureCard.paddingLeft = 24;
    featureCard.paddingRight = 24;
    featureCard.cornerRadius = 12;
    featureCard.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    featureCard.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
    featureCard.strokeWeight = 1;

    const featureIcon = figma.createNodeFromSvg(feature.icon);

    const featureTitle = figma.createText();
    featureTitle.name = "Feature Title";
    featureTitle.fontName = {family: 'Inter', style: 'Bold'};
    featureTitle.characters = feature.title;
    featureTitle.fontSize = 18;
    featureTitle.textAlignHorizontal = 'CENTER';
    featureTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

    const featureDesc = figma.createText();
    featureDesc.name = "Feature Description";
    featureDesc.fontName = {family: 'Inter', style: 'Regular'};
    featureDesc.characters = feature.description;
    featureDesc.fontSize = 14;
    featureDesc.textAlignHorizontal = 'CENTER';
    featureDesc.lineHeight = {unit: 'PIXELS', value: 22};
    featureDesc.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

    featureCard.appendChild(featureIcon);
    featureCard.appendChild(featureTitle);
    featureCard.appendChild(featureDesc);
    featuresGrid.appendChild(featureCard);
  });

  heroSection.appendChild(mainTitle);
  heroSection.appendChild(subtitle);
  heroSection.appendChild(featuresGrid);

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

  // Assemble Page
  page.appendChild(header);
  page.appendChild(heroSection);
  page.appendChild(footer);
  
  figma.currentPage.appendChild(page);
})(); 