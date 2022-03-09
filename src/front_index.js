function getCompany(companyName) {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            total_data = JSON.parse(this.responseText);
            console.log(total_data);
        }
    };
    httpRequest.open("GET", "/search/"+companyName);
    httpRequest.send();
}

const form = document.getElementById("query-form");
var total_data = {};
form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(document.getElementById("query"));
    companyName = document.getElementById("query").value;
    total_data = {};
    console.log("submit");
    getCompany(companyName);
});