<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <!-- or wrap (smoothie, index) for a key in a v-for -->
        <div class="card-content">
          <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
          <h2 class="indigo-text">
            {{smoothie.title}}
          </h2>
          <ul class="ingredients">
            <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ingredient}}</span>
              </li>
          </ul>
        </div>
        <span class="btn-floating btn-large halfway-fab pink" ><router-link :to="{name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug}}">
          <i class="material-icons edit">edit</i>
          </router-link></span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: 'Index',
  created(){
    // fetch data from the firestore
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data(), doc.id);
        // note that the id is not part of the document data, you have to fetch it separately
        
        // now do something instead of a console log!
        // short term for smoothie
        let smoothie = doc.data();
        // add property to the same tern
        smoothie.id = doc.id;
        // and push it to Vue data object
        this.smoothies.push(smoothie);
      })
    });
  },
  data () {
    return {
      smoothies: []
      // smoothies: [
      //   {title: 'Ninja Brew', slug: 'ninja-brew', ingredients: ['bananas', 'coffee'], id: 1},
      //   {title: 'Morning Mood', slug: 'morning-mood', ingredients: ['mango', 'lime'], id: 2},
      // ]
    }
  },
  methods: {
    deleteSmoothie(id){
      // delete doc from firestore
      // search with .doc and then delete with .delete
      db.collection('smoothies').doc(id).delete()
      // this is a promise and so you can .then. This is where you can re update the smoothies array in Vue
        .then(() => {
          // so now update the vue array using the same filter we did before
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id != id;
        })
      });

// LOCAL ONLY TESTING BEFORE FIREBASE
      // this.smoothies = this.smoothies.filter(smoothie => {
      //   return smoothie.id != id;
      // })
      // or old skool
      // this.smoothies = this.smoothies.filter(function(smoothie){
      //   return smoothie.id != id;
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index  {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 30px;
}
.index h2 {
  font-size: 1.8rem;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4rem;
}
</style>
