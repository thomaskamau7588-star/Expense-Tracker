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
        this.expenses = this.addExpenses();
    }

    // Add a new expense
    addExpense(expense) {
        this.expenses = [...this.expenses, expense];
        this.expenses();
    }

    // Add multiple expenses using the rest operator
    addExpenses(...expenses) {
        this.expenses = [...this.expenses, ...expenses];
        this.expenses();
    }

    // Remove an expense
    removeExpense(id) {
        this.expenses = this.expenses.filter(
            expense => expense.id !== id
        );

        this.expenses();
    }
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
