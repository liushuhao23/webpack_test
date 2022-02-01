/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-12-09 21:52:56
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-12-09 22:22:55
 */
async function test() {
    return '52555'
}
interface Dictionary<T = any> {
    [key: string]: T;
}
type StrDict = Dictionary<number>


type DictMember<T> = T extends Dictionary<infer V> ? V : never
// type StrPromise = ReturnType<typeof test>
type StrDictMember = DictMember<StrDict> 
// type PromiseType<T> =  T extends Promise<infer R> ? R : T

// type StrPromiseRes =  PromiseType<StrPromise>
// console.type(StrPromiseRes)

interface inUser {
    name: string
    age: number
    department: string
}
type optional = Partial<inUser>
type unionKey = keyof inUser
type values = inUser[unionKey]
// type userType = keyof inUser