describe('Home Page', () => {
    it('Should load datatable', () => {
        cy.intercept('GET', '/api/v1/products?offset=0&limit=10', {
            statusCode: 200,
            fixture: 'productsPaginated.json' 
          }).as('getProducts');
      
          cy.visit('/'); 
      
          cy.wait('@getProducts'); 
      
          cy.get('.dataTable')
            .find('table')
            .find('tr')
            .should('have.length', 5); 
      
          cy.get('table')
            .find('td')
            .first()
            .should('contain', 'Classic Red Pullover Hoodie');
    });
  
    it('Should show the skeletons while the products from datatble are loading', () => {
      cy.intercept('GET', '/api/v1/products?offset=0&limit=10', { delayMs: 1000, fixture: 'productsPaginated.json' }).as('getProducts');
      cy.visit('/');
      cy.wait('@getProducts');
      cy.get('.MuiSkeleton-root').should('exist'); 
    });
    it('Should filter results based on searchbar term', () => {
        cy.intercept('GET', '/api/v1/products/?title=Generic', { delayMs: 1000, fixture: 'productsResultsFromSearch.json' }).as('filterProducts');

        cy.visit('/');
    
        cy.get('input.searchBar')
          .type('classic')
          .should('have.value', 'classic');
    
        cy.wait('@filterProducts').its('request.url').should('include', 'title=classic'); 
        cy.wait('@filterProducts').its('response.statusCode').should('eq', 200); 
        cy.get('.dataTable')
            .find('table')
            .find('tr')
            .should('have.length', 5); 
      
          cy.get('table')
            .find('td')
            .first()
            .should('contain', 'Classic Red Pullover Hoodie');
    });
    it('Should filter results based on category id', () => {
        cy.intercept('GET', '/api/v1/products/?categoryId=1', { delayMs: 1000, fixture: 'productsResultsFromCategoryFilter.json' }).as('filterProducts');

        cy.visit('/');
    
        cy.get('.filterCategory') 
        .select('2');
    
        cy.wait('@filterProducts').its('request.url').should('include', 'categoryId=2'); 
        cy.wait('@filterProducts').its('response.statusCode').should('eq', 200); 
        cy.get('.dataTable')
            .find('table')
            .find('tr')
            .should('have.length', 5); 
      
          cy.get('table')
            .find('td')
            .first()
            .should('contain', 'Sleek White & Orange Wireless Gaming Controller');
    });
});
describe('Datatable actions: view poduct', () => {
    it('should open the product details dialog when "View" is clicked', () => {
      const product =  {
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
  
      cy.visit('/'); 

      cy.get('.actionsButton').click();
     
      cy.get('.viewProductBtn').click();
  
      cy.get('.MuiDialog-root').should('be.visible'); 
      
      cy.get('.productCard').should('exist');
      cy.get('.productCard').find('img').should('have.attr', 'src').and('include', 'https://i.imgur.com/1twoaDy.jpeg');
      cy.get('.productCard').find('Typography').contains('Classic Red Pullover Hoodie');  
      cy.get('.productCard').find('div').contains('Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.');  
      cy.get('.productCard').find('Typography').contains('$10'); 
      cy.get('.productCard').find('div').contains('Clothes'); 
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
    
        cy.visit('/'); 
        
        cy.get('.actionsButton').click();
        cy.get('.viewProductBtn').click();
        cy.get('.MuiDialog-root').should('be.visible'); 
        
        cy.get('.productCard').should('exist');
        cy.get('.productCard').find('img').should('have.attr', 'src').and('include', dummyProduct.images[0]);
        cy.get('.productCard').find('Typography').contains(dummyProduct.title);  
        cy.get('.productCard').find('div').contains(dummyProduct.description);  
        cy.get('.productCard').find('Typography').contains(dummyProduct.price); 
        cy.get('.productCard').find('div').contains(dummyProduct.category.name); 
    });
    
});
describe('Datatable actions: update poduct', () => {
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
        cy.visit('/'); 
        
        cy.get('.actionsButton').click();
        cy.get('.editProductBtn').click();
        cy.get('.MuiDialog-root').should('be.visible'); 

        cy.get('[name="title"]').should('have.value', dummyProduct.title);
        cy.get('[name="description"]').should('have.value', dummyProduct.description);
        cy.get('[name="price"]').should('have.value', dummyProduct.price);
        cy.get('.selectCategory').should('have.value', dummyProduct.category.id);
        cy.get('img').should('have.attr', 'src', dummyProduct.images[0]);
     
    });
    it('should show updateProduct when form is submitted', () => {
        cy.intercept('POST', '/api/v1/products/1', { statusCode: 200 }).as('updateProduct'); // Mock the API request
    
    
        cy.get('.editProductBtn').click();
    
        cy.get('[name="title"]').clear().type('Updated Product');
        cy.get('[name="description"]').clear().type('This is an updated description');

        cy.get('form').submit();
    
        
        cy.wait('@updateProduct');
        cy.get('.MuiDialog-root').should('not.exist');

        cy.get('.dataTable')
        .find('table')
        .find('tr')
        .should('have.length', 5); 
  
        cy.get('table')
        .find('td')
        .first()
        .should('contain', 'Updated Product');
    });
});
describe('Datatable actions: delete poduct', () => {
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
        cy.visit('/'); 
        
        cy.get('.actionsButton').click();
        cy.get('.deleteProductBtn').click();
        cy.get('.MuiDialog-root').should('be.visible'); 

        cy.get('[name="title"]').should('have.value', dummyProduct.title);
        cy.get('[name="description"]').should('have.value', dummyProduct.description);
        cy.get('[name="price"]').should('have.value', dummyProduct.price);
        cy.get('.selectCategory').should('have.value', dummyProduct.category.id);
        cy.get('img').should('have.attr', 'src', dummyProduct.images[0]);
     
        cy.intercept('DELETE', `/api/v1/products/${dummyProduct.id}`, { statusCode: 200 }).as('deleteProduct');
      
        cy.get('.btnDeleteProduct').click();     
        cy.wait('@deleteProduct');

        cy.get('.MuiDialog-root').should('not.exist');

        cy.intercept('GET', '/api/v1/products?offset=0&limit=10', {
            statusCode: 200,
            fixture: 'productsPaginated.json' 
          }).as('getProducts');
      
          cy.visit('/'); 
      
          cy.wait('@getProducts'); 
      
          cy.get('.dataTable')
            .find('table')
            .find('tr')
            .should('have.length', 5); 
      
          cy.get('table')
            .find('td')
            .first()
            .should('not.contain', dummyProduct.title);
    });
   
});
describe('Create poduct', () => {
    const newProduct = {
        id: 91256,
        title: "New Product",
        description: "This is a new product",
        price: 150,
        categoryId: 2,
        images: ["https://i.imgur.com/1twoaDy.jpeg",]
      };
    
      beforeEach(() => {
        cy.intercept('GET', '/api/v1/products?offset=0&limit=10', {
          statusCode: 200,
          fixture: 'productsPaginated.json' 
        }).as('getProducts');
    
        cy.visit('/');
        cy.wait('@getProducts'); 
      });
    it('Should create a new product and append it in the datatable', () => {
        cy.get('.createButton').click();

        cy.get('input[name="title"]').type(newProduct.title);
        cy.get('input[name="description"]').type(newProduct.description);
        cy.get('input[name="price"]').type(newProduct.price.toString());
    
        cy.get('select[name="category"]').select(newProduct.categoryId.toString());
      
        cy.intercept('POST', '/api/v1/products', {
            statusCode: 201,
            body: newProduct
        }).as('createProduct');

        cy.get('button[type="submit"]').click();

        cy.wait('@createProduct')

        cy.get('.MuiDialog-root').should('not.exist');

        cy.intercept('GET', '/api/v1/products?offset=0&limit=10', {
            statusCode: 200,
            fixture: 'productsPaginated.json' 
          }).as('getProducts');
      
          cy.visit('/'); 
      
          cy.wait('@getProducts'); 
      
          cy.get('.dataTable')
            .find('table')
            .find('tr')
            .should('have.length', 5); 
      
            cy.get('table')
            .contains('td', newProduct.title)
            .should('exist');
    });
   
});