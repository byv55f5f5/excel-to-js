# excel-to-js
A small UI to transform excel to specific format JS file. I use this to manage my i18n files.

## Usage step:
1. npm install
2. npm run build
3. Create a folder name "exceltojs" in NAS web server directory.
  $ mkdir /share/Web/exceltojs
4. Create a folder name "uploads" in "exceltojs" folder. Make sure its permission is writable.
  $ mkdir /share/Web/exceltojs/uploads
  $ chmod 777 /share/Web/exceltojs/uploads/
5. Put files in build directory on NAS.
6. Put files in api directory on NAS.

- file system:
exceltojs - - index.html
          + - index.bundle.js
          + - api
          |    + - upload.php
          + - uploads

- P.S: You can edit $target_dir value of api/upload.php for different excel save folder.
- P.S: You can edit API calling path in src/app/uploadFile.js for different upload.php location.