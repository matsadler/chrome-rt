function save_options() {
	var url = document.getElementById("RTURL").value;
	localStorage["RTURL"] = url.replace(/\.html/, ".rdf");
	
	var interval = document.getElementById("RTRefreshDelay").value;
	localStorage["RTRefreshDelay"] = interval;
}

function restore_options() {
	var url = localStorage["RTURL"];
	var interval = localStorage["RTRefreshDelay"];
	
	if (url) {
		document.getElementById("RTURL").value = url;
	}
	if (interval) {
		document.getElementById("RTRefreshDelay").value = interval;
	}
}