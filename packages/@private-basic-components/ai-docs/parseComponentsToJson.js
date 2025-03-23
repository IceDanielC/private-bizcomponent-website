const fs = require('fs');
const path = require('path');

/**
 * Parse the basic-components.txt file and convert it to a JSON structure.
 * @returns An object where keys are component names and values contain description and api properties.
 */
function parseComponentsToJson() {
  const filePath = path.join(__dirname, 'basic-components.txt');
  const fileContent = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');

  // Split by the delimiter
  const componentSections = fileContent.split('-------split line-------');
  const result = {};

  componentSections.forEach((section) => {
    section = section.trim();
    if (!section) return;

    // Extract component name
    const nameRegex = /The documentation for the (.*?) basic UI components/;
    const nameMatch = section.match(nameRegex);
    if (!nameMatch || !nameMatch[1]) return;

    const componentName = nameMatch[1].trim();

    // Extract description
    const descriptionRegex = /<when-to-use>([\s\S]*?)<\/when-to-use>/;
    const descriptionMatch = section.match(descriptionRegex);
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';

    // Extract API
    const apiRegex = /<API>([\s\S]*?)<\/API>/;
    const apiMatch = section.match(apiRegex);
    const api = apiMatch ? apiMatch[1].trim() : '';

    // Add to result
    result[componentName] = { description, api };
  });

  return result;
}

// Get output path from command line args or use default
const outputPath = process.argv[2] || path.join(__dirname, 'components-data.json');

// Run the parser
const componentsData = parseComponentsToJson();

// Save results to file
fs.writeFileSync(outputPath, JSON.stringify(componentsData, null, 2), 'utf8');
console.log(`✅ 组件数据已保存到: ${outputPath}`);
console.log(`📊 总共处理了 ${Object.keys(componentsData).length} 个组件`);

// Preview first component
const firstComponentName = Object.keys(componentsData)[0];
if (firstComponentName) {
  console.log(`\n🔍 ${firstComponentName} 组件预览:`);
  const { description, api } = componentsData[firstComponentName];
  console.log(`描述: ${description.substring(0, 100)}${description.length > 100 ? '...' : ''}`);
  console.log(`API: ${api.substring(0, 100)}${api.length > 100 ? '...' : ''}`);
} 