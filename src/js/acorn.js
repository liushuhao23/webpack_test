/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-12-04 22:38:00
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-12-04 23:39:37
 */
let acorn = require("acorn");
let path = require('path')
const fs = require('fs');
const { json } = require("express");
const stringContent =  fs.readFileSync(path.resolve(__dirname, 'index.js'), "utf8");
const ast = acorn.parse(stringContent, {ecmaVersion: 2020})
const content = `${JSON.stringify(ast)}`
if (fs.existsSync('ast')) {
    fs.writeFile('ast/ast.json', content, function(err) {
        if (err) {
            throw new Error(err)
        } else {
            console.log('写入ast.json 成功')
        }
    } )
} else {
    fs.mkdir('ast', function(err){
        if (err) {
            throw new Error(err)
        } else {
            console.log('创建ast 文件夹');
            fs.writeFile('ast/ast.json', content , function(err) {
                if (err) {
                    throw new Error(err)
                } else {
                    console.log('写入ast.js 成功')
                }
            } )
        }
    })
}

console.log(typeof(ast), 'stringContent');
