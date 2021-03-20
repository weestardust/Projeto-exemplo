const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        // Fechar modal
        // remover a classe active do modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const trasactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000, //Aqui é 500 mas não se coloca . ou , para separar as casas decimais, relaxa que depois vamos formatar bonitinho
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021',
    },
]

//Aqui muda entradas, saidas e o total
const Transaction = {
    all: trasactions, 
    add(transaction){
        Transaction.all.push(transaction)

        console.log(Transaction.all)
    },

    incomes(){
        let income = 0;
        // pegar todas as transacoes
        // para cada transacao
        Transaction.all.forEach(transaction => {
            // se ela for maior que zero
            if(transaction.amount > 0){
                // somar a uma variavel e retornar a variavel
                income += transaction.amount
            }

        })
        return income;
    },
    expenses(){
        let expense = 0;
        //o nome teve de mudar (trasaction)
        Transaction.all.forEach(trasaction => {
            // se for menor que zero
            if(trasaction.amount < 0){
                //soma
                expense += trasaction.amount
            }
        })
        return expense;
    },
    total(){
        return Transaction.incomes() + Transaction.expenses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    //Aqui adiciona a transação
    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)// Chama a formatação

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        `
        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

//Mudar a formatação do número, positivo ou negativo, e tipo da moeda
const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100 //dividir por cem por que o número guardado é sempre multiplicado por 100

       value = value.toLocaleString('pt-BR', {
           style: 'currency',
           currency: 'BRL'
       })

       return signal + value
    }
}

trasactions.forEach(function(transaction) {
    DOM.addTransaction(transaction)
});

DOM.updateBalance()

Transaction.add({
    id: 39,
    description: 'ALO',
    amount: 200,
    date: '23/01'
})