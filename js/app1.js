let id = localStorage.getItem("postId")
console.log(id)

if (id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
        document.querySelector('.post-title').innerHTML = data.title
        document.querySelector('.post-body').innerHTML = data.body

});
}