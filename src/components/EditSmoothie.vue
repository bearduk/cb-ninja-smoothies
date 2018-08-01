<template>
    <div class="edit-smoothie container">
        <router-link :to="{name: 'Index'}"><p><i class="material-icons home">
home</i></p></router-link>
        <h2>Edit a smoothie {{this.$route.params.smoothie_slug}}</h2>
        <p>{{this.$route.params}} is the $route param 'this.$route.params.smoothie_slug'</p>

    </div>
</template>

<script>
    export default {
        name: 'EditSmoothie',
        created(){
            // console.log(this.$route)
        },
        data(){
            return {

            }
        }
    }
</script>

<style>

</style>