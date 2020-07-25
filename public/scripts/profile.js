// Signs-out of Friendly Chat.
function signOut() {
    // TODO 2: Sign out of Firebase.
    firebase.auth().signOut();
}

// Initiate firebase auth.
function initFirebaseAuth() {
    // TODO 3: Initialize Firebase.
    firebase.auth().onAuthStateChanged(authStateObserver);
}


function authStateObserver(user) {
    if (user) { // User is signed in!
        // Get the signed-in user's profile pic and name.
        console.log('user: ', user);
        var uid = user.uid
        // window.location.href = "items.html"

        // We save the Firebase Messaging Device token and enable notifications.
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        window.location.href = "index.html"
    }
}

var signOutButtonElements = document.getElementsByClassName('sign-out');
for (var i = 0; i < signOutButtonElements.length; i++) {
    signOutButtonElements[i].addEventListener('click', signOut)
}
// initialize Firebase
initFirebaseAuth();