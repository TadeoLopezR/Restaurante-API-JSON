/// <reference types="cypress" />

describe('Validando Ordenes y Probando boton de eliminar', () => { 
  
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

    //Validando lo ordenando y comparando 

    cy.get('[data-cy="divPlato"]').each(($div, index) => {
      //aumento el input y ordeno
      cy.wrap($div).find('input[type=number]').type('{uparrow}')
      //tomo el nombre del plato y lo comparo con el nombre de lo ordenado 
      cy.wrap($div).find('.col-md-4').invoke('text').then((textoH1) => {
        cy.get(`[data-cy="lista"]:eq(${index}) h4`).should('have.text', textoH1)
      })
    })
    
  })
  
  it('Probando boton Eliminar', () =>{

    cy.get('[data-cy="lista"] h4').eq(0)
      .invoke('text')
      .should('equal','Pizza a la Leña Chica')

    cy.get('[data-cy="lista"] button').eq(0).click()

    cy.get('[data-cy="lista"] h4').eq(0)
      .invoke('text')
      .should('not.equal','Pizza a la Leña Chica')
    // cy.get('[data-cy="lista"]').eq(0)
    // cy.get('h4').should('no_equal','Pizza a la Leña Chica')
  })

})                                         