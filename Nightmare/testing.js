var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true })

nightmare
  .goto('http://localhost:8085/extfunc05/page/index')
  .evaluate(()=>{
    $('#ino').val('');
    $('#bod').val('');
  })
  .type('#ino', 'M123456789')
  .type('#bod', '19800101')
  .screenshot('shot.png')
  .click('#sendbtn')
  .wait(2000)
//   .wait('#reSndOTPbtn')
  .wait(()=>{
    console.log('validate user phone');
      let userPhone = document.querySelector('#maskedMPhoneNO');
    return userPhone && userPhone.innerHTML !== '';
  })
  .evaluate(function () {
    return document.querySelector('#maskedMPhoneNO').innerHTML
  })
  .end()
  .then(function (result) {
    console.log('test success!')
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });