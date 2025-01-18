const query = new URLSearchParams(window.location.search).get("q");

async function checkZoteroIsRunning() {
    try {
        await fetch("http://localhost:23119/connector/ping")
        return true
    } catch (e) {
        return false
    }
}

async function checkZotServerIsRunning() {
    try {
        const res = await fetch("http://localhost:23119/zotserver/ping", {headers: {
            "zotero-allowed-request": true
        }})
        return res.status === 200
    } catch (e) {
        return false
    }
}


async function fetchLibraries() {
    const res = await fetch("http://localhost:23119/zotserver/libraries", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {'Content-Type': 'application/json'}
    });

    return await res.json();
}

function getCollectionFromKey(libraries, key) {
    for (const library of libraries) {
        for (const collection of library.collections) {
            if (collection.key === key) {
                return collection
            }
        }
    }
    return {}
}

function collectionKeyToName(libraries, key) {
    const collection = getCollectionFromKey(libraries, key)
    if (Object.keys(collection).length !== 0) {
        return collection.name
    }
    return ""
}

function removeParents(libraries, keys) { 
    let newKeys = []
    for(const key of keys) {
        let foundChild = false
        for (const otherKey of keys) {
            // if key has children in keys, do not add it
            const collection = getCollectionFromKey(libraries, otherKey)
            if (Object.keys(collection).length === 0) {
                continue
            }
            if (collection.parentCollection === key) {
                foundChild = true
            }
        }
        if (!foundChild) {
            newKeys.push(key)
        } 
    }
    return newKeys
}


async function searchLocalZotero(query)  {
    const res = await fetch("http://localhost:23119/zotserver/search", {
        method:"POST",
        body: JSON.stringify([{
            'condition': 'quicksearch-titleCreatorYear',
            'value': query,
        }]),
        headers: {'Content-Type': 'application/json'}
    })
    return await res.json()
}

(async () => {
    const isZoteroRunning = await checkZoteroIsRunning()
    const isZotServerRunning = await checkZotServerIsRunning()

    if (isZoteroRunning && !isZotServerRunning) {
        console.error("[Zotero Scholar extension]: It seems the ZotServer Zotero extension is not installed on your local Zotero. Please install it. You can find instructions at https://github.com/pierreadorni/ZotServer")
        return
    }
    if (!isZoteroRunning) {
        console.error("Zotero is not running.")
        return
    }

    const libraries = await fetchLibraries();
    let results = document.querySelectorAll(".gs_ri")

    for(let result of results) {
        title = result.querySelector(".gs_rt")
        let res = await searchLocalZotero(title.querySelector('a').innerText.toLowerCase())

        // remove all results that do not match exactly the title
        res = res.filter(result => result.title.toLowerCase() === title.querySelector('a').innerText.toLowerCase())
        
        if (res.length > 0) {
            const collectionNames = removeParents(libraries, res[0].collections).map(key => collectionKeyToName(libraries, key))


            const container = document.createElement("div")
            container.style = "display: flex; flex-direction: column; gap:5px; align-items: center; width: 100px"

            const img = document.createElement("img")
            img.src=browser.runtime.getURL("/")+"icons/Zotero-48.png"
            img.style = "width:32px";
            container.appendChild(
                img
            )
            
            collectionNames.forEach((collectionName) => {
                const localContainer = document.createElement("div")
                localContainer.style="display: flex; gap:5px"
                localContainer.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H9L8.276 1.553C8.107 1.214 7.761 1 7.382 1H3.618C3.239 1 2.893 1.214 2.724 1.553L2 3H1C0.448 3 0 3.448 0 4V6V14C0 14.552 0.448 15 1 15H15C15.552 15 16 14.552 16 14V6V4C16 3.448 15.552 3 15 3ZM15 14H1V6H15V14ZM1 5V4H2C2.379 4 2.725 3.786 2.894 3.447L3.618 2H7.382L8.106 3.447C8.275 3.786 8.621 4 9 4H15V5H1Z" fill="#4072E5"/>
                </svg>`
                const text = document.createElement("span")
                text.innerText = collectionName
                text.style="color: black; font-size: 11pt"
                localContainer.appendChild(text)
                
                container.appendChild(localContainer)
            })


            const parentEl = result.parentElement
            const linksEl = parentEl.querySelector(".gs_ggs")
            linksEl.style = "display: flex; justify-content:space-between;"
            linksEl.appendChild(container)
        }
    }
})()
