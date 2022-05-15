class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  submitBudgetForm() {
    // console.log('Hello for ES6');
    const value = this.budgetInput.value;
    if (value === "" || value < 0) {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>value can not be empty or negative</p>`;
      const self = this;
      // console.log(this);// ui
      setTimeout(function () {
        // console.log(this); // window
        // console.log(self); // ui
        self.budgetFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
    }
  }
  //show Balance
  showBalance() {
    // console.log(`hey I am getting hold 'this' keyword`);

    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    } else if (total > 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    } else if (total === 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showBlack");
    }
    // parseInt converts string into an integer
  }
  //Submit Expense Form
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    console.log(amountValue);

    if (expenseValue === "" || amountValue === "" || amountValue < 0) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`;
      const self = this;
      setTimeout(function () {
        self.expenseFeedback.classList.remove("showItem");
      }, 4000);
    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.value = '';

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amountValue,
      };

      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }

  // add expense
  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>

    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

    <div class="expense-icons list-item">
     <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </div>
  </div>`;

  this.expenseList.appendChild(div);
  }

  // total Expense
  totalExpense() {
    let total = 0;
    if(this.itemList.length>0)
    {
    //  console.log(this.itemList);
    total=this.itemList.reduce(function(acc,curr){
      // console.log(`total is ${acc} and the current is ${curr.amount}`)
      acc+=curr.amount;
      return acc;
    },0)

    }
    this.expenseAmount.textContent=total;
    return total;
  }
  // edit expense
  // editExpense(element)
  // {
  //   let id=parseInt(element.dataset.id);
  //   let parent=element.parentElement.parentElement.parentElement;
  //   // remove from dom
  //   this.expenseList.removeChild(parent);
  //    // remove from the dom


  //   let expense=this.itemList.filter(function(item){
  //     return item.id===id;
  //   })
  //   //show value
  //   this.expenseInput.value=expense[0].title;
  //   this.amountInput.value=expense[0].amount;
  //   // remove from list
  //   let tempList=this.itemList.filter(function(item){
  //     return item.id!==id;
  //   })
  //   this.itemList=tempList;
  //   this.showBalance();
  // }
  // delete expense

  editExpense(element) {
    let id = parseInt(element.dataset.id);

    let parent = element.parentElement.parentElement.parentElement;
    // remove from dom
    this.expenseList.removeChild(parent);
    //remove from list;
    let expense = this.itemList.filter(function(item) {
      return item.id === id;
    });

    // show value
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    // delete item
    let tempList = this.itemList.filter(function(expense) {
      return expense.id !== id;
    });

    this.itemList = tempList;
    this.showBalance();
  }

  deleteExpense(element)
    {
      let id = parseInt(element.dataset.id);
    console.log(id);
    let parent = element.parentElement.parentElement.parentElement;
    // remove from dom
    this.expenseList.removeChild(parent);

    // delete item
    let tempList = this.itemList.filter(function(expense) {
      return expense.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();


    }
  
}

function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  // new instance of UI class
  const ui = new UI();

  // Budget Form submit
  budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitBudgetForm();
  });

  // Expense Form submit
  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();
    ui.submitExpenseForm();
  });

  // expense click
  expenseList.addEventListener("submit", function (event) {
   if(event.target.parentElement.classList.contains("edit-icon"))
   {
      ui.editExpense(event.target.parentElement)
   }
   else if(event.target.parentElement.classList.contains("delete-icon"))
   {
     ui.deleteExpense(event.target.parentElement)
     
   }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});



// The reduce() method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

// The first time that the callback is run there is no "return value of the previous calculation". If supplied, an initial value may be used in its place. Otherwise the array element at index 0 is used as the initial value and iteration starts from the next element (index 1 instead of index 0).

// Perhaps the easiest-to-understand case for reduce() is to return the sum of all the elements in an array: