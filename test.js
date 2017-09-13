

const pathTool = require('path')
const fromPath = `/Users/hubiqing/Documents/workspace/study-projects/hbq-gulp/src/angular-material.css`


const toPath = pathTool.resolve('dist2')

const copy = require('copy')

copy(fromPath, toPath, { cwd: pathTool.resolve('src') }, () => {
    console.log('okok')
})

console.log('ooookkkkk')