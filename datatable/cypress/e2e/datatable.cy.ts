describe('Home Page', () => {
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

    cy.visit('/'); 

    cy.wait('@getAllProducts'); 
    cy.wait('@getAllCategories'); 
    cy.wait('@getProducts'); 
    cy.wait('@getPaginatedProducts'); 

  });
    it('Should load datatable', () => {
        
          cy.get('.dataTable')
            .find('table')
            .find('tr')
            .should('have.length', 6); 
      
          cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)')
            .should('contain', 'Classic Red Pullover Hoodie');
    });
    it('Should filter results based on searchbar term', () => {
      cy.intercept('GET', '/api/v1/products/?title=c', { delayMs: 1000, fixture: 'productsResultsFromSearch.json' }).as('filterProductsC');
      cy.intercept('GET', '/api/v1/products/?title=cl', { delayMs: 1000, fixture: 'productsResultsFromSearch.json' }).as('filterProductsCl');
      cy.intercept('GET', '/api/v1/products/?title=cla', { delayMs: 1000, fixture: 'productsResultsFromSearch.json' }).as('filterProductsCla');
      cy.intercept('GET', '/api/v1/products/?title=clas', { delayMs: 1000, fixture: 'productsResultsFromSearch.json' }).as('filterProductsClas');
      cy.intercept('GET', '/api/v1/products/?title=class', { delayMs: 1000, fixture: 'productsResultsFromSearch.json' }).as('filterProductsClass');
      cy.intercept('GET', '/api/v1/products/?title=classi', { delayMs: 1000, fixture: 'productsResultsFromSearch.json' }).as('filterProductsClassi');
      cy.intercept('GET', '/api/v1/products/?title=classic', { delayMs: 1000, fixture: 'productsResultsFromSearch.json' }).as('filterProductsClassic');

        
        cy.get('.MuiFormControl-root.searchBar')
        .type('classic');
        
        cy.wait('@filterProductsC');
        cy.wait('@filterProductsCl');
        cy.wait('@filterProductsCla');
        cy.wait('@filterProductsClas');
        cy.wait('@filterProductsClass');
        cy.wait('@filterProductsClassi');
        cy.wait('@filterProductsClassic')
        .its('request.url').should('include', 'title=classic'); 

        cy.get('.dataTable')
            .find('table')
            .find('tr')
            .should('have.length', 6); 
      
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)')
        .should('contain', 'Classic Red Pullover Hoodie');
    });
    it('Should filter results based on category id', () => {
        cy.intercept('GET', '/api/v1/products/?categoryId=2', 
          { fixture: 'productsResultsFromCategoryFilter.json' })
        .as('filterProducts');

 
    
        cy.get('.filterCategory').click();  
        cy.get('.MuiMenuItem-root').contains('Electronics').click();  

        cy.wait('@filterProducts').its('request.url').should('include', 'categoryId=2'); 
    
        cy.get('.dataTable')
        .find('table')
        .find('tr')
        .should('have.length', 6); 
        
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)')
        .should('contain', 'Sleek White & Orange Wireless Gaming Controller');
    });
});
describe('Datatable actions: view poduct', () => {
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

      cy.visit('/'); 

      cy.wait('@getAllProducts'); 
      cy.wait('@getAllCategories'); 
      cy.wait('@getProducts'); 
      cy.wait('@getPaginatedProducts');
    });
    it('should open the product details dialog when "View" is clicked', () => {
      const dummyProduct =  {
        id: 2,
        title: "Classic Red Pullover Hoodie",
        slug: "classic-red-pullover-hoodie",
        price: 10,
        description: "Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.",
        category: {
          id: 1,
          name: "Clothes",
          slug: "clothes",
          image: "https://i.imgur.com/QkIa5tT.jpeg",
        },
        images: [
          "https://i.imgur.com/1twoaDy.jpeg",
          "https://i.imgur.com/FDwQgLy.jpeg",
          "https://i.imgur.com/kg1ZhhH.jpeg"
        ],
      }
  

      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(6) >.actionsButton').click();
      cy.get('.viewProductBtn').click();
  
      cy.get('.MuiDialog-root').should('be.visible'); 
      
      cy.get('.productCard').should('exist');
      cy.get('.productCard').find('img').should('have.attr', 'src').and('include', dummyProduct.images[0]);
      cy.get('.productCard').find('.productTitle').contains(dummyProduct.title);  
      cy.get('.productCard').find('.productDescription').contains(dummyProduct.description);  
      cy.get('.productCard').find('.productPrice').contains(dummyProduct.price); 
      cy.get('.productCard').find('div').contains(dummyProduct.category.name); 
    });
    
});
describe('Datatable actions: update poduct', () => {
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

    cy.visit('/'); 

    cy.wait('@getAllProducts'); 
    cy.wait('@getAllCategories'); 
    cy.wait('@getProducts'); 
    cy.wait('@getPaginatedProducts');
  });
    const dummyProduct =  {
        id: 2,
        title: "Classic Red Pullover Hoodie",
        slug: "classic-red-pullover-hoodie",
        price: 10,
        description: "Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.",
        category: {
          id: 1,
          name: "Clothes",
          slug: "clothes",
          image: "https://i.imgur.com/QkIa5tT.jpeg",
        },
        images: [
          "https://i.imgur.com/1twoaDy.jpeg",
          "https://i.imgur.com/FDwQgLy.jpeg",
          "https://i.imgur.com/kg1ZhhH.jpeg"
        ],
    }
    it('should show the product data in the inputs', () => {
     
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(6) >.actionsButton').click();
    
        cy.get('.editProductBtn').click();
        cy.get('.MuiDialog-root').should('be.visible'); 

        cy.get('[name="title"]').should('have.value', dummyProduct.title);
        cy.get('[name="description"]').should('have.value', dummyProduct.description);
        cy.get('[name="price"]').should('have.value', dummyProduct.price);
        cy.get('.selectCategory').should('contain', dummyProduct.category.name);
        cy.get('img').should('have.attr', 'src', dummyProduct.images[0]);
     
    });
    it('should show updateProduct when form is submitted', () => {
        cy.intercept('PUT', `/api/v1/products/2`, { 
          statusCode: 200,
          fixture: 'dummyProductsUpdated.json' 
         }).as('updateProduct');
        cy.intercept('GET', '/api/v1/products?offset=0&limit=0', {
          statusCode: 200,
          fixture: 'updatedProductResponse.json' 
        }).as('updatedProductResponse');
    
    
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(6) >.actionsButton').click();
        cy.get('.editProductBtn').click();
    
        cy.get('[name="title"]').clear().type('Updated Product');
        cy.get('[name="description"]').clear().type('This is an updated description');

        cy.get('form').submit();
    
        
        cy.get('.MuiDialog-root').should('not.exist');
        
        cy.get('.dataTable')
        .find('table')
        .find('tr')
        .should('have.length', 6); 
        
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)')
        .should('contain', 'Updated Product');

        cy.wait('@updateProduct');
        cy.wait('@updatedProductResponse');
    });
});
describe('Datatable actions: delete poduct', () => {
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

    cy.visit('/'); 

    cy.wait('@getAllProducts'); 
    cy.wait('@getAllCategories'); 
    cy.wait('@getProducts'); 
    cy.wait('@getPaginatedProducts'); 

  });
    const dummyProduct =  {
        id: 2,
        title: "Classic Red Pullover Hoodie",
        slug: "classic-red-pullover-hoodie",
        price: 10,
        description: "Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.",
        category: {
          id: 1,
          name: "Clothes",
          slug: "clothes",
          image: "https://i.imgur.com/QkIa5tT.jpeg",
        },
        images: [
          "https://i.imgur.com/1twoaDy.jpeg",
          "https://i.imgur.com/FDwQgLy.jpeg",
          "https://i.imgur.com/kg1ZhhH.jpeg"
        ],
    }
    it('should show confirm dialog and delete the product', () => {

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(6) >.actionsButton').click();
        cy.get('.deleteProductBtn').click();
        cy.get('.MuiDialog-root').should('be.visible'); 

        cy.get('.productCard').should('exist');
        cy.get('.productCard').find('img').should('have.attr', 'src').and('include', dummyProduct.images[0]);
        cy.get('.productCard').find('.productTitle').contains(dummyProduct.title);  
        cy.get('.productCard').find('.productDescription').contains(dummyProduct.description);  
        cy.get('.productCard').find('.productPrice').contains(dummyProduct.price); 
     
        cy.intercept('DELETE', `/api/v1/products/${dummyProduct.id}`, { statusCode: 200 }).as('deleteProduct');
        cy.intercept('GET', '/api/v1/products?offset=0&limit=0', {
          statusCode: 200,
          fixture: 'productsPaginatedAfterDelete.json' 
        }).as('getProducts');
        
        cy.get('.btnDeleteProduct').click();     
        
        cy.get('.MuiDialog-root').should('not.exist');
        
        
        cy.wait('@deleteProduct');
        cy.wait('@getProducts'); 
      
          cy.get('.dataTable')
            .find('table')
            .find('tr')
            .should('have.length', 6); 
      
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)')
            .should('not.contain', "Classic Red Pullover Hoodie");
    });
   
});
describe('Create poduct', () => {
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


    cy.visit('/'); 

    cy.wait('@getAllProducts'); 
    cy.wait('@getAllCategories'); 
    cy.wait('@getProducts'); 
    cy.wait('@getPaginatedProducts'); 
  });
    const newProduct = {
        id: 1,
        title: "New Product",
        description: "This is a new product",
        price: 150,
        categoryName: "Electronics",
        images: ["https://i.imgur.com/1twoaDy.jpeg",]
      };
  
    it('Should create a new product and append it in the datatable', () => {
        cy.get('.createButton').click();

        cy.get('input[name="title"]').type(newProduct.title);
        cy.get('input[name="description"]').type(newProduct.description);
        cy.get('input[name="price"]').type(newProduct.price.toString());
    
        cy.get('.selectCategory').click();  
        cy.get('.MuiMenuItem-root').contains(newProduct.categoryName).click();  
      
        cy.intercept('POST', '/api/v1/products', {
            statusCode: 201,
            body: newProduct
        }).as('createProduct');
        cy.intercept('GET', '/api/v1/products?offset=0&limit=0', {
          statusCode: 200,
          fixture: 'createdProductResponse.json' 
        }).as('createdProductResponse');
   
      

        cy.get('button[type="submit"]').click();
        
        cy.wait('@createProduct')
        cy.wait('@createdProductResponse'); 
  
        cy.get('.MuiDialog-root').should('not.exist');
        
        
        cy.get('.dataTable')
        .find('table')
        .find('tr')
        .should('have.length', 6); 
        
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)')
        .should('contain', 'New Product');
      });
   
});