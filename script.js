// Sample expense data structure
let expenses = [];

// Form elements
const expenseForm = document.getElementById('finance-form');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const expenseIdInput = document.getElementById('expense-id');

// Handle form submission for Create and Update
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const category = categoryInput.value;
    const amount = parseFloat(amountInput.value);
    const expenseId = expenseIdInput.value;

    if (expenseId) {
        // Update the expense
        updateExpense(expenseId, category, amount);
    } else {
        // Create a new expense
        createExpense(category, amount);
    }

    // Clear the form
    expenseForm.reset();
    expenseIdInput.value = '';
});

// Create expense
function createExpense(category, amount) {
    const newExpense = {
        id: Date.now().toString(), // Unique ID based on timestamp
        category,
        amount
    };

    expenses.push(newExpense);
    renderExpenses();
}

// Update expense
function updateExpense(id, category, amount) {
    const expenseIndex = expenses.findIndex(exp => exp.id === id);
    if (expenseIndex !== -1) {
        expenses[expenseIndex] = { id, category, amount };
        renderExpenses();
    }
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    renderExpenses();
}

// Edit expense
function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (expense) {
        categoryInput.value = expense.category;
        amountInput.value = expense.amount;
        expenseIdInput.value = expense.id;
    }
}

// Render the expenses to the list
function renderExpenses() {
    expenseList.innerHTML = '';

    expenses.forEach(exp => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${exp.category} - $${exp.amount.toFixed(2)}</span>
            <button class="edit-btn" onclick="editExpense('${exp.id}')">Edit</button>
            <button class="delete-btn" onclick="deleteExpense('${exp.id}')">Delete</button>
        `;
        expenseList.appendChild(listItem);
    });
}

// Initial render
renderExpenses();

