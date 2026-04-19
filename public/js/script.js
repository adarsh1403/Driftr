// bootstrap cutom styling for forms validation 

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            // form.classList.add('was-validated') puts the class on that specific form node.
            // Then Bootstrap CSS uses selectors like .was-validated .form-control:invalid and .was-validated .form-control:valid to style the child input/textarea elements based on their validity state.
            form.classList.add('was-validated')
        }, false)
    })
})()