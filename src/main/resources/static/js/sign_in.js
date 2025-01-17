//Display login message when loading login page
function showLoginMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const successful = urlParams.get('successful');
    if (successful === 'true') {
        document.getElementById("password-successMessage").style.display = "block";
    }
}

function checkLogOut() {
    const url = window.location.search;
    if (url.includes('?logout')) {
        window.location.replace('/login');
    }
}

function focus() {
    const url = window.location.search;
    if (!url.includes('?logout')) {
        let username = document.getElementById("exampleInputEmail1");
        username.focus();
    }
}

window.onload = showLoginMessage;
