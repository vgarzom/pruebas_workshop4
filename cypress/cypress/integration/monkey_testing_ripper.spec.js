var monkeysLeft = 10;
describe('Los estudiantes under monkeys', function () {
  it('visits los estudiantes and survives monkeys', function () {
    cy.visit('https://losestudiantes.co');
    cy.contains('Cerrar').click();
    cy.wait(1000);
    randomClick();
  })
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

function randomClick() {
  console.log("Random click called", monkeysLeft);
  monkeysLeft = monkeysLeft - 1;
  if (monkeysLeft >= 0) {
    cy.get('a').then((links) => {
      console.log("links found", links.length);
      var randomLink = links.get(getRandomInt(0, links.length));
      if (!Cypress.dom.isHidden(randomLink)) {
        cy.wrap(randomLink).click({ force: true }).then(() => {
          cy.wait(1000);
          randomClick();
        })
      } else {
        cy.wait(1000);
          randomClick();
      }
    });
  } else {
    console.log("not more monkeys")
  }
}