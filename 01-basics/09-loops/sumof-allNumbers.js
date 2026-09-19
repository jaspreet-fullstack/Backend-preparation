function sumOfAllNumber(val) {
let count = 0 
  for ( let i =1; i<= val; i++) {
    count = i+ count;
  }
  return count;
}
const total = sumOfAllNumber(5)
console.log(total)