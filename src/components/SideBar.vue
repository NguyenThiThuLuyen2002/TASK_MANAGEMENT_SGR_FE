<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
    localStorage.removeItem('accessToken')
    router.push({ name: 'login' });
}
const handleRequestList = () => {
    router.push({ name: 'admin' });
}
</script>
<template>
    <aside>
        <p>Management-Club</p>
        <a href="javascript:void(0)" @click="handleRequestList" class="item">
            <img src="../assets/icons/home.svg" alt="" class="icon">
            Home
        </a>
        <a href="javascript:void(0) " class="item">
            <img src="../assets/icons/inbox.svg" alt="" >
            Inbox
        </a>
        <a href="javascript:void(0)" class="item">
            <i class="fa fa-clone" aria-hidden="true"></i>
            Shared with me
        </a>
        <a href="javascript:void(0)" class="item">
            <i class="fa fa-star-o" aria-hidden="true"></i>
            Starred
        </a>
        <a href="javascript:void(0)" @click="logout" class="item">
            <img src="../assets/icons/arrow_left.svg" alt="" class="icon">
            Logout
        </a>
    </aside>
</template>
<style>
aside {
    color: #fff;
    width: 300px;
    padding-left: 20px;
    height: 100vh;
    background-image: linear-gradient(30deg, #0048bd, #44a7fd);
    border-top-right-radius: 80px;
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
    position: relative;
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