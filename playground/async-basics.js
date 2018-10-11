console.log('Starting app');
setTimeout(() => {
  console.log('inside callback');
}, 2000);
setTimeout(()=> {
  console.log('o ms');
}, 0);
console.log('Finishing app');