<template>
  <div id="loadsave">
    <label class="button">
      <input type="file" accept=".xml" name="file" @change="loadWorld">
      Load World
    </label>
    <label class="button">
      <input type="file" accept=".bin" name="binfile" @change="loadWorldBin">
      Load WorldBin
    </label>
    <!-- <div class="button" @click="saveWorld">
      Save Copy of World
    </div> -->
    <div>
      <h3 v-if="world">{{world.title}}</h3>
    </div>
  </div>
</template>

<script>
import WorldService from '@/services/WorldService';
import { decompressBlock } from 'lz4js'

export default {
  props: ['world'],
  data () {
    let vm = this;
    
    return {
      loadWorld (el) {
        let input = el.target;
        let file = input.files[0];
        let reader = new FileReader();

        if (!file) return;

        reader.onload = function(ev) {
          let parse = new DOMParser();
          let dom = parse.parseFromString(ev.target.result, "text/xml");
          
          let world = WorldService.createWorldFromXML(dom);

          document.bus.$emit("world-loaded", world);

          input.value = "";
        }

        reader.readAsText(file);
      },      
      loadWorldBin (el) {
        let input = el.target;
        let file = input.files[0];
        let reader = new FileReader();

        if (!vm.world) return;
        if (!file) return;

        reader.onload = function(ev) {
          let world = vm.world;
          let buffer = new Uint8Array(ev.target.result, 12);
          let outBuffer = new Uint8Array(10240000);

          console.log(decompressBlock(buffer, outBuffer, 0, buffer.byteLength, 0));
        
          // // OUTPUT DEBUG
          // var blob = new Blob([outBuffer], {type: "application/octet-stream"});
          // var objectUrl = URL.createObjectURL(blob);
          // window.open(objectUrl);

          world.voxels = loadVoxels(outBuffer);

          document.bus.$emit("world-loaded", world);

          input.value = "";
        }

        reader.readAsArrayBuffer(file);
      },
      saveWorld () {
          let ser = new XMLSerializer();
          // TODO: Change this to download a file
          //document.querySelector("#out").value = ser.serializeToString(dom);
      }
    }
  }
}

function loadVoxels(bin) {
  let dv = new DataView(bin.buffer);

  let chunkCount = dv.getInt32(0, true);
  let chunkSize = dv.getInt32(1, true);

  console.log(bin[0]);
  console.log(bin[1]);

  let idx = 8;
  for (let i = 0; i < chunkCount; i++) {
    let x = dv.getFloat32(idx+0, true);
    let y = dv.getFloat32(idx+4, true);
    let z = dv.getFloat32(idx+8, true);
    let num = dv.getInt32(idx+12, true);
    idx += 16;

    console.log(""+x+" | "+y+" | "+z+" |  *" + num);

    idx += num*4;
  }

  console.log("[} " + chunkCount + " chunks * " + chunkSize);


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loadsave {
  margin: 20px;
  display: flex;
  flex-direction: column;
}

input[type=file] {
  display: none;
}

.button {
  margin: 5px;
  padding: 3px 5px;

  background-color: #e77;
  border: 3px solid #c11;

  color: white;
  font-weight: bold;
  font-size: 12pt;
  
  user-select: none;
}
</style>
