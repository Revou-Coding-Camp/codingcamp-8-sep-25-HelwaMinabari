// Navbar toggle
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded"); // Debug log

  // Mobile menu toggle
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const iconOpen = document.getElementById("icon-open");
  const iconClose = document.getElementById("icon-close");

  if (btn && menu && iconOpen && iconClose) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("show");
      iconOpen.classList.toggle("hidden");
      iconClose.classList.toggle("hidden");
    });
  } else {
    console.error("Mobile menu elements not found");
  }

  // Greeting dengan nama user
  setTimeout(() => {
    try {
      const name = prompt("Please enter your name:");
      const greeting = document.getElementById("greeting");
      if (greeting) {
        greeting.textContent = name ? `Hi ${name}, Welcome to Our Company` : "Hi there, Welcome to Our Company";
      }
    } catch (error) {
      console.error("Error in greeting:", error);
    }
  }, 1000);

  // Form handling
  const form = document.getElementById("messageForm");
  const formResult = document.getElementById("formResult");

  if (!form) {
    console.error("Form with ID 'messageForm' not found");
    return;
  }

  if (!formResult) {
    console.error("Form result element not found");
    return;
  }

  // Fungsi untuk memformat tanggal
  const formatDate = function(dateString) {
    if (!dateString) return "Not specified";
    
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return original string if formatting fails
    }
  };

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    console.log("Form submitted"); // Debug log
    
    // Reset error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => {
      el.style.display = 'none';
    });
    
    const inputErrors = document.querySelectorAll('.input-error');
    inputErrors.forEach(el => {
      el.classList.remove('input-error');
    });

    // Ambil data dengan pengecekan ketat
    const nameInput = document.getElementById("name");
    const birthdateInput = document.getElementById("birthdate");
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const messageInput = document.getElementById("message");
    
    // Pastikan elemen ada sebelum mengambil value
    const name = nameInput ? (nameInput.value || "").trim() : "";
    const birthdate = birthdateInput ? birthdateInput.value : "";
    let genderValue = "";
    let genderSelected = null;
    
    // Cari gender yang dipilih
    if (genderInputs && genderInputs.length > 0) {
      for (let i = 0; i < genderInputs.length; i++) {
        if (genderInputs[i].checked) {
          genderSelected = genderInputs[i];
          genderValue = genderInputs[i].value || "";
          break;
        }
      }
    }
    
    const message = messageInput ? (messageInput.value || "").trim() : "";
    
    console.log("Form values:", {name, birthdate, genderValue, message}); // Debug log
    console.log("Message value:", message);
    console.log("Message length:", message.length);
    console.log("Message input element:", messageInput);
    
    let isValid = true;

    // Validasi name
    if (!name) {
      if (nameInput) nameInput.classList.add('input-error');
      const nameError = document.getElementById("nameError");
      if (nameError) {
        nameError.style.display = 'block';
        nameError.textContent = "Please enter your name";
      }
      isValid = false;
    }

    // Validasi tanggal lahir
    if (!birthdate) {
      if (birthdateInput) birthdateInput.classList.add('input-error');
      const birthdateError = document.getElementById("birthdateError");
      if (birthdateError) {
        birthdateError.style.display = 'block';
        birthdateError.textContent = "Please enter your birthdate";
      }
      isValid = false;
    }

    // Validasi jenis kelamin
    if (!genderSelected) {
      const genderError = document.getElementById("genderError");
      if (genderError) {
        genderError.style.display = 'block';
        genderError.textContent = "Please select your gender";
      }
      isValid = false;
    }

    // Validasi pesan - DIPERBAIKI
    // Message boleh kosong atau berisi apapun, tidak ada validasi ketat
    if (messageInput && message.length > 0 && message.length < 2) {
      // Hanya beri peringatan jika diisi tapi kurang dari 2 karakter
      if (messageInput) messageInput.classList.add('input-error');
      const messageError = document.getElementById("messageError");
      if (messageError) {
        messageError.style.display = 'block';
        messageError.textContent = "Message should be at least 2 characters long";
      }
      isValid = false;
    }
    // Jika message kosong, tidak dianggap error

    if (!isValid) {
      console.log("Form validation failed");
      return;
    }

    // Tampilkan hasil - pastikan elemen hasil ada
    const resultName = document.getElementById("resultName");
    const resultBirthdate = document.getElementById("resultBirthdate");
    const resultGender = document.getElementById("resultGender");
    const resultMessage = document.getElementById("resultMessage");
    const resultTime = document.getElementById("resultTime");
    
    if (resultName) resultName.textContent = name || "Not provided";
    if (resultBirthdate) resultBirthdate.textContent = formatDate(birthdate);
    if (resultGender) resultGender.textContent = genderValue || "Not selected";
    if (resultMessage) resultMessage.textContent = message || "No message provided";
    
    // Tambahkan waktu saat ini
    if (resultTime) {
      try {
        const currentDate = new Date().toLocaleString();
        resultTime.textContent = currentDate;
      } catch (error) {
        console.error("Error getting current time:", error);
        resultTime.textContent = "Time not available";
      }
    }

    formResult.classList.remove("hidden");
    
    // Scroll ke hasil
    setTimeout(() => {
      formResult.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Reset form
    form.reset();
    
    console.log("Form submitted successfully"); // Debug log
  });
  
  // Animasi elemen saat scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.hover-lift');
    elements.forEach(element => {
      const position = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (position < screenPosition) {
        element.classList.add('animate-fade-in');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  // Trigger once on load
  animateOnScroll();
});