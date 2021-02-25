export default (zip) => {
  zip.generateAsync({ type: 'base64' }).then((base64) => {
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', `data:application/zip;base64,${base64}`);
    downloadAnchorNode.setAttribute('download', 'lang.zip');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });
};
