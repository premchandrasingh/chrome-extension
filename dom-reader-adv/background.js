var zynbitTabs = [];

chrome.runtime.onMessage.addListener(function (msg, sender, callback) {
  console.log('bg listener', msg);

  if (msg.from === 'content') {

  } else if (msg.from === 'popup') {
    fromPopup(msg, sender, callback);
  }

});

function fromPopup(msg, sender, callback) {
  if (msg.subject == 'tab-broadcast') {
    sendMessageToAllTabs({ from: 'bg', subject: 'broadcast', data: msg.data });
  } 
}


chrome.tabs.onUpdated.addListener(function (tabId, eventData, tab) {
  if (tab.url.indexOf('http://stackoverflow.com') == 0) {
    chrome.pageAction.show(tabId);
    
    if (!_.contains(zynbitTabs, tabId)) {
      zynbitTabs.push(tabId);
    }
  }
  else {
    zynbitTabs =_.reject(zynbitTabs, function (tab) {
      return tab == tabId;
    });
  }
  console.log(zynbitTabs);
});

chrome.tabs.onRemoved.addListener(function (tabId, info) {
  zynbitTabs = _.reject(zynbitTabs, function (tab) {
    return tab == tabId;
  });
});

function sendMessageToAllTabs(message) {
  _.each(zynbitTabs, function (tab) {
    chrome.tabs.sendMessage(tab, message);
  });
}
