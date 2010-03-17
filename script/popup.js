document.addEventListener("DOMContentLoaded", function () {
	var form = document.querySelector("#goToForm"),
		input = document.querySelector("#goToID"),
		items = chrome.extension.getBackgroundPage().items,
		title = document.querySelector("#header h1"),
		list = document.querySelector("#tickets"),
		i, child;
	
	form.addEventListener("submit", function () {
		window.open(localStorage["RTOpenTicketURL"] + input.value)
	});
	
	title.innerHTML = "Found " + items.length + " tickets";
	for (i = 0; i < items.length; i++) {
		child = document.createElement("li");
		child.innerHTML = itemToHTML(items[i]);
		list.appendChild(child);
	}
});

function itemToHTML(item) {
	var HTMLString = "";
	
	HTMLString += "<a class=\"id\" href=\"" + item.url + "\" target=\"_blank\">" + item.id + "</a>\n";
	HTMLString += "<a class=\"title\" href=\"" + item.url + "\" target=\"_blank\">" + item.title + "</a>\n";
	HTMLString += "<span class=\"creator\">" + item.creator + "</span>";
	return HTMLString;
}