export function validateFormInputs(inputs) {

        console.log('INPUTS==', inputs)

        /* store fields validity state in object */
        var valid = {};
        /* store fields marked as invalid in array */
        var notValid = [];
        /*  store form state */
        var isFormValid;


        inputs.forEach( input => {
            // check firstname validity
            if ( input.id === 'firstName') {
                const firstName = input.value;
                const nameValid = (firstName.value.length >= 2) && (typeof(value)=== string);
                if ( firstName != nameValid ) {
                    valid.firstName = false;
                    setRequirementsMessage('firstName');
                     /* add element to notValid array  */
                    notValid.push(firstName);
                }else {
                    /* if field valid : set field in valid object to true */
                    valid.firstName = true;
                }
                
            }
            // check lastname validity
            if (input.id === 'lastName') {
                const lastName = input.value;
                const nameValid = (firstName.value.length >= 2) && (typeof(value)=== string);
                if ( lastName != nameValid ) {
                    valid.lastName = false;
                    setRequirementsMessage('lastName');
                    /* add element to notValid array  */
                    notValid.push(firstName);
                } else {
                    /* if field valid : set field in valid object to true */
                    valid.lastName = true;
                }
            }
            // check email validity
            if (input.id === 'email') {
                const emailCorrectFormat = "[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*";
                const emailTest = (email.value).match(emailCorrectFormat);
                if (! emailTest) {
                    /* mark fiels as not valid */
                    valid.email = false;
                    /* call function to set error in field */
                    setRequirementsMessage('email');
                    /* add element to array  */
                    notValid.push(email);
                } else {
                    /* if field valid : set field in valid object to true */
                    valid.email = true;
                }
            }

             /* If 'notvalid' ( array is not empty) */
            if (notValid) {
            /* add input event on every field input marked as invalid */
            /* so when USER EDITS it again, requirement message disappears */
                notValid.forEach(x => {
                x.addEventListener('input', function () { removeRequirementsMessage(x.id), false }) });
            }
            for (var field in valid) {
                if (! valid[field]) {
                    isFormValid = false;
                    break; /* stop loop as error was found */
                }
                /* else no errors in validation process: form is valid */
                isFormValid = true;
            }
            // console.log('ISVALID==', isFormValid);
            return isFormValid;
        })


    /* if field not valid : SHOW its REQUIREMENTS for validation  */
    /* ---------------------------------------------------------- */
    function setRequirementsMessage(id) {
        /* locate concerned dom element (id param) */
        var elementFromId = document.getElementById(id);
        // console.log('SET elementFromId ==', elementFromId);

        /* locate corresponding '.requirement' class element 
        ( = first immediate following id ('#id + .class') or descending class attribute ('#id > .class') */
        var requirement = document.querySelector('#' + id + '+ .requirements') || document.querySelector('#' + id + ' > .requirements');
        // console.log('SET REQUIREMENT=', requirement);

        /* set element's requirements attributes to be visible */
        requirement.style.visibility = 'visible';
        elementFromId.style.border = '2px solid red';

        /* last 2 fields are added padding when requirements = on  */
        /* if (id == 'locations' || id == 'checkboxes') {
            elementFromId.style.padding = "2%";
            elementFromId.style.borderRadius = "5px";
        } */
    }

    /* if field valid after correction or being edited : HIDE its REQUIREMENTS  */
    /* ------------------------------------------------------------------------ */
    function removeRequirementsMessage(id) {
        /* locate concerned dom element (id param) */
        var elementFromId = document.getElementById(id);
        // console.log('RM - elementFromId ==', elementFromId);

        /* locate corresponding '.requirement' class element 
        ( = first immediate following id ('#id + .class') or descending class attribute ('#id > .class') */
        var requirement = document.querySelector('#' + id + '+ .requirements') || document.querySelector('#' + id + ' > .requirements');
        // console.log('REQUIREMENT=', requirement);

        requirement.style.visibility = 'hidden';
        elementFromId.style.border = 'none';
    }


    /* SUBMIT FORM : on click 'submit', all other functions are called */
    /* ----------------------------------------------------------------*/
    sendFormDataBtn.addEventListener('click', function (event) {

        event.preventDefault();
        event.stopPropagation();

        /* validate fields on submit : validateFormInputs() returns a boolean that gets stored in local var */
        var isFormValid = validateFormInputs();

        // If the form did not validate, prevent it being submitted
        if (! isFormValid) { // isFormValid = false
            event.preventDefault(); // Prevent the form being submitted;
            return;
        } else { // isFormValid = true
            createNewUserFromData();
            // create new user array

            /* TODO -- consider refactoring the following with 'replaceChild()' & the like methods */
            /* ------- and moving it out of this function  */
            /* hide form */
            signUpForm.style.display = 'none';
            /* display confirmation message */
            signedUpConfirmationMessage.style.display = 'flex';
            /* 'go' form btn becomes 'close' confirmation message */
            closeConfirmationBtn.value = "close";
            /* add event method to enable it to close modal */
            closeConfirmationBtn.addEventListener('click', function (event) {
                event.stopPropagation();
                /* close modal */
                signUpmodal.setAttribute("style", "animation: fade-out 0.6s;");
                /* confirmation message returns to invisible (so won't show next time modal 's opened) */
                signedUpConfirmationMessage.style.display = 'none';
                /* form returns to visible (so will show next time modal 's opened) */
                signUpForm.style.display = 'block';
                /* reset form fields */
                signUpForm.reset();
                /* default btn text */
                closeConfirmationBtn.value = 'go';
            })
        }
    });
}
