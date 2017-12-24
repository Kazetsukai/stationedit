<template>
  <div id="loadsave">
    <label class="button">
      <input type="file" name="file" @change="loadWorld">
      Load World
    </label>
    <div class="button" @click="saveWorld">
      Save Copy of World
    </div>
    <div>
      <h3 v-if="world">{{world.title}}</h3>
    </div>
  </div>
</template>

<script>
import WorldService from '@/services/WorldService';

export default {
  props: ['world'],
  data () {
    return {
      loadWorld (el) {
        var input = el.target;
        var file = input.files[0];
        var reader = new FileReader();

        if (!file) return;

        reader.onload = function(ev) {
          var parse = new DOMParser();
          var dom = parse.parseFromString(ev.target.result, "text/xml");
          
          let world = WorldService.createWorldFromXML(dom);

          document.bus.$emit("world-loaded", world);

          input.value = "";
        }

        reader.readAsText(file);
      },
      saveWorld () {
          var ser = new XMLSerializer();
          // TODO: Change this to download a file
          //document.querySelector("#out").value = ser.serializeToString(dom);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loadsave {
  margin: 20px;
}

input[type=file] {
  display: none;
}

.button {
  display: inline-block;
  padding: 5px 10px;

  background-color: #e77;
  border: 3px solid #c11;

  color: white;
  font-weight: bolder;
  font-size: 16pt;
  
  user-select: none;
}
</style>
