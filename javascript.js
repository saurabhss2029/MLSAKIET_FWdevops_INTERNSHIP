function getAndUpdate(){
    t = document.getElementById('task').value;
    if (localStorage.getItem('stringitems')==null){
        itemsarray = [];
        itemsarray.push([t]);
        localStorage.setItem('stringitems', JSON.stringify(itemsarray))
    }
    else{
        stritemsarray = localStorage.getItem('stringitems')
        itemsarray = JSON.parse(stritemsarray);
        itemsarray.push([t]);
        localStorage.setItem('stringitems', JSON.stringify(itemsarray))
        }
        update()
        pendingtasks++;
        updatetaskcount();
}

const tasks = document.getElementById("tablebody");
const completedcount = document.getElementById("completed-count");
const pendingcount = document.getElementById("pending-count");

let completedtasks = 0;
let pendingtasks = 0;

function updatetaskcount(){
    completedcount.textContent = completedtasks;
    pendingcount.textContent = pendingtasks;
}

function update(){
    if (localStorage.getItem('stringitems')==null){
        itemsarray = []; 
        localStorage.setItem('stringitems', JSON.stringify(itemsarray))
    } 
    else{
                    stritemsarray = localStorage.getItem('stringitems')
                    itemsarray = JSON.parse(stritemsarray); 
    }
    // Populate the table
    let tablebody = document.getElementById("tablebody");
    let str = "";
    itemsarray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="r">${index + 1}</th>
        <td>${element[0]}</td>
        <td class="tbtns"><button onclick="donetask(${index})">Done</button><button onclick="deletetask(${index})">Delete</button></td> 
        </tr>`; 
    });
    tablebody.innerHTML = str;
    document.getElementById("task").value = "";
}

addtask = document.getElementById("addtask");
addtask.addEventListener("click", getAndUpdate);
update();

function donetask(taskindex){
    // console.log("Delete", itemIndex);
    stritemsarray = localStorage.getItem('stringitems')
    itemsarray = JSON.parse(stritemsarray);
    // Delete itemIndex element from the array
    itemsarray.splice(taskindex, 1);
    localStorage.setItem('stringitems', JSON.stringify(itemsarray));
    update();
    completedtasks++;
    pendingtasks--;
    updatetaskcount();
}
            
function deletetask(taskindex){
    // console.log("Delete", itemIndex);
    stritemsarray = localStorage.getItem('stringitems')
    itemsarray = JSON.parse(stritemsarray);
    // Delete itemIndex element from the array
    itemsarray.splice(taskindex, 1);
    localStorage.setItem('stringitems', JSON.stringify(itemsarray));
    update();
    pendingtasks--;
    updatetaskcount();
}

function clearStorage(){
    if (confirm("Do you areally want to clear?"))
    {
    localStorage.clear();
    update()
    }
    document.getElementById("task").value = "";
    completedtasks = 0;
    pendingtasks = 0;
    updatetaskcount();
}