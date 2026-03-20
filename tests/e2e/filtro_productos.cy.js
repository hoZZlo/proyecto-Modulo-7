// tests/e2e/specs/filtro_productos.cy.js
// Prueba e2e: usuario filtra productos y ve resultados

describe('Filtro de productos', () => {
  beforeEach(() => {
    // Interceptamos la llamada a la API para no depender de internet
    cy.intercept('GET', 'https://fakestoreapi.com/products', {
      statusCode: 200,
      body: [
        {
          id: 1,
          title: 'Mochila de trekking',
          price: 109.95,
          description: 'Mochila resistente para viajes largos',
          category: "men's clothing",
          image: 'https://fakestoreapi.com/img/81fAn766x0L._AC_UX679_.jpg',
          rating: { rate: 3.9, count: 120 }
        },
        {
          id: 2,
          title: 'Auriculares inalámbricos',
          price: 12.99,
          description: 'Auriculares bluetooth de alta calidad',
          category: 'electronics',
          image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
          rating: { rate: 4.1, count: 259 }
        },
        {
          id: 3,
          title: 'Remera básica',
          price: 22.3,
          description: 'Remera de algodón unisex',
          category: "men's clothing",
          image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          rating: { rate: 4.7, count: 130 }
        }
      ]
    }).as('getProductos')

    cy.visit('/')
    cy.wait('@getProductos')
  })

  it('muestra todos los productos al cargar la página', () => {
    cy.get('.v-card').should('have.length', 3)
  })

  it('filtra productos por categoría y muestra solo los correspondientes', () => {
    // Abrimos el select de categoría
    cy.get('[label="Filtrar por categoría"]').click()
    cy.contains('electronics').click()

    // Solo debería quedar 1 producto
    cy.get('.v-card').should('have.length', 1)
    cy.contains('Auriculares inalámbricos').should('be.visible')
  })

  it('filtra productos por texto de búsqueda', () => {
    cy.get('input[type="text"]').first().type('Mochila')

    cy.get('.v-card').should('have.length', 1)
    cy.contains('Mochila de trekking').should('be.visible')
  })

  it('muestra mensaje cuando no hay resultados', () => {
    cy.get('input[type="text"]').first().type('xyzproductoquenoexiste')
    cy.contains('No hay productos para mostrar').should('be.visible')
  })

  it('limpia los filtros y vuelve a mostrar todos los productos', () => {
    cy.get('input[type="text"]').first().type('Mochila')
    cy.get('.v-card').should('have.length', 1)

    cy.contains('Limpiar').click()
    cy.get('.v-card').should('have.length', 3)
  })
})
