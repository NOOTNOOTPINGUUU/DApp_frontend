(async () => {
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
  await figma.loadFontAsync({family: 'Inter', style: 'Medium'});
  await figma.loadFontAsync({family: 'Inter', style: 'Bold'});

  // Main Dashboard Frame
  const dashboard = figma.createFrame();
  dashboard.name = "Notary Dashboard - Pending Requests";
  dashboard.layoutMode = 'VERTICAL';
  dashboard.primaryAxisSizingMode = 'FIXED';
  dashboard.counterAxisSizingMode = 'FIXED';
  dashboard.resize(1440, 1168);
  dashboard.fills = [{type: 'SOLID', color: {r: 0.97, g: 0.98, b: 1}}];
  dashboard.itemSpacing = 0;

  // Header Section
  const header = figma.createFrame();
  header.name = "Header";
  header.layoutMode = 'HORIZONTAL'; header.primaryAxisSizingMode = 'FIXED'; header.counterAxisSizingMode = 'AUTO';
  header.resize(1440, 80); header.primaryAxisAlignItems = 'SPACE_BETWEEN'; header.counterAxisAlignItems = 'CENTER';
  header.paddingLeft = 32; header.paddingRight = 32; header.paddingTop = 16; header.paddingBottom = 16;
  header.fills = [{type: 'SOLID', color: {r:1,g:1,b:1}}]; header.strokes = [{type:'SOLID', color:{r:0.9,g:0.9,b:0.95}}]; header.strokeWeight = 1;
  const logoSection = figma.createFrame(); logoSection.name = "Logo Section"; logoSection.layoutMode='HORIZONTAL'; logoSection.primaryAxisSizingMode='AUTO'; logoSection.counterAxisSizingMode='AUTO'; logoSection.counterAxisAlignItems='CENTER'; logoSection.itemSpacing=12;
  const logoIcon = figma.createNodeFromSvg(
    `<svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\">`+
    `<path d=\"M12 3v18m-4-8a4 4 0 100-8 4 4 0 000 8zm8 0a4 4 0 100-8 4 4 0 000 8z\" stroke=\"#8B5CF6\" stroke-width=\"2\"/>`+
    `<path d=\"M8 7h8\" stroke=\"#8B5CF6\" stroke-width=\"2\"/>`+
    `</svg>`
  );
  const logoText = figma.createText(); logoText.name="Logo Text"; logoText.fontName={family:'Inter',style:'Bold'}; logoText.characters="Digital Will System — Notary"; logoText.fontSize=20; logoText.fills=[{type:'SOLID',color:{r:0.1,g:0.1,b:0.2}}];
  logoSection.appendChild(logoIcon); logoSection.appendChild(logoText);
  const userSection = figma.createFrame(); userSection.name="User Section"; userSection.layoutMode='HORIZONTAL'; userSection.primaryAxisSizingMode='AUTO'; userSection.counterAxisSizingMode='AUTO'; userSection.counterAxisAlignItems='CENTER'; userSection.itemSpacing=16;
  const walletInfo = figma.createText(); walletInfo.name="Wallet Info"; walletInfo.fontName={family:'Inter',style:'Medium'}; walletInfo.characters="Connected Wallet: did:ethr:0xNotaryXYZ…"; walletInfo.fontSize=14; walletInfo.fills=[{type:'SOLID',color:{r:0.4,g:0.4,b:0.5}}];
  const logoutButton = figma.createFrame(); logoutButton.name="Logout Button"; logoutButton.layoutMode='HORIZONTAL'; logoutButton.primaryAxisSizingMode='AUTO'; logoutButton.counterAxisSizingMode='AUTO'; logoutButton.counterAxisAlignItems='CENTER'; logoutButton.paddingTop=8; logoutButton.paddingBottom=8; logoutButton.paddingLeft=16; logoutButton.paddingRight=16; logoutButton.cornerRadius=6; logoutButton.fills=[{type:'SOLID',color:{r:0.95,g:0.95,b:0.97}}];
  const logoutText = figma.createText(); logoutText.name="Logout Text"; logoutText.fontName={family:'Inter',style:'Medium'}; logoutText.characters="Logout"; logoutText.fontSize=14; logoutText.fills=[{type:'SOLID',color:{r:0.4,g:0.4,b:0.5}}];
  logoutButton.appendChild(logoutText); userSection.appendChild(walletInfo); userSection.appendChild(logoutButton);
  header.appendChild(logoSection); header.appendChild(userSection);

  // Top Navigation
  const topNav = figma.createFrame(); topNav.name="Top Navigation"; topNav.layoutMode='HORIZONTAL'; topNav.primaryAxisSizingMode='FIXED'; topNav.counterAxisSizingMode='AUTO'; topNav.resize(1440,64); topNav.counterAxisAlignItems='CENTER'; topNav.paddingLeft=32; topNav.paddingRight=32; topNav.paddingTop=16; topNav.paddingBottom=16; topNav.itemSpacing=32; topNav.fills=[{type:'SOLID',color:{r:0.99,g:0.99,b:1}}]; topNav.strokes=[{type:'SOLID',color:{r:0.9,g:0.9,b:0.95}}]; topNav.strokeWeight=1;
  const navItems = [
    {name:"Pending Wills for Review",active:false},
    {name:"Manual Upload Will Package",active:false},
    {name:"Review Preview/Download Requests",active:true},
    {name:"Issued VC Management",active:false},
    {name:"Post-Mortem Unlock",active:false},
    {name:"System Settings",active:false}
  ];
  navItems.forEach(item=>{ const navItem=figma.createFrame(); navItem.name=`Nav - ${item.name}`; navItem.layoutMode='HORIZONTAL'; navItem.primaryAxisSizingMode='AUTO'; navItem.counterAxisSizingMode='AUTO'; navItem.counterAxisAlignItems='CENTER'; navItem.paddingTop=8; navItem.paddingBottom=8; navItem.paddingLeft=16; navItem.paddingRight=16; navItem.cornerRadius=6; if(item.active){ navItem.fills=[{type:'SOLID',color:{r:0.55,g:0.36,b:1},opacity:0.1}]; navItem.strokes=[{type:'SOLID',color:{r:0.55,g:0.36,b:1}}]; navItem.strokeWeight=2;} else { navItem.fills=[];} const navText=figma.createText(); navText.name="Nav Text"; navText.fontName={family:'Inter',style:item.active?'Medium':'Regular'}; navText.characters=item.name; navText.fontSize=14; navText.fills=[{type:'SOLID',color:item.active?{r:0.55,g:0.36,b:1}:{r:0.4,g:0.4,b:0.5}}]; navItem.appendChild(navText); topNav.appendChild(navItem); });

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
  mainContent.fills = [{type:'SOLID',color:{r:0.97,g:0.98,b:1}}];

  // Pending Requests Section
  const reqSection = figma.createFrame(); reqSection.name="Pending Requests Section"; reqSection.layoutMode='VERTICAL'; reqSection.primaryAxisSizingMode='AUTO'; reqSection.counterAxisSizingMode='FIXED'; reqSection.resize(700,736); reqSection.itemSpacing=24;
  const sectionTitle = figma.createText(); sectionTitle.name="Section Title"; sectionTitle.fontName={family:'Inter',style:'Bold'}; sectionTitle.characters="Pending Preview/Download Requests"; sectionTitle.fontSize=28; sectionTitle.fills=[{type:'SOLID',color:{r:0.1,g:0.1,b:0.2}}];
  const tableContainer = figma.createFrame(); tableContainer.name="Requests Table"; tableContainer.layoutMode='VERTICAL'; tableContainer.primaryAxisSizingMode='AUTO'; tableContainer.counterAxisSizingMode='FIXED'; tableContainer.resize(652,400); tableContainer.paddingTop=24; tableContainer.paddingLeft=24; tableContainer.paddingRight=24; tableContainer.paddingBottom=24; tableContainer.itemSpacing=0; tableContainer.cornerRadius=12; tableContainer.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}]; tableContainer.strokes=[{type:'SOLID',color:{r:0.9,g:0.9,b:0.95}}]; tableContainer.strokeWeight=1;
  // Table Header
  const tableHeader = figma.createFrame(); tableHeader.name="Table Header"; tableHeader.layoutMode='HORIZONTAL'; tableHeader.primaryAxisSizingMode='FIXED'; tableHeader.counterAxisSizingMode='AUTO'; tableHeader.resize(652,48); tableHeader.counterAxisAlignItems='CENTER'; tableHeader.paddingLeft=16; tableHeader.paddingRight=16; tableHeader.paddingTop=12; tableHeader.paddingBottom=12; tableHeader.fills=[{type:'SOLID',color:{r:0.98,g:0.98,b:1}}]; tableHeader.strokes=[{type:'SOLID',color:{r:0.9,g:0.9,b:0.95}}]; tableHeader.strokeWeight=1;
  const cols = [
    {name: 'ID', width: 80},
    {name: 'Testator DID', width: 220},
    {name: 'Version', width: 100},
    {name: 'Type', width: 100},
    {name: 'Reason', width: 152}
  ];
  cols.forEach(c=>{ const cell=figma.createFrame(); cell.name=`Header ${c.name}`; cell.layoutMode='HORIZONTAL'; cell.primaryAxisSizingMode='FIXED'; cell.counterAxisSizingMode='AUTO'; cell.resize(c.width,24); cell.counterAxisAlignItems='CENTER'; cell.paddingLeft=8; cell.paddingRight=8; const txt=figma.createText(); txt.name='Header Text'; txt.fontName={family:'Inter',style:'Bold'}; txt.characters=c.name; txt.fontSize=14; txt.fills=[{type:'SOLID',color:{r:0.2,g:0.2,b:0.3}}]; cell.appendChild(txt); tableHeader.appendChild(cell);} );
  tableContainer.appendChild(tableHeader);
  // Sample Rows
  const sample = [ {id:'1',did:'did:ethr:0xBBB…',version:'2',type:'preview',reason:'View preview'}, {id:'2',did:'did:ethr:0xCCC…',version:'1',type:'download',reason:'Download original'} ];
  sample.forEach((r,i)=>{
    const row = figma.createFrame();
    row.name=`Row ${i+1}`;
    row.layoutMode='HORIZONTAL';
    row.primaryAxisSizingMode='FIXED';
    row.counterAxisSizingMode='AUTO';
    row.resize(652,64);
    row.counterAxisAlignItems='CENTER';
    row.paddingLeft=16;
    row.paddingRight=16;
    row.paddingTop=16;
    row.paddingBottom=16;
    row.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}];
    row.strokes=[{type:'SOLID',color:{r:0.9,g:0.9,b:0.95}}];
    row.strokeWeight=1;
    [r.id,r.did,r.version,r.type,r.reason].forEach((val,idx)=>{
      const w=cols[idx].width;
      const cell=figma.createFrame();
      cell.name=`Cell ${cols[idx].name}`;
      cell.layoutMode='HORIZONTAL';
      cell.primaryAxisSizingMode='FIXED';
      cell.counterAxisSizingMode='AUTO';
      cell.resize(w,32);
      cell.counterAxisAlignItems='CENTER';
      cell.paddingLeft=8;
      cell.paddingRight=8;
      const t=figma.createText();
      t.name=`${cols[idx].name} Text`;
      t.fontName={family:'Inter',style:idx<3?'Regular':'Medium'};
      // Truncate reason in table cell
      if (idx === 4) {
        const preview = val.length > 4 ? val.slice(0, 4) + '...' : val;
        t.characters = preview;
      } else {
        t.characters = val;
      }
      t.fontSize=14;
      t.fills=[{type:'SOLID',color:{r:0.1,g:0.1,b:0.2}}];
      cell.appendChild(t);
      row.appendChild(cell);
    });
    tableContainer.appendChild(row);
  });
  reqSection.appendChild(sectionTitle); reqSection.appendChild(tableContainer);

  // Review Panel Section (copy pattern from Pending Bundles)
  const reviewPanel = figma.createFrame(); reviewPanel.name="Review Panel"; reviewPanel.layoutMode='VERTICAL'; reviewPanel.primaryAxisSizingMode='FIXED'; reviewPanel.counterAxisSizingMode='FIXED'; reviewPanel.resize(684,736); reviewPanel.paddingTop=24; reviewPanel.paddingLeft=24; reviewPanel.paddingRight=24; reviewPanel.paddingBottom=24; reviewPanel.itemSpacing=24; reviewPanel.cornerRadius=12; reviewPanel.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}]; reviewPanel.strokes=[{type:'SOLID',color:{r:0.9,g:0.9,b:0.95}}]; reviewPanel.strokeWeight=1;
  const reviewTitle=figma.createText(); reviewTitle.name="Review Title"; reviewTitle.fontName={family:'Inter',style:'Bold'}; reviewTitle.characters="Review Panel"; reviewTitle.fontSize=24; reviewTitle.fills=[{type:'SOLID',color:{r:0.1,g:0.1,b:0.2}}];
  reviewPanel.appendChild(reviewTitle);

  // Info Card combining Request Info and full Reason
  const infoCard = figma.createFrame();
  infoCard.name = "Info Card";
  infoCard.layoutMode = 'VERTICAL';
  infoCard.primaryAxisSizingMode = 'FIXED';
  infoCard.counterAxisSizingMode = 'FIXED';
  infoCard.resize(636, 200);
  infoCard.paddingTop = 16;
  infoCard.paddingBottom = 16;
  infoCard.paddingLeft = 16;
  infoCard.paddingRight = 16;
  infoCard.itemSpacing = 12;
  infoCard.cornerRadius = 8;
  infoCard.fills = [{type: 'SOLID', color: {r: 0.98, g: 0.98, b: 1}}];
  infoCard.strokes = [{type: 'SOLID', color: {r: 0.9, g: 0.9, b: 0.95}}];
  infoCard.strokeWeight = 1;
  infoCard.overflowDirection = 'VERTICAL';
  infoCard.overflow = 'SCROLL';

  // Info Title
  const infoTitle = figma.createText();
  infoTitle.name = "Info Title";
  infoTitle.fontName = {family: 'Inter', style: 'Bold'};
  infoTitle.characters = "Request Information";
  infoTitle.fontSize = 18;
  infoTitle.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Selected Request Text
  const selectedRequestText = figma.createText();
  selectedRequestText.name = "Selected Request";
  selectedRequestText.fontName = {family:'Inter',style:'Medium'};
  selectedRequestText.characters = "Selected: ID 1";
  selectedRequestText.fontSize = 16;
  selectedRequestText.lineHeight = {unit: 'PIXELS', value: 20};
  selectedRequestText.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Request Details Text
  const requestDetails = figma.createText();
  requestDetails.name = "Request Details";
  requestDetails.fontName = {family:'Inter',style:'Regular'};
  requestDetails.characters = "Testator DID: did:ethr:0xBBB…\nVersion: 2\nType: preview";
  requestDetails.fontSize = 14;
  requestDetails.lineHeight = {unit: 'PIXELS', value: 20};
  requestDetails.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];

  // Reason Label
  const reasonLabel = figma.createText();
  reasonLabel.name = "Reason Label";
  reasonLabel.fontName = {family: 'Inter', style: 'Medium'};
  reasonLabel.characters = "Reason for application:";
  reasonLabel.fontSize = 16;
  reasonLabel.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.2}}];

  // Full Reason Content
  const reasonContent = figma.createText();
  reasonContent.name = "Reason Content";
  reasonContent.fontName = {family: 'Inter', style: 'Regular'};
  reasonContent.characters = "View preview - I need to view a preview version of this will to confirm whether the content meets legal requirements. The application reason contains multiple lines of text, and the full content can be viewed by scrolling when the content is long. This is an example of a longer application reason text to test whether the scrolling function works properly."; // full reason text with longer content for testing scroll
  reasonContent.fontSize = 14;
  reasonContent.lineHeight = {unit: 'PIXELS', value: 20};
  reasonContent.fills = [{type: 'SOLID', color: {r: 0.4, g: 0.4, b: 0.5}}];
  reasonContent.textAutoResize = 'WIDTH_AND_HEIGHT';
  reasonContent.resize(580, reasonContent.height);

  infoCard.appendChild(infoTitle);
  infoCard.appendChild(selectedRequestText);
  infoCard.appendChild(requestDetails);
  infoCard.appendChild(reasonLabel);
  infoCard.appendChild(reasonContent);
  reviewPanel.appendChild(infoCard);

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
  approveText.characters = "Approve Request";
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
  rejectText.characters = "Reject Request";
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
  remarkLabel.characters = "Remarks (If 'Reject Request' is selected, please provide a reason):";
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

  reviewPanel.appendChild(decisionSection);

  // Assemble Main Content
  mainContent.appendChild(reqSection);
  mainContent.appendChild(reviewPanel);

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