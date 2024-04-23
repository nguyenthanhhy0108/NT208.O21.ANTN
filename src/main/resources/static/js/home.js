//Display logout message
function submitLogoutForm() {
    document.getElementById("myForm").submit();
}

function displayHotels(page, hotelsPerPage, hotelNames, hotelPrices, hotelAddresses, numberOfPeople, ids) {
    var startIndex = (page - 1) * hotelsPerPage;
    var endIndex = Math.min(startIndex + hotelsPerPage, hotelNames.length);

    // alert(startIndex);
    // alert(endIndex);

    var hotelListElement = document.getElementById("room");
    hotelListElement.innerHTML = "";

    var wholeTitle = document.createElement("h1");
    wholeTitle.textContent = "Hotels fit your request";
    wholeTitle.classList.add("pt-5");
    wholeTitle.classList.add("text-center");
    wholeTitle.classList.add("headings");
    hotelListElement.appendChild(wholeTitle);
    hotelListElement.appendChild(document.createElement("br"));

    var roomsRow = document.createElement("div");
    roomsRow.classList.add("row");
    roomsRow.classList.add("our-Rooms");
    roomsRow.classList.add("px-4");
    hotelListElement.appendChild(roomsRow);

    for (var i = startIndex; i < endIndex; i++) {
        (function (index){

        var hotelDiv = document.createElement("div");
        hotelDiv.classList.add("col-md-4");
        hotelDiv.classList.add("room");

        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.style.width = "23rem";
        cardDiv.style.height = "30rem";

        var img = document.createElement("img");
        img.src = "/images/room1.jpg";
        img.classList.add("card-img-top");
        img.onclick = function (event) {
            window.location.href = "/hotel-detail?hotel_id=" + ids[index].toString();
        }

        var cardBodyDiv = document.createElement("div");
        cardBodyDiv.classList.add("card-body");

        var title = document.createElement("h3");
        title.classList.add("card-title");
        title.style.fontSize = "150%";
        title.textContent = hotelNames[i];

        var text1 = document.createElement("p");
        text1.classList.add("card-text");
        text1.style.marginTop = "-25%";
        text1.style.marginRight = "-80%";
        text1.style.fontSize = "80%";
        text1.textContent = "Price only from";

        var text2 = document.createElement("p");
        text2.classList.add("card-text");
        text2.style.marginTop = "-18%";
        text2.style.marginRight = "-80%";
        text2.style.fontSize = "180%";
        text2.style.color = "red";
        text2.textContent = (parseInt(hotelPrices[i]) / 25).toString() + "$";

        var text3 = document.createElement("p");
        text3.classList.add("card-text");
        text3.style.marginTop = "-18%";
        text3.style.marginRight = "-80%";
        text3.style.fontSize = "80%";
        text3.textContent = "for " + numberOfPeople.toString() + " people";

        var address = document.createElement("p")
        address.classList.add("card-text");
        address.style.marginTop = "-43%";
        address.style.marginLeft = "-43%";
        address.style.fontSize = "80%";
        address.textContent = hotelAddresses[i];

        var bookNowLink = document.createElement("a");
        bookNowLink.href = "/first-page";
        bookNowLink.classList.add("button");
        bookNowLink.textContent = "Book Now";

        cardBodyDiv.appendChild(title);
        cardBodyDiv.appendChild(text1);
        cardBodyDiv.appendChild(text2);
        cardBodyDiv.appendChild(text3);
        cardBodyDiv.appendChild(address);
        cardBodyDiv.appendChild(bookNowLink);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBodyDiv);

        hotelDiv.appendChild(cardDiv);

        roomsRow.appendChild(hotelDiv);
        })(i);
    }
}



function displayPagination(totalPages, hotelsPerPage, hotels) {
    var paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const country = urlParams.get('country');
    const page = urlParams.get("page");

    for (var i = 1; i <= totalPages; i++) {
        var button = document.createElement("button");
        button.textContent = i;
        button.style.padding = "0.5%";
        button.onclick = function() {
            // alert(this.textContent);
            var url = 'http://localhost:8080/home?country=abc';
            var newURL = url + "&page=" + this.textContent;
            window.location.href = newURL;

            // alert(this.textContent);

            callAPI(country, this.textContent);
        };
        paginationElement.appendChild(button);
    }
}

function callAPI(country, page){
    let url = '/get-sorted-hotels-details?country=' + country + '&page=' + page;

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            var hotelsName = data.names;
            var hotelsAddresses = data.addresses;
            var hotelsPrices = data.prices;
            var numberOfPeople = data.numberOfPeople;
            var ids = data.ids;

            // alert(hotelsAddresses)
            // alert(hotelsPrices[0])
            // alert(hotelsName)
            var hotelsPerPage = 6;
            var totalPages = Math.ceil(hotelsName.length / hotelsPerPage);

            displayHotels(page, hotelsPerPage, hotelsName, hotelsPrices, hotelsAddresses, numberOfPeople, ids);
            displayPagination(totalPages, hotelsPerPage, hotelsName);
        },
        error: function(xhr, status, error) {
            alert(status + ': ' + error);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {

    const urlParams = new URLSearchParams(window.location.search);
    const country = urlParams.get('country');

    var page = parseInt(urlParams.get("page"))

    callAPI(country, page);
});