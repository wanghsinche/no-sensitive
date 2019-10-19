import {ENCRYPT, DECRYPT} from '../lib/constant';


function sendAction(info:chrome.contextMenus.OnClickData, action:string) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type:info.editable?ENCRYPT:DECRYPT});
    });
}

chrome.contextMenus.create({
    title: ENCRYPT, contexts: ["editable"], onclick: function(info, tab){ sendAction(info, ENCRYPT);}
});

chrome.contextMenus.create({
    title: DECRYPT, contexts: ["selection"], onclick: function(info, tab){ sendAction(info, DECRYPT); }
});
