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
        firebase.database().ref('/accounts/' + uid).once('value').then(snapshot => {
            var value = snapshot.val()
            console.log('value: ', value)
            // $('.user-name').text(`${value.fullName}`)
            // $('.user-photo').attr('src', `${value.userPhoto}`)
            // $('.user-occupation').text(`${value.occupation}`)
            if (value.fullName != "") {
                $('.user-name').text(`${value.fullName}`)
            } else {
                $('.user-name').text(``)
            }
            if (value.userPhoto != "") {
                $('.user-photo').attr('src', `${value.userPhoto}`)
            } else {
                $('.user-photo').attr('src', '/images/profile_placeholder.png')
            }
            if (value.occupation != "") {
                $('.user-occupation').text(`${value.occupation}`)
            } else {
                $('.user-occupation').text(``)
            }

        })
        firebase.database().ref('/users/' + uid).once('value').then(snapshot => {
            var value = snapshot.val()

            console.log('value: ', value)
            for (val in value) {
                console.log('val: ', val)
                var newTr = $('<tr>')
                $('#cards').append(`<tr>
                    <td style="padding: 0; margin: 0;">
                        <div class="d-flex align-items-center">
                            <div class="card border-0">
                                <div class="body border-0" style="padding: 0; margin: 0;">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-6">
                                            <img src="${value[val].userPhoto}" data-toggle="tooltip"
                                                data-placement="top" title="${value[val].fullName}" alt="Avatar"
                                                class="rounded" style="width: 100%; height: 300px;">
                                        </div>
                                        <div class="col-lg-6 col-md-12">
                                            <div class="d-flex align-items-center"
                                                style="height: 100px;">
                                                <h1 class="mt-3 mb-3">${value[val].fullName}</h1>
                                            </div>
                                            <div class="d-flex align-items-center"
                                                style="height: 60px;">
                                                <label class="d-block">${value[val].occupation}</label>
                                            </div>
                                            <div class="d-flex align-items-center"
                                                style="height: 60px;">
                                                <label class="d-block">${value[val].phoneNumber}</label>
                                            </div>
                                            <!-- <div class="form-group">
                                                <label class="d-block">${value[val].occupation}</label>
                                            </div>
                                            <div class="form-group">
                                                <label class="d-block">${value[val].phoneNumber}</label>
                                            </div> -->
                                        </div>
                                        <div class="col-lg-2 col-md-12 text-right">
                                            <img src="${value[val].companyLogo}" data-toggle="tooltip"
                                                data-placement="top" title="Company Logo" alt="Logo"
                                                class="w40 h40 rounded mt-3 mr-3 mb-3">
                                        </div>
                                    </div>
                                </div>
                                <div class="body border-bottom-0 border-right-0 border-left-0">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 pt-2 text-right">
                                            <button type="button"
                                                class="btn btn-sm btn-outline-success"
                                                title="Download vCard" data-toggle="tooltip"
                                                data-placement="top"><i
                                                    class="icon-cloud-download"></i></button>
                                            <button type="button"
                                                class="btn btn-sm btn-outline-success"
                                                title="Share card"
                                                data-placement="top" data-toggle="modal" data-target="#exampleModalCenter"><i
                                                    class="icon-share"></i></button>
                                            <button type="button"
                                                class="btn btn-sm btn-outline-success"
                                                title="Edit card" data-toggle="tooltip"
                                                data-placement="top"><i
                                                    class="icon-pencil"></i></button>
                                            <button type="button"
                                                class="btn btn-sm btn-outline-danger js-sweetalert" id="${val}"
                                                title="Delete card" data-toggle="tooltip" data-type="confirm"
                                                data-placement="top"><i
                                                    class="icon-trash"></i></button>
                                        </div>
                                        <!-- Vertically centered -->
                                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalCenterTitle">Share ${value[val].fullName}’s card</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control" placeholder="Share url">
                                                        </div>
                                                        <p>Copy this link to share ${value[val].fullName}’s card with anyone.</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-round btn-default" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <script>
                $(function () {
                    $('.js-sweetalert').on('click', function () {
                        var type = $(this).data('type');
                        var id = $(this).attr('id')
                        if (type === 'confirm') {
                            showConfirmMessage(id);
                        }
                    });
                });
                function showConfirmMessage(id) {
                    console.log('id: ', id)
                    swal({
                        title: "Are you sure?",
                        text: "You will not be able to recover this card!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#dc3545",
                        confirmButtonText: "Yes, delete it!",
                        closeOnConfirm: false
                    }, function () {
                        firebase.database().ref('/users/' + '${uid}' + '/' + id).remove().then(() => {
                            swal("Deleted!", "Your card has been deleted.", "success");
                            location.reload()
                        })
                        
                    });
                }
                </script>`)
            }
        })
        // window.location.href = "items.html"

        // We save the Firebase Messaging Device token and enable notifications.
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        // window.location.href = "index.html"
    }
}

var signOutButtonElements = document.getElementsByClassName('sign-out');
for (var i = 0; i < signOutButtonElements.length; i++) {
    signOutButtonElements[i].addEventListener('click', signOut)
}
// initialize Firebase
initFirebaseAuth();