function order(cook) {
  console.log('Welcome');
  cook();
  console.log('Bye');
}

function burger() {
  console.log('Burger');
}

function pizza() {
  console.log('Pizza');
}

order(burger);
order(pizza);
