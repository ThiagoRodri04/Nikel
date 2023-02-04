const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data1 = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);


//ADICIONAR LANCAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;
    
    data1.transactions.unshift({
        value: value, type: type, description: description, date: date

    });
    console.log(data1.transactions);

    
    saveData(data1);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso.");

});


function saveData(data1) {
    console.log(data1);
    localStorage.setItem(data1.login, JSON.stringify(data1));
}

checklogged();

function checklogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data1 = JSON.parse(dataUser);
    }

    getTransactions();
    
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions () {
    const transactions = data1.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach( (item) => {
            let type = "entrada";

            if(item.type === "2") {
                type = "saída";
            }

            transactionsHtml += `
                <tbody id="transactions-list">
                    <tr>
                        <th scope="row"> ${item.date1}</th>
                        <td>${item.value.toFixed(2)}</td>
                        <td>${type}</td>
                        <td>${item.description}</td>
                    </tr>
                </tbody>
            `
        })
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

    function saveData(data1) {
        console.log(data1);
        localStorage.setItem(data1.login, JSON.stringify(data1));
    }
