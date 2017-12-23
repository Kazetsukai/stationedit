export default class WorldService {
  static createWorldFromXML(worldXML) {
    let world = {};

    world.dom = worldXML;
    world.things = [];

    // Process all the things
    var things = worldXML.querySelectorAll("ThingSaveData");
    
    things.forEach(function(thing) { 
      var obj = {
        dom: thing
      }

      obj.refresh = function() {
        obj.type = obj.dom.querySelector("PrefabName").innerHTML;

        var pos = obj.dom.querySelector("WorldPosition");
        obj.pos = { 
          x: pos.querySelector("x").innerHTML * 1, 
          y: pos.querySelector("y").innerHTML * 1, 
          z: pos.querySelector("z").innerHTML * 1
        };
      }
      obj.refresh();

      world.things.push(obj);
    });

    world.title = things.length + " loaded things.";

    return world;
  }
}