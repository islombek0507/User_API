
//html counts
let elUserCount = document.querySelector(".count__user")
let elPostCount = document.querySelector(".count__post")
let elCommitCount = document.querySelector(".count__commit")
// Html dokument list
let elUserList = document.querySelector(".user__list");
let elPostList = document.querySelector(".post__list");
let elCommentList = document.querySelector(".commint__list");

//user elements

let elUserTitle = document.querySelector(".user__name");
let elUserEmail = document.querySelector(".gmail__user");
let elUserCountry = document.querySelector(".countr__user");
let elUserCompany = document.querySelector(".company__user");
let elUserWebsite = document.querySelector(".website__user");
 
// posts eliments

let elPostTitle = document.querySelector(".post__name");
let elPostText = document.querySelector(".text__post");

// comments eliments

let elCommentName = document.querySelector(".comment__name");
let elCommentGmail = document.querySelector(".gmail__comment");
let elCommentText = document.querySelector(".text__comment");

//temlates

let elUserTemplate = document.querySelector("#user__template").content;
let elPostTemplate = document.querySelector("#post__template").content;
let elCommentTemplate = document.querySelector("#comment__template").content;


let storage = window.localStorage;

let storagePostId = JSON.parse(storage.getItem('arrayNode'))
let storageCommentId = JSON.parse(storage.getItem('arrayCommentNode'))

if (storagePostId) {
    ;( async function () {
        let responce = await fetch(`https://jsonplaceholder.typicode.com/user/${storagePostId}/posts`)
        let data = await responce.json()
        
        renderPosts(data, elPostList)
     
    }

    )();
}

if (storageCommentId) {
    ;( async function () {
        let responce = await fetch(`https://jsonplaceholder.typicode.com/posts/${storageCommentId}/comments`)
        let data = await responce.json()
        renderComments(data, elCommentList)
       
        
    })();
}

function renderUser(array, node) {
    node.innerHtml=null;
   
   let userFragment =document.createDocumentFragment()
    array.forEach(item => {
          
        let userTemplate = elUserTemplate.cloneNode(true)

        userTemplate.querySelector('.user__name').textContent=item.name;
        userTemplate.querySelector('.user__name').dataset.userId=item.id;
        userTemplate.querySelector('.gmail__user').textContent = item.email;
        userTemplate.querySelector('.countr__user').textContent = item.address.city;
        userTemplate.querySelector('.company__user').textContent = item.company.name;
        userTemplate.querySelector('.website__user').href = item.website;
        userTemplate.querySelector('.website__user').textContent = item.website;
        
    userFragment.appendChild(userTemplate);
       elUserCount.textContent = array.length
    });
    node.appendChild(userFragment)
}



function renderPosts(array, node) {
    node.innerHTML= null;
    elCommentList.innerHTML= null;
    // elPostList.innerHTML= null;
    // elPostCount.innerHTML = "0";
    elCommitCount.innerHTML = "0"; 
    // elCommitCount.innerHTML = "0";

    let postFragment = document.createDocumentFragment();

    array.forEach(item => {
        let postTemplate = elPostTemplate.cloneNode(true);

        postTemplate.querySelector(".post__name").textContent = item.title;
        postTemplate.querySelector(".post__name").dataset.postId = item.id;
        postTemplate.querySelector(".text__post").textContent = item.body;

        postFragment.appendChild(postTemplate);
    });
    node.appendChild(postFragment)
    elPostCount.textContent = array.length;
}

function renderComments(array, node) {
    node.innerHTML=null;
    let commentFragment = document.createDocumentFragment();
    array.forEach(item =>{
        let commentTemplate = elCommentTemplate.cloneNode(true);
        commentTemplate.querySelector(".comment__name").textContent=item.name;
        commentTemplate.querySelector(".gmail__comment").textContent = item.email;
        commentTemplate.querySelector(".text__comment").textContent = item.body;

        commentFragment.appendChild(commentTemplate);
    })
    node.appendChild(commentFragment);
    elCommitCount.textContent = array.length
}
;( async function (){
    let responce = await fetch("https://jsonplaceholder.typicode.com/users");
 let data = await responce.json();
 renderUser(data, elUserList);
})();

elUserList.addEventListener("click", function (evt) {
    

    let foundUserId = evt.target.dataset.userId;

    if(foundUserId){
        ;( async function () {
            let responce = await fetch(`https://jsonplaceholder.typicode.com/user/${foundUserId}/posts`)
            let data = await responce.json();
            
            renderPosts(data, elPostList);
            storage.setItem('arrayNode', JSON.stringify(foundUserId))
        }

        )();
    }
})

elPostList.addEventListener("click", function (evt) {

    let foundPostId = evt.target.dataset.postId;

    if(foundPostId){
        ;( async function () {
            let responce = await fetch(`https://jsonplaceholder.typicode.com/posts/${foundPostId}/comments`)
            let data = await responce.json()
            renderComments(data, elCommentList)
            storage.setItem('arrayCommentNode', JSON.stringify(foundPostId))
            
        })();
    }
    
})






