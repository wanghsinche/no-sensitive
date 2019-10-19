import { replaceSelect, decrypt, encrypt } from '../lib/utils';
import { DECRYPT, ENCRYPT } from '../lib/constant';

function decryptHandle(){
    let text = document.getSelection().toString();
    text = decrypt(text);
    replaceSelect(document.getSelection(), text)
}

function encryptHandle(){
    const element = document.activeElement;
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement){
        if (typeof element.value === 'string' && element.value.length > 0) {
            element.value = encrypt(element.value);
        }
    } 
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === DECRYPT) {
        decryptHandle();
    } else if (request.type === ENCRYPT){
        encryptHandle();
    } else {
        console.log('nothing');
    }

});
