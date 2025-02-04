const posts = [];

const submitBtn = document.getElementsByClassName("submitPostbtn")[0];
const postContainer = document.getElementsByClassName("posts")[0];

const renderPosts = () => {
	let postsElements = "";
	posts.forEach(
		(post) =>
			(postsElements += `<div><p>${post.message} - posted by: ${post.name}</p></div>`)
	);
	postContainer.innerHTML = postsElements;
};

submitBtn.addEventListener("click", function (e) {
	e.preventDefault();
	const postInputName = document.getElementsByClassName("post-name")[0].value;
	const postInputMessage =
		document.getElementsByClassName("post-message")[0].value;
	posts.push({ name: postInputName, message: postInputMessage, comments: [] });
	renderPosts();
});
