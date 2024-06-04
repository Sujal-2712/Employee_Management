function handleDateSelection() {

    var startDateInput = document.getElementById('start').value;
    var totalDay = parseInt(document.getElementById('days').value);
    console.log(totalDay);

    var startDate = new Date(startDateInput);
    console.log(startDate);

    startDate.setDate(startDate.getDate() + totalDay);

    // Format the end date to YYYY-MM-DD
    var endDate = startDate.toISOString().slice(0, 10);
    console.log(endDate);

    document.getElementById('end').value = endDate;
}
document.getElementById("menuToggle").addEventListener("click", function () {
    var mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.toggle("hidden");
});

async function loadLeaves()
{
    let req = new XMLHttpRequest();
    let appliedLeave = document.getElementById('appliedLeave');
    appliedLeave.innerHTML = "";
    req.open("GET", `/user/leave/getLeaves?status=0`, true);
    req.onreadystatechange = function () {
        if (req.status == 200 && req.readyState == 4) {

            const data = JSON.parse(req.responseText);

            data.forEach(element => {
                appliedLeave.innerHTML += ` 
                <li class="mb-30 pb-2 flex justify-between overflow-y-auto text-wrap a${element.isApproved}${element.isProcessed}a">${element.leaveReason} <a href="/user/leave/deleteLeave/${element.leaveId}" class=" text-red-500 hover:text-red-900 font-bold b${element.isApproved}${element.isProcessed}b">Remove</button> </li>
                `;
            });
        }
    }
    req.send();
}

async function approvedLeave()
{
    let req = new XMLHttpRequest();
    let approvedLeave = document.getElementById('approvedLeave');
    approvedLeave.innerHTML = "";
    req.open("GET", `/user/leave/getLeaves?status=1`, true);
    req.onreadystatechange = function () {
        if (req.status == 200 && req.readyState == 4) {

            const data = JSON.parse(req.responseText);

            data.forEach(element => {
                approvedLeave.innerHTML += `
                <li class="pb-2">${element.leaveReason}</li>
                `;
            });
        }
    }
    req.send();
}

window.onload = () => {
    // loadUsername();
    loadLeaves();
    approvedLeave();
}
