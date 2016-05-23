function sendMessageToConent(msg, callback) {
  if ($.type(callback) != 'function')
    callback = function () { };

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // send message to tab
    chrome.tabs.sendMessage(tabs[0].id, msg, callback);
  });
}

function sendMessageToBg(msg, callback) {
  if ($.type(callback) != 'function')
    callback = function () { };

  // send message to background    
  chrome.runtime.sendMessage(msg, callback);
}

// Update the relevant fields with the new data
function setDOMInfo(info) {
  document.getElementById('total').textContent = info.total;
  document.getElementById('inputs').textContent = info.inputs;
  document.getElementById('buttons').textContent = info.buttons;
}

function getDomInfo() {
  sendMessageToConent({ from: 'popup', subject: 'DOMInfo' }, setDOMInfo);
}


function updateTrackingCheckBox() {
  chrome.storage.local.get('emailTracking', function (items) {
    var value = !!(items.emailTracking === undefined ? true : items.emailTracking);
    $('#chkEnable').prop('checked', value);
  })
}

function saveSetting(value) {
  chrome.storage.local.set({ 'emailTracking': value }, function (items) {
  });
}


$(function () {
  updateTrackingCheckBox();

  $('#btnRefresh').click(function (event) {
    getDomInfo();
  });

  $('#chkEnable').change(function (event) {
    var checked = $(this).is(':checked');
    var msg = { from: 'popup', subject: 'tab-broadcast', data: { subject: 'tracking', value: checked } };
    saveSetting(checked);

    sendMessageToBg(msg, function (result) {
      console.log(result);
    });

  });

});


