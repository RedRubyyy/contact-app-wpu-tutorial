import fs from 'fs';
import { randomCode } from './randomCode.mjs';

export const [filePath , folderPath] = ['./datas/data.json' , './datas'];

// CHECKING DATA []
( function () {
    if( !fs.existsSync(folderPath) ) 
        { fs.mkdirSync(folderPath) }
    if ( !fs.existsSync(filePath) || fs.readFileSync(filePath , 'utf-8') == "" ) 
        { fs.writeFileSync(filePath , '[]' , 'utf-8') }
} () )

// LOAD DATA
export const loadDatas = () =>  {
    const fileReader = fs.readFileSync(filePath , 'utf-8');
    const parseDatas = JSON.parse(fileReader);
    return parseDatas
};
export const datas = loadDatas();
// FIND DATA
export const findData = (code) => {
    const datas = loadDatas()
    const data = datas.find(data => data.code == code)
    return data 
};
// WRITE OR PUSH DATAS TO JSON
export const writeNewData = (datas) => {
    fs.writeFileSync(filePath , JSON.stringify(datas) , 'utf-8')
};
// DELETE DATA
export const deleteData = (code) => {
    const datas = loadDatas()
    const newData = datas.filter(data => data.code != code)
    writeNewData(newData)
};
// ADD DATA
export const addData = (data , defaultCode) => {
    const datas = loadDatas()
    !defaultCode ? data.code = randomCode() : 'escape';
    datas.push(data)
    writeNewData(datas)
}