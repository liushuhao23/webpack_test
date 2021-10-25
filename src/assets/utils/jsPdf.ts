/*
  @Author: lize
  @Date: 2021/6/25
  @Description : 
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/10/19
*/

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2Canvas from 'html2canvas'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JsPDF from 'jspdf'

export const base64ToBlob = (base64: string) => {
    const parts = base64.split(';base64,')
    const contentType = parts[0].split(':')[1]
    const raw = window.atob(parts[1])
    const rawLength = raw.length
    const uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: contentType })
}
const blobToFile = (blob, fileName) => {
  blob.lastModifiedDate = new Date(); // eslint-disable-line
  blob.name = fileName; // eslint-disable-line
  return blob; // eslint-disable-line
}
const fileToBase64 = file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = e => e.target.result
}
//创建下载链接
export const saveAs = (obj, fileName) => {
    //当然可以自定义简单的下载文件实现方式\
    const tmpa = document.createElement('a')
    tmpa.download = fileName || '自定义文件'
    tmpa.href = URL.createObjectURL(obj) //绑定a标签
    tmpa.click() //模拟点击实现下载
    setTimeout(function () {
        //延时释放
        URL.revokeObjectURL(obj) //用URL.revokeObjectURL()来释放这个object URL
    }, 100)
}
const exportPdf = async (opt: any, callBack?: any) => {
    const canvas: any = await html2Canvas(document.querySelector(opt.el), { allowTaint: true })
    if (!canvas) return false
    const pageData = canvas.toDataURL('image/png', 1.0)
    if (!opt.pdf) {
        const Blob = base64ToBlob(pageData)
        const File = blobToFile(Blob, opt.title || '自定义文件')
        if (!opt.downLoad) {
            return { base64: pageData, Blob, File }
        } else {
            saveAs(Blob, opt.title || '自定义文件')
            callBack && typeof callBack === 'function' && callBack(true)
            return true
        }
    }
    const contentWidth = canvas.width
    const contentHeight = canvas.height
    const pageHeight = (contentWidth / 592.28) * 841.89
    let leftHeight = contentHeight
    let position = 0
    const imgWidth = 595.28
    const imgHeight = (592.28 / contentWidth) * contentHeight
  const PDF = new JsPDF('landscape', 'pt', 'a4'); // eslint-disable-line
    if (leftHeight < pageHeight) {
        PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
        while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
                PDF.addPage()
            }
        }
    }
    if (!opt.downLoad) return PDF.output('datauristring')
    PDF.save(`${opt.title || '自定义文件'}.pdf`)
    callBack && typeof callBack === 'function' && callBack(true)
    return true
}

export default exportPdf
