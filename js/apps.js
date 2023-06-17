let cardHolder = document.querySelector(".card-holder");
let postForm = document.querySelector("#post-form");
let pBody = document.querySelector("#pbody");
let pTitle = document.querySelector("#ptitle");
let posts = [];

function getPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((resp) => resp.json())
    .then((data) => {
      posts = data;
      console.log(posts);
     renderUI(posts)
    });
}

getPosts();

postForm.addEventListener("submit", createPost);

function createPost(e) {
  e.preventDefault();
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: pTitle.value,
      body: pBody.value,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      let cardHtml = "";
      posts.unshift(data);
      renderUI(posts)
      
    });
}

function deletePost(postId) {
  const confirmDelete = confirm("Are you sure you want to delete the post");
  console.log(postId);
  if (confirmDelete) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        posts = posts.filter(post => post.id !== postId)
        renderUI(posts)
      })
       
  }
}

function editPost(postId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`,  {
    method: "PUT",
    body: JSON.stringify({
      title: pTitle.value,
      body: pBody.value,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    document.querySelector(`.post-title-${postId}`).innerHTML = data.title
    document.querySelector(`.post-body-${postId}`).innerHTML = data.bod
  })
}

function viewPost(postId) {
  localStorage.setItem('postId', postId)
  window.location.href = 'single.html'
}

function renderUI (arr) {
  let cardHtml = "";
  posts.forEach((post, index) => {
    const { userId, id, title, body } = post;
    cardHtml += `
        <div class="card">
            <p>UserId: ${userId}</p>
            <p>Id: ${id}</p>
            <h4 class="post-title-${id}">${title}</h4>
            <p class="post-body-${id}">${body}</p>
            <div class="btn-container">
                <button class="btn" onclick="editPost(${id})">Edit</button>
                <button class="btn" onclick="viewPost(${id})">View</button>
                <button class="btn" onclick="deletePost(${id})">Delete</button>
            </div>
        </div>
        `;
  });

  cardHolder.innerHTML = cardHtml;
}
