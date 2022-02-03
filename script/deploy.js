/*
 * @Description: 构建
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-02-02 17:55:34
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-02-02 22:41:22
 */
const Rsync = require('rsync')
const shell = require('shelljs')
const path = require('path')
if (shell.exec('yarn install').code !== 0) {
    shell.echo('Error: yarn install failed')
    shell.exit(1)
}

if (shell.exec('yarn build').code !== 0) {
    shell.echo('Error: yarn build failed')
    shell.exit(1)
}
const rsync = Rsync.build({
    source: path.join(__dirname, '../dist/*'),
    destination: 'root@59.110.227.202:/root/vue_test',
    flags: 'avz',
    shell: 'ssh'
})

rsync.execute((err, code, cmd) => {
    console.log(err, code, cmd)
})
