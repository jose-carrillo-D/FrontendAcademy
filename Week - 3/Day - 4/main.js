window.addEventListener("load", async () => {

  const data = await fetch('./attachments/data.json').then((res) => res.json());

  //LOAD PREVIEWS
  const list = document.getElementById('list');
  const content = document.getElementById('content');
  data.messages.forEach(element => list.append(createPreviewNode(element, content)));

});

function createPreviewNode(item, content) {
  const { id, label, from, img, subject, preview } = item;
  const div = document.createElement('div');
  div.id = id;
  div.className = `email-item ${label} email-item-unread pure-g`;
  div.addEventListener("click", () => {
    const current = document.querySelector('#email-content');
    if (current) current.remove();
    div.classList.remove('email-item-unread');
    content.append(createContentNode(item));
  });
  div.innerHTML = `
      <div class="pure-u">
        <img width="64" height="64" alt="${from} avatar" class="email-avatar" src="${img}">
      </div>
      <div class="pure-u-3-4">
        <h5 class="email-name">${from}</h5>
        <h4 class="email-subject">${subject}</h4>
        <p class="email-desc">${preview}</p>
      </div>
    `;
  return div;
}

function createContentNode(item) {
  const { id, from, time, body, label, subject } = item;
  const div = document.createElement('div');
  div.id = "email-content";
  div.className = `email-content-header pure-g`;
  div.innerHTML = `
      <div class="pure-u-1-2">
        <h1 class="email-content-title">${subject}</h1>
        <p class="email-content-subtitle">From <a>${from}</a> at <span>${time}</span></p>
      </div>
      <div class="email-content-controls pure-u-1-2">
        <button class="secondary-button pure-button">Reply</button>
        <button class="secondary-button pure-button">Forward</button>
        <button class="secondary-button pure-button">Move to</button>
      </div>
      <div class="email-content-body" readonly>${body}</div>
    `;
  return div;
}

function createFormPopUpNode() {
  const div = document.createElement('div');
  div.className = 'form-popup';
  div.id = 'newEmail';
  div.innerHTML = `
    <form class="form-container">
      <h1>New Email</h1>

      <label for="name"><b>To</b></label>
      <input type="text" placeholder="Name" name="name">

      <label for="email"><b>Mail</b></label>
      <input type="text" placeholder="email@:" name="email" required>

      <label for="subject"><b>Subject</b></label>
      <input type="text" placeholder="Subject" name="subject">

      <label for="body"><b>Body</b></label>
      <textarea placeholder="Write a message" name="body"></textarea>

      <button type="button" class="submit btn">Send</button>
      <button type="button" class="btn cancel">Cancel</button>
    </form>
  `;

  //Cancel Action
  console.log(div);
  div.querySelector('button.cancel').addEventListener('click', () => closeForm(div));
  //Submit Action
  div.querySelector('button.submit').addEventListener('click', () => submitForm(div));

  return div;
}

function openForm() {
  if (document.querySelector("#newEmail")) return;
  let form = createFormPopUpNode();
  document.querySelector('body').append(form);
}

function closeForm(div) {
  div.remove();
}

function submitForm(div){
  const content = document.getElementById('content');
  const from = div.querySelector('input[name="name"]').value.slice(0, 14);
  const list = document.getElementById('list');
  const subject = div.querySelector('input[name="subject"]').value;
  const message = {
    id: getNodeId(),
    from: from,
    subject: `RE: ${subject}`,
    label: "email-item-label-personal",
    time: getTime(),
    img: "./attachments/userpic.png",
    preview: `Hey regarding the "${subject}" mail that you sent me`.slice(0, 73)+'...',
    body: 
    `Hey!<br><br>I just wanted to tell you that I believe that we should set a call to discuss this further, what do you think? Please let me know your thoughts.<br><br>Regards, ${from}'<br><br><hr><b>RE:</b><br><br>${div.querySelector('textarea').value}`
  };
  list.append(createPreviewNode(message, content));
  closeForm(div);
}

function getTime(){
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return `${date.getHours()}:${date.getMinutes()}, ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

function getNodeId(){
  return document.querySelectorAll('#list > div').length + 1;
}

//MENU
function getElements() {
  return {
    menu: document.getElementById("nav"),
    menuLink: document.getElementById("menuLink"),
  };
}

function toggleClass(element, className) {
  var classes = element.className.split(/\s+/);
  var length = classes.length;
  var i = 0;

  for (; i < length; i++) {
    if (classes[i] === className) {
      classes.splice(i, 1);
      break;
    }
  }
  // The className is not found
  if (length === classes.length) {
    classes.push(className);
  }

  element.className = classes.join(" ");
}

function toggleMenu() {
  var active = "active";
  var elements = getElements();

  toggleClass(elements.menu, active);
}

function handleEvent(e) {
  var elements = getElements();

  if (e.target.id === elements.menuLink.id) {
    toggleMenu();
    e.preventDefault();
  } else if (elements.menu.className.indexOf("active") !== -1) {
    toggleMenu();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", handleEvent);
});