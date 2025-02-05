const posts = [];

const submitBtn = document.getElementsByClassName("submitPostbtn")[0];
const postsContainer = document.getElementsByClassName("posts")[0];

const renderPosts = () => {
	postsContainer.replaceChildren();
	posts.forEach((post) => {
		const postDiv = document.createElement("div");
		const postP = document.createElement("p");
		const removePostbtn = document.createElement("button");

		postP.textContent = `${post.message} - posted by: ${post.name}`;
		removePostbtn.textContent = "Delete Post";

		removePostbtn.addEventListener("click", function (e) {
			postsContainer.removeChild(e.target.parentNode);
			posts.splice(posts.indexOf(post), 1);
		});

		postDiv.appendChild(postP);
		postDiv.appendChild(removePostbtn);
		postsContainer.appendChild(postDiv);
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
