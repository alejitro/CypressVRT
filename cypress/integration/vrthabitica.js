
describe('Habitica', function() {



  it('Login uno', function() {

    cy.visit('https://habitica.com/static/home')
    cy.get('#app').contains('Login').click()
    cy.get('#login-form').find('input[id="usernameInput"]').click().type("fakeuser1@fake.com")
    cy.get('#login-form').find('input[id="passwordInput"]').click().type("pruebas201902")
    cy.get('#login-form').contains('Login').click()
    cy.url().should('contain','https://habitica.com/')
    cy.screenshot('1_Login')
    cy.wait(1000);
  })

  it('Login dos', function() {

    cy.visit('https://habitica.com/static/home')
    cy.get('#app').contains('Login').click()
    cy.get('#login-form').find('input[id="usernameInput"]').click().type("fakeuser1@fake.com")
    cy.get('#login-form').find('input[id="passwordInput"]').click().type("asdfghj")
    cy.get('#login-form').contains('Login').click()
    cy.screenshot('2_Login')
    cy.wait(1000);
  })

})
/*
describe("Login 2", () => {
  it("Login 2", () => {



cy.visit('https://habitica.com/static/home')
cy.screenshot('imagen1C')
cy.get('#app').contains('Entrar').click()
cy.get('#login-form').find('input[id="usernameInput"]').click().type("fakeuser1@fake.com")
cy.get('#login-form').find('input[id="passwordInput"]').click().type("pruebas201902")
cy.get('#login-form').contains('Entrar').click()
cy.url().should('contain','https://habitica.com/login')
cy.screenshot('imagen2C')
cy.wait(1000);
cy.visit('https://habitica.com/static/home')
cy.screenshot('imagen3C')
cy.get('#intro-signup').find('input[id="usernameInput"]').click().type("alex4543")
cy.get('#intro-signup').find('input[placeholder="Correo electrónico"]').click().type("alex4543@hotmail.com")
cy.get('#intro-signup').find('input[placeholder="Contraseña"]').click().type("rome9119")
cy.get('#intro-signup').find('input[placeholder="Confirma contraseña"]').click().type("rome9119")
cy.get('#intro-signup').contains('Regístrate').click()
cy.url().should('contain','https://habitica.com/static/home')
cy.screenshot('imagen4C')
cy.wait(1000);
cy.visit('https://habitica.com/static/home')
cy.screenshot('imagen5C')
cy.get('#app').contains('Entrar').click()
cy.get('#login-form').find('input[id="usernameInput"]').click().type("alex4543")
cy.get('#login-form').find('input[id="passwordInput"]').click().type("rome9119")
cy.get('#login-form').contains('Entrar').click()
cy.url().should('contain','https://habitica.com/')
cy.screenshot('imagen6C')
cy.wait(1000);
//cy.get('#avatar-modal___BV_modal_outer_').contains('Get Started!').click()
cy.screenshot('imagen7C')

  });
});

/*
describe("test de VRT", () => {
  it("VRT", () => {
    cy.visit('http://127.0.0.1:8887/Resemble.html')
    cy.get('#example-images').contains('Use example images').click()
  });
});

    //cy.get('ul[id="top_filters"]').find('li[data-track="navigation|today"]').click()


  /*  var overdue = cy.get('#agenda_view').find('div[class="section_overdue"]')
    if(overdue.should('exist')){
      overdue.find('.task_item').each(function(te){
        te.each(function(ind){
            var cadena=te.get(ind).innerText.split('\n')
            if(cadena[0] == "	Tarea pruebas 1"){
              overdue.get(te).click()
              cy.get('div[role="textbox"]').click().clear().type("Tarea pruebas modificada")
              cy.get('input[placeholder="Schedule"]').click()
              cy.get('input[placeholder="Type a due date"]').click().clear({force:true}).type(" Oct 25 2018", {force:true})
              cy.wait(500)
              cy.get('.scheduler-preview-content').click()
              cy.contains('Save').click()
            }
        })
      })
      overdue = cy.get('#agenda_view').find('div[class="section_overdue"]')
      overdue.find('.task_item').each(function(te){
        te.each(function(ind){
            var cadena=te.get(ind).innerText.split('\n')
            console.log("cadena nueva: ",cadena)
            expect(cadena[0]).equal("\tTarea pruebas modificada")
        })
      })
    }*/

    /*it('Visits todoist and fails at login', function() {
      cy.visit('https://todoist.com/Users/showLogin')
      cy.get('#login_form').find('input[id="email"]').click().type("fake1@fake.com")
      cy.get('#login_form').find('input[id="password"]').click().type("pruebas201902")
      cy.get('#login_form').contains('Log in').click()
      var mensaje=cy.get('.error_msg').find('span').contains("Wrong email or password.")
      mensaje.invoke('text').then((text)=>{
          expect(text).equal('Wrong email or password.')
      })
    })
    it('Visits todoist and register', function() {
      cy.visit('https://todoist.com/Users/showRegister')
      //cy.contains('Iniciar sesión').click()
      cy.get('#sign_up_form').find('input[id="full_name"]').click().type("fakeUser5")
      cy.get('#sign_up_form').find('input[id="email"]').click().type("fakeUser5@fake.com")
      cy.get('#sign_up_form').find('input[id="password"]').click().type("pruebas201902")
      cy.get('input[id="accept_terms"]').check()
      cy.get('#sign_up_form').contains('Create My Account').click()
      cy.url().should('eq','https://todoist.com/setup')
    })
    it('Visits todoist and success at login', function() {
      cy.visit('https://todoist.com/Users/showLogin')
      cy.get('#login_form').find('input[id="email"]').click().type("fakeuser1@fake.com")
      cy.get('#login_form').find('input[id="password"]').click().type("pruebas201902")
      cy.get('#login_form').contains('Log in').click()
      cy.url().should('contain','https://todoist.com/app?r=')
    })
    it('Login at todoist and create a task', function() {
      cy.visit('https://todoist.com/Users/showLogin')
      cy.get('#login_form').find('input[id="email"]').click().type("fakeuser1@fake.com")
      cy.get('#login_form').find('input[id="password"]').click().type("pruebas201902")
      cy.get('#login_form').contains('Log in').click()
      cy.url().should('contain','https://todoist.com/app?r=')
      //cy.contains('Add task').click()
      cy.get('li[class="agenda_add_task"]').click()
      //cy.wait('#agenda_view')
      cy.get('#editor li.manager form').find('div[role="textbox"]').click().type("Tarea pruebas")
      cy.contains('Add Task').click()
      var tarea= cy.get('.task_item .content').find('span').contains("Tarea pruebas")
      tarea.invoke('text').then((text)=>{
          expect(text).equal('Tarea pruebas')
      })
    })*/
    /*it('Login at todoist and delet an overdue task', function() {
      cy.visit('https://todoist.com/Users/showLogin')
      cy.get('#login_form').find('input[id="email"]').click().type("fakeuser1@fake.com")
      cy.get('#login_form').find('input[id="password"]').click().type("pruebas201902")
      cy.get('#login_form').contains('Log in').click()
      cy.url().should('contain','https://todoist.com/app?r=')
      cy.wait(2000);
      cy.get('ul[id="top_filters"]').find('li[data-track="navigation|today"]').click()
      var overdue = cy.get('#agenda_view').find('div[class="section_overdue"]')
      if(overdue.should('exist')){
        overdue.find('.task_item').each(function(te){
          //text.wrap()
          te.each(function(ind){
              console.log("Valor de los objetos",te.get(ind).innerText)
              console.log("Valor de text",te.text())
              var cadena=te.get(ind).innerText.split('\n')
              console.log("Valor de cadena",cadena)
              if(cadena[0] == "	Tarea pruebas 1"){
                console.log("entra al if")
                cy.get('.ist_menu').find('td[data-track="task|more_delete"]').click()
              }
          })
        })
      }*/

    /*it('Login at todoist and edit a today task', function() {
      cy.visit('https://todoist.com/Users/showLogin')
      cy.get('#login_form').find('input[id="email"]').click().type("fakeuser1@fake.com")
      cy.get('#login_form').find('input[id="password"]').click().type("pruebas201902")
      cy.get('#login_form').contains('Log in').click()
      cy.url().should('contain','https://todoist.com/app?r=')
      cy.wait(2000);
      cy.get('ul[id="top_filters"]').find('li[data-track="navigation|today"]').click()
      var overdue = cy.get('#agenda_view').find('div[class="section_day"]')
      if(overdue.should('exist')){
        overdue.find('.task_item').each(function(te){
          te.each(function(ind){
              var cadena=te.get(ind).innerText.split('\n')
              if(cadena[0] == "	Tarea pruebas 3"){
                overdue.get(te).click()
                cy.get('div[role="textbox"]').click().clear().type("Tarea pruebas hoy modificada")

                cy.contains('Save').click()
              }
          })
        })
        overdue = cy.get('#agenda_view').find('div[class="section_day"]')
        overdue.find('.task_item').each(function(te){
          te.each(function(ind){
              var cadena=te.get(ind).innerText.split('\n')
              console.log("cadena nueva: ",cadena)
              expect(cadena[0]).equal("\tTarea pruebas hoy modificada")
          })
        })
      }
  })*/
  /*it('Login at todoist and create a project', function() {
    cy.visit('https://todoist.com/Users/showLogin')
    cy.get('#login_form').find('input[id="email"]').click().type("fakeuser1@fake.com")
    cy.get('#login_form').find('input[id="password"]').click().type("pruebas201902")
    cy.get('#login_form').contains('Log in').click()
    cy.url().should('contain','https://todoist.com/app?r=')
    cy.wait(2000);
    cy.contains("Add Project").click()
    var seccion = cy.get('section[class="reactist_modal_box__body form_fields"]')
    seccion.find('input[name="name"]').click().type("Proyecto pruebas")
    cy.get('footer[class="reactist_modal_box__actions"]').find('button[type="submit"]').click()
    cy.url().should('contain','#project')
  })*/




/*function eventInput() {
    cy.get('input').then($inputs => {
      var inputList = $inputs.get(getRandomInt(0, $inputs.length));
      if (!Cypress.dom.isHidden(inputList)) {
          cy.wrap(inputList).click().type("text");
      }
  });
}

function eventClick() {
  cy.get('button').then($buttons => {
      var buttonList = $buttons.get(getRandomInt(0, $buttons.length));
      if (!Cypress.dom.isHidden(buttonList)) {
          cy.wrap(buttonList).click({ force: true });
      }
  })
}

function eventLink() {
  cy.get('a').then($links => {
      var randomLink = $links.get(getRandomInt(0, $links.length));
      if (!Cypress.dom.isHidden(randomLink)) {
          cy.wrap(randomLink).click({ force: true });
      }
  });
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};*/
