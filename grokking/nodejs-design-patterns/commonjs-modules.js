// This code demonstrates a simplified implementation of CommonJS module loading

// Import the file system module
const fs = require("fs")

// Define a function to load a module
function loadModule (fileName, module, require){
  // Create a wrapper function that encapsulates the module code
  const wrappedSrc = `(function (module, exports, require){
    ${fs.readFileSync(fileName, "utf-8")}
  })(module, module.exports, require)`
  
  // Execute the wrapped module code
  eval(wrappedSrc)
}

exports.info = (a) => {
  console.log({a})
}

exports.warning = (a) => {
  console.log({a})
}
//module.exports is synchronous, cannot be used in a setinterval/timeout

