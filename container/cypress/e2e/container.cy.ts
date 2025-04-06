describe('Testing remote app Datatable', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/products', {
      statusCode: 200,
      fixture: 'allProducts.json' 
    }).as('getAllProducts');
    cy.intercept('GET', '/api/v1/categories', {
      statusCode: 200,
      fixture: 'allCategories.json' 
    }).as('getAllCategories');
    cy.intercept('GET', '/api/v1/products/?', {
      statusCode: 200,
      fixture: 'productsPaginated.json' 
    }).as('getProducts');
    cy.intercept('GET', '/api/v1/products?offset=0&limit=5', {
      statusCode: 200,
      fixture: 'productsPaginated.json' 
    }).as('getPaginatedProducts');

    cy.visit('http://localhost:8080/');

    cy.wait('@getAllProducts'); 
    cy.wait('@getAllCategories'); 
    cy.wait('@getProducts'); 
    cy.wait('@getPaginatedProducts'); 

  });
  
    it('Debe cargar la aplicación remota', () => {
      cy.get('.dataTable')
        .should('exist')
        .and('be.visible');
    });
  
    it('La app remota debe renderizar un componente específico', () => {
        cy.get('.dataTable')
            .find('table')
            .find('tr')
            .should('have.length', 6); 

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)')
            .should('contain', 'Classic Red Pullover Hoodie');
    });
});
describe('Toggle darkmode', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/products', {
      statusCode: 200,
      fixture: 'allProducts.json' 
    }).as('getAllProducts');
    cy.intercept('GET', '/api/v1/categories', {
      statusCode: 200,
      fixture: 'allCategories.json' 
    }).as('getAllCategories');
    cy.intercept('GET', '/api/v1/products/?', {
      statusCode: 200,
      fixture: 'productsPaginated.json' 
    }).as('getProducts');
    cy.intercept('GET', '/api/v1/products?offset=0&limit=5', {
      statusCode: 200,
      fixture: 'productsPaginated.json' 
    }).as('getPaginatedProducts');

    cy.visit('http://localhost:8080/');

    cy.wait('@getAllProducts'); 
    cy.wait('@getAllCategories'); 
    cy.wait('@getProducts'); 
    cy.wait('@getPaginatedProducts'); 

  });

  it('Should change theme to light when clicked', () => {
    cy.get('body').should('have.attr', 'data-theme', 'dark');

    cy.get('#theme-toggle').click(); 
    
    cy.get('body').should('have.attr', 'data-theme', 'light');
  });
});