var url = localStorage["RTURL"]

requestFeed();
var interval = parseInt(localStorage["RTRefreshDelay"]) * 60 * 1000;
setInterval(requestFeed, interval);

function requestFeed() {
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
		i, item, creatorText;
	
	for (i = 0; i < items.length; i++) {
		item = {};
		item.title = items[i].querySelector("title").textContent;
		item.url = items[i].querySelector("link").textContent;
		item.id = item.url.match(/id=(\d+)/)[1];
		creatorText = items[i].querySelector("creator").textContent;
		if (creatorText.match(/".+"/)) {
			item.creator = creatorText.match(/"(.+)"/)[1];
		} else if (creatorText.match(/<.+>/)) {
			item.creator = creatorText.match(/<(.+)>/)[1];
		}
		parsedItems.push(item);
	}
	
	parsedItems = parsedItems.sort(function (a, b) {
		return parseInt(b.id) - parseInt(a.id);
	});
	
	return parsedItems;
}