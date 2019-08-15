<template>
  <div id="main">
  <title>ELEESA FORUM</title>
    <div class="jumbotron jumbotron-fluid shadow-lg p-3 mb-5 bg-white rounded" v-if="show" :class="[w3-animate-bottom]">
    <img class="card-img-top w3-padding w3-animate-zoom" src="@/assets/eleesa_logo.jpg" alt="Eleesa logo">
        <p class="bg-info text-white shadow-lg p-3 mb-5 rounded display-4 w3-margin-top w3-animate-left fonts">{{msg}}</p>
        <form class="form-group">
          <select class="custom-select custom-select-lg mb-3 form-control" @change="Change($event)" v-model="myProgram">
          <option :value="val" disabled selected>Select Program</option>
            <option v-for="program in programs" :key="program.id" :value="program.id">{{program.p_name}}</option>
          </select><br>
          <span v-if="program_msg" :class="['text-danger','fonts']">{{alert[0]}}</span>
          
          <select class="custom-select custom-select-lg mb-3" @change="onChange($event)" v-model="myLevel">
            <option :value="val" disabled selected>Select Level</option>
            <option v-for="level in levels" :key="level.id" :value="level.id">{{level.p_level}}</option>
          </select><br>
          <span v-if="level_msg" :class="['text-danger','fonts']">{{alert[1]}}</span>

          <select class="custom-select custom-select-lg mb-3" @change="onChange($event)" v-model="mySemester">
            <option :value="val" disabled selected>Select Semester</option>
            <option v-for="semester in semesters" :key="semester.id" :value="semester.id">{{semester.p_sem}} </option>
          </select><br>
          <span v-if="sem_msg" :class="['text-danger','fonts']">{{alert[2]}}</span><br>
          <button type="button" variant="primary" class="btn btn-info loading shadow mb-5 w3-round-large" @click="loadResults">Search</button>
        </form>   
    </div>
    <div class="jumbotron jumbotron-fluid shadow-lg p-3 mb-5 bg-white rounded" v-else :class="['w3-animate-top']">
    <button type="button" class="btn btn-danger mb-5 w3-round-large w3-large" @click="close">X</button>
    <form>
      <input class="form-control w3-margin-bottom" type="text" placeholder="Seach for your courses here" v-model="search">
    </form>
    <span class="w3-center w3-padding w3-blue-gray fonts">Click on the course to view passco</span>
      <div v-for="result in receivedResult" class="list">
        <ul class="list-group" @click="showBooks($event)">
          <li ref="book" class="list-group-item w3-border-0 w3-blue fonts">{{result}}</li>
        </ul>
        <div class="card" v-show="books" :class="['w3-animate-zoom']">
        <div class="card-body fonts">
          {{}}
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectCourse',
  props: ['id'],
  data() {
    return {
      books: false,
      show: true,
      val: "",
      alert: ["Please Select your program","Please Select your level","Please Select your semester"],
      programs: [
                {id: 1, p_name: "Computer Engineering"},
                {id: 2, p_name: "Electrical Engineering"}
                ],
      levels: [
              {id: 1, p_level: 100},
              {id: 2, p_level: 200},
              {id: 3, p_level: 300},
              {id: 4, p_level: 400}],

      semesters: [
                  {id: 1, p_sem: "First Semester"},
                  {id: 2, p_sem: "Second Semester"}],
      msg: "Please Select Options to View Courses",
      myProgram: "",
      myLevel: "",
      mySemester: "",
      level_msg: false,
      program_msg: false,
      sem_msg: false,
      endPoint: "/findcourse",
      receivedResult: [],
      search: ""
    }
  },
  watch: {
    Change: function($event){
      this.myProgram = $event.target.value;
      this.mySemester = $event.target.value;
      this.myLevel = $event.target.value;
    },
  },
  methods: {
    loadResults: function(){
      if(this.myLevel && this.myProgram && this.mySemester){
        this.show = false;
        this.level_msg = false;
        this.program_msg = false;
        this.sem_msg = false;
        
        let program = this.myProgram;
        let level = this.myLevel;
        let sem = this.mySemester;

        this.axios({
          url: `${this.endPoint}/${program}/${level}/${sem}`,
          method: "get",
          responseType: "json",
        }).then(function(response){
          this.receivedResult = response;
        }).catch(function(err){
          console.log(err)
        })
        return true
      }
      if(!this.myLevel){
         this.level_msg = true;
      }
      if(!this.myProgram){
         this.program_msg = true;
      }
      if(!this.mySemester){
        this.sem_msg = true;
      }
    },
    
    showBooks: function($event){
     
      let ct = $event.currentTarget.nextElementSibling;
        if(ct){
            //console.log(ct.nextElementSibling);
            if(ct.style.display == "none"){
              ct.style.display = "block";
            }
            else{
              ct.style.display = "none";
            }
        }
        
      
    },
    close: function(){
      this.show = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img{
  max-width: 20vh;
}
div.list{
  margin-top: 15px;
}
p{
  font-size: 3.1vw;
}
select{
  max-width: 80vw;
  font-size: 3vh;
}
form{
  padding-left: 7vw;
  padding-right: 7vw;
  margin-bottom: 8px;
}
ul{
  padding-left: 5vw;
  padding-right: 5vw;
}
button{
  font-size: 2.5vh;
}
ul li{
  border: none
}
div.card{
  max-width: 100vw;
  margin-top: 10px;
  margin-left: 20vw;
  margin-right: 20vw;
}
.btn-danger{
  margin-left: 58vw;
}
div.jumbotron{
  margin-right: 10vw;
  margin-left: 10vw;
  background-color: white;
  margin-top: 100px;
  height: auto
}
.trans{
  -webkit-transition: height 2s; /* For Safari 3.1 to 6.0 */
  transition: height 2s
}
.fonts{
  font-family: "Comic Sans MS", cursive, sans-serif;
}
span{
  font-size: 2.3vh;
}
</style>
