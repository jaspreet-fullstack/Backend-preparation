function printEvenNumberRange(val) {
    let number = 0
  let EvenNumberList = []
    for (let i=1; i<=val; i++) {
      if(i % 2 === 0) {
        number = i
        EvenNumberList.push(number)
      }
    }
    console.log(EvenNumberList)
  }
  printEvenNumberRange(10)

// output: [2, 4, 6, 8, 10]