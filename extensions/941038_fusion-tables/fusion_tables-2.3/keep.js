var getTable = localStorage.getItem('tableInput');
console.log(getTable);
document.getElementById('tableDoneKeept').innerHTML = getTable;


var getTable = localStorage.getItem('tableSelected');
document.getElementById('tableSelected').value = getTable;