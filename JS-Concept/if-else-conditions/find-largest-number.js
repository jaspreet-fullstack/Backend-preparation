// Return Largest number from three numbers

function largest(a, b, c) {
    if(a > b) {
       if(a > c) {
         console.log(a)
       } else {
         console.log(c)
       }
    }else if ( a < b) {
      if( b > c){
        console.log(b)
      }
      else console.log(c)
    } else {
      console.log(c)
    }
    // return the largest value
  }
  largest(50, 65, 45); // 25