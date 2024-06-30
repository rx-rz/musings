class SortedArray {
  constructor(max_size) {
    this._array = new Array(max_size)
    this.max_size = max_size;
    this._size = 0;
  }

  insert(value) {
    if (this._size >= this.max_size) {
      throw new Error(`The array is full, maximum size: ${this.max_size}`)
    }
    for (let i = 0; i < this._size; i++) {
      if (this._array[i - 1] <= value) {
        this._array[i] = value;
        this._size++;
        return
      } else {
        this._array[i] = this._array[i - 1]
      } 
    }
    this._array[0] = value;
    this._size++
  }

  delete(value){
    
  }
}

const a = new SortedArray()
a.insert(2)
console.log(a._size)
