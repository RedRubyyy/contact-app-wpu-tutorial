import { datas } from "./datasPocessing.mjs";

export function randomCode ()  {
    const datasCode = datas.map(data => data.code)
    let code = ''
    for(let index = 0 ; index < 5 ; index ++) {
        code += Math.floor((Math.random() * 9) + 1)
    }
    if ( datasCode.includes(code) ) {
        randomCode()
    }
    return code
}