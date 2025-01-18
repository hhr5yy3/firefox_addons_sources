(function() {
    const anchors = document.querySelectorAll('a[rel~="nofollow"]');

    if (anchors.length) {
        for (const anchor of anchors) {
            if (anchor.className.indexOf("nofollow_highlighted") === -1) {
                anchor.classList.add("nofollow_highlighted");
            } else {
                anchor.classList.remove("nofollow_highlighted");
            }
        }

        const highlighted = document.querySelectorAll('.nofollow_highlighted');
        
        if (highlighted.length) {
            document.querySelector("#extension").classList.remove("open");
            return "enabled";
        } else {
            return "disabled";
        }
    } else {
        alert('Nofollow Links were not found.');
        return "disabled";
    }
})();