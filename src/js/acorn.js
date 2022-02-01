/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-12-04 22:38:00
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-12-08 10:13:52
 */
let path = require('path')
const fs = require('fs')
const { parse } = require('@babel/parser')
const t = require('@babel/types')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default

const stringContent = fs.readFileSync(path.resolve(__dirname, 'index.js'), 'utf8')
const ast = parse(stringContent, {
    sourceType: 'unambiguous',
    plugins: ['jsx']
})
if (fs.existsSync('ast')) {
    traverse(ast, {
        ExpressionStatement(path) {
            const node = path.node
            if (node.type === 'ExpressionStatement' && node?.expression?.callee?.object?.name === 'console') {
                path.remove() // 删除当前节点
            }
        }
    })
    const content = `${JSON.stringify(ast)}`
    fs.writeFile('ast/ast.json', content, function (err) {
        if (err) {
            throw new Error(err)
        } else {
            console.log('写入ast.json 成功')
        }
    })
    fs.writeFile('ast/newjs.js', generate(ast).code, function (err) {
        if (err) {
            throw new Error(err)
        } else {
            console.log('写入newjs.js 成功')
        }
    })
} else {
    fs.mkdir('ast', function (err) {
        if (err) {
            throw new Error(err)
        } else {
            console.log('创建ast 文件夹')
            traverse(ast, {
                ExpressionStatement(path) {
                    const node = path.node
                    if (node.type === 'ExpressionStatement' && node?.expression?.callee?.object?.name === 'console') {
                        path.remove() // 删除当前节点
                        path.skip() //跳过子节点
                        let copyNode = t.cloneNode(node) //复制当前节点
                        traverse(copyNode, {}, {}, path) // 对子树进行遍历和替换，不影响当前的path
                    }
                }
            })
            const content = `${JSON.stringify(ast)}`
            fs.writeFile('ast/ast.json', content, function (err) {
                if (err) {
                    throw new Error(err)
                } else {
                    console.log('写入ast.js 成功')
                }
            })
        }
    })
}
