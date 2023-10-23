
const API_URL="https://api.github.com/users/"
const form=document.getElementById("my-form")
const ara=document.getElementById("bul")
const ana=document.getElementById("my-main")


getUser()
async function getUser(username){
    try {
        const {data}=await axios(API_URL + username)
        // console.log(data);
        createKullaniciKart(data)
        getRepos(username)
    } catch(error){
        // console.log(error);
        createErrorKart("Üzgünüm Bulamadım 😞")
    }
    

}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const user=ara.value

    if (user) {
        getUser(user)

        ara.value=""
        
    }

})

function createKullaniciKart(kullanici) {

    const kullaniciAdi=kullanici.name || kullanici.login

    const kullaniciBio=kullanici.bio ? `<p>${kullanici.bio} </p>`:""
    const kartHtml=`
    <div class="kart">
    <img
      class="my-img"
      src="${kullanici.avatar_url}"
      alt="${kullanici.name}"
    />

    <div class="my-info">
      <div class="my-name">
        <h2>${kullanici.name}</h2>
        <small>@${kullanici.login}</small>
      </div>
    </div>

    <p>
    ${kullaniciBio}
    </p>

    <ul>
      <li>
        <i class="fa-solid fa-user-group"></i> ${kullanici.followers}
        <strong>Followers</strong>
      </li>
      <li>${kullanici.following}
      </br><strong>Following</strong></li>
      <li>
        <i class="fa-solid fa-bookmark"></i> ${kullanici.public_repos} <strong>Repository</strong>
      </li>
    </ul>

    <div class="repos" id="repos">
  
    </div>
  </div>
    
    
    `
    ana.innerHTML=kartHtml
    
}

function createErrorKart(msg) {
    const kartErrorHtml=`
    <div class="kart">
    
    <h2>
    ${msg}
    </h2>
    </div>

    `
    ana.innerHTML=kartErrorHtml
    
    
}
//repositoury leri çektik
async function getRepos(username) {
    try {
        const {data}=await axios(API_URL +username  + "/repos")
        // console.log(data);
        RepokartEkle(data)

    }catch(err){
        // console.log(err);
        createErrorKart("Repoların Çekilemedi Üzgünüm 😞")

    }

    
}

function RepokartEkle(repos) {

  const reposEl=document.getElementById("repos")

  repos.slice(0,3).forEach((repo) => {
    const reposLink=document.createElement("a")
    reposLink.href=repo.html_url
    reposLink.target="_blank"
    reposLink.innerHTML=`<i class="fa-solid fa-book-bookmark"></i> ${repo.name}`

    reposEl.appendChild(reposLink)
  });
  
}
