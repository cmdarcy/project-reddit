const posts = [];

const submitBtn = document.getElementsByClassName("submitPostbtn")[0];
const postsContainer = document.getElementsByClassName("posts")[0];

const renderPosts = () => {
	postsContainer.replaceChildren();
	posts.forEach((post) => {
		const postCardDiv = document.createElement("div");
		const cardHeaderDiv = document.createElement("div");
		const cardBodyDiv = document.createElement("div");
		const postP = document.createElement("p");
		const removePostbtn = document.createElement("button");
		const showCommentsbtn = document.createElement("button");
		const commentsContainer = renderCommentsContainer(post);

		postCardDiv.classList.add("post", "card", "mb-4");
		cardHeaderDiv.classList.add("card-header");
		cardBodyDiv.classList.add("card-body");
		postP.classList.add("card-text");
		removePostbtn.classList.add("btn", "btn-danger", "mx-3");
		showCommentsbtn.classList.add("btn", "btn-info", "btn-sm");

		cardHeaderDiv.textContent = `${post.name} posted...`;
		postP.textContent = post.message;
		removePostbtn.textContent = "Delete Post";
		showCommentsbtn.textContent = "Show Comments";

		removePostbtn.addEventListener("click", function (e) {
			postsContainer.removeChild(e.target.parentNode.parentNode);
			posts.splice(posts.indexOf(post), 1);
		});

		showCommentsbtn.addEventListener("click", function () {
			if (commentsContainer.className === "comments-container") {
				console.log("comments should hide");
				commentsContainer.className = "comments-container d-none";
			} else {
				console.log("comments should display");
				commentsContainer.className = "comments-container";
			}
		});

		postCardDiv.appendChild(cardHeaderDiv);
		postCardDiv.appendChild(cardBodyDiv);
		cardBodyDiv.append(postP);
		cardHeaderDiv.appendChild(removePostbtn);
		cardBodyDiv.appendChild(showCommentsbtn);
		postCardDiv.appendChild(commentsContainer);
		postsContainer.appendChild(postCardDiv);
	});
};

const renderCommentsContainer = (post) => {
	const commentsContainer = document.createElement("div");
	const commentsDiv = document.createElement("div");
	const commentUl = document.createElement("ul");
	const commentsForm = document.createElement("form");
	const commentNameInput = document.createElement("input");
	const commentMessageInput = document.createElement("input");
	const commentSubmitbtn = document.createElement("button");

	commentsContainer.classList.add(
		"comments-container",
		"ms-3",
		"p-2",
		"rounded"
	);
	commentsDiv.classList.add("card", "mb-4");
	commentUl.classList.add("list-group", "list-group-flush");
	commentsForm.classList.add("rounded", "p-2");
	commentNameInput.classList.add("comment-name", "form-control", "mb-1");
	commentMessageInput.classList.add("comment-message", "form-control", "mb-1");
	commentNameInput.setAttribute("placeholder", "Comment Name");
	commentMessageInput.setAttribute("placeholder", "Comment Message");
	commentSubmitbtn.classList.add("btn", "btn-outline-primary");

	commentSubmitbtn.textContent = "Submit Comment";

	commentSubmitbtn.addEventListener("click", function (e) {
		e.preventDefault();
		const commentName =
			e.target.parentNode.getElementsByClassName("comment-name")[0].value;
		const commentMesage =
			e.target.parentNode.getElementsByClassName("comment-message")[0].value;
		post.comments.push({ name: commentName, message: commentMesage });
		renderCommentList(post.comments, commentUl);
		e.target.parentNode.getElementsByClassName("comment-name")[0].value = "";
		e.target.parentNode.getElementsByClassName("comment-message")[0].value = "";
	});

	commentsForm.appendChild(commentNameInput);
	commentsForm.appendChild(commentMessageInput);
	commentsForm.appendChild(commentSubmitbtn);
	commentsDiv.appendChild(commentUl);

	renderCommentList(post.comments, commentUl);

	commentsContainer.appendChild(commentsDiv);
	commentsContainer.appendChild(commentsForm);
	return commentsContainer;
};

const renderCommentList = (comments, commentUl) => {
	commentUl.replaceChildren();
	comments.forEach((comment) => {
		const commentLi = document.createElement("li");
		const deleteCommentbtn = document.createElement("button");

		commentLi.classList.add("list-group-item");
		deleteCommentbtn.classList.add(
			"btn",
			"btn-outline-danger",
			"mx-2",
			"btn-sm"
		);

		commentLi.innerHTML = `${comment.name} commented: ${comment.message}`;
		deleteCommentbtn.textContent = "Remove Comment";

		deleteCommentbtn.addEventListener("click", function (e) {
			commentUl.removeChild(e.target.parentNode);
			comments.splice(comments.indexOf(comment), 1);
		});

		commentLi.appendChild(deleteCommentbtn);
		commentUl.appendChild(commentLi);
	});
};

submitBtn.addEventListener("click", function (e) {
	e.preventDefault();
	const postInputName = document.getElementsByClassName("post-name")[0].value;
	const postInputMessage =
		document.getElementsByClassName("post-message")[0].value;
	posts.push({ name: postInputName, message: postInputMessage, comments: [] });
	document.getElementsByClassName("post-name")[0].value = "";
	document.getElementsByClassName("post-message")[0].value = "";
	renderPosts();
});
