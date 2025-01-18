var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

var DB_NAME = "generator-danych-testowych";
var DB_VERSION = 2;
var STORE_NAME = "projects";

function createDB(fn) {
	var req = indexedDB.open(DB_NAME, DB_VERSION);
	var created = false;
	req.onupgradeneeded = function (event) {
		var db = event.target.result;
		var store = db.createObjectStore(STORE_NAME, { autoIncrement: true });
		store.createIndex("name", "name", { unique: true });
		store.createIndex("body", "body", { unique: false });

		store.transaction.oncomplete = function () {
			console.log("Baza danych została utworzona");
			created = true;
			return;
		};

		store.transaction.onerror = function () {
			console.log("Wystąpił problem podczas tworzenia bazy danych");
			created = false;
			return;
		};
	};
	req.onsuccess = function (event) {
		console.log("Baza istnieje");
		fn({ "created": created, "status": true });
		return;
	};
	req.onerror = function (event) {
		console.log("Wystąpił problem podczas łączenia się z bazą danych");
		console.log(event.target.errorCode);
		fn({ "created": created, "status": false });
		return;
	};
}

function writeProjectToDB(projectName, projectData, fn) {
	var req = indexedDB.open(DB_NAME, DB_VERSION);
	req.onsuccess = function (event) {
		var db = event.target.result;
		var transaction = db.transaction(STORE_NAME, 'readwrite');
		var store = transaction.objectStore(STORE_NAME);
		store.add({ name: projectName, body: projectData });

		store.transaction.oncomplete = function () {
			console.log("Redord został dodany do bazy danych");
			fn(store.transaction.result);
		};
		store.transaction.onerror = function () {
			console.log("Redord nie został dodany do bazy danych");
			fn(store.transaction.result);
		};
	};
}

function updateProjectFromDB(key, name, body, fn) {
	var req = indexedDB.open(DB_NAME, DB_VERSION);

	req.onsuccess = function (event) {
		var db = event.target.result;
		var transaction = db.transaction(STORE_NAME, 'readwrite');
		var objectStore = transaction.objectStore(STORE_NAME);

		var request = objectStore.openCursor();

		request.onsuccess = function (e) {
			var cursor = e.target.result;
			if (cursor) {
				if (cursor.primaryKey == key) {
					var data = cursor.value;
					if (name) {
						data.name = name;
					}
					if (body) {
						data.body = body;
					}
					var request = cursor.update(data);
					request.onsuccess = function (result) {
						console.log("Projekt został zmieniony w bazie danych");
						fn(result);
					};
					request.onerror = function (result) {
						console.log("Wystąpiły problemy podczas edycji projektu");
						fn(result);
					};
				}
				cursor.continue();
			}
		};
		request.onerror = function () {
			console.log("Wystąpiły problemy podczas edycji projektu");
		};
	};
}

function updateActiveProjectDB(id, fn) {
	var req = indexedDB.open(DB_NAME, DB_VERSION);

	req.onsuccess = function (event) {
		var db = event.target.result;
		var transaction = db.transaction(STORE_NAME, 'readwrite');
		var objectStore = transaction.objectStore(STORE_NAME);

		var request = objectStore.openCursor();

		request.onsuccess = function (e) {
			var cursor = e.target.result;
			if (cursor) {

				var data = cursor.value;
				if (id) {
					data.body.activeProject = id;
				}

				var request = cursor.update(data);
				request.onsuccess = function (result) {
					console.log("Aktywny projekt został zapisany");
					fn(result);
				};
				request.onerror = function (result) {
					console.log("Wystąpiły problemy podczas zapisu aktywnego projektu");
					fn(result);
				};

				cursor.continue();
			}
		};
		request.onerror = function () {
			console.log("Wystąpiły problemy podczas zapisu aktywnego projektu");
		};
	};
}

function getAllProjectsFromDB(fn) {
	var req = indexedDB.open(DB_NAME, DB_VERSION);
	req.onsuccess = function (event) {
		var db = event.target.result;
		var transaction = db.transaction(STORE_NAME, 'readwrite');
		var objectStore = transaction.objectStore(STORE_NAME);

		var request = objectStore.openCursor(null, "next");
		var data = [];
		request.onsuccess = function (e) {
			var cursor = e.target.result;
			if (cursor) {
				data.push({ id: cursor.primaryKey, value: cursor.value });
				cursor.continue();
			} else {
				console.log("Dane zostały pobrane z bazy danych");
				fn(data);
			}
		};

		request.onerror = function () {
			console.log("Wystąpiły problemy podczas usuwania projektu");
		};
	};
}

function getProjectFromDB(key, fn) {
	var req = indexedDB.open(DB_NAME, DB_VERSION);

	req.onsuccess = function (event) {
		var db = event.target.result;
		var transaction = db.transaction(STORE_NAME, 'readwrite');
		var objectStore = transaction.objectStore(STORE_NAME);

		var request = objectStore.get(+key);

		request.onsuccess = function () {
			console.log("Dane zostały pobrane z bazy danych");
			fn(request.result);
		};

		request.onerror = function () {
			console.log("Wystąpiły problemy podczas pobierania projektu");
		};
	};
}

function deleteProjectFromDB(key, fn) {
	var req = indexedDB.open(DB_NAME, DB_VERSION);

	req.onsuccess = function (event) {
		var db = event.target.result;
		var transaction = db.transaction(STORE_NAME, 'readwrite');
		var objectStore = transaction.objectStore(STORE_NAME);

		var request = objectStore.delete(+key);

		request.onsuccess = function () {
			console.log("Projekt został usunięty z bazy danych");
			fn(request.result);
		};

		request.onerror = function () {
			console.log("Wystąpiły problemy podczas usuwania projektu");
		};
	};
}