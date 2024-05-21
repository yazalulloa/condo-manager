let zipDialogData;
let dataEmailZip;
let emailZipDialogBtnSubmit;
let emailsZip;
let emailZipTemplate;

window.initReceipt = function () {
  zipDialogData = Alpine.reactive({zip_dialog_open: false})
  dataEmailZip = window.Alpine.reactive({emails: []});
  emailZipDialogBtnSubmit = document.getElementById("submit-receipt-zip");
  emailsZip = document.getElementById("emails-zip");
  emailZipTemplate = document.getElementById("email-zip-template");
}