# Vue Product Showcase

Proyecto final del Módulo 7 — Desarrollo de Aplicaciones Front-End con Framework Vue.

Aplicación SPA (Single Page Application) que actúa como catálogo interactivo de productos, consumiendo datos desde la API pública [FakeStore API](https://fakestoreapi.com).

---

## Demo

La app permite:
- Ver un catálogo de productos con imagen, precio, categoría y rating
- Filtrar por categoría y buscar por texto
- Agregar/quitar productos de favoritos
- Ver el detalle de cada producto en un modal
- Cambiar entre tema claro y oscuro

---

## Tecnologías utilizadas

| Herramienta | Uso |
|---|---|
| Vue 2 + Vue CLI | Framework principal |
| Vuex 3 | Estado global (módulos: productos, filtros, favoritos) |
| Vue Router | Navegación entre vistas |
| Axios | Consumo de API REST |
| Vuetify 2 | Librería UI (Material Design) |
| Jest + Vue Test Utils | Pruebas unitarias |
| Cypress | Pruebas end-to-end |

---

## Instalación y ejecución

### Requisitos
- Node.js >= 14
- npm >= 6

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/vue-product-showcase.git
cd vue-product-showcase

# 2. Instalar dependencias
npm install

# 3. Levantar en desarrollo
npm run serve
```

La app queda disponible en `http://localhost:8080`

### Build para producción

```bash
npm run build
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── AppHeader.vue       # Navbar con contador de favoritos
│   ├── AppFooter.vue       # Pie de página
│   ├── ProductCard.vue     # Tarjeta de producto (reutilizable)
│   ├── ProductList.vue     # Grilla de productos con estados
│   ├── ProductDetail.vue   # Modal de detalle
│   └── FilterBar.vue       # Filtros por categoría y búsqueda
├── views/
│   ├── HomeView.vue        # Vista principal / catálogo
│   └── FavoritosView.vue   # Vista de favoritos
├── store/
│   ├── index.js
│   └── modules/
│       ├── productos.js    # Fetch, estados cargando/error
│       ├── filtros.js      # Categoría activa y búsqueda
│       └── favoritos.js    # Lista de favoritos
├── services/
│   └── api.js              # Configuración de Axios
└── router/
    └── index.js
```

---

## Pruebas

### Unitarias (Jest)

```bash
npm run test:unit
```

Cubre:
- `ProductCard.spec.js` — render correcto, precio, evento ver-detalle, clase favorito
- `ProductList.spec.js` — estados cargando, error, vacío y con productos

### End-to-end (Cypress)

```bash
npm run test:e2e
```

Cubre:
- Carga del catálogo
- Filtrado por categoría
- Búsqueda por texto
- Limpieza de filtros
- Mensaje de sin resultados

---

## Decisiones técnicas

**Por qué Vuex con módulos**
Separar el estado en productos, filtros y favoritos hace que cada parte sea independiente y fácil de mantener. El getter productosFiltrados en el módulo de productos lee el estado de filtros usando rootState, lo que evita duplicar lógica.

**Por qué Vuetify**
Permite tener un diseño responsivo y profesional sin escribir CSS desde cero. El soporte nativo para tema oscuro fue especialmente útil para cumplir ese requerimiento sin configuración extra.

**Por qué FakeStore API**
Es una API pública, estable y gratuita que devuelve productos con imagen, precio, categoría y rating — exactamente lo que necesita el proyecto sin montar un servidor local.

**Por qué no Nuxt**
Para este proyecto el SEO no es un requerimiento crítico, y Vue CLI con Vue Router es suficiente para una SPA. Migrar a Nuxt tendría sentido si la app necesitara renderizado del lado del servidor o generación estática de páginas.

---

## Autor

Proyecto desarrollado como evaluación del Módulo 7 — Alkemy.
