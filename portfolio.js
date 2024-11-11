const menu = document.getElementById("menu");
const ul = document.querySelector(".display-menu");
const blogs = JSON.parse(localStorage.getItem("blogContent"))
menu.addEventListener("click", (e) => {
    if (menu.innerHTML === '<i class="fa-solid fa-bars"></i>') {
        e.preventDefault();
        ul.classList.toggle("show-menu");

        menu.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }
    if (menu.innerHTML === '<i class="fa-solid fa-xmark"></i>') {
        menu.addEventListener("click", (e) => {
            ul.classList.remove("display-menu")
            menu.innerHTML = '<i class="fa-solid fa-bars"></i>';

        });
    }
});



//working with blogs and display it in the portfolio

// const blogs = JSON.parse(localStorage.getItem("blogContent"))
// const blogContainer = document.querySelector(".container-blog")
// let element = "";
// blogs.forEach((rec) => {
//     element += `
//     <div>
//         <h1>${rec.title}</h1>
//         <p>${rec.description}</p>
//         <div id="read-more">
//             <a href="" style="margin-left: 30px;">Read more</a>
//             <a href=""><i class="fa-solid fa-circle-right"></i></a>
//         </div>
//     </div>
    
//     `
// })
// blogContainer.innerHTML = element;



    
if(blogs[0] && blogs[1]){
    let upDatedBlog = [];
    let firstBlog = blogs[0];
    let secondBlog = blogs[1];
    upDatedBlog.push(firstBlog,secondBlog)
    console.log(upDatedBlog)

    const blogContainer = document.querySelector(".container-blog.blog1");
    let element = "";
    upDatedBlog.forEach((rec) => {
            element += `
            <div>
                <h1>${rec.title}</h1>
                <p>${rec.description}</p>
                <div id="read-more">
                    <a href="" style="margin-left: 30px;">Read more</a>
                    <a href=""><i class="fa-solid fa-circle-right"></i></a>
                </div>
            </div>
            
            `
    })
    blogContainer.innerHTML = element;
} 
if (blogs[2] && blogs[3]){
    let upDatedBlog1 = [];
    let thirdBlog = blogs[2];
    let forthBlog = blogs[3];
    upDatedBlog1.push(thirdBlog, forthBlog);
    console.log("hello",upDatedBlog1)
    const blogContainer = document.querySelector(".container-blog.blog2");
    let element = "";
    upDatedBlog1.forEach((rec) => {
            element += `
            <div>
                <h1>${rec.title}</h1>
                <p>${rec.description}</p>
                <div id="read-more">
                    <a href="" style="margin-left: 30px;">Read more</a>
                    <a href=""><i class="fa-solid fa-circle-right"></i></a>
                </div>
            </div>
            
            `
    })
    blogContainer.innerHTML = element;

}

if(blogs.length > 4){
    const blogContainer = document.querySelector(".container-blog.blog2");
    let element = "";
    upDatedBlog1.forEach((rec) => {
            element += `
            <div>
                <h1>${rec.title}</h1>
                <p>${rec.description}</p>
                <div id="read-more">
                    <a href="" style="margin-left: 30px;">Read more</a>
                    <a href=""><i class="fa-solid fa-circle-right"></i></a>
                </div>
            </div>
            
            `
    })
    blogContainer.innerHTML = element;
}
    
//end of working with blogs


const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const messages = document.getElementById('message')
const errorMessage = document.getElementById('errorProvidedMessage')
//adding some padding from the form input
fullName.style.paddingLeft = '20px';
email.style.paddingLeft = '20px';
messages.style.padding = '30px';
//end of padding
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()
    errors = []
    if(fullName.value.trim() === ""){
        fullName.style.border = '1px solid red';
        errors.push("please provide Your full name");
    } else {
        fullName.style.border = 'black';
    }
    if (!(email.value.includes("@"))){
        email.style.border = '1px solid red';
        errors.push("invalid email")
    } else {
        fullName.style.border = 'black';
    }
    if (email.value.trim() === ""){
        email.style.border = '1px solid red';
        errors.push("provide an email")
    }
    
    
    if (errors.length > 0){
        errorMessage.textContent = errors.join(", ")
        errorMessage.style.color='red';
        errorMessage.style.fontSize = '15px';
        errorMessage.style.marginBottom = '10px';
    } else {
        // window.location.href = "loading.html"
        storingMessage();
        fullName.value = '';
        email.value = '';
        messages.value = '';
        Notification.requestPermission()
            .then((permis) => {
                if (permis === 'granted') {
                    const notification = new Notification('New Message', {
                        body: " New Inquiry from contact me",
                        icon: "images/Myimage.jpg"
                    })
                }
            })
        
    }
})
function storingMessage(){
    const messageObj = JSON.parse(localStorage.getItem('contactMessage')) || [];
    const inputName = document.getElementById('full-name').value;
    const inputEmail = document.getElementById('email').value;
    const inputMessage = document.getElementById('message').value;
    const newMessage = {
        id:messageObj.length+1,
        name:inputName,
        email:inputEmail,
        message:inputMessage
    }
    messageObj.push(newMessage);
    localStorage.setItem('contactMessage', JSON.stringify(messageObj))
    console.log(JSON.parse(localStorage.getItem('contactMessage')))
}


function displayProjectsInPage(){
    const projectstored = JSON.parse(localStorage.getItem('projects') || []);
    const projectContainer = document.querySelector(".projects-section-container"); 
    let elem = "";
    projectstored.forEach((pro) => {
        elem += `
        <div class="project-div3 single-project">
            <h1>${pro.title}</h1>
            <p>${pro.description}</p>
            <button>DEMO</button>
        </div>
        `
    })
    projectContainer.innerHTML = elem;

}
displayProjectsInPage()