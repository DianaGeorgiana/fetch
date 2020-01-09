let usersRead  = 0;
const getUsers  = async (url) =>{
  try{
      let users = [];
      const response = await fetch(url);
      if(response.status !== 200)
          throw new Error(response.status);
      const json = await response.json();
      json.forEach(elem=> {users.push(elem)});
      return users;
  }  catch (e) {
      console.log(e)
  }
};
let container = document.getElementById("toAdd");
const myFunction = async () => {
    console.log(usersRead);
    let url = "https://api.github.com/users?since=" + usersRead.toString();
    console.log(url);

    const users = await getUsers(url) ;

    for(let user of users){
        let li = document.createElement("div");
        li.className = "user";
        let toAdd = user.login;
        let a = document.createElement("a");
        a.href = user.html_url;
        a.text = "Profile :)";
        a.className = "link";
        a.target = "_blank";
        let img = new Image();
        img.src = user.avatar_url;
        img.width = 200;
        img.height = 200;
        img.style.margin = "10px";
        li.append(img);
        li.append(toAdd);
        li.append(a);
        container.append(li);
    }

};

myFunction().then();

document.getElementById("next").addEventListener("click", ()=>{
   usersRead += 30;
   container.innerText = "";
    myFunction().then();
});


document.getElementById("prev").addEventListener("click", ()=>{
    usersRead -= 30;
    container.innerText = "";
    myFunction().then();
});
