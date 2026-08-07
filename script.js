// 1. Fixed: Added quotes around 'sbmt'
const form = document.getElementById('sbmt'); 


form.addEventListener('submit', (event) => {
   
    const pass_val = document.getElementById('pass').value;
    const branch_val = document.getElementById('branch').value;
    const num_val = document.getElementById('num').value;

    
    if (pass_val.length < 8) {
        event.preventDefault();
        alert("password is too short");
        return; 
    }

   
    if (num_val === "") {
        event.preventDefault();
        alert("Please enter a mobile number");
        return;
    }

    
    alert("Form submitted successfully!");
});
