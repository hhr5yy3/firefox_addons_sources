var obj = document.getElementsByTagName("input");
for (i = 0; i < obj.length; i++) {
            if (obj[i].type == "password") {
                obj[i].setAttribute("ondblclick","this.type='text'");
                obj[i].setAttribute("onmouseout","this.type='password'");
        }
}

