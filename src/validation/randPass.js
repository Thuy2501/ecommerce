function randPass(lettersLength, numbersLength) {
  var j, x, i
  var result = ''
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  var numbers = '0123456789'
  for (i = 0; i < lettersLength; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  for (i = 0; i < numbersLength; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
  result = result.split('')
  for (i = result.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = result[ i ]
    result[i] = result[j]
    result[j] = x
  }
  result = result.join('')
  return result
}

module.exports = {
  randPass
}