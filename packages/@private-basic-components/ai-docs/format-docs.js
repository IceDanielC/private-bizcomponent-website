const fs = require('fs');
const path = require('path');

const inputDirectory = path.join(__dirname, '../components');
const outputFileCSVPath = path.join(__dirname, 'basic-components.txt');

const dataSources = [];

function saveToTxt() {
  const csvContent = dataSources.join('\n-------split line-------\n');
  // 将csv字符串转换为带BOM的UTF-8格式防止用excel打开时中文乱码
  const csvWithBOM = `\ufeff${csvContent}`;
  fs.writeFileSync(outputFileCSVPath, csvWithBOM, 'utf8');
  console.log('基础组件知识库文件已保存');
}

function collectDoc(content) {
  const match = content.match(/\btitle\b:\s*(.*)/);
  const componentName = match?.[1]?.trim();
  const apiStartIndex = content.search('## API');
  const descriptionIndex = content.search('## When To Use');

  if (apiStartIndex === -1 || descriptionIndex === -1) {
    console.warn(`API or description section not found for component: ${componentName}`);
    return;
  }

  const firstHandleContent = content.substring(apiStartIndex + '## API'.length).trim();
  const firstHandelDescriptionContent = content
    .substring(descriptionIndex + '## When To Use'.length)
    .trim();

  const apiEndIndex = firstHandleContent.search(/(?<!#)##(?!#)/);
  const descriptionEndIndex = firstHandelDescriptionContent.search(/(?<!#)##(?!#)/);

  const apiContent = firstHandleContent
    .substring(0, apiEndIndex >= 0 ? apiEndIndex : undefined)
    .trim();
  const descriptionContent = firstHandelDescriptionContent
    .substring(0, descriptionEndIndex >= 0 ? descriptionEndIndex : undefined)
    .trim();

  const csvFormat = `
    The documentation for the ${componentName} basic UI components
    <when-to-use>
    ${descriptionContent}
    </when-to-use>

    <API>
    ${apiContent}
    </API>
    `;

  dataSources.push(csvFormat);
}

function processFiles(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      // 如果是子目录，则递归处理
      processFiles(filePath);
    } else if (file === 'index.en-US.md') {
      // 如果文件名是 "index-en-US.md"，则读取内容并追加到输出文件
      const content = fs.readFileSync(filePath, 'utf8');
      collectDoc(content);
    }
  });
}

// 递归遍历目录并处理文件
function generatedDOC(directoryPath) {
  processFiles(directoryPath);
  saveToTxt();
  console.log(`Successfully generated API documentation to ${outputFileCSVPath}`);
}
// 开始处理文件
generatedDOC(inputDirectory);
