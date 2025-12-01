function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Toggle FAQ items
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const allItems = document.querySelectorAll('.faq-item');
    
    allItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    faqItem.classList.toggle('active');
}

// Validación en tiempo real para el nombre
document.getElementById('nombre').addEventListener('input', function(e) {
    const regex = /^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s]*$/;
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s]/g, '');
    }
});

// Validación en tiempo real para el teléfono
document.getElementById('telefono').addEventListener('input', function(e) {
    const regex = /^[0-9+\-() ]*$/;
    if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^0-9+\-() ]/g, '');
    }
});

// Función de validación del formulario
function validateForm() {
    let isValid = true;
    
    // Validar nombre
    const nombre = document.getElementById('nombre');
    const nombreRegex = /^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s]+$/;
    if (!nombre.value.trim() || !nombreRegex.test(nombre.value)) {
        nombre.parentElement.classList.add('error');
        isValid = false;
    } else {
        nombre.parentElement.classList.remove('error');
    }
    
    // Validar teléfono
    const telefono = document.getElementById('telefono');
    const telefonoRegex = /^[0-9+\-() ]{9,}$/;
    if (!telefonoRegex.test(telefono.value.trim())) {
        telefono.parentElement.classList.add('error');
        isValid = false;
    } else {
        telefono.parentElement.classList.remove('error');
    }
    
    // Validar email (si está rellenado)
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() && !emailRegex.test(email.value)) {
        email.parentElement.classList.add('error');
        isValid = false;
    } else {
        email.parentElement.classList.remove('error');
    }
    
    // Validar mensaje
    const mensaje = document.getElementById('mensaje');
    if (mensaje.value.trim().length < 10) {
        mensaje.parentElement.classList.add('error');
        isValid = false;
    } else {
        mensaje.parentElement.classList.remove('error');
    }
    
    return isValid;
}

// Manejar el envío del formulario
function handleSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        alert('Por favor, corrige los errores en el formulario');
        return;
    }
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Crear mensaje de WhatsApp
    const mensaje = `Hola, me llamo ${data.nombre}. 

Servicio: ${data.servicio}
Teléfono: ${data.telefono}
${data.email ? 'Email: ' + data.email : ''}

Descripción:
${data.mensaje}`;
    
    const whatsappURL = `https://wa.me/34692198142?text=${encodeURIComponent(mensaje)}`;
    
    // Mostrar confirmación
    alert('¡Gracias! Te redirigiremos a WhatsApp para completar tu solicitud.');
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Limpiar formulario
    event.target.reset();
}

// Smooth scroll para todos los enlaces ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});
