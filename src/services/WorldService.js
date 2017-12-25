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
        id: thing.querySelector("ReferenceId").innerHTML * 1,
        dom: thing,
        type: thing.querySelector("PrefabName").innerHTML,
        name: customName.innerHTML,
        pos: { 
          x: pos.querySelector("x").innerHTML * 1, 
          y: pos.querySelector("y").innerHTML * 1, 
          z: pos.querySelector("z").innerHTML * 1
        },
        children: []
      };

      world.things[obj.id] = obj;
    });

    world.things.forEach((t) => {
      let id = t.dom.querySelector("ParentReferenceId");
      if (id) {
        t.parent = world.things[id.innerHTML];
        if (t.parent) {
          world.things[id.innerHTML].children.push(t);
        }
      }
    });


    world.title = things.length + " loaded things.";

    return world;
  }
}