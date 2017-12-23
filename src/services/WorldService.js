export default class WorldService {
  static createWorldFromXML(worldXML) {
    let world = {};

    world.dom = worldXML;
    world.things = [];

    // Process all the things
    let things = worldXML.querySelectorAll("ThingSaveData");
    
    things.forEach(function(thing) { 
      let pos = thing.querySelector("WorldPosition");
      let customName = thing.querySelector("CustomName");
      let obj = {
        dom: thing,
        type: thing.querySelector("PrefabName").innerHTML,
        name: customName.innerHTML,
        pos: { 
          x: pos.querySelector("x").innerHTML * 1, 
          y: pos.querySelector("y").innerHTML * 1, 
          z: pos.querySelector("z").innerHTML * 1
        }
      };

      world.things.push(obj);
    });

    world.title = things.length + " loaded things.";

    return world;
  }
}