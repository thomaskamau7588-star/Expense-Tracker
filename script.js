// Expense Class
class Expense {
    constructor(description, amount, category) {
        this.id = Date.now().toString();
        this.description = description;
        this.amount = Number(amount);
        this.category = category;
        this.date = new Date().toISOString();
    }
}


// ExpenseTracker Class
class ExpenseTracker {
    constructor() {
        this.expenses = this.loadExpenses();
    }

    // Add a new expense
    addExpense(expense) {
        this.expenses = [...this.expenses, expense];
        this.saveExpenses();
    }

    // Add multiple expenses using the rest operator
    addExpenses(...expenses) {
        this.expenses = [...this.expenses, ...expenses];
        this.saveExpenses();
    }

    // Remove an expense
    removeExpense(id) {
        this.expenses = this.expenses.filter(
            expense => expense.id !== id
        );

        this.saveExpenses();
    }

    // Filter expenses by category
    filterExpenses(category) {
        if (category === "All") {
            return this.expenses;
        }

        return this.expenses.filter(
            expense => expense.category === category
        );
    }

    // Calculate total expenses for today
    calculateTotal() {
        const today = new Date().toDateString();

        return this.expenses
            .filter(expense =>
                new Date(expense.date).toDateString() === today
            )
            .reduce((total, expense) => total + expense.amount, 0);
    }

    // Save expenses to LocalStorage
    saveExpenses() {
        localStorage.setItem(
            "expenses",
            JSON.stringify(this.expenses)
        );
    }
 // Load expenses from LocalStorage
    loadExpenses() {
        const savedExpenses = localStorage.getItem("expenses");

        if (savedExpenses) {
            return JSON.parse(savedExpenses);
        }

        return [];
    }
}

// Create ExpenseTracker object
const tracker = new ExpenseTracker();


// Get HTML Elements
const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const totalExpenses = document.getElementById("total-expenses");
const filterCategory = document.getElementById("filter-category");

// Display Expenses
function displayExpenses() {

    // Get selected category
    const selectedCategory = filterCategory.value;

    // Filter expenses
    const filteredExpenses = tracker.filterExpenses(selectedCategory);

    // Clear the previous list
    expenseList.innerHTML = "";

    // Use map() to create expense items
    const expenseItems = filteredExpenses.map(expense => {

        // Destructuring
        const { id, description, amount, category, date } = expense;

        // Create list item
        const listItem = document.createElement("li");

        // Create expense details
        const expenseDetails = document.createElement("span");

        expenseDetails.textContent =
            `${description} - ${category} - KSh ${amount.toFixed(2)}`;

        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        // Delete expense when clicked
        deleteButton.addEventListener("click", function() {
            tracker.removeExpense(id);
            displayExpenses();
        });

        // Add details and button to list item
        listItem.append(expenseDetails, deleteButton);

        return listItem;
    });

    // Display expense items
    if (expenseItems.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No expenses found.";
        expenseList.append(emptyMessage);
    } else {
        expenseList.append(...expenseItems);
    }

    // Update total expenses
    totalExpenses.textContent =
        `KSh ${tracker.calculateTotal().toFixed(2)}`;
}
