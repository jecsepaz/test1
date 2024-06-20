document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    /*if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        return;
    }*/

    let formData = new FormData(this);
    let jsonData = {};
    formData.forEach((value, key) => jsonData[key] = value);

    fetch('submit.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                addRowToTable(jsonData);
                this.reset();
                this.classList.remove('was-validated');
            } else {
                alert('Failed to submit data');
            }
        })
        .catch(error => console.error('Error:', error));
});

function addRowToTable(data) {
    let table = document.getElementById('submittedData').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    Object.keys(data).forEach((key) => {
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(data[key]);
        newCell.appendChild(newText);
    });
}