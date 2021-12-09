export const parseEs2015StringTable = (sheetJsonData) => {
  const stringTable = {};
  sheetJsonData.forEach((data) => {
    const key = data.KEY;
    if (key) {
      Object.keys(data).forEach((lang) => {
        if (lang !== 'KEY') {
          if (!stringTable[lang]) stringTable[lang] = {};
          stringTable[lang][key] = data[lang].toString();
        }
      });
    }
  });
  return stringTable;
};

export const parseJsonFileContents = (stringTable, lang) => {
  const strings = stringTable[lang];
  const parsed = {};
  Object.keys(strings).forEach((key) => {
    if (key.includes('.')) {
      const [key1, key2] = key.split('.');
      if (!parsed[key1]) parsed[key1] = {};
      parsed[key1][key2] = strings[key];
    } else {
      parsed[key] = strings[key];
    }
  });
  return JSON.stringify(parsed, null, '\t');
};

export const parseEs2015FileContents = (stringTable, lang) => {
  const strings = stringTable[lang];
  const keys = Object.keys(strings);
  let output = 'export default function getLangTbl() {\n\treturn {\n';
  keys.forEach((key) => {
    output += `\t\t${key}: '${strings[key].replaceAll('\n', '').replaceAll('\\', '\\\\').replaceAll('\'', '\\\'')}',\n`;
  });
  output += '\t};\n}\n';
  return output;
};

export const parseNvsStringTable = (sheetJsonData) => {
  const stringTable = {};
  sheetJsonData.forEach((data) => {
    const section = data.KEY1;
    const key = data.KEY2;
    if (key && section) {
      Object.keys(data).forEach((lang) => {
        if (lang !== 'KEY1' && lang !== 'KEY2') {
          if (!stringTable[lang]) stringTable[lang] = {};
          if (!stringTable[lang][section]) stringTable[lang][section] = {};
          stringTable[lang][section][key] = data[lang];
        }
      });
    }
  });
  return stringTable;
};

export const parseNvsFileContents = (stringTable, lang) => {
  const langData = stringTable[lang];
  const sections = Object.keys(langData);
  let output = '';
  sections.forEach((section) => {
    output += `_c.pushLangTbl("${lang}", "${section}", {\n`;
    Object.keys(langData[section]).forEach((key, index, array) => {
      output += `\t"${key}": "${langData[section][key].replaceAll('\n', '').replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;
      if (index !== (array.length - 1)) {
        output += ',\n';
      } else {
        output += '\n';
      }
    });
    output += '});\n\n';
  });
  return output;
};
