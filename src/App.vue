<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-09-26 16:25:25
 * @LastEditors: liushuhao
 * @LastEditTime: 2021-10-25 17:37:58
-->
<template>
    <a-layout style="height: 100%; padding: 0 20px">
        <a-layout>
            <a-layout-content>
                <a-config-provider :locale="locale">
                    <template #renderEmpty>
                        <div style="text-align: center">
                            <img style="width: 100px" src="./assets/img/empty.png" alt="" />
                            <p>暂无数据</p>
                        </div>
                    </template>
                    <router-view />
                </a-config-provider>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
    setup() {
        // eslint-disable-line
        const locale = ref(zhCN)
        return {
            locale
        }
    }
}
</script>

<style scoped lang="less">
.app-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .left-menu-wrap {
        width: 217px;
    }
    .router-view-wrap {
        flex: 2;
        height: 100%;
    }
}
</style>
<style lang="less">
#app {
    width: 100%;
    max-height: 100%;
    height: 100%;
    min-height: 100%;
    overflow-y: auto;
    background-color: var(--neutral-color-3);
}
</style>
