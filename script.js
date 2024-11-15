// API base URL
const apiUrl = "https://u6y3pnf0h9.execute-api.ap-south-1.amazonaws.com/dev/transactions";

// Form elements
const expenseForm = document.getElementById('finance-form');
const categoryInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const expenseIdInput = document.getElementById('expense-id');

// Fetch all expenses from the API on page load
window.addEventListener('DOMContentLoaded', () => {
    fetchExpenses();
});

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

// Fetch all expenses from the API
function fetchExpenses() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            renderExpenses(data);
        })
        .catch(error => {
            console.error("Error fetching expenses:", error);
        });
}

// Create expense
function createExpense(category, amount) {
    const newExpense = {
        category,
        amount
    };

    fetch(apiUrl, {
        method: "POST", // POST method for create
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newExpense)
    })
    .then(response => response.json())
    .then(data => {
        console.log("New expense created:", data);
        fetchExpenses(); // Refresh the expense list after creating
    })
    .catch(error => {
        console.error("Error creating expense:", error);
    });
}

// Update expense
function updateExpense(id, category, amount) {
    const updatedExpense = {
        category,
        amount
    };

    fetch(`${apiUrl}/${id}`, {
        method: "PUT", // PUT method for update
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedExpense)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Expense updated:", data);
        fetchExpenses(); // Refresh the expense list after updating
    })
    .catch(error => {
        console.error("Error updating expense:", error);
    });
}

// Delete expense
function deleteExpense(id) {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE" // DELETE method for delete operation
    })
    .then(response => response.json())
    .then(data => {
        console.log("Expense deleted:", data);
        fetchExpenses(); // Refresh the expense list after deleting
    })
    .catch(error => {
        console.error("Error deleting expense:", error);
    });
}

// Edit expense
function editExpense(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(data => {
            const expense = data; // Assuming the response contains the expense data
            categoryInput.value = expense.category;
            amountInput.value = expense.amount;
            expenseIdInput.value = expense.id;
        })
        .catch(error => {
            console.error("Error fetching expense for editing:", error);
        });
}

// Render the expenses to the list
function renderExpenses(expenses) {
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
