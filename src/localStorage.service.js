class LocalStorageService {
	constructor(storageKey = "spacestagram") {
		this.storage = localStorage;
		this.storageKey = storageKey;
	}

	// Get the localStorage data tied to the storage key
	getAllData() {
		const data = this.storage.getItem(this.storageKey);
		if (!data) {
			this.storage.setItem(this.storageKey, "{}"); // set default data in localstorage
			return {};
		}
		return data;
	}

	// Get data associated with a specific picture given its url
	getPictureState(url) {
		const data = this.getAllData();
		if (Object.prototype.hasOwnProperty.call(data, url)) {
			return JSON.parse(data[url]);
		}
		return null;
	}

	// Set the data associated with a specific picture given its url
	savePictureState(url, state) {
		this.storage.setItem(this.storageKey, JSON.stringify({ ...this.getAllData(), [url]: state }));
	}
}

export default LocalStorageService;
