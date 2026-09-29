const routineBody = document.getElementById("routineBody");

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

const habits = [
    "Wake Up 6 AM",
    "Walking 1 Hour",
    "Reading",
    "No Sugar"
];

function showMonth() {

    routineBody.innerHTML = "";

    const monthName = new Date(
        currentYear,
        currentMonth
    ).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric"
    });

    document.getElementById("currentMonth").textContent = monthName;

    const daysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();

    for (let day = 1; day <= daysInMonth; day++) {

        const row = document.createElement("tr");

        // Date
        const dateCell = document.createElement("td");

        const date = new Date(
            currentYear,
            currentMonth,
            day
        );

        dateCell.textContent = date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        row.appendChild(dateCell);

        // Four habits
        for (let habit = 0; habit < habits.length; habit++) {

            const cell = document.createElement("td");

            const button = document.createElement("button");

            button.className = "mark-button";

            const storageKey =
                `routine-${currentYear}-${currentMonth}-${day}-${habit}`;

            button.textContent =
                localStorage.getItem(storageKey) || "⬜";

            button.addEventListener("click", function () {

                if (button.textContent === "⬜") {
                    button.textContent = "✓";
                }

                else if (button.textContent === "✓") {
                    button.textContent = "✗";
                }

                else {
                    button.textContent = "⬜";
                }

                localStorage.setItem(
                    storageKey,
                    button.textContent
                );
            });

            cell.appendChild(button);
            row.appendChild(cell);
        }

        routineBody.appendChild(row);
    }
}


// Previous month
document.getElementById("previousMonth").addEventListener("click", function () {

    currentMonth--;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    showMonth();
});


// Next month
document.getElementById("nextMonth").addEventListener("click", function () {

    currentMonth++;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    showMonth();
});


// ===== ZOOM =====

let zoom = 100;

function zoomIn() {

    if (zoom < 150) {
        zoom += 10;
        applyZoom();
    }
}

function zoomOut() {

    if (zoom > 70) {
        zoom -= 10;
        applyZoom();
    }
}

function applyZoom() {

    document.getElementById("routineTable").style.zoom =
        zoom / 100;

    document.getElementById("zoomLevel").textContent =
        zoom + "%";
}


// Show current month
showMonth();
