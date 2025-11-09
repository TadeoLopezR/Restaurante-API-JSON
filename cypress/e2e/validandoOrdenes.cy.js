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

    const orden1 = cy.get('[data-cy="contenido"]')
                    .children('div').eq(2)
                    .find('input').type('{uparrow}')
                    //tomo el nombre de la orden
                    .parents('div').find('.col-md-4').eq(2)
    
    const orden2 = cy.get('[data-cy="contenido"]')
                    .children('div').eq(1)
                    .find('input')
                    .type('{uparrow}')
                    .type('{uparrow}')
                    //tomo el nombre de la orden
                    .parents('div').find('.col-md-4').eq(1)
   
    
    //Comparo nombre de lo Ordenado
    orden1.then(($el1) =>{
        cy.get('[data-cy="lista"]')
          .children('h4').eq(0).then(($el2) =>{
             expect($el1.text()).to.equal($el2.text())
      })
    })

    orden2.then(($el1) =>{
        cy.get('[data-cy="lista"]')
          .children('h4').eq(1).then(($el2) =>{
             expect($el1.text()).to.equal($el2.text())
      })
    })
  })
  
  

})                                         