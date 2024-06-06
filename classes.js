class User {
  constructor(name) {
    this.name = name
  }

  sayHi() {
    alert(this.name)
  }
}

//to get the methods in the class prototype
Object.getOwnPropertyNames(User.prototype)

//classes are functions. kind of.
function UserAgain(name) {
  this.name = name
}

UserAgain.prototype.sayHi = function () {
  console.log("hi!")
}

//classes however need to be called by new, unlike functions.
//code in classes are always in strict mode.
let user = new User("John")
console.log(user.sayHi())

//classes can be defined within an expression
let UserExp = class MyClasss {
  sayHi() {
    alert(MyClasss)
  }
}
//still works
new UserExp().sayHi

//you can make classes dynamically
function makeClass(phrase) {
  return class {
    sayHi() {
      alert(phrase)
    }
  }
}

let UserFromFunc = makeClass("sike!")
new UserFromFunc()

class Hooman {
  constructor(name) {
    this.name = name;
  }
  //getter and setters for class values
  get name() {
    return this._name
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too long!")
      return
    }
    this._name = value;
  }
}

class Man {
  //this is called a class field. relatively new.
  name = "John"
  sayHi() {
    alert(`Hello, ${this.name}`)
  }
}


class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}`)
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed
  }
}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`)
  }
}
//rabbit inherits animal properties, add its own
let rabbit = new Rabbit("My animal, my Dune.")
rabbit.run()

function f(phrase) {
  return class {
    sayHi() { alert(phrase) }
  }
}
//can extend functions too
class RabbitAgain extends f("Hii") { }
new RabbitAgain().sayHi()


class RabbitOveride extends Animal {
  //overrides Animal stop
  stop() {

  }
}

//now let's say we don't want to overrride but build on top of existing functionality. we do this:
class RabbitSuper extends Animal {
  //this overrides
  hide() {
    alert(`${this.name} rabbit is hidden!`)
  }
  //this doesnt. it builds on top of it
  stop() {
    //calls the parents stop
    super.stop()

    //arrow functions take their super from the parent class.
    setTimeout(() => super.stop())
    //normal functions throw squiggly, hehe.
    // setTimeout(function(){super.stop()})
    //perform whatever thing you want to do right after.
  }
}

class RabbitCustomConstructor extends Animal {
  //this throws an error. you have to provide the parent constructor what it needs first.
  /*constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }*/
  //this works
  constructor(name, earLength) {
    super(name)
    this.earLength = earLength
  }
}

class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  //static methods are mostly used for functions that belong to
  //the class as a whole but not any particular object.  
  static createTodays() {
    return new this("Today's digest", new Date())
  }
  //static properties. new addition though.
  static publisher = "Ilya Kantor"

  static print() {
    alert("Hello!")
  }
}
let article = Article.createTodays()
//static methods will not work on class instances, just the class itself.
//article.createTodays()
//inheritance works on both regular and static methods (looking at you, Animal and Rabbit classes.)

class ObjectAgain {
  constructor() {
  }
}
class TestAgain extends ObjectAgain {
  constructor(name) {
    //without super(), "this" is undefined. needs to be called, always.
    super()
    this.name = name;
  }
}

class CoffeeMachine {
  waterAmount = 0;
  constructor(power) {
    this.power = power;
    alert(`Created a coffee-machine, power: ${power}`)
  }
}
//water amount and power are unprotected.
let coffeeMachine = new CoffeeMachine(200)
coffeeMachine.waterAmount = 400

class ProtectedCoffeeMachine {
  _waterAmount = 0;

  //a setter function for the protected value. access the variable is protected basically.
  set waterAmount(value) {
    if (value < 0) {
      value = 0
    }
    this._waterAmount = value
  }
  get waterAmount() {
    return this._waterAmount
  }

  constructor(power) {
    this._power = power
  }
}
class ReadOnlyPowerCoffeeMachine {
  constructor(power) {
    this._power = power;
  }
  get power() {
    return this._power;
  }
}

let cfMach = new ReadOnlyPowerCoffeeMachine(100)
//you can get cfMach.power but not set it, making it practially read only.
//it is protected. it can be inherited. it's not private though.

//In terms of OOP, delimiting of the internal interface from the external one is called encapsulation.