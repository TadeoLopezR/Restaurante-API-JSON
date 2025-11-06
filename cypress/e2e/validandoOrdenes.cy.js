/// <reference types="cypress" />

describe('Validando Ordenes', () => { 
  
  it('Mostrar Platos y validando la orden',() => {
   
    cy.visit('/index.html')
    //Abriendo Modal 
    cy.get('[data-cy=btn-nuevaOrden]').click()
    cy.get('[data-cy="modal"]').should('be.visible')
   
    cy.get('[data-cy="titulo-modal"]')
      .invoke('text')
      .should('equal','Restaurante App')
   
    //Llenando formulario de Modal
    cy.get('[data-cy="mesa-formulario"]')
      .type('1')

    cy.get('[data-cy="hora-formulario"]')
      .type('10:10')

    cy.get('[data-cy="btn-crearOrden"]').click()

    //Asegurando que se muestren los 12 platos
    cy.get('[data-cy="contenido"]')
        .children('div').should('have.length',12)

    //Ordenando 
    cy.get('[data-cy="contenido"]')
        .children('div')
        .find('input')
        .eq(2)
        .type('{uparrow}')

    cy.get('[data-cy="contenido"]')
        .children('div')
        .find('input')
        .eq(1)
        .type('{uparrow}')
        .type('{uparrow}')
        




    
   
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