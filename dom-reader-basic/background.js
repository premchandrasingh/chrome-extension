chrome.runtime.onMessage.addListener(function (msg, sender) {
  // First, validate the message's structure
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab
    chrome.pageAction.show(sender.tab.id);
  }
});

// chrome.tabs.onUpdated.addListener(function (tabId, eventData, tab) {
//     if (tab.url.indexOf('http://stackoverflow.com') == 0 )
//         chrome.pageAction.show(tabId);
// });