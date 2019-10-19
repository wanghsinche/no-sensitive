import {ENCRYPT, DECRYPT} from '../lib/constant';


function sendAction(info:chrome.contextMenus.OnClickData) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:info.editable?ENCRYPT:DECRYPT});
    });
}

chrome.contextMenus.create({
    title: '加密', contexts: ["editable"], onclick: function(info, tab){ sendAction(info);}
});

chrome.contextMenus.create({
    title: '解密', contexts: ["selection"], onclick: function(info, tab){ sendAction(info); }
});

