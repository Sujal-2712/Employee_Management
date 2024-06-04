

function leaveApproved(id) {
    let btn = document.getElementById('approved');

    let req = new XMLHttpRequest();
    req.open('GET', `/admin/leave/update/${id}?status=approve`, true);

    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            btn.parentElement.parentElement.remove();
        }
    }
    req.send();
    return false;
}

function leaveRejected(id)
{
    let btn=document.getElementById('rejected');
    let req = new XMLHttpRequest();
    req.open('GET', `/admin/leave/update/${id}?status=reject`, true);

    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            btn.parentElement.parentElement.remove();
        }
    }
    req.send();
    return false;
}