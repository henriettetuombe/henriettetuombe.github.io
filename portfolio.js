const menu = document.getElementById("menu");
const ul = document.querySelector(".display-menu");

// Toggle the menu open/close on click
menu.addEventListener("click", (e) => {
    e.preventDefault();
    ul.classList.toggle("show-menu");
    menu.innerHTML = ul.classList.contains("show-menu") 
        ? '<i class="fa-solid fa-xmark"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
});

// Display blogs dynamically based on localStorage data
const blogs = JSON.parse(localStorage.getItem("blogContent")) || [];
const blogContainers = document.querySelectorAll(".container-blog");

if (blogs.length > 0) {
    blogContainers.forEach((container, index) => {
        let element = "";
        const start = index * 2;
        const end = start + 2;
        blogs.slice(start, end).forEach((rec) => {
            element += `
                <div>
                    <h1>${rec.title}</h1>
                    <p>${rec.description}</p>
                    <div id="read-more">
                        <a href="#" style="margin-left: 30px;">Read more</a>
                        <a href="#"><i class="fa-solid fa-circle-right"></i></a>
                    </div>
                </div>
            `;
        });
        container.innerHTML = element;
    });
}

// Form validation and submission
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const messages = document.getElementById('message');
const errorMessage = document.getElementById('errorProvidedMessage');

// Adding padding to form inputs
fullName.style.paddingLeft = '20px';
email.style.paddingLeft = '20px';
messages.style.padding = '30px';

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const errors = [];

    // Validate full name
    if (fullName.value.trim() === "") {
        fullName.style.border = '1px solid red';
        errors.push("Please provide your full name");
    } else {
        fullName.style.border = 'black';
    }

    // Validate email
    if (!email.value.includes("@")) {
        email.style.border = '1px solid red';
        errors.push("Invalid email");
    } else {
        email.style.border = 'black';
    }

    if (email.value.trim() === "") {
        email.style.border = '1px solid red';
        errors.push("Please provide an email");
    }

    if (errors.length > 0) {
        errorMessage.textContent = errors.join(", ");
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '15px';
        errorMessage.style.marginBottom = '10px';
    } else {
        storeMessage();
        fullName.value = '';
        email.value = '';
        messages.value = '';
        errorMessage.textContent = "";
        notifyUser("New Inquiry from Contact Form");
    }
});

// Store messages in localStorage
function storeMessage() {
    const messageObj = JSON.parse(localStorage.getItem('contactMessage')) || [];
    const newMessage = {
        id: messageObj.length + 1,
        name: fullName.value,
        email: email.value,
        message: messages.value
    };
    messageObj.push(newMessage);
    localStorage.setItem('contactMessage', JSON.stringify(messageObj));
    console.log("Stored messages:", messageObj);
}

// Send a notification to the user
function notifyUser(message) {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            new Notification('New Message', {
                body: message,
                icon: "images/Myimage.jpg"
            });
        }
    });
}

// Display projects from localStorage
function displayProjectsInPage() {
    const projectStored = JSON.parse(localStorage.getItem('projects')) || [];
    const projectContainer = document.querySelector(".projects-section-container");
    let elem = "";
    projectStored.forEach((project) => {
        elem += `
            <div class="project-div3 single-project">
                <h1>${project.title}</h1>
                <p>${project.description}</p>
                <button>DEMO</button>
            </div>
        `;
    });
    projectContainer.innerHTML = elem;
}
displayProjectsInPage();
