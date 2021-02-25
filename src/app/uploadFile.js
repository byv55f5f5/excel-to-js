export default async (file) => {
  const formData = new FormData();
  formData.set('file', file);
  await fetch(`${window.location.protocol}//${window.location.hostname}/exceltojs/api/upload.php`, {
    method: 'POST',
    body: formData,
  });
};
