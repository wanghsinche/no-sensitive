import {TEXTHEADER, KEYNAME} from '../lib/constant';
import * as LZUTF8 from 'lzutf8';

import * as cnchar from 'cnchar';
import 'cnchar-poly';
import 'cnchar-order';
import 'cnchar-trad';

export const encryptMethod = [
    'spark', 'LZUTF8'
];

export function dateFormat(d:Date){
    const year = d.getFullYear();
    const month = d.getMonth();
    const date = d.getDate();
    const hrs = d.getHours();
    const minute = d.getMinutes();
    return `${year}-${month}-${date} ${hrs}:${minute}`
}

export function replaceSelect(selection: Selection, text:string){
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
}


function encode(ori:string){
    const s = LZUTF8.compress(ori, {inputEncoding:'String', outputEncoding:'Base64'});
    return s;
}
function decode(s:string){
    const ss = LZUTF8.decompress(s, {inputEncoding:'Base64', outputEncoding:'String'});
    return ss;
}

function encodeSpark(ori:string){
    return cnchar.convert.simpleToSpark(ori);
}
function decodeSpark(s:string){
    return cnchar.convert.sparkToSimple(s);
}



export function encrypt(txt:string, version:string){
    let encrypted = '';
    if (version === 'LZUTF8') {
        encrypted = encode(txt);
    } else if (version === 'spark') {
        encrypted = encodeSpark(txt);
    } else {
        encrypted = txt;
    }
    return encrypted+`|${TEXTHEADER}-${version}`;
}

export function decrypt(txt:string){
    const regstr = TEXTHEADER.replace(/\*/g, '\\*');
    const reg = new RegExp(`\\|${regstr}\-(\\w+)`);
    const match = txt.match(reg);
    const clearn = txt.replace(reg, '').trim();
    if (match) {
        if (match[1] === 'LZUTF8') {
            return decode(clearn);
        }
        if (match[1] === 'spark') {
            return decodeSpark(clearn);
        }
    }
    return '';
}
