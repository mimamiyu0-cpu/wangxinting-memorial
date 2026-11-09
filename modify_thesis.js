/**
 * 修改毕业论文第一章内容
 * - 删除三级标题，改为自然段/连续叙述
 * - 学术化精简，去除宣传化表述
 * - 控制字数3000-4000字
 * - 新增1.3本章小结
 */
const fs = require('fs');
const JSZip = require('./node_modules/mammoth/node_modules/jszip/dist/jszip.min.js') || require('jszip');

async function modifyChapter1() {
  // 读取docx文件（本质是zip）
  const docxPath = 'Literature/毕业论文.docx';
  const content = fs.readFileSync(docxPath);
  const zip = await JSZip.loadAsync(content);

  // 读取document.xml
  const docXml = await zip.file('word/document.xml').async('string');

  // 定义新的第一章内容（纯文本，后续需要转为OOXML）
  // 我们采用策略：找到第一章开始到第二章开始之间的所有段落，替换为新内容

  // 由于直接操作OOXML过于复杂，我们采用另一种策略：
  // 用mammoth读取结构，然后用docx库重新生成
  // 但docx库是创建新文档的...

  // 最简方案：直接在XML中替换文本内容
  // 先提取所有段落的纯文本，找到需要替换的范围

  console.log('Document XML length:', docXml.length);
  console.log('First 500 chars:', docXml.substring(0, 500));

  // 保存XML以便分析
  fs.writeFileSync('temp_doc_xml.txt', docXml, 'utf8');
  console.log('XML saved to temp_doc_xml.txt');
}

modifyChapter1().catch(console.error);
