import fs from 'fs';
const 
[filePath , folderPath] = ['./datas/data.json' , './datas'];

if( !fs.existsSync(folderPath) ) 
{ fs.mkdirSync(folderPath) }

if ( !fs.existsSync(filePath) || fs.readFileSync(filePath , 'utf-8') == "" ) 
{ fs.writeFileSync(filePath , '[]' , 'utf-8') }

export const loadDatas = () =>  {
    const fileReader = fs.readFileSync(filePath , 'utf-8');
    const parseDatas = JSON.parse(fileReader);
    return parseDatas
}
const datas = loadDatas()
export const findData = (code) => {
    const datas = loadDatas()
    const data = datas.find((data) => data.code === code)
    return data 
}

const writeNewData = (datas) => {
    fs.writeFileSync(filePath , JSON.stringify(datas) , 'utf-8')
};

function randomCode ()  {
    const dataCode = []
    datas.forEach(data => {
        dataCode.push(data.code)
    })
    const code = []
    for(let index = 0 ; index < 5 ; index ++) {
        code.push(Math.floor((Math.random() * 9) + 1))
    }
    if ( dataCode.includes(code.join('')) ) 
    {randomCode()}
    else {return code.join('')}
}

export const addDatas = (data) => {
    const fileReader = loadDatas()
    data.code = randomCode()
    fileReader.push(data)
    writeNewData(fileReader)
}