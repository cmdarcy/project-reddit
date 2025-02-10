const posts = [];

const submitBtn = document.getElementsByClassName("submitPostbtn")[0];
const postsContainer = document.getElementsByClassName("posts")[0];

//builds posts and renders html accordingly
const renderPosts = () => {
	// Clear all existing posts from the container
	postsContainer.replaceChildren();

	// Iterate through each post and create its UI elements
	posts.forEach((post) => {
		// Create DOM elements for the post card structure
		const postCardDiv = document.createElement("div");
		const cardHeaderDiv = document.createElement("div");
		const cardBodyDiv = document.createElement("div");
		const postP = document.createElement("p");
		const removePostbtn = document.createElement("button");
		const showCommentsbtn = document.createElement("button");
		const commentsContainer = renderCommentsContainer(post);

		// Add Bootstrap classes for styling
		postCardDiv.classList.add("post", "card", "mb-4");
		cardHeaderDiv.classList.add("card-header");
		cardBodyDiv.classList.add("card-body");
		postP.classList.add("card-text");
		removePostbtn.classList.add("btn", "btn-danger", "mx-3");
		showCommentsbtn.classList.add("btn", "btn-info", "btn-sm");

		// Set the content for each element
		cardHeaderDiv.textContent = `${post.name} posted...`;
		postP.textContent = post.message;
		removePostbtn.textContent = "Delete Post";
		showCommentsbtn.textContent = "Show Comments";

		// Add click handler for post deletion
		removePostbtn.addEventListener("click", function (e) {
			postsContainer.removeChild(e.target.parentNode.parentNode);
			posts.splice(posts.indexOf(post), 1);
		});

		// Add click handler to toggle comments visibility
		showCommentsbtn.addEventListener("click", function () {
			if (commentsContainer.classList.contains("d-none")) {
				commentsContainer.classList.remove("d-none");
			} else {
				commentsContainer.classList.add("d-none");
			}
		});

		// create tree stucture to organize html correctly
		postCardDiv.appendChild(cardHeaderDiv);
		postCardDiv.appendChild(cardBodyDiv);
		cardBodyDiv.append(postP);
		cardHeaderDiv.appendChild(removePostbtn);
		cardBodyDiv.appendChild(showCommentsbtn);
		postCardDiv.appendChild(commentsContainer);
		postsContainer.appendChild(postCardDiv);
	});
};

//takes in a single post object and renders comments container div html element.
//returns the comments container
const renderCommentsContainer = (post) => {
	//create dom elements for structure
	const commentsContainer = document.createElement("div");
	const commentsDiv = document.createElement("div");
	const commentUl = document.createElement("ul");
	const commentsForm = document.createElement("form");
	const commentNameInput = document.createElement("input");
	const commentMessageInput = document.createElement("input");
	const commentSubmitbtn = document.createElement("button");

	//add boostrap classes for styling
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

	//add text content
	commentSubmitbtn.textContent = "Submit Comment";

	//add submit event listener to comment submit button
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

// renders list of comments, takes in array of comment objects as first argument, comment UL html element as second argument.
const renderCommentList = (comments, commentUl) => {
	// Clear all existing comments from the comment list
	commentUl.replaceChildren();
	// Iterate through each comment and create its UI elements
	comments.forEach((comment) => {
		const commentLi = document.createElement("li");
		const deleteCommentbtn = document.createElement("button");

		// add bootstrap classes for styling
		commentLi.classList.add("list-group-item");
		deleteCommentbtn.classList.add(
			"btn",
			"btn-outline-danger",
			"mx-2",
			"btn-sm"
		);

		//set the content for elements
		commentLi.innerHTML = `${comment.name} commented: ${comment.message}`;
		deleteCommentbtn.textContent = "Remove Comment";

		//add detete comment event listener to delete button
		deleteCommentbtn.addEventListener("click", function (e) {
			commentUl.removeChild(e.target.parentNode);
			comments.splice(comments.indexOf(comment), 1);
		});

		// create tree stucture to organize html correctly
		commentLi.appendChild(deleteCommentbtn);
		commentUl.appendChild(commentLi);
	});
};

//add submit event listener to post submit button
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
