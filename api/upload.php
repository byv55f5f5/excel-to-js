<?php
// disabled php cache
ini_set("opcache.enable", "0");

$target_dir = "/share/Web/exceltojs/uploads/";
$target_file = $target_dir.basename($_FILES["file"]["name"]);

if(isset($_FILES["file"])) {
  if(file_exists($target_file)) {
      // change the file permissions if allowed
      chmod($target_file, 0755);
      // remove the file
      if (unlink($target_file)) {
        echo "Replace old file\n";
      }
  }
  if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    echo "The file ".htmlspecialchars(basename($_FILES["file"]["name"]))." has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
?>