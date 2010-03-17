function save_options() {
	var url = document.getElementById("RTURL").value;
	localStorage["RTURL"] = url.replace(/\.html/, ".rdf");
	
	var openUrl = document.getElementById("RTOpenTicketURL").value;
	localStorage["RTOpenTicketURL"] = openUrl.replace(/\d+$/, "");
	
	var interval = document.getElementById("RTRefreshDelay").value;
	localStorage["RTRefreshDelay"] = interval;
}

function restore_options() {
	var url = localStorage["RTURL"],
		openUrl = localStorage["RTOpenTicketURL"],
		interval = localStorage["RTRefreshDelay"];
	
	if (url) {
		document.getElementById("RTURL").value = url;
	}
	if (openUrl) {
		document.getElementById("RTOpenTicketURL").value = openUrl;
	}
	if (interval) {
		document.getElementById("RTRefreshDelay").value = interval;
	}
}