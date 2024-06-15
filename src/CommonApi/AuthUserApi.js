//save a user to database
export const savedUser =(user,image) => {
  // console.log(user,'user');
  const currentUser = {
    email: user.email,
    name: user.name||user.displayName,
    role: 'user',
    image,
  }
  // console.log(currentUser,'currentuser');
  fetch(`http://localhost:5000/users`, {
    method: 'POST',
    headers: {
      'content-type':'application/json'
    },
    body:JSON.stringify(currentUser)
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
    }).catch(error=>console.log(`404 page not found ${error}`))
}