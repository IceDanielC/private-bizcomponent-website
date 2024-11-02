const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

const inputDirectory = path.join(__dirname, '../components');
const outputFilePath = path.join(__dirname, 'components-doc.json');
const outputFileCSVPath = path.join(__dirname, 'components-doc.csv');

let APIDOC = {}
let APIDOCCSV = []

function json2csv (){
  const fields = ['index','content']
  const json2csvParser = new Parser({fields})
  const csv = json2csvParser.parse(APIDOCCSV)
  //将csv字符串转换为带BOM的UTF-8格式防止用excel打开时中文乱码
  const csvWithBOM = '\ufeff' + csv
  fs.writeFileSync(outputFileCSVPath, csvWithBOM, 'utf8');
  console.log('CSV文件已保存');
} 

// 提取 ## API 部分
function collectAPIDoc (content){
  const match = content.match(/\btitle\b:\s*(.*)/);
  const componentName = match?.[1]
  const apiStartIndex = content.search('## API'); 
  const firstHandleContent = content.substring(apiStartIndex + '## API'.length).trim();
  //提取 ## API 及其子目录内容
  const apiEndIndex = firstHandleContent.search(/(?<!#)##(?!#)/);
  const apiContent = firstHandleContent.substring(0,apiEndIndex >= 0 ? apiEndIndex : undefined).trim();
  // 定义要输出的格式
  const jsonFormat = {
    [componentName]: {
      api: `## API\n${apiContent}`
    }
  }
  const csvFormat = {
    index:`The props documentation for the ${componentName} basic UI components`,
    content:`## API\n${apiContent}`
  }
  Object.assign(APIDOC,jsonFormat)
  APIDOCCSV.push(csvFormat)
  // return JSON.stringify({
  //   [componentName]: {
  //     api: `## API\n${apiContent}`
  //   }
  // });
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
      collectAPIDoc(content)
      // fs.appendFileSync(outputFile, collectAPIDoc(content), 'utf8');
    }
  });
}

// 递归遍历目录并处理文件
function generatedAPIDOC (directoryPath){
  processFiles(directoryPath)
  fs.writeFileSync(outputFilePath, JSON.stringify(APIDOC), 'utf8');
  console.log(`成功将所有 "index-en-US.md" 文件内容合并到 ${outputFilePath}`);
  json2csv()
}
// 开始处理文件
generatedAPIDOC(inputDirectory);
