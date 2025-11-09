/// <reference types="cypress" />

describe('Propinas y Resumen', () => { 
  
  it('Click en nueva orden y mostrar ERROR',() => {
   
    cy.visit('/index.html')
    //Abriendo Modal 
    cy.get('[data-cy=btn-nuevaOrden]').click()
    cy.get('[data-cy="modal"]').should('be.visible')
   
    cy.get('[data-cy="titulo-modal"]')
      .invoke('text')
      .should('equal','Restaurante App')
   

    cy.get('[data-cy="mesa-formulario"]')
      .type('1')

    cy.get('[data-cy="hora-formulario"]')
      .type('10:10')

    cy.get('[data-cy="btn-crearOrden"]').click()
   
  })
  
  it('Ordenando', () => {
    cy.get('[data-cy="divPlato"] input').eq(0)
        .type('{uparrow}')
    cy.get('[data-cy="divPlato"] input').eq(1)
        .type('{uparrow}')
        .type('{uparrow}')
  })

  it('Validando Propinas', () => {
    cy.get('[data-cy="divFormulario"] input').eq(1)
        .value()
  })
})