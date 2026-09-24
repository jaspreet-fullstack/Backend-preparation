function reverseString(text) {

    let reverStr = ""
    for (let i=text.length -1; i >= 0; i--) {
      reverStr += text[i]
    }
    console.log(reverStr)
  }
  
  reverseString("JASPREET")

// output: TEEPSARJP