let itemTextBox = document.getElementById("itemTextBox")
let groceryStore = document.getElementById("groceryStore")
let submitButton = document.getElementById("submitButton")
let groceryList = document.getElementById("groceryList")

// creating an instance/object of firebase realtime database
const database = firebase.database()
// create a node under the root node and call it orders
const groceriesRef = database.ref("groceries")

let items = [] // an empty array to hold all the orders

function displayItems(items){
    let liItems = items.map(function(item){
        return `<li>${item.name} - ${item.store}</li>`
    })

    groceryList.innerHTML = liItems.join("")

}

// setup the obeserving of the nodes
function configureObservers(){

      // child_added, child_removed, child_updated
    groceriesRef.on("value",function(snapshot){
        console.log("Something has been changed...")
    
        // remove all orders so we can populate it again
        // and do not have duplicates
        orders = []

        snapshot.forEach(function(childSnapshot){
            console.log(childSnapshot)
            console.log(childSnapshot.key)// key which in this case is auto id
            console.log(childSnapshot.val())// data for that key

            // add an order to the orders array
            orders.push(childSnapshot.val())
        })

        displayItems(items)

    })
}

// call the configure configureObservers
configureObservers()

function placeOrder(order){

    // create or get an orders node at the root level
  //let ordersRef = database.ref("orders") <-- This line is moved to the top
  // create a node with auto id under orders node
  let groceryRef  = groceriesRef.push()
  groceryRef.set(order)
   // get a child with auto ID using the push function
 
}

submitButton.addEventListener("click",function(){

    let store = groceryStore.value
    let itemType = itemTextBox.value

    let toBuy = {store : store, itemType: itemType}

    placeOrder(toBuy)


})

