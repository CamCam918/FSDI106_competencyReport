function sayHello(name) {
  console.log("Hi There!" + name);
}

function testFns() {
  sayHello("cameron");
}

function Dog(name, age, color) {
  this.name = name;
  this.age = age;
  this.color = color;
}

class Cat {
  constructor(name, age, color) {
    this.name = name;
    this.age = age;
    this.color = color;
  }

  roar() {
    console.log("I'm Roaringgggg!!");
  }
}

function testReq(){
  $.ajax({
    type: 'GET',
    url: "http://restclass.azurewebsites.net/api/test",
    success: function(res) {
      console.log("Request OK", res);
    },
    error: function(error) {
      console.error("Request Failed! :(", error);
    }
  });

}

function testObj() {
  //object literal
  let lola = {
    name: "lola",
    age: "3",
  };
  console.log(lola);

  //object constructor
  let fido = new Dog("fido", 5);
  let juliet = new Dog("juliet", 5);

  console.log(fido);
  console.log(juliet);

  //class
  let patches = new Cat("Patches", 6, "black");
  console.log(patches);

  //use objects
  console.log(lola.name);
  console.log(fido.age);
  console.log(patches.roar());

  patches.color = "blue";
  console.log(patches.roar());
}
