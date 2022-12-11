const form = document.forms[0]

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this)

  fetch('server.js', {
    method:'post',
    body:formData,
  }).then(function (response){
      return response.text();
    }).then(function (text) {
      console.log(text);
    }).catch(function (error) {
      console.eror(error);

    })
})
