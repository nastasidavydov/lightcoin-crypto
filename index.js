class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()){
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}


////// WITHDRAWAL Class ////////
class Withdrawal extends Transaction{

  get value() {
    return -this.amount;
  }

  isAllowed(){
    return (this.account.balance - this.amount >= 0);
  }

}

////// DEPOSIT Class ////////
class Deposit extends Transaction{

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

////// ACCOUNT Class ////////

class Account {
  constructor(username){
    this.username = username;

    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for(let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

