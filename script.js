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

