import React, { useRef, useState } from 'react';
import xlsx from 'xlsx';
import JSZip from 'jszip';

import {
  parseEs2015FileContents, parseEs2015StringTable,
  parseNvsStringTable, parseNvsFileContents,
  parseJsonFileContents,
} from './parsers';
import download from './downloadZip';
import uploadFile from './uploadFile';

import './style.scss';

const App = () => {
  const file = useRef(null);
  const [sheetJsonData, setSheetJsonData] = useState([]);
  const [type, setType] = useState('json');

  const handleOutputTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleSaveClick = () => {
    const zip = new JSZip();
    const folder = zip.folder('lang');
    if (type === 'json') {
      const stringTable = parseEs2015StringTable(sheetJsonData);
      Object.keys(stringTable).forEach((lang) => {
        const fileContents = parseJsonFileContents(stringTable, lang);
        folder.file(`${lang}.json`, fileContents, { base64: false });
      });
    } else if (type === 'es2015') {
      const stringTable = parseEs2015StringTable(sheetJsonData);

      Object.keys(stringTable).forEach((lang) => {
        const fileContents = parseEs2015FileContents(stringTable, lang);
        folder.file(`${lang}.js`, fileContents, { base64: false });
      });
    } else if (type === 'nvs') {
      const stringTable = parseNvsStringTable(sheetJsonData);
      Object.keys(stringTable).forEach((lang) => {
        const fileContents = parseNvsFileContents(stringTable, lang);
        folder.file(`${lang}.js`, fileContents, { base64: false });
      });
    }
    download(zip);
    uploadFile(file.current.files[0]);
  };

  const handleFileChange = (e) => {
    const xlsxFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (onLoadEvent) => {
      const data = new Uint8Array(onLoadEvent.target.result);
      const workbook = xlsx.read(data, { type: 'array' });

      const { Sheets: sheet, SheetNames: sheetNames } = workbook;
      const json = xlsx.utils.sheet_to_json(sheet[sheetNames[0]]);

      if (json.length) {
        setSheetJsonData(json);
      }
    };
    reader.readAsArrayBuffer(xlsxFile);
  };

  const renderHeader = () => {
    if (sheetJsonData.length) {
      const width = 100 / Object.keys(sheetJsonData[0]).length;
      const ths = Object.keys(sheetJsonData[0]).map((h) => (<th style={{ width: `${width}%` }} key={h}>{h}</th>));
      return (
        <thead>
          <tr>
            {ths}
          </tr>
        </thead>
      );
    }
    return null;
  };

  const renderBody = () => {
    if (sheetJsonData.length) {
      const width = 100 / Object.keys(sheetJsonData[0]).length;
      const trs = sheetJsonData.map((data) => {
        const tds = Object.keys(data).map((key) => (
          <td style={{ width: `${width}%` }} key={`${key}`}>
            <span title={data[key]}>{data[key]}</span>
          </td>
        ));
        let key = data.KEY;
        if (!key) key = `${data.KEY1}-${data.KEY2}`;
        return (
          <tr key={key}>{tds}</tr>
        );
      });
      return (
        <tbody>
          {trs}
        </tbody>
      );
    }
    return null;
  };

  return (
    <>
      <div className="panel">
        <h1 className="panel__title">Upload File</h1>
        <div className="panel__file">
          <input type="file" name="xlsx-file" id="xlsx-file" accept=".xlsx" ref={file} onChange={handleFileChange} />
        </div>
        <div className="panel__output">
          <select name="output-type" id="output-type" onChange={handleOutputTypeChange} value={type}>
            <option value="json">JSON</option>
            <option value="es2015">ES 2015</option>
            <option value="nvs">NVS</option>
          </select>
        </div>
        <input type="button" value="Save" onClick={handleSaveClick} disabled={!sheetJsonData.length} />
      </div>

      <div className="output">
        <div className="output__title"><h1>Output:</h1></div>
        <div className="output__area">
          <table>
            {renderHeader()}
            {renderBody()}
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
