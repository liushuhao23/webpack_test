<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-10-25 17:17:33
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-02-03 23:13:35
-->
<template>
    <div class="index">
        <button @click="goOther">确三生zs世XXXXxmmxxmmx定</button>
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

export default {
    setup() {
        const scroll = reactive({
            x: true
        })
        const route = useRouter()
        const title = reactive([
            {
                title: '方案研究阶段5方案研究阶段5方案研究阶段5方案研究阶段5方案研究阶段5方案研究阶段5方案研究阶段5',
                value: 'age'
            },
            {
                title: '方案研究阶段2',
                value: 'firstName'
            },
            {
                title: '方案研究阶段3',
                value: 'lastName'
            },
            {
                title: '方案研究阶段4',
                value: 'address'
            },
            {
                title: '方案研究阶段5',
                value: 'tags'
            },
            {
                title: '方案研究阶段6',
                value: 'tagsss'
            },
            {
                title: '方案研究阶段7',
                value: 'tagsss'
            },
            {
                title: '方案研究阶段8',
                value: 'tagsss'
            },
            {
                title: '方案研究阶段1',
                value: 'age'
            },
            {
                title: '方案研究阶段2',
                value: 'firstName'
            },
            {
                title: '方案研究阶段3',
                value: 'lastName'
            },
            {
                title: '方案研究阶段4',
                value: 'address'
            },
            {
                title: '方案研究阶段5方案研究阶段5方案研究阶段5方案研究阶段5方案研究阶段5方案研究阶段5方案研究阶段5',
                value: 'tags'
            },
            {
                title: '方案研究阶段6',
                value: 'tagsss'
            },
            {
                title: '方案研究阶段7',
                value: 'tagsss'
            },
            {
                title: '方案研究阶段8',
                value: 'tagsss'
            }
        ])
        const data: any = [
            {
                key: '1',
                firstName: [
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    }
                ],
                lastName: [
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    }
                ],
                age: [
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    }
                ],
                address: [
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    }
                ],
                tags: [
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    }
                ]
            },
            {
                key: '1',
                firstName: [
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    }
                ],
                lastName: [
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    }
                ],
                age: [
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    }
                ],
                address: [
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    }
                ],
                tags: [
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    },
                    {
                        name: 111,
                        id: 2
                    }
                ]
            }
        ]
        const goOther = (): void => {
            route.push({ path: '/testCom' })
        }
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
