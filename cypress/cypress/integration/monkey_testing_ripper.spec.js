var monkeysLeft = 10;
describe('Los estudiantes under monkeys', function () {
  it('visits los estudiantes and survives monkeys', function () {
    cy.visit('https://losestudiantes.co');
    cy.contains('Cerrar').click();

    cy.contains('Ingresar').click()
    cy.get('.cajaLogIn').find('input[name="correo"]').click().type("charlietester@mailinator.com")
    cy.get('.cajaLogIn').find('input[name="password"]').click().type("test1234")
    cy.get('.cajaLogIn').contains('Ingresar').click()
    
    selectRandomFunction();
    
  })
})

function selectRandomFunction() {
  cy.wait(1000);
  monkeysLeft = monkeysLeft - 1;

  if (monkeysLeft < 0) {
    console.log("No monkeys left...... finished");
    return;
  }

  let option = getRandomInt(0, 5);
  console.log("option ------------> " + option);
  switch (option) {
    case 0: //randomClick
      console.log("randomClick is called");
      randomClick();
      break;
    case 1: // randomInput
      console.log("randomInput is called");
      randomInput();
      break;
    case 2:
      console.log("randomDropdown is called")
      randomDropdown();
      break;
    case 3:
      console.log("randomButton is called");
      randomButton();
      break;
    default:
      console.log("randomTextarea is called");
      randomTextarea();
      break;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function randomClick() {
  cy.get('a').then((links) => {
    console.log("links found", links.length);
    var randomLink = links.get(getRandomInt(0, links.length));
    if (!Cypress.dom.isHidden(randomLink)) {
      cy.wrap(randomLink).click({ force: true }).then(() => {
        selectRandomFunction();
      })
    } else {
      selectRandomFunction();
    }
  });
}

function randomInput() {
  cy.get('input[type="text"]').then((inputs) => {
    console.log("inputs found", inputs.length);
    var randomInput = inputs.get(getRandomInt(0, inputs.length));
    console.log("randomInput selected", randomInput);
    if (!Cypress.dom.isHidden(randomInput)) {
      let input = cy.wrap(randomInput);
      console.log("selected input", input)
      input.click().type("Something!", { force: true });
      selectRandomFunction();
    } else {
      selectRandomFunction();
    }
  });
}

function randomTextarea() {
  cy.get('textarea').then((inputs) => {
    console.log("textareas found", inputs.length);
    var randomInput = inputs.get(getRandomInt(0, inputs.length));
    console.log("randomInput selected", randomInput);
    if (!Cypress.dom.isHidden(randomInput)) {
      let input = cy.wrap(randomInput);
      console.log("selected input", input)
      input.type("Something!", { force: true });
      selectRandomFunction();
    } else {
      selectRandomFunction();
    }
  })
}

function randomDropdown() {
  cy.get('select').then((selects) => {
    console.log("selects found", selects.length);
    var randomSelect = selects.get(getRandomInt(0, selects.length));
    if (!Cypress.dom.isHidden(randomSelect)) {
      cy.wrap(randomSelect).get('option').then((options) => {
        var randomOption = options.get(getRandomInt(0, options.length));
        cy.wrap(randomSelect).select(randomOption.value);
        selectRandomFunction();
      });
    } else {
      selectRandomFunction();
    }
  });
}

function randomButton() {
  cy.get('button').then((buttons) => {
    console.log("buttons found", buttons.length);
    var randomButton = buttons.get(getRandomInt(0, buttons.length));
    if (!Cypress.dom.isHidden(randomButton)) {
      cy.wrap(randomButton).click({ force: true }).then(() => {
        selectRandomFunction();
      })
    } else {
      selectRandomFunction();
    }
  });
}