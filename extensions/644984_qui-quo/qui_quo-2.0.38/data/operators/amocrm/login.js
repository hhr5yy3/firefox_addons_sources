window.memoizedFindForm = findForm();

function findForm() {
               return () => {
        try {
            if (typeof getFindFormElements === "function") {
                return getFindFormElements();
            }
            const passwordInp = $1('#password');
            const form = $1('#authentication');
            const usernameInp = $1('#session_end_login');
            const loginBtn = $1('#auth_submit');
            const event = ["focus", "input", "change", "blur"];
            return {passwordInp, form, usernameInp, loginBtn, event};
        } catch (e) {
            console.log(e)
            return {error: e};
        }
    }
}
