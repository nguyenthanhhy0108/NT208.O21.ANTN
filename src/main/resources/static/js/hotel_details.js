var checkInDate = localStorage.getItem("checkInDate");
var checkOutDate = localStorage.getItem("checkOutDate");

// alert(checkInDate)

const urlParams = new URLSearchParams(window.location.search);
let hotel_id = urlParams.get("hotel_id");

async function getListRoom() {
    try {
        const test = await $.ajax({
            url: `/get-list-rooms?hotel_id=${hotel_id}`,
            method: 'GET',
            dataType: 'json'
        });
        return test;
    } catch (error) {
        alert(error);
    }
}

async function printRooms() {
    // let rooms = await getListRoom();
    let data = await getListRoom();

    console.log(data);
    // alert(data)

    let roomsList = document.getElementById("rooms");
    let cardHead = document.createElement("div");
    cardHead.classList.add("row");
    cardHead.classList.add("text-end");
    cardHead.classList.add("mb-3");
    cardHead.classList.add("py-2");

    let heading = document.createElement("h1");
    heading.style.marginLeft = "-30%";
    heading.style.fontSize = "24px";
    heading.textContent = "Hotel available rooms";

    cardHead.appendChild(heading);
    roomsList.appendChild(cardHead);

    let fullDataCard = document.createElement("div");
    fullDataCard.classList.add("row");
    fullDataCard.classList.add("py-2");
    fullDataCard.style.marginLeft = "1%";
    fullDataCard.style.fontSize = "15px";
    fullDataCard.style.maxWidth = "99%";
        if (data && data.length > 0) {
            let table = document.createElement("table");

            let row = document.createElement("tr");

            let col1 = document.createElement("td");
            col1.style.overflowWrap = "break-word"
            col1.textContent = "Room ID";

            let col2 = document.createElement("td");
            col2.style.overflowWrap = "break-word"
            col2.textContent = "Room capacity";
            col2.style.position = "absolute";
            col2.style.marginLeft = "-75%"

            let col3 = document.createElement("td");
            col3.style.overflowWrap = "break-word"
            col3.textContent = "Price";
            col3.style.position = "absolute";
            col3.style.marginLeft = "-50%";

            let col4 = document.createElement("td");
            col4.style.position = "absolute"
            col4.style.marginLeft = "-35%";
            col4.style.marginTop = "-1%";
            let hide1 = document.createElement("button");
            hide1.style.display = "none";
            hide1.disabled = true;
            hide1.style.opacity = "0";
            col4.appendChild(hide1);

            let col5 = document.createElement("td");
            col5.style.position = "absolute";
            // col5.style.paddingLeft = "17%";
            col5.style.marginLeft = "-20%";
            // col5.style.marginTop = "-1%";
            let hide2 = document.createElement("span");
            // hide2.style.display = "none";
            // hide2.type = "button";
            // hide2.classList.add("btn");
            // hide2.classList.add("btn-success");
            // hide2.classList.add("mr-2");
            hide2.textContent = "Action";
            // hide2.disabled = true;
            // hide2.style.opacity = "0";
            col5.appendChild(hide2);

            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);
            table.appendChild(row);

            let horizon = document.createElement("hr");
            horizon.style.width = "100%";
            table.appendChild(horizon);

            fullDataCard.appendChild(table);
            roomsList.appendChild(fullDataCard);

            for (let room of data) {
                let fullDataCard = document.createElement("div");
                fullDataCard.classList.add("row");
                fullDataCard.classList.add("py-2");
                fullDataCard.style.marginLeft = "1%";
                fullDataCard.style.fontSize = "15px";
                fullDataCard.style.maxWidth = "99%";

                let table = document.createElement("table");

                let row = document.createElement("tr");

                let col1 = document.createElement("td");
                // col1.style.borderRight = "1px solid black";
                col1.style.padding = "20px";
                col1.style.overflowWrap = "break-word"
                col1.textContent = room.roomID.toString();

                let col2 = document.createElement("td");
                // col2.style.borderRight = "1px solid black";
                col2.style.padding = "20px";
                col2.style.overflowWrap = "break-word"
                col2.textContent = room.numOfPeople.toString();
                col2.style.position = "absolute";
                col2.style.marginLeft = "-73%"

                let col3 = document.createElement("td");
                // col3.style.borderRight = "1px solid black";
                col3.style.padding = "20px";
                col3.style.overflowWrap = "break-word"
                col3.textContent = room.price.toString();
                col3.style.position = "absolute";
                col3.style.marginLeft = "-52%";

                let col4 = document.createElement("td");
                col4.style.position = "absolute"
                col4.style.marginLeft = "-35%";
                col4.style.marginTop = "-1%";
                col4.style.paddingTop = "20px";
                let hide1 = document.createElement("button");
                // hide1.style.display = "none";
                hide1.type = "button";
                hide1.classList.add("btn");
                hide1.classList.add("btn-success");
                hide1.style.backgroundColor = "blue";
                // hide1.classList.add("mr-2");
                hide1.textContent = "More information";
                // hide1.disabled = true;
                // hide1.style.opacity = "0";
                col4.appendChild(hide1);

                let col5 = document.createElement("td");
                col5.style.position = "absolute";
                // col5.style.paddingLeft = "17%";
                col5.style.marginLeft = "-12%";
                col5.style.marginTop = "-1%";
                col5.style.paddingTop = "20px";
                let hide2 = document.createElement("button");
                // hide2.style.display = "none";
                hide2.type = "button";
                hide2.classList.add("btn");
                hide2.classList.add("btn-success");
                // hide2.classList.add("mr-2");
                hide2.textContent = "Book now";
                // hide2.disabled = true;
                // hide2.style.opacity = "0";
                col5.appendChild(hide2);

                row.appendChild(col1);
                row.appendChild(col2);
                row.appendChild(col3);
                row.appendChild(col4);
                row.appendChild(col5);
                table.appendChild(row);

                let horizon = document.createElement("hr");
                horizon.style.width = "100%";
                table.appendChild(horizon);

                fullDataCard.appendChild(table);
                roomsList.appendChild(fullDataCard);
            }
        }
    else {
            let table = document.createElement("table");

            let row = document.createElement("tr");

            let col1 = document.createElement("td");
            col1.style.overflowWrap = "break-word"
            col1.textContent = "There are no available rooms !!!";
            col1.style.color = "orange";

            row.appendChild(col1);
            table.appendChild(row);

            let horizon = document.createElement("hr");
            horizon.style.width = "100%";
            table.appendChild(horizon);

            fullDataCard.appendChild(table);
            roomsList.appendChild(fullDataCard);
    }
}