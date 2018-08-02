<template>
    <div class="edit-smoothie container">
        <router-link :to="{name: 'Index'}"><p><i class="material-icons home">
home</i></p></router-link>
        <!-- <h2>Edit a smoothie {{this.$route.params.smoothie_slug}}</h2>
        <p>{{this.$route.params}} is the $route param 'this.$route.params.smoothie_slug'</p> -->
<h2 v-if="smoothie">Edit smoothie {{smoothie.title}}</h2>

<ul>
    <li v-if="smoothie" v-for="(ing, index) in smoothie.ingredients" :key="index">{{ing}}</li>
</ul>
    </div>
</template>

<script>
import db from '@/firebase/init';

    export default {
        name: 'EditSmoothie',
        created(){
            // console.log(this.$route)
            // now look up an item using the only thing we have which is the slug!
            let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug);
            ref.get().then( (snapshot) => {
                snapshot.forEach( (doc) => {
                    console.log(doc.data());
                    // ok? cool so add to data prop
                    this.smoothie = doc.data();
                    this.smoothie.id = doc.id;
                })
            });
        },
        data(){
            return {
                smoothie: null
            }
        }
    }
</script>

<style>

</style>