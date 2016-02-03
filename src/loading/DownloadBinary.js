function DownloadBinary(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = "arraybuffer";
	xhr.onload = function() {
		if (this.status == 200)
			callback(this.response);
		else
			callback(false);
	};
	xhr.send();
}