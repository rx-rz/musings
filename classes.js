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


