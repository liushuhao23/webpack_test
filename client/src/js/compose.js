/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-26 15:02:26
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-11-26 17:50:34
 */
function compose(middleware) {
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return function (context, next) {
        // last called middleware #
        let index = -1
        return dispatch(0)
        function dispatch(i) {
            console.log(i, 'compose(testArr)')
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i
            let fn = middleware[i]
            if (i === middleware.length) fn = next
            if (!fn) return Promise.resolve()
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

// const compose = middleware => {
//     if (!Array.isArray(middleware)) throw new Error('传入的数据不是数组')
//     for (const key in middleware) {
//         if (typeof middleware[key] !== 'function') throw new Error('中间件类型必须是函数')
//     }
//     return function (context, next) {
//         let index = -1
//         return dispatch(0)
//         function dispatch(i) {
//             if (i <= index) return Promise.reject(new Error('next() called multiple times'))
//             index = i
//             let fn = middleware[i]
//             if (i === middleware.length) fn = next
//             if (!fn) {
//                 return Promise.resolve()
//             }
//             try {
//                 return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
//             } catch (error) {
//                 throw Promise.reject(err)
//             }
//         }
//     }
// }
export { compose }
