/*
  @Author: lize
  @Date: 2021/6/25
  @Description : 
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/6/25
*/
const prefix = '' // 前缀
const ApiJoin = value => `${prefix}${value}` // 拼接接口

const Api = {
    getProjectList: ApiJoin('/dashboard/show/getProjects'), // 获取项目列表
    getDateNameTagList: ApiJoin('/dashboard/config/tag/getDateNameTagList'), // 获取主题列表
    getDescTagTree: ApiJoin('/dashboard/config/tag/getDescTagTree'), // 获取主题下的标签
    getBoardDetail: ApiJoin('/dashboard/config/board/file/getFileBoard'), // 查看看板详情
    handleFileAdd: ApiJoin('/dashboard/config/board/file/add'), // 保存配置
    getFilePlateData: ApiJoin('/dashboard/show/file/getFilePlateData'), // 获取主题下的文件看板数据
    getShowFileBoard: ApiJoin('/dashboard/config/board/file/showFileBoard'), // 获取有权限的看板数据
    validationChackAuth: ApiJoin('/dashboard/config/board/chackAuth'), // 验证是否有权限
    authorization: ApiJoin('/dashboard/config/common/authorization') // 授权  
}
export default Api
