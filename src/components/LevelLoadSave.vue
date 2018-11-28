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
          let outBuffer = new Uint8Array(102400000);

          console.log(decompressBlock(buffer, outBuffer, 0, buffer.byteLength, 0));
        
          // // OUTPUT DEBUG
          // var blob = new Blob([outBuffer], {type: "application/octet-stream"});
          // var objectUrl = URL.createObjectURL(blob);
          // window.open(objectUrl);

          world.voxels = loadVoxels(outBuffer);
          drawVoxels(world.voxels);

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
  let chunkSize = dv.getInt32(4, true);

  let chunks = [];

  let idx = 8;
  for (let i = 0; i < chunkCount; i++) {
    let x = dv.getFloat32(idx+0, true);
    let y = dv.getFloat32(idx+4, true);
    let z = dv.getFloat32(idx+8, true);
    let num = dv.getInt32(idx+12, true);
    idx += 16;

    console.log(""+x+" | "+y+" | "+z+" |  *" + num);

    let arrSize = chunkSize*chunkSize*chunkSize;
    console.log(arrSize);
    let chunkArray = new Array(arrSize);

    for (let j = 0; j < num; j++) {
      let offset = dv.getInt16(idx+0, true);
      let [xOffset, yOffset, zOffset] = xyz(offset);

      chunkArray[offset] = {
        xOffset, yOffset, zOffset,
        type: dv.getInt8(idx+2, true),
        density: dv.getInt8(idx+3, true),
      };
      idx += 4;
    }

    chunks.push({
      data: chunkArray,
      x: x,
      y: y,
      z: z
    });
  }

  chunks.sort((a, b) => (a.z-a.x) - (b.z-b.x));

  console.log("[} " + chunkCount + " chunks * " + chunkSize);
  return chunks;
}

function xyz(offset) {
  return [offset % 8, Math.floor((offset / 8) % 8), Math.floor(offset / 64)];
}

function drawVoxels(chunks) {
  let canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  let ctx = canvas.getContext('2d');

  document.querySelector("body").appendChild(canvas);

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, 512, 512);

  for (let chunk of chunks) {

    for (let c of chunk.data) {
      if (!c || c <= 0) continue;
      let [x, y, z] = [c.xOffset + chunk.x + 100, c.yOffset + chunk.y + 20, c.zOffset + chunk.z + 100]
      let val = y * 10;
      ctx.fillStyle = 'rgb('+val+', '+val+', '+val+')';
      if (c.type > 1)
        ctx.fillStyle = 'rgb('+val+', 0, 0)';
      ctx.fillRect(x/2 + z/2, z/2 - x/2 - y + 256, 1, 1);
    }
  }
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
