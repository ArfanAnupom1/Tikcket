document.addEventListener("DOMContentLoaded", function () {

    const seatButtons = document.querySelectorAll('.seat');
    let availableSeats = 40;
    let totalPrice = 0;
    const maxSeatsAllowed = 4;
    const buyTicketsButton = document.getElementById('1stButton');
    const targetSection = document.getElementById('busTicket');



    buyTicketsButton.addEventListener('click', function () {
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });

    seatButtons.forEach(seatButton => {
        seatButton.addEventListener('click', function () {
            handleSeatSelection(seatButton);
        });
    });

    function handleSeatSelection(seatButton) {
        if (availableSeats === 0 && !seatButton.classList.contains('bg-green-600')) {
            alert('Sorry, no more seats available.');
            return;
        }

        if (seatButton.classList.contains('bg-green-600')) {
            unselectSeat(seatButton);
        } else if (seatButton.classList.contains('bg-gray-200') && availableSeats > 0) {
            selectSeat(seatButton);
        }
    }

    function unselectSeat(seatButton) {
        seatButton.classList.remove('bg-green-600');
        seatButton.classList.add('bg-gray-200');
        availableSeats++;
        updateSeatDisplay();
        updateTotalPrice(-550);
        removeTableRow(seatButton.innerText);
    }

    function selectSeat(seatButton) {
        if (countSelectedSeats() >= maxSeatsAllowed) {
            alert(`You can only select up to ${maxSeatsAllowed} seats.`);
            return;
        }

        seatButton.classList.remove('bg-gray-200');
        seatButton.classList.add('bg-green-600');
        availableSeats--;
        updateSeatDisplay();
        updateTotalPrice(550);
        appendTableRow(seatButton.innerText, 'Economy', 550);
    }

    function updateSeatDisplay() {
        document.getElementById('seatLeft').innerText = availableSeats;
    }

    function updateTotalPrice(price) {
        totalPrice += price;
        document.getElementById('totalAmount').innerText = totalPrice + ' BDT';
        document.getElementById('GrandPrice').innerText = totalPrice + ' BDT';

    }

    function appendTableRow(seatNumber, seatClass, seatPrice) {
        const table = document.querySelector('table');
        const newRow = table.insertRow(table.rows.length);

        const seatCell = newRow.insertCell(0);
        seatCell.innerHTML = `<sup class="bg-green-300 px-3 py-1 rounded-lg">${seatNumber}</sup>`;

        const classCell = newRow.insertCell(1);
        classCell.innerHTML = seatClass;

        const priceCell = newRow.insertCell(2);
        priceCell.innerHTML = seatPrice + ' BDT';
    }

    function removeTableRow(seatNumber) {
        const table = document.querySelector('table');
        for (let i = 1; i < table.rows.length; i++) {
            if (table.rows[i].cells[0].innerText.includes(seatNumber)) {
                table.deleteRow(i);
                break;
            }
        }
    }

    function countSelectedSeats() {
        const selectedSeats = document.querySelectorAll('.seat.bg-green-600');
        return selectedSeats.length;
    }
    function unselectSeat(seatButton) {
        seatButton.classList.remove('bg-green-600');
        seatButton.classList.add('bg-gray-200');
        availableSeats++;
        updateSeatDisplay();
        updateTotalPrice(-550);
        removeTableRow(seatButton.innerText);
        updateSupElement(); // Update the value of #sup element
    }
    
    function selectSeat(seatButton) {
        if (countSelectedSeats() >= maxSeatsAllowed) {
            alert(`You can only select up to ${maxSeatsAllowed} seats.`);
            return;
        }
    
        seatButton.classList.remove('bg-gray-200');
        seatButton.classList.add('bg-green-600');
        availableSeats--;
        updateSeatDisplay();
        updateTotalPrice(550);
        appendTableRow(seatButton.innerText, 'Economy', 550);
        updateSupElement(); // Update the value of #sup element
    }
    
    function updateSupElement() {
        const selectedSeatsCount = countSelectedSeats();
        document.getElementById('sup').innerText = selectedSeatsCount;
    }
    

});

function applyCoupon() {

    var inputElement = document.getElementById("couponInput");
    var inputValue = inputElement.value;

    console.log(inputValue);


    const price = document.getElementById("totalAmount");
    const priceValue = parseFloat(price.innerText.replace(/[^0-9.]/g, ''));

    let discount = 0;


    if (inputValue === 'NEW15') {
        discount = 0.15;
    } else if (inputValue === 'Couple20') {
        discount = 0.20;
    } else {

        alert("Invalid coupon code. Please enter a valid coupon code.");
        return;
    }
    const totalDiscount = priceValue * discount;

    const grandTotal = priceValue - (priceValue * discount);


    document.getElementById('GrandPrice').innerText = grandTotal + ' BDT';


    if (discount > 0) {

        var discountContainer = document.createElement("div");

        // Add the specified class to the discountContainer
        discountContainer.classList.add("col-span-3", "ml-4", "mt-4");

        var discountMessage = document.createElement("p");
        discountMessage.innerText = "Discount applied: " + totalDiscount;

        discountContainer.appendChild(discountMessage);

        inputElement.parentNode.appendChild(discountContainer);
    }

    console.log(grandTotal);
    var applyButton = document.getElementById("applyButton");
    applyButton.disabled = true;

    // Prevent the default form submission behavior
    applyButton.addEventListener("click", function (event) {
        event.preventDefault();
    });

}

function hideElementById(elementId) {
    const element = document.getElementById(elementId);
    element.classList.add('hidden');
}

function showElementById(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove('hidden');
}

function nextPage() {
    const phoneInput = document.getElementById('Phone');
    const selectedSeats = document.querySelectorAll('.seat.bg-green-600');

    const phoneValue = phoneInput.value.trim();

    if (!isNaN(phoneValue) && phoneValue !== '' && selectedSeats.length !== 0) {
        hideElementById('main');
        showElementById('sus');
        
    } else {
        alert('Please enter a valid non-empty phone number and select seats.');
    }
}



function Continue() {
    location.reload()
    hideElementById('sus');
    showElementById('main');

}

