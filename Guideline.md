AI DESIGN WORKFLOW PROMPTS & FIGMA CODE GUIDELINES

🎯 NEW DESIGN WORKFLOW SYSTEM:
• Use "Design Workflows" button to access AI-powered design prompts
• Choose workflow type: Style Guide, Components, Content to Design, PRD to Design, or Wireframe
• Customize prompts with your specific content and requirements
• Generate production-ready Figma code from AI-guided design processes

🏗️ FIGMA CODE STRUCTURE & SETUP:
• Always wrap code in async IIFE: (async () => { ... })();
• Load fonts first: await figma.loadFontAsync({family: 'Inter', style: 'Regular'})

📐 FRAMES & LAYOUT:
• Use frames: figma.createFrame() instead of shapes - frames support auto-layout
• Auto Layout: Always enable layoutMode = 'VERTICAL' or 'HORIZONTAL'
• Naming: Give meaningful names to frames for better organization

📏 SIZING & RESPONSIVENESS:
• primaryAxisSizingMode = 'AUTO' - Hug content (frame sizes to fit children)
• counterAxisSizingMode options:
  - 'FIXED' - Fixed size (use resize to set dimensions)
  - 'AUTO' - Hug children on counter axis
  - 'STRETCH' - Fill parent (⚠️ requires specific conditions)

⚠️ STRETCH Requirements: Only works when:
• Parent has layoutMode set
• Frame is child of auto-layout parent
• Stretching on counter axis only
• primaryAxisSizingMode is not 'AUTO'

🎯 ALIGNMENT & SPACING:
• primaryAxisAlignItems:
  - 'MIN' - Left/Top align (forms, lists)
  - 'CENTER' - Center align (buttons, footers)
  - 'MAX' - Right/Bottom align
  - 'SPACE_BETWEEN' - Navigation bars, card headers
• counterAxisAlignItems: 'MIN'/'CENTER'/'MAX' for cross-axis alignment
• Spacing: Use itemSpacing = 16 for consistent element spacing
• Padding: Set paddingTop/Bottom/Left/Right for internal space

🚀 AI WORKFLOW PROMPT GUIDELINES:
• Start with workflow prompts, then customize with your specific content
• Replace placeholder text with your actual requirements
• Include specific brand colors, fonts, and design preferences
• Specify target platform (web, mobile, desktop) for optimal results
• Add accessibility and responsive design requirements

🧩 COMPONENTS & TEXT:
• Individual Components: figma.createComponent()
• Component Sets: figma.combineAsVariants([comp1, comp2])
• Text Order: Load font → set fontName → set characters
• Font Loading: Always await figma.loadFontAsync({family: 'Inter', style: 'Regular'}) first

📝 INTER FONT STYLES:
• 'Regular' - Normal weight
• 'Medium' - Medium weight (use instead of 'SemiBold')
• 'Bold' - Bold weight
❌ Common mistakes: 'SemiBold', 'Light', 'Black' don't exist for Inter

🎨 IMAGES & ICONS:
• Images: figma.createImage(uint8Array) with proper image data
• SVG Icons: figma.createNodeFromSvg(svgString) for vector icons

📚 RECOMMENDED SVG ICON LIBRARIES:
• Lucide Icons: https://lucide.dev/icons/ - Clean, consistent outline icons
• Heroicons: https://heroicons.com/ - Beautiful hand-crafted SVG icons
• Phosphor Icons: https://phosphoricons.com/ - Flexible icon family
• Remix Icons: https://remixicon.com/ - Open-source neutral-style icons

🎯 CONTEXTUAL ALIGNMENT EXAMPLES:
• Navigation Bars: primaryAxisAlignItems = 'SPACE_BETWEEN'
• Button Groups: primaryAxisAlignItems = 'CENTER' + counterAxisAlignItems = 'CENTER'
• Card Headers: primaryAxisAlignItems = 'SPACE_BETWEEN'
• Form Layouts: primaryAxisAlignItems = 'MIN'
• Footer Content: primaryAxisAlignItems = 'CENTER'
• List Items: counterAxisAlignItems = 'CENTER'
• Icon + Text: counterAxisAlignItems = 'CENTER'

⚠️ COMMON ERRORS TO AVOID:
❌ Using counterAxisSizingMode = 'FILL_CONTAINER' (use 'FIXED', 'AUTO', or 'STRETCH')
❌ Using shapes (createRectangle, createEllipse) instead of frames
❌ Using invalid Inter font styles ('SemiBold' → use 'Medium', 'Light' → use 'Regular')
❌ Setting text before loading font
❌ Not using auto-layout when organizing multiple elements
❌ Using await without async function
❌ Forgetting to append elements to figma.currentPage
❌ using any types of effects like shadows, blurs, or effects

⚡ QUICK EXAMPLE - AUTO-LAYOUT BUTTON:
(async () => { 
  await figma.loadFontAsync({family: 'Inter', style: 'Regular'}); 
  
  const button = figma.createFrame(); 
  button.name = 'Button'; 
  button.layoutMode = 'HORIZONTAL';
  button.primaryAxisSizingMode = 'AUTO';
  button.counterAxisSizingMode = 'AUTO';
  button.counterAxisAlignItems = 'CENTER';
  button.itemSpacing = 8;
  button.paddingTop = 12; button.paddingBottom = 12;
  button.paddingLeft = 16; button.paddingRight = 16;
  button.cornerRadius = 8;
  button.fills = [{type: 'SOLID', color: {r: 0.2, g: 0.6, b: 1}}];
  
  const icon = figma.createNodeFromSvg('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M5 12l5 5L20 7"/></svg>');
  
  const text = figma.createText();
  text.fontName = {family: 'Inter', style: 'Regular'};
  text.characters = 'Click me';
  text.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  
  button.appendChild(icon);
  button.appendChild(text);
  figma.currentPage.appendChild(button);
})();

🎨 AI WORKFLOW USAGE:
1. Select a design workflow prompt from "Design Workflows" menu
2. Customize the prompt with your specific requirements
3. Generate the code using the AI system
4. Run the generated code to create your Figma designs

Remember: Use frames, auto-layout, hug-content, proper alignment, and leverage AI workflow prompts for faster, better design creation!