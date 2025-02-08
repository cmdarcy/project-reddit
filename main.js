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
		showCommentsbtn.classList.add("btn", "btn-outline-info");

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
	const commentsForm = document.createElement("form");
	const commentNameInput = document.createElement("input");
	const commentMessageInput = document.createElement("input");
	const commentSubmitbtn = document.createElement("button");

	commentSubmitbtn.textContent = "Submit Comment";
	commentsContainer.setAttribute("class", "comments-container");
	commentNameInput.setAttribute("placeholder", "Comment Name");
	commentNameInput.setAttribute("class", "comment-name");
	commentMessageInput.setAttribute("placeholder", "Comment Message");
	commentMessageInput.setAttribute("class", "comment-message");
	commentSubmitbtn.classList.add("btn", "btn-outline-primary");

	commentSubmitbtn.addEventListener("click", function (e) {
		e.preventDefault();
		const commentName =
			e.target.parentNode.getElementsByClassName("comment-name")[0].value;
		const commentMesage =
			e.target.parentNode.getElementsByClassName("comment-message")[0].value;
		post.comments.push({ name: commentName, message: commentMesage });
		renderCommentList(post.comments, commentsDiv);
		e.target.parentNode.getElementsByClassName("comment-name")[0].value = "";
		e.target.parentNode.getElementsByClassName("comment-message")[0].value = "";
	});

	commentsForm.appendChild(commentNameInput);
	commentsForm.appendChild(commentMessageInput);
	commentsForm.appendChild(commentSubmitbtn);

	renderCommentList(post.comments, commentsDiv);

	commentsContainer.appendChild(commentsDiv);
	commentsContainer.appendChild(commentsForm);
	return commentsContainer;
};

const renderCommentList = (comments, commentsDiv) => {
	commentsDiv.replaceChildren();
	comments.forEach((comment) => {
		const commentDiv = document.createElement("div");
		const commentP = document.createElement("p");
		const deleteCommentbtn = document.createElement("button");

		commentP.textContent = `${comment.name} commented: ${comment.message}`;
		deleteCommentbtn.textContent = "Remove Comment";
		deleteCommentbtn.classList.add("btn", "btn-outline-danger");

		deleteCommentbtn.addEventListener("click", function (e) {
			commentsDiv.removeChild(e.target.parentNode);
			comments.splice(comments.indexOf(comment), 1);
		});

		commentDiv.appendChild(commentP);
		commentDiv.appendChild(deleteCommentbtn);
		commentsDiv.appendChild(commentDiv);
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
