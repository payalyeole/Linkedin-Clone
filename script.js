document.addEventListener("DOMContentLoaded", function () {
  const profileMenu = document.getElementById("profileMenu");
  const dropdown = document.getElementById("meDropdown");

  profileMenu.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function (e) {
    if (!profileMenu.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
});


// ----------------//
// Start Post
// -----------------//

document.addEventListener("DOMContentLoaded", function () {
  const mediaBtn = document.getElementById("mediaBtn");
  const postPopup = document.getElementById("postPopup");
  const createPostBtn = document.getElementById("createPostBtn");
  const postDesc = document.getElementById("postDesc");
  const postImage = document.getElementById("postImage");
  const postsContainer = document.getElementById("postsContainer");

  // Show the popup
  mediaBtn.addEventListener("click", () => {
    postPopup.style.display = "flex";
  });

  // Create a post
  createPostBtn.addEventListener("click", () => {
    const desc = postDesc.value.trim();
    const imageFile = postImage.files[0];

    if (!desc && !imageFile) {
      alert("Please add a description or image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");

        postDiv.innerHTML = `
        <button class="remove-post">×</button>
        <h4>Payal Yeole</h4>
        <p>Software Developer • 1s ago</p>

        ${desc ? `<p class="desc">${desc}</p>` : ""}
        ${imageFile ? `<img src="${reader.result}" alt="Post Image">` : ""}
        
        <div class="post-actions">
            <button class="like-btn"><i class="fas fa-thumbs-up"></i> Like (<span class="like-count">0</span>)</button>
            <button class="comment-toggle"><i class="fas fa-comment-dots"></i> Comment</button>
            <button><i class="fas fa-share"></i> Share</button>
            <button><i class="fas fa-paper-plane"></i> Send</button>
        </div>

        <div class="comment-box" style="display: none;">
            <input type="text" class="comment-input" placeholder="Add a comment..." />
            <div class="comment-list"></div>
        </div>
        `;

      postsContainer.prepend(postDiv); // Add new post on top

      // Reset inputs
      postDesc.value = "";
      postImage.value = "";
      postPopup.style.display = "none";
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      reader.onload(); // No image, just call directly
    }
  });

  // Remove post on clicking ❌
  postsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-post")) {
      e.target.parentElement.remove();
    }
  });
});


// ---------------------------------------------//
// LIKE and COMMENT functionality for all posts
// --------------------------------------------//

postsContainer.addEventListener("click", function (e) {
  const post = e.target.closest(".post");

  // Like logic
  if (e.target.closest(".like-btn")) {
    const likeCount = post.querySelector(".like-count");
    let count = parseInt(likeCount.textContent);
    const isLiked = e.target.classList.contains("liked");

    if (!isLiked) {
      count++;
      e.target.classList.add("liked");
    } else {
      count--;
      e.target.classList.remove("liked");
    }

    likeCount.textContent = count;
  }

  // Toggle comment box
  if (e.target.closest(".comment-toggle")) {
    const commentBox = post.querySelector(".comment-box");
    commentBox.style.display = commentBox.style.display === "none" ? "block" : "none";
  }
});

// Handle Enter key to add comment
postsContainer.addEventListener("keypress", function (e) {
  if (e.target.classList.contains("comment-input") && e.key === "Enter") {
    const commentText = e.target.value.trim();
    if (commentText !== "") {
      const commentList = e.target.nextElementSibling;
      const comment = document.createElement("p");
      comment.textContent = commentText;
      commentList.appendChild(comment);
      e.target.value = "";
    }
  }
});
