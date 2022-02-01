<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-10-25 17:17:33
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-12-08 13:43:28
-->
<template>
    <div class="index">
        <button @click="goOther">确三生世定</button>
        <a-table class="table" :data-source="data" :scroll="scroll" tableLayout="fixed" :pagination="false">
            <a-table-column v-for="item in title" :key="item.value" :data-index="item.value">
                <template #title>
                    <div class="table_title">
                        <span>{{ item.title }}</span>
                    </div>
                </template>
                <template #default="{ record }">
                    <div class="rowClass">
                        <div class="content" v-for="(item, index) in record[item.value]" :key="index">
                            {{ item.name }}
                        </div>
                    </div>
                </template>
            </a-table-column>
        </a-table>
    </div>
</template>

<script lang="ts">
import { nextTick, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { compose } from '../js/compose'

export default {
    setup() {
        const scroll = reactive({
            x: true
        })
        const route = useRouter()
        const title = reactive([])
        const data: any = []
        const goOther = (): void => {
            route.push({ path: '/testCom' })
        }
        const testArr = []
        const a = async (ctx, next) => {
            await next()
            console.log(111, 'a')
        }
        const b = async (ctx, next) => {
            console.log(222, 'b')
            await next()
            console.log(2222, 'b-1')
        }
        const c = async (ctx, next) => {
            console.log(3333, 'c')
            await next()
            console.log(33333, 'c-1')
        }
        testArr.push(a)
        testArr.push(b)
        testArr.push(c)
        const te = compose(testArr)
        te(1, () => {
            console.log('执行回调')
        })
        return {
            data,
            title,
            scroll,
            goOther
        }
    }
}
</script>

<style scoped lang="less">
.table {
    min-height: 1020px;
}
.table_title {
    height: 100%;
    padding: 5px 50px;
    border: 1px solid #cccccc;
    background-color: #1890ff;
    display: flex;
    align-items: center;
    text-align: center;
    // padding: 3px 10px;
    border-radius: 5px;
    color: #ffffff;
    width: max-content;
}
.rowClass {
    display: inline-flex;
    width: 100%;
    max-width: 100%;
    flex-wrap: wrap;
    min-height: 100%;
    align-items: baseline;
    justify-content: center;
    .content {
        padding: 5px;
        max-width: 100px;
        background-color: #1890ff;
        margin-left: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
        color: #ffffff;
    }
}

:deep(.ant-table td) {
    white-space: nowrap;
}
:deep(.ant-table td) {
    height: 0px;
}
</style>
