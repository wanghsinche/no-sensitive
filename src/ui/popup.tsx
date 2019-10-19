import * as React from "react"
import {useState} from 'react';
import * as ReactDOM from "react-dom"
import {KEYNAME} from '../lib/constant';
import {encryptMethod} from '../lib/utils';

import "../styles/popup.css"

const Hello:React.FC=()=>{
    const [method, setMethod] = useState('spark');
    useState(()=>{
        chrome.storage.local.get(res=>{
            if (res[KEYNAME]){
                setMethod(res[KEYNAME]);
            }
        });
    });

    function aboutMe(){
        chrome.tabs.create({url:'https://github.com/wanghsinche'})
    }
    function changeMethod(e:React.ChangeEvent<HTMLSelectElement>){
        const toSave:any = {};
        toSave[KEYNAME] = e.target.value;
        chrome.storage.local.set(toSave,()=>{
            setMethod(toSave[KEYNAME]);
        });
    }
    return <div className="popup-padded">
        <h3>
            rosnecon-文字转换器 
        </h3>
        <h4>
            You don't know what I talk about
        </h4>
        <p>encrypt method: <select value={method} onChange={changeMethod}>{
            encryptMethod.map(el=><option value={el} key={el}>{el}</option>)
        }</select></p>
        <button onClick={aboutMe}>About me</button>
    </div>;
}
// --------------

ReactDOM.render(
    <Hello />,
    document.getElementById('root')
)