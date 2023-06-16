// CRUD Create Read Update Delete
// Get Post Put Delete

let cardHolder = document.querySelector(".card-holder");
let postForm = document.querySelector("#post-form");
let title = document.querySelector("#ptitle");
let body = document.querySelector("#pbody");
let postBox = [];

//How to use an API

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    postBox = data;
    console.log(postBox);
    // the magic happens here
    generateUI(postBox);
  })
  .catch((err) => console.log(err));

function createPost(e) {
  e.preventDefault();
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title.value,
      body: body.value,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      postBox.unshift(data);
      console.log(postBox);
      generateUI(postBox);
    });
}

postForm.addEventListener("submit", createPost);

function deletePost(postId) {
  console.log(postId);
  postBox = postBox.filter((item) => item.id !== postId);
  console.log(postBox);
  generateUI(postBox);
}

function generateUI(arrayItem) {
  let html = "";
  arrayItem.forEach((post, index) => {
    html += `
      <div class="card">
          <p>index: Post ${index + 1}</p>
          <p>UserId: ${post.userId}</p>
          <p>Id: ${post.id}</p>
          <h4>${post.title}</h4>
          <p>${post.body}</p>
          <div class="btn-container">
              <button class="btn">Edit</button>
              <button class="btn" onclick="viewPost(${
                post.id
              })">View</button>
              <button class="btn" onclick="deletePost(${
                post.id
              })">Delete</button>
          </div>
      </div>
      `;
  });
  cardHolder.innerHTML = html;
}

function viewPost(postId) {
console.log(postId)
localStorage.setItem("postId", postId)
window.location.href = "single.html"
}
