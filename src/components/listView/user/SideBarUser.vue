<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
    localStorage.removeItem('accessToken')
    router.push({ name: 'login' });
}
const handleRequestList = () => {
    router.push({ name: 'userLayout' });
}
const handleProfile = () => {
    router.push({ name: 'profile' });
}
</script>
<template>
    <aside>
        <p>Management-Club</p>
        <a href="javascript:void(0)" @click="handleRequestList" class="item">
            <img src="../../../assets/icons/home.svg" alt="" class="icon">
           <span>Home</span>
        </a>
        <a href="javascript:void(0) " class="item">
            <img src="../../../assets/icons/inbox.svg" alt="" >
            <span>Inbox</span>
        </a>
        <a href="javascript:void(0)" class="item" @click="handleProfile">
            <img src="../../../assets/icons/user.svg" alt="" >
            <span>Profile</span>
        </a>
        <a href="javascript:void(0)" @click="logout" class="item">
            <img src="../../../assets/icons/arrow_left.svg" alt="" class="icon">
            <span>Logout</span>
        </a>
    </aside>
</template>
<style scoped>
aside {
    color: #fff;
    width: 16vw;
    padding-left: 20px;
    height: 100vh;
    background-color: rgb(189, 129, 0);
    border-top-right-radius: 80px;
    position: fixed;
}

aside a {
    font-size: 12px;
    color: #fff;
    display: block;
    padding: 12px;
    padding-left: 30px;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}

aside a:hover {
    color: #3f5efb;
    background: #fff;
    outline: none;
    position: relative;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}

aside a i {
    margin-right: 5px;
}

aside a:hover::after {
    content: "";
    position: absolute;
    background-color: transparent;
    bottom: 100%;
    right: 0;
    height: 35px;
    width: 35px;
    border-bottom-right-radius: 18px;
    box-shadow: 0 20px 0 0 #fff;
}

aside a:hover::before {
    content: "";
    position: absolute;
    background-color: transparent;
    top: 38px;
    right: 0;
    height: 35px;
    width: 35px;
    border-top-right-radius: 18px;
    box-shadow: 0 -20px 0 0 #fff;

    
}

aside p {
    margin: 0;
    padding: 40px 0;
    font-weight: 700;
    font-size: 20px;
}
aside .item {
    display: flex;
    
}
aside .item img {
    width: 20px;
    margin-right: 10px;
}
/*hover img*/
aside .item:hover img {
    filter: invert(0.5);
}
body {
    /* font-family: 'Roboto'; */
    width: 100%;
    height: 100vh;
    margin: 0;
}

.social {
    height: 0;
}

.social i:before {
    width: 14px;
    height: 14px;
    font-size: 14px;
    position: fixed;
    color: #fff;
    background: #0077B5;
    padding: 10px;
    border-radius: 50%;
    top: 5px;
    right: 5px;
}

</style>