var requester = function () {
	requestFeed(localStorage["RTURL"]);
	if (localStorage["RTRefreshDelay"]) {
		var interval = parseInt(localStorage["RTRefreshDelay"]) * 60 * 1000;
		setTimeout(requester, interval);
	}
}
requester();

function requestFeed(url) {
	request = new XMLHttpRequest();
	request.onload = handleResponse;
	request.onerror = handleError;
	request.open("GET", url, true);
	request.send();
}

function handleResponse() {
	items = parseResponse(request.responseXML); // global
	chrome.browserAction.setBadgeText({text: items.length.toString()});
}

function handleError() {
	chrome.browserAction.setBadgeText({text: "err"});
}

function parseResponse(response) {
	var items = response.getElementsByTagName("item"),
		parsedItems = [],
		i;
	
	for (i = 0; i < items.length; i++) {
		parsedItems.push(Item.fromXML(items[i]));
	}
	
	parsedItems = parsedItems.sort(function (a, b) {
		return parseInt(b.id) - parseInt(a.id);
	});
	
	return parsedItems;
}

function Item(id, title, url, text, creatorName, creatorEmail) {
	this.id = id;
	this.title = title;
	this.url = url;
	this.text = text;
	this.creatorName = creatorName;
	this.creatorEmail = creatorEmail;
}

Item.fromXML = function(element) {
	var item = new Item();
	
	item.title = element.querySelector("title").textContent;
	item.url = element.querySelector("link").textContent;
	item.id = item.url.match(/id=(\d+)/)[1];
	item.creator = element.querySelector("creator").textContent;
	
	return item;
};

Item.prototype.__defineGetter__("creator", function () {
	return this.creatorName || this.creatorEmail;
});

Item.prototype.__defineSetter__("creator", function (value) {
	if (value.match(/".+"/)) {
		this.creatorName = value.match(/"(.+)"/)[1];
	}
	if (value.match(/<.+>/)) {
		this.creatorEmail = value.match(/<(.+)>/)[1];
	}
	
	if (!this.creatorName) {
		this.creatorName = value;
	}
	
	return this.creatorName || this.creatorEmail;
});

Item.prototype.toHTML = function () {
	var HTMLString = "";
	
	HTMLString += "<a class=\"id\" href=\"" + this.url + "\" target=\"_blank\">" + this.id + "</a>\n";
	HTMLString += "<a class=\"title\" href=\"" + this.url + "\" target=\"_blank\">" + this.title + "</a>\n";
	HTMLString += "<span class=\"creator\">" + this.creator + "</span>";
	return HTMLString;
}