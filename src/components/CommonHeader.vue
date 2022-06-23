<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
        </div>
		<div class="r-content">
			<router-link class="alink" to="/"><el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar></router-link>
		</div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            //控制左侧菜单是否折叠
            collapseMenu() {
                this.$store.commit('collapseMenu')
            },
            //退出登陆
            logOut() {
                location.reload()
            }
        }
    }
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
		background-color:black;
    }

    .l-content {
        display: flex;
        align-items: center;

        .el-button {
            margin-right: 20px;
        }
    }

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
</style>

<style lang="scss">
    .el-breadcrumb__item {
        .el-breadcrumb__inner {
            color: #666666;
            font-weight: normal;
        }

        &:last-child {
            .el-breadcrumb__inner {
                color: #ffffff;
            }
        }
    }
</style>
