let itemTextBox = document.getElementById("itemTextBox")
let groceryStore = document.getElementById("groceryStore")
let submitButton = document.getElementById("submitButton")
let groceryList = document.getElementById("groceryList")
let btnRegister = document.getElementById("btnRegister")

let emailTextBox = document.getElementById("emailTextBox")
let passwordTextBox = document.getElementById("passwordTextBox")

let loginEmailTextBox = document.getElementById("loginEmailTextBox")
let loginpasswordTextBox = document.getElementById("loginpasswordTextBox")

let btnLogin = document.getElementById("btnLogin")

let btnLogOut = document.getElementById("btnLogOut")



btnRegister.addEventListener("click",function(){
    let email = emailTextBox.value
    let password = passwordTextBox.value
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(function(user){
        console.log("User Created")
    })
    .catch(function(error){
    var errorCode=error.code 
    var errorMessage=error.message
})

     
})


btnLogin.addEventListener("click",function(){
    let email = loginEmailTextBox.value
    let password = loginpasswordTextBox.value
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(function(user){
        console.log("Logged In")
    })
    .catch(function(error){
        var errorCode=error.code 
        var errorMessage=error.message
    })
})

btnLogOut.addEventListener("click",function(){
    let email = loginEmailTextBox.value
    let password = loginpasswordTextBox.value
    firebase.auth().signOut(email,password)
    .then(function(user) {
        console.log("Logged Out")
      }).catch(function(error) {
        var errorCode=error.code 
        var errorMessage=error.message
        
      });
})


// creating an instance/object of firebase realtime database
const database = firebase.database()
// create a node under the root node and call it orders
const groceriesRef = database.ref("groceries")

let items = [] // an empty array to hold all the orders

function displayItems(items){

    let liItems = items.map(function(item){
        return `<li>${item.itemType} - ${item.store}</li>`
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
        toBuyList = []

        snapshot.forEach(function(childSnapshot){
            console.log(childSnapshot)
            console.log(childSnapshot.key)// key which in this case is auto id
            console.log(childSnapshot.val())// data for that key

            // add an order to the orders array
            toBuyList.push(childSnapshot.val())
        })

        displayItems(toBuyList)

    })
}

// call the configure configureObservers
configureObservers()

function placeOrder(groceryProduct){

    // create or get an orders node at the root level
  //let ordersRef = database.ref("orders") <-- This line is moved to the top
  // create a node with auto id under orders node
  let groceryRef  = groceriesRef.child(groceryProduct.store)
  groceryRef.push(groceryProduct)
   // get a child with auto ID using the push function
 
}

submitButton.addEventListener("click",function(){

    let store = groceryStore.value
    let itemType = itemTextBox.value

    let toBuy = {store : store, itemType: itemType}
    items.push(toBuy)
    placeOrder(toBuy)
    displayItems(items)
})

