// LOGOUT

const myModal = new bootstrap.Modal('#transaction-Modal');
let logged = sessionStorage.getItem('logged')
const session = localStorage.getItem('session')
let data = {
    transaction: []
};

document.getElementById('button-logout').addEventListener('click', logout);
document.getElementById('transactions-button').addEventListener('click', function () {

    window.location.href = 'transactions.html'

})

//adicionar lançamento

document.getElementById('transaction-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById('value-input').value);
    const description = document.getElementById('description-input').value;
    const date = document.getElementById('date-input').value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transaction.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    saveData(data);
    e.target.reset()
    myModal.hide();
    getCashIn()
    getCashOut()
    getTotal()

    alert('lançamento com sucesso!')


})
//adicionar login e logout
checkLogged();

function checkLogged() {

    if (session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }

    if (!logged) {
        window.location.href = 'index.html'
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser)
    }

    console.log(data);

    getCashIn()
    getCashOut()
    getTotal()

};

function logout() {
    sessionStorage.removeItem('logged');
    localStorage.removeItem('session');

    window.location.href = 'index.html'
}
//adiciona o money
function getCashIn() {
    const transaction = data.transaction;

    const cashIn = transaction.filter((item) => item.type === '1');

    console.log(cashIn);

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                            <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }

        document.getElementById('cash-in-list').innerHTML = cashInHtml;

    }

}

function getCashOut() {
    const transaction = data.transaction;

    const cashOut = transaction.filter((item) => item.type === '2');

    console.log(cashOut);

    if (cashOut.length) {
        let cashOutHtml = ``;
        let limit = 0;

        if (cashOut.length > 5) {
            limit = 5;
        } else {
            limit = cashOut.length;
        }

        for (let index = 0; index < limit; index++) {
            cashOutHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">${cashOut[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                            <p>${cashOut[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashOut[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }

        document.getElementById('cash-out-list').innerHTML = cashOutHtml;

    }
}

function getTotal() {
    const transaction = data.transaction;
    let total = 0;

    transaction.forEach((item) => {
        if (item.type === '1') {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById('total').innerHTML = `R$ ${total.toFixed(2)}`;

}
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data))


}