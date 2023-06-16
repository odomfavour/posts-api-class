let cardHolder = document.querySelector(".card-holder");
let postForm = document.querySelector("#post-form");
let pBody = document.querySelector("#pbody");
let pTitle = document.querySelector("#ptitle");
let posts = [];

function getPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((resp) => resp.json())
    .then((data) => {
      let cardHtml = "";
      posts = data;
      console.log(posts);
      posts.forEach((post, index) => {
        const { userId, id, title, body } = post;
        cardHtml += `
            <div class="card">
                <p>UserId: ${userId}</p>
                <p>Id: ${id}</p>
                <h4>${title}</h4>
                <p>${body}</p>
                <div class="btn-container">
                    <button class="btn" onclick="">Edit</button>
                    <button class="btn">View</button>
                    <button class="btn" onclick="deletePost(${id})">Delete</button>
                </div>
            </div>
            `;
      });

      cardHolder.innerHTML = cardHtml;
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

      posts.forEach((post, index) => {
        const { userId, id, title, body } = post;
        cardHtml += `
            <div class="card">
                <p>UserId: ${userId}</p>
                <p>Id: ${id}</p>
                <h4>${title}</h4>
                <p>${body}</p>
                <div class="btn-container">
                    <button class="btn" onClick="">Edit</button>
                    <button class="btn">View</button>
                    <button class="btn" onclick="deletePost(${id})">Delete</button>
                </div>
            </div>
            `;
      });

      cardHolder.innerHTML = cardHtml;
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

        let cardHtml = "";
  
        posts.forEach((post, index) => {
          const { userId, id, title, body } = post;
          cardHtml += `
              <div class="card">
                  <p>UserId: ${userId}</p>
                  <p>Id: ${id}</p>
                  <h4>${title}</h4>
                  <p>${body}</p>
                  <div class="btn-container">
                      <button class="btn" onClick="">Edit</button>
                      <button class="btn">View</button>
                      <button class="btn" onclick="deletePost(${id})">Delete</button>
                  </div>
              </div>
              `;
        });
  
        cardHolder.innerHTML = cardHtml;
      });
  }
}
