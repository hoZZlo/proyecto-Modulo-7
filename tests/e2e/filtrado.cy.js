// tests/e2e/specs/filtrado.cy.js
// Prueba e2e: usuario filtra productos y ve resultados

describe('Filtrado de productos', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('carga el catálogo correctamente', () => {
    cy.contains('Catálogo de Productos').should('be.visible')
  })

  it('muestra productos luego de cargar la API', () => {
    // Espera que aparezcan las tarjetas de producto
    cy.get('.product-card', { timeout: 10000 }).should('have.length.greaterThan', 0)
  })

  it('filtra productos por categoría', () => {
    // Espera que carguen los productos primero
    cy.get('.product-card', { timeout: 10000 }).should('have.length.greaterThan', 0)

    // Abre el select de categoría
    cy.get('[label="Filtrar por categoría"]').click()

    // Selecciona una categoría específica
    cy.contains("electronics").click()

    // Verifica que los resultados se actualizaron
    cy.get('.product-card', { timeout: 5000 }).should('have.length.greaterThan', 0)
  })

  it('limpia el filtro y vuelve a mostrar todos los productos', () => {
    cy.get('.product-card', { timeout: 10000 }).should('have.length.greaterThan', 0)

    // Filtra
    cy.get('[label="Filtrar por categoría"]').click()
    cy.contains("electronics").click()

    // Limpia
    cy.contains('Limpiar').click()

    // Vuelven todos los productos
    cy.get('.product-card', { timeout: 5000 }).should('have.length.greaterThan', 10)
  })

  it('busca un producto por texto', () => {
    cy.get('.product-card', { timeout: 10000 }).should('have.length.greaterThan', 0)

    cy.get('[label="Buscar producto..."]').type('jacket')

    cy.get('.product-card').each(($el) => {
      cy.wrap($el).invoke('text').then(text => {
        expect(text.toLowerCase()).to.include('jacket')
      })
    })
  })

  it('muestra mensaje cuando no hay resultados', () => {
    cy.get('.product-card', { timeout: 10000 }).should('have.length.greaterThan', 0)

    cy.get('[label="Buscar producto..."]').type('xxxxxnoexiste12345')

    cy.contains('No hay productos para mostrar').should('be.visible')
  })
})
