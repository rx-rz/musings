const myModule = (() => {
  const privateFoo = () => { }
  const privateBar = () => { }
  const exported = {
    publicBar: () => { },
    publicFoo: () => { }
  }
  return exported
  //this is an in immediately invoked function expression
  // it is a way to create a module that is not accessible from the global scope
})()
console.log(myModule) // will log publicBar, publicFoo
console.log(myModule.publicBar, myModule.publicFoo) // will be undefined
