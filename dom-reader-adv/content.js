// Inform the background page that 
// this tab should have a page-action
// chrome.runtime.sendMessage({
//   from: 'content',
//   subject: 'showPageAction'
// });

var tracking = true;

chrome.runtime.onMessage.addListener(function (msg, sender, callback) {
  console.log('content listener', msg);

  if (msg.from === 'popup') {
    if (msg.subject === 'DOMInfo') {
      var domInfo = {
        total: document.querySelectorAll('*').length,
        inputs: document.querySelectorAll('input').length,
        buttons: document.querySelectorAll('button').length
      };
      if (!tracking) {
        domInfo.total = domInfo.inputs = domInfo.buttons = 'tracking disabled';
      }

      callback(domInfo);

    } else if (msg.subject == 'get-tracking') {
      callback(tracking);
    }
  } else if (msg.from == 'bg') {
    if (msg.subject == 'broadcast') {
      if (msg.data.subject == 'tracking')
        tracking = msg.data.value;
    }
  }
});
