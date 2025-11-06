/// <reference types="cypress" />

describe('Validando Formulario', () => { 
  
  it('Click en nueva orden y mostrar ERROR',() => {
   
    cy.visit('/index.html')
    //Abriendo Modal 
    cy.get('[data-cy=btn-nuevaOrden]').click()
    cy.get('[data-cy="modal"]').should('be.visible')
   
    cy.get('[data-cy="titulo-modal"]')
      .invoke('text')
      .should('equal','Restaurante App')
   
    //Creando orden Con ERROR 
    cy.get('[data-cy="btn-crearOrden"]').click()
   
   
    cy.get('[data-cy="alerta"]')
      .should('be.visible')
      .invoke('text')
      .should('equal','\n            Error!\n            Completa el formulario\n            ')
   
  })
  
  it('Click en nueva orden y mostrar PLATOS',() => {

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

})                                         