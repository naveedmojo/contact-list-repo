let idnumber = 0;
const contactlist = document.getElementById('contact-list');
const form = document.getElementById('contactlistform');
const inputname = document.getElementById('name');
const inputnumber = document.getElementById('phonenumber');
const notification = document.getElementById('notification');
class Person {
  constructor(name, number) {
    this.name = name;
    this.number = number;
    this.id = idnumber++;
  }
}
class store {
  static addperson(person) {
    const persons = store.getperson();
    persons.push(person);
    localStorage.setItem('persons', JSON.stringify(persons));
    console.log('newperson');
  }
  static removeperson(object) {
    const deleitem = object.parentElement.parentElement.parentElement;
    const classname = deleitem.className;
    const deleteid = classname.charAt(classname.length - 1);
    const persons = JSON.parse(localStorage.getItem('persons'));
    const newperson = persons.filter((item) => {
      return item.id != deleteid;
    });
    localStorage.setItem('persons', JSON.stringify(newperson));
  }
  static getperson() {
    if (!localStorage.getItem('persons')) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('persons'));
    }
  }
}
class ui {
  static showalert(message, classname) {
    const alertdiv = document.createElement('div');
    alertdiv.className = `alert alert-${classname}`;
    alertdiv.innerText = message;
    notification.append(alertdiv);
    function alert() {
      notification.removeChild(alertdiv);
    }
    setTimeout(alert, 1500);
  }
  static displaypersons() {
    let persons = JSON.parse(localStorage.getItem('persons'));
    console.log('working');
    console.log(persons);
    if (persons) {
      persons.forEach((person) => {
        ui.addpersontolist(person);
      });
    }
  }
  static addpersontolist(person) {
    const newitem = document.createElement('div');
    newitem.classList.add(`list-item`);
    newitem.classList.add(`id-${person.id}`);
    newitem.innerHTML = `<div class="icon"><i class="fa fa-user"></i></div>
          <div class="info">
            <div class="name">${person.name}</div>
            <div class="phonenumber">${person.number}</div>
          </div>
          <div class="delete-btn">
            <h3><span id="delete" class="remove">X</span></h3>
          </div>`;
    contactlist.appendChild(newitem);
  }
  static removefromcontactlist(object) {
    if (object.classList.contains('remove')) {
      const mycurrentremovableitem =
        object.parentElement.parentElement.parentElement;
      contactlist.removeChild(mycurrentremovableitem);
    }
    ui.showalert('Person Removed', 'removed');
  }
  static clearfields() {
    inputname.value = '';
    inputnumber.value = '';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const personname = inputname.value;
  const personnumber = inputnumber.value;
  const objperson = new Person(personname, personnumber);
  //input validation
  const regname = /^[a-zA-Z]+[a-zA-Z]+$/;
  const regnumber = /^[789]\d{9}$/;
  if (personname.match(regname) && personnumber.match(regnumber)) {
    store.addperson(objperson);
    ui.addpersontolist(objperson);
    ui.clearfields();
    ui.showalert('Person Added', 'added');
  } else {
    alert('enter correct details');
    ui.clearfields();
  }
});
contactlist.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    if (confirm('confirm if you want to delete')) {
      ui.removefromcontactlist(e.target);
      store.removeperson(e.target);
    }
  }
});
ui.displaypersons();
