var data = {
  "english":
  {
    "welcome" : "Bem-vindo ao meu portfolio! Para mostrar os comandos disponíveis digite <code>help</code>. Para usar qualquer comando use <em>Enter</em>, Você pode usar a tecla <em>Tab</em> para completar os comandos.",

    "information" : "Esse site foi criado inteiramente usando <code>HTML</code>, <code>CSS</code> e <code>Javascript</code> sem usar nenhuma biblioteca ou framework. Esse site contém uma enorme quantidade de funcionalidades (animações escondidas, temas secretos, etc.) mas também tem um <code>easter egg</code> bem escondido que somente devs podem achar. Apreciem sem moderação!",

    "btnpopup" : "Continuar",

    "help" : `<li><code>about-me</code>: Mostrar informações sobre mim</li>
    <li><code>clear</code>: Limpar o terminal</li>
    <li><code>experiences</code>: Listar as minhas experiências</li>
    <li><code>get cv</code>: Baixar o meu CV</li>
    <li><code>get linkedin</code>: Link para o meu Linkedin</li>
    <li><code>get github</code>: Link para o meu Github</li>
    <li><code>help</code>: Mostrar a lista de comandos</li>
    <li><code>passions</code>: Mostrar a lista dos meus hobbies</li>
    <li><code>my-projects</code>: Ver meus projetos pessoais</li>
    <li><code>themes</code>: Mudar o tema do terminal</li>
    <li><em>Você pode usar a tecla TAB para completar o comando</em></li>
    <li><em>Você pode ver os comandos anteriores com as setas pra cima e pra baixo</em></li>`,

    "aboutme" : `{<br>
      &nbsp;&nbsp;&nbsp;"name" : "Victor MACEDO",<br>
      &nbsp;&nbsp;&nbsp;"formation": "systems analysis and development",<br>
      &nbsp;&nbsp;&nbsp;"technologies" : "angular, chatbots, node.js, n8n, LLM, NLP, artificial intelligence",<br>
      &nbsp;&nbsp;&nbsp;"city" : "Salvador, Bahia"<br>
      &nbsp;&nbsp;&nbsp;"available" : "true"<br>
    }`,

    "experience" : `<tr>
    <th>Date</th>
    <th>Company</th>
    <th>Position</th>
    <th class="description">Description</th>
  </tr>
  <tr>
    <td class="center">June 2016 - June 2018</td>
    <td>Klevery</td>
    <td>Co-founder</td>
    <td>Routing optimization software for professionals with high delivery or travel activity.</td>
  </tr>
  <tr>
    <td class="center">Sept 2017 - Sept 2018</td>
    <td>Credit Agricole Centre-Est</td>
    <td>Expert risk analyst</td>
    <td>Feasibility study of files, frequent contact with project managers in the field, legal study of bilateral/arranger contracts.</td>
  </tr>
  <tr>
    <td class="center">Jan 2019 - Jul 2021</td>
    <td>CIC - Lyonnaise de Banque</td>
    <td>Professional Business Manager</td>
    <td>Accompaniment of the entrepreneur on his personal and professional projects, financing of needs, accompaniment on the optimization of the balance sheet and projects.</td>
  </tr>
  <tr>
    <td class="center">Dec 2019 - Today</td>
    <td>Overstats</td>
    <td>Co-founder</td>
    <td>Overstats is a team management tool for the game Overwatch developed by Blizzard used by over 100 teams around the world. Management of partnerships and development of the application.</td>
  </tr>
  <tr>
    <td class="center">August 2021 - Today</td>
    <td>Startup101</td>
    <td>Editor</td>
    <td>Writer for the Startup101 newsletter which explores the beginnings of today's great startups such as Facebook, Instagram, Google and many more.</td>
  </tr>`,

  "cv" : `The resume upload will begin.`,

  "redirectLinkedin" : `You will be redirected to Linkedin.`,

  "redirectGithub" : `You will be redirected to Github.`,

  "hobby" : `{<br>
    &nbsp;&nbsp;&nbsp;"Sport": "Volleyball, Cycling",<br>
    &nbsp;&nbsp;&nbsp;"Programming": "JS, Rails",<br>
    &nbsp;&nbsp;&nbsp;"Other" : "Entrepreneurship, Photography, Reading autobiography, Design, Marketing"<br>
  }`,

  "project" : `<table class="result">
  <tr>
    <th>index</th>
    <th>Name</th>
    <th>Tech</th>
    <th class="description">Description</th>
    <th>As a team?</th>
    <th>Github</th>
  </tr>
  <tr>
    <td class="center">1</td>
    <td class="center">Catshop</td>
    <td class="center">Rails Ruby Git HTML CSS JS AJAX Heroku</td>
    <td>Cat Photo Selling Marketplace</td>
    <td class="center">Yes</td>
    <td class="center"><a href="https://github.com/guillaume-rygn/CatShop" target="blank">Link</a></td>
  </tr>
  <tr>
    <td class="center">2</td>
    <td class="center">Kata Temple</td>
    <td class="center">HTML CSS JS Heroku</td>
    <td>30-day challenge to improve in technical test with Kata Temple. Attempt to complete temple sensei katas from level 8kyu to 4kyu in 30 days - Ruby Edition</td>
    <td class="center">No</td>
    <td class="center"><a href="https://github.com/guillaume-rygn/Kata-Temple" target="blank">Link</a></td>
  </tr>
  <tr>
    <td class="center">3</td>
    <td class="center">ScoreIT</td>
    <td class="center">Rails Ruby Git HTML CSS JS AJAX Heroku</td>
    <td>The objective of ScoreIT is to offer a tool for creating credibility for start-up projects aimed at raising funds from investors or financial institutions. We offer a fully online platform allowing startup founders to obtain a rating on their project, thus giving it a credibility score in order to reassure future potential investors.</td>
    <td class="center">Yes</td>
    <td class="center"><a href="https://github.com/guillaume-rygn/ScoreIT" target="blank">Link</a></td>
  </tr>
  <tr>
    <td class="center">4</td>
    <td class="center">Monolith Arena</td>
    <td class="center">HTML CSS JS</td>
    <td>48h to create a 2d game on the theme of a battle arena using Javascript classes</td>
    <td class="center">No</td>
    <td class="center"><a href="https://github.com/guillaume-rygn/Monolith-Arena" target="blank">Link</a></td>
  </tr>
  <tr>
    <td class="center">5</td>
    <td class="center">My Dark Theme.JS</td>
    <td class="center">HTML CSS JS</td>
    <td>Dark mode generator with customization of dark mode colors and possibility to copy the code to add it directly to your site. To make it work you have to vary the colors in CSS.</td>
    <td class="center">No</td>
    <td class="center"><a href="https://github.com/guillaume-rygn/MyDarkTheme.JS" target="blank">Link</a></td>
  </tr>
  <tr>
    <td class="center">6</td>
    <td class="center">EmojiFace</td>
    <td class="center">HTML CSS JS</td>
    <td>60 seconds to reproduce as many emoji as possible with your face! Use of webcam and face detection thanks to AI!</td>
    <td class="center">No</td>
    <td class="center"><a href="https://github.com/guillaume-rygn/EmojiFace" target="blank">Link</a></td>
  </tr>
  <tr>
    <td class="center">7</td>
    <td class="center">Portfolio Terminal</td>
    <td class="center">HTML CSS JS</td>
    <td>Presentation of my portfolio as a terminal. Integration of autocomplete, command history, etc. The latter can be used as a real terminal.</td>
    <td class="center">No</td>
    <td class="center"><a href="https://github.com/guillaume-rygn/Portfolio-Terminal" target="blank">Link</a></td>
  </tr>
  <tr>
    <td class="center">8</td>
    <td class="center">YouLearn</td>
    <td class="center">React JS SCSS</td>
    <td>Turns any YouTube video into an e-learning platform with the ability to view chapters in the video, take notes with associated timestamps, etc.
    - Under development to integrate a Rails API backend to record information.</td>
    <td class="center">No</td>
    <td class="center"><a href="mailto:reygner0224@gmail.com?subject=This repository is pravate&body=Guillaume REYGNER> this repository is private tell me why you want to have access to it." target="blank">Link</a></td>
  </tr>
  <tr>
    <td class="center">9</td>
    <td class="center">FindHouse</td>
    <td class="center">React JS CSS Rails API</td>
    <td>Creation of a real estate sales platform with a React JS frontend and a Rails API backend.</td>
    <td class="center">Yes</td>
    <td class="center"><a href="https://github.com/guillaume-rygn/FindHouse" target="blank">Link</a></td>
  </tr>
  </table><br>
  <p class="result"><em>You can see the site attached to the project using the command</em> <code>my-projects[index].website</code><em>, index being the number associated with the project.</em></p>`,

  "glassmorphismOff" : `<p class="notfound result glassmorphismOffresult">You have just deactivated the glassmorphism design to activate it use the <code>glassmophism</code> command.`,

  "glassmorphismOn" : `<p class="notfound result glassmorphismOnresult">You have just activated the glassmorphism design to deactivate it use the <code>glassmophism</code> command.`,

  "notfound" : `<span class="notfoundlanguage"><br><br>Digite o comando <code>help</code> para mostrar a lista de comandos disponíveis.</p></span>`,

  "notfoundmenu" : `<span class="notfoundmenu"><br><br>Digite o comando <code>themes</code> para mostrar a lista de comandos disponíveis.</p><br>
  <p class="result">/!\\ para retornar ao menu principal digite <code>exit</code></p></span>`,

  "website" : `<p class="result websiteresult">You will be redirected to the project website.</p>`,

  "ls1" : `
    <div><code>.</code></div>
    <div><code>..</code></div>
    <div>about</div>
    <div>clear</div>
    <div>experiences</div>
    <div>get CV</div>
    <div>get linkedin</div>
    <div>get github</div>
    <div>help</div>
    <div>passions</div>
    <div>my-projects</div>
    <div>my-projects[1].website</div>
    <div>my-projects[2].website</div>
    <div>my-projects[3].website</div>
    <div>my-projects[4].website</div>
    <div>my-projects[5].website</div>
    <div>my-projects[6].website</div>
    <div>my-projects[7].website</div>
    <div><code>themes</code></div>
  `,

  "ls2" : `
    <div>about</div>
    <div>clear</div>
    <div>experiences</div>
    <div>get CV</div>
    <div>get linkedin</div>
    <div>get github</div>
    <div>help</div>
    <div>passions</div>
    <div>my-projects</div>
    <div>my-projects[1].website</div>
    <div>my-projects[2].website</div>
    <div>my-projects[3].website</div>
    <div>my-projects[4].website</div>
    <div>my-projects[5].website</div>
    <div>my-projects[6].website</div>
    <div>my-projects[7].website</div>
    <div><code>themes</code></div>
  `,

  "listsecretresult" : `
      <li><code>move</code>: Activate background animation</li>
      <li><code>remove</code>: Disables background animation</li>
      <li><code>glassmorphism</code>: Enable/disable the glassmorphism animation on the theme</li>
      <li><code>secrets</code>: Enable secret themes</li>
      <li>/!\\ These commands are not part of the easter egg to find. Good luck, you're almost there!</li>`,

  "congratulation" : `Parabéns! Você encontrou a pasta <code>.secret</code>.`,

  "bodymail" : `mailto:vmadevops@gmail.com?subject=Your portfolio is amazing, are you open to opportunities?&body=Guillaume REYGNER > Hello to you who found my easter egg, I am open to opportunities professionals so do not hesitate to contact me by sending me this email with your proposal. I will contact you to arrange a phone interview. Thank you for your time !`

  },

}

let welcome = document.getElementById("welcome");
let popupcontent = document.getElementsByClassName("popupinfo")[0];
let french = document.getElementById("french");
let english = document.getElementById("english");
let language;

window.addEventListener("load", setLanguage());

function setLanguage(){
  if(localStorage.getItem("language") === null){
    localStorage.setItem('language', "english");
  } 
  language = localStorage.getItem("language");
  welcome.innerHTML = data[language].welcome;
  popupcontent.innerHTML = data[language].information;
  btnPopup.innerHTML = data[language].btnpopup;
  document.querySelectorAll(".helpresult").forEach(element => {
    element.innerHTML = data[language].help
  });
  document.querySelectorAll(".aboutmeresult").forEach(element => {
    element.innerHTML = data[language].aboutme
  });
  document.querySelectorAll(".experienceresult").forEach(element =>{
    element.innerHTML = data[language].experience
  });
  document.querySelectorAll(".cvresult").forEach(element =>{
    element.innerHTML = data[language].cv
  });
  document.querySelectorAll(".redirectresultLinkedin").forEach(element =>{
    element.innerHTML = data[language].redirectLinkedin
  });
  document.querySelectorAll(".redirectresultGithub").forEach(element =>{
    element.innerHTML = data[language].redirectGithub
  });
  document.querySelectorAll(".hobbyresult").forEach(element =>{
    element.innerHTML = data[language].hobby
  });
  document.querySelectorAll(".resultproject").forEach(element =>{
    element.innerHTML = data[language].project
  });
  document.querySelectorAll(".glassmorphismOffresult").forEach(element =>{
    element.innerHTML = data[language].glassmorphismOff
  });
  document.querySelectorAll(".glassmorphismOnresult").forEach(element =>{
    element.innerHTML = data[language].glassmorphismOn
  });
  document.querySelectorAll(".notfoundlanguage").forEach(element =>{
    element.innerHTML = data[language].notfound
  });
  document.querySelectorAll(".notfoundmenu").forEach(element =>{
    element.innerHTML = data[language].notfoundmenu
  });
  document.querySelectorAll(".websiteresult").forEach(element =>{
    element.innerHTML = data[language].website
  });
  document.querySelectorAll(".lsresult1").forEach(element =>{
    element.innerHTML = data[language].ls1
  });
  document.querySelectorAll(".lsresult2").forEach(element =>{
    element.innerHTML = data[language].ls2
  });
  document.querySelectorAll(".listsecretresult").forEach(element =>{
    element.innerHTML = data[language].listsecretresult
  });
  document.querySelectorAll(".congratulation").forEach(element =>{
    element.innerHTML = data[language].congratulation
  });

  
}


french.addEventListener("click", function(){
  language = "french";
  localStorage.setItem('language', language);
  setLanguage();
});

english.addEventListener("click", function(){
  language = "english";
  localStorage.setItem('language', language);
  setLanguage();
});
