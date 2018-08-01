<template>
    <div class="navbar">
        <nav class="nav-extended indigo darken-2">
            <div class="nav-content">
                <router-link :to="{name: 'Index'}">
                    <span class="nav-title">CB Ninja Smoothies</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab">
                    <router-link :to="{name: 'AddSmoothie'}">
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .navbar nav {
        padding: 0 20px;
    }
    .navbar nav span {
        transition: all .2s ease-out;
    }
    .navbar nav span:hover {
        transition: all .5s ease-out;
        transform: rotate3d(1, 1, 1, -5deg) translateX(-10px);
    }
    .navbar nav span:hover:after { 
        content:' home';
    }
</style>