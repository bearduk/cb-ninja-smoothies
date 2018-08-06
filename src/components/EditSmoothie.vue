<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <router-link :to="{name: 'Index'}"><p><i class="material-icons home">
home</i></p></router-link>
        <!-- <h2>Edit a smoothie {{this.$route.params.smoothie_slug}}</h2>
        <p>{{this.$route.params}} is the $route param 'this.$route.params.smoothie_slug'</p> -->
<h2 v-if="smoothie">Edit smoothie {{smoothie.title}}</h2>
{{smoothie}}
<!-- <ul>
    <li v-if="smoothie" v-for="(ing, index) in smoothie.ingredients" :key="index">{{ing}}</li>
</ul> -->

        <form @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient (press enter)</label>
                <input type="text" name="add-ingredient" @keydown.enter.prevent="addIngredient" v-model="another">
            </div>
            <div v-if="smoothie.ingredients" v-for="(ing, index) in smoothie.ingredients" :key="index" class="field add-ingredient">
                <label for="ingredient">Ingredient</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">

                <i class="material-icons delete" @click="deleteIngredient(smoothie.ingredients[index])">delete</i>

            </div>
            <p v-if="feedback" class="red-text">{{feedback}}</p>
            <div class="field center-align">
                <button class="btn pink">Update Smoothie</button>
            </div>
        </form>


    </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';

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
                    // console.log(this.smoothie);
                })
            });
        },
        data(){
            return {
                smoothie: null,
                another: null,
                feedback: null
            }
        },
        methods: {
            addIngredient(){
                if (this.another) {
                    this.smoothie.ingredients.push(this.another);
                    this.another = null
                    console.log(this.ingredients);
                    this.feedback = null;
                } else {
                    this.feedback = 'You must enter a value to add an ingredient'
                }
            },
            deleteIngredient(ing){
                // console.log(this.smoothie.ingredients);
                this.smoothie.ingredients = this.smoothie.ingredients.filter((ingredient) =>{
                    return ingredient != ing;
                })
            },
           EditSmoothie(){
                console.log(this.title + ' ' + this.ingredients);

                if (this.smoothie.title){
                    // create slug
                    this.smoothie.slug = slugify(this.smoothie.title, {
                        replacement: '-',
                        remove: /[$*~+-.()'"!\-:@]/g,
                        lower: true
                    })
                    this.feedback = null;
                    console.log(this.slug);
                    
                    db.collection('smoothies').doc(this.smoothie.id).update({
                        title: this.smoothie.title,
                        ingredients: this.smoothie.ingredients,
                        slug: this.smoothie.slug
                    }).then(() => {
                        this.$router.push({name: 'Index'});
                    }).catch(err => {
                        console.log(err);
                        
                    })
                } else {
                    this.feedback = "You must enter a smoothie title."
                }
            },            
        }
    }
</script>

<style>
.edit-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-smoothie h2{
    font-size: 2rem;
    margin: 20px auto;
}
.edit-smoothie .field {
    margin: 20px auto;
    position: relative;
}
.edit-smoothie .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
}
</style>