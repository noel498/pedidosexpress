// Products Database for Pedidos Express
// Productos para el hogar en Satélite Norte, Santa Cruz, Bolivia

const productsDatabase = [
  // Electrodomésticos
 
  {
    id: 3,
    name: "Plancha a Vapor Philips",
    brand: "Philips",
    category: "electrodomesticos",
    price: 250,
    originalPrice: 350,
    description: "Plancha a vapor con suela antiadherente y control de temperatura",
    image: "images/producto/plancha Image.jpeg",
    rating: 4.3,
    stock: 20,
    badges: ["discount"],
    discount: 10
  },
  {
    id: 4,
    name: "Ventilador de Pie 3 Velocidades",
    brand: "Imaco",
    category: "electrodomesticos",
    price: 220,
    originalPrice: 400,
    description: "Ventilador de pie oscilante con 3 velocidades y altura ajustable",
    image: "images/producto/ventiladora Image.jpeg",
    rating: 4.2,
    stock: 12,
    badges: ["oferta"],
    discount: 20
  },
  {
    id: 5,
    name: "Cafetera Eléctrica 12 Tazas",
    brand: "Black & Decker",
    category: "electrodomesticos",
    price: 150,
    originalPrice: null,
    description: "Cafetera eléctrica con capacidad para 12 tazas y filtro permanente",
    image: "images/producto/cafeteria Image.jpeg",
    rating: 4.6,
    stock: 18,
    badges: [],
    discount: 0
  },
  {
    id: 6,
    name: "Batidora de Mano 5 Velocidades",
    brand: "Oster",
    category: "electrodomesticos",
    price: 150,
    originalPrice: 220,
    description: "Batidora de mano con 5 velocidades y accesorios incluidos",
    image: "images/producto/batidora en mano image.jpeg",
    rating: 4.4,
    stock: 25,
    badges: ["destacado"],
    discount: 18
  },

  // Ropa y Textiles
  {
    id: 7,
    name: "Juego de Sábanas Queen Size",
    brand: "Cannon",
    category: "ropa",
    price: 250,
    originalPrice: 350,
    description: "Juego de sábanas de algodón 100%, incluye funda de almohada",
    image: "images/producto/juego de sabana Image.jpeg",
    rating: 4.7,
    stock: 30,
    badges: ["oferta"],
    discount: 20
  },
  {
    id: 8,
    name: "Toallas de Baño Set 3 Piezas",
    brand: "Cannon",
    category: "ropa",
    price: 80,
    originalPrice: 80,
    description: "Set de 3 toallas de baño de algodón suave y absorbente",
    image: "images/producto/toallas.jpeg",
    rating: 4.5,
    stock: 40,
    badges: ["discount"],
    discount: 25
  },
  {
    id: 9,
    name: "Cortinas Blackout 2.5m",
    brand: "Home Collection",
    category: "ropa",
    price: 210,
    originalPrice: null,
    description: "Cortinas blackout que bloquean la luz, ideales para dormitorios",
    image: "images/producto/cortina.jpeg",
    rating: 4.6,
    stock: 15,
    badges: ["destacado"],
    discount: 0
  },
  {
    id: 10,
    name: "Almohadas Memory Foam Pack 2",
    brand: "Restonic",
    category: "ropa",
    price: 280,
    originalPrice: 480,
    description: "Pack de 2 almohadas de memory foam para mejor descanso",
    image: "images/producto/almohada.jpeg",
    rating: 4.8,
    stock: 20,
    badges: ["oferta", "destacado"],
    discount: 21
  },
  {
    id: 11,
    name: "Edredón Queen Reversible",
    brand: "Home Collection",
    category: "ropa",
    price: 250,
    originalPrice: 550,
    description: "Edredón reversible queen size con diseño moderno",
    image: "images/producto/juego de sabanas.jpeg",
    rating: 4.4,
    stock: 12,
    badges: ["discount"],
    discount: 18
  },

  // Víveres y Alimentos
  {
    id: 12,
    name: "Aceite 1L",
    brand: "Fino",
    category: "viveres",
    price: 18,
    originalPrice: null,
    description: "Aceite vegetal puro 100%, ideal para cocinar",
    image: "images/producto/aceite.jpeg",
    rating: 4.3,
    stock: 100,
    badges: [],
    discount: 0
  },
  {
    id: 13,
    name: "Arroz  5kg",
    brand: "Carolina",
    category: "viveres",
    price: 10,
    originalPrice: 10,
    description: "Arroz blanco de grano largo, bolsa de 5kg",
    image: "images/producto/arroz.jpeg",
    rating: 4.6,
    stock: 80,
    badges: ["oferta"],
    discount: 18
  },
  {
    id: 14,
    name: "Azúcar  2kg",
    brand: "Guabirá",
    category: "viveres",
    price: 7.5,
    originalPrice: null,
    description: "Azúcar refinada de alta calidad, bolsa de 2kg",
    image: "images/producto/azucar.jpeg",
    rating: 4.5,
    stock: 90,
    badges: [],
    discount: 0
  },
  {
    id: 15,
    name: "Fideos  500g Pack 6",
    brand: "Don Vittorio",
    category: "viveres",
    price: 8,
    originalPrice: 60,
    description: "Pack de 6 paquetes de fideos spaghetti de 500g cada uno",
    image: "images/producto/fideos.jpeg",
    rating: 4.4,
    stock: 60,
    badges: ["discount"],
    discount: 10
  },
  {
    id: 16,
    name: "Leche pil 1L Pack 12",
    brand: "Pil",
    category: "viveres",
    price: 72,
    originalPrice: 84,
    description: "Pack de 12 litros de leche entera pasteurizada",
    image: "images/producto/leche.jpeg",
    rating: 4.7,
    stock: 50,
    badges: ["oferta", "destacado"],
    discount: 14
  },
  {
    id: 17,
    name: "NesCafé 500g",
    brand: "Alexander",
    category: "viveresjpg",
    price: 38,
    originalPrice: null,
    description: "Café molido premium, bolsa de 500g",
    image: "images/producto/nescafe.jpeg",
    rating: 4.8,
    stock: 45,
    badges: ["destacado"],
    discount: 0
  },
  {
    id: 18,
    name: "Harina de Trigo 1kg",
    brand: "Flor de Oro",
    category: "viveres",
    price: 12,
    originalPrice: null,
    description: "Harina de trigo refinada, ideal para repostería",
    image: "images/producto/harina.jpeg",
    rating: 4.5,
    stock: 70,
    badges: [],
    discount: 0
  },

  // Productos de Limpieza
  {
    id: 19,
    name: "Detergente Líquido 3L",
    brand: "Ace",
    category: "limpieza",
    price: 45,
    originalPrice: 55,
    description: "Detergente líquido concentrado para ropa, 3 litros",
    image: "images/producto/ola futuro maquina.jpeg",
    rating: 4.6,
    stock: 35,
    badges: ["oferta"],
    discount: 18
  },
  {
    id: 20,
    name: "Limpiador OLA 1L",
    brand: "Cif",
    category: "limpieza",
    price: 28,
    originalPrice: null,
    description: "Limpiador multiusos para todas las superficies",
    image: "images/producto/limpiador ola.jpeg",
    rating: 4.4,
    stock: 50,
    badges: [],
    discount: 0
  },
  {
    id: 21,
    name: "Papel Higiénico 24 Rollos",
    brand: "nacional",
    category: "limpieza",
    price: 85,
    originalPrice: 100,
    description: "Pack de 24 rollos de papel higiénico triple hoja",
    image: "images/producto/papel naconal.jpeg",
    rating: 4.5,
    stock: 40,
    badges: ["discount"],
    discount: 15
  },
  {
    id: 22,
    name: "Desinfectante Pino 2L",
    brand: "OLA",
    category: "limpieza",
    price: 32,
    originalPrice: 40,
    description: "Desinfectante con aroma a pino, elimina el 99.9% de gérmenes",
    image: "images/producto/limpiador desinfectatante.jpeg",
    rating: 4.7,
    stock: 45,
    badges: ["oferta"],
    discount: 20
  },
  {
    id: 23,
    name: "Esponjas de Cocina Pack 10",
    brand: "Scotch-Brite",
    category: "limpieza",
    price: 35,
    originalPrice: null,
    description: "Pack de 10 esponjas de cocina doble cara",
    image: "images/producto/esponjas.jpeg",
    rating: 4.3,
    stock: 60,
    badges: [],
    discount: 0
  },
  {
    id: 24,
    name: "Lavavajillas Todo brillo",
    brand: "Axion",
    category: "limpieza",
    price: 22,
    originalPrice: 28,
    description: "Lavavajillas líquido concentrado con aroma a limón",
    image: "images/producto/todo brillo.jpeg",
    rating: 4.5,
    stock: 55,
    badges: ["discount"],
    discount: 21
  },
  {
    id: 25,
    name: "Cloro Blanqueador 2L",
    brand: "Clorox",
    category: "limpieza",
    price: 25,
    originalPrice: null,
    description: "Cloro blanqueador para desinfección y limpieza profunda",
    image: "images/producto/cloro.jpeg",
    rating: 4.6,
    stock: 50,
    badges: ["destacado"],
    discount: 0
  },

  // Cocina y Comedor
  {
    id: 26,
    name: "Juego de Ollas 7 Piezas",
    brand: "T-fal",
    category: "cocina",
    price: 580,
    originalPrice: 550,
    description: "Juego de ollas antiadherentes de 7 piezas con tapas",
    image: "images/producto/juego de ollas.jpeg",
    rating: 4.8,
    stock: 10,
    badges: ["destacado", "discount"],
    discount: 20
  },
  {
    id: 27,
    name: "Set de Cuchillos 6 Piezas",
    brand: "Tramontina",
    category: "cocina",
    price: 120,
    originalPrice: 280,
    description: "Set de cuchillos de acero inoxidable con soporte",
    image: "images/producto/juego de cucharas.jpeg",
    rating: 4.6,
    stock: 15,
    badges: ["oferta"],
    discount: 21
  },
  {
    id: 28,
    name: "Vajilla 24 Piezas",
    brand: "Luminarc",
    category: "cocina",
    price: 20,
    originalPrice: 550,
    description: "Vajilla de vidrio templado para 6 personas, 24 piezas",
    image: "images/producto/limpiador desinfectatante.jpeg",
    rating: 4.7,
    stock: 12,
    badges: ["discount"],
    discount: 18
  },
  {
    id: 29,
    name: "Tabla de Cortar Bambú",
    brand: "Home Collection",
    category: "cocina",
    price: 45,
    originalPrice: null,
    description: "Tabla de cortar de bambú ecológica y resistente",
    image: "images/producto/tabla de madera.jpeg",
    rating: 4.5,
    stock: 25,
    badges: [],
    discount: 0
  },
  {
    id: 30,
    name: "Cubiertos 24 Piezas Acero",
    brand: "Tramontina",
    category: "cocina",
    price: 80,
    originalPrice: 220,
    description: "Set de cubiertos de acero inoxidable para 6 personas",
    image: "images/producto/juego de cucharas.jpeg",
    rating: 4.6,
    stock: 20,
    badges: ["oferta"],
    discount: 18
  }
];

// Categories configuration
const categories = [
  {
    id: "electrodomesticos",
    name: "Electrodomésticos",
    icon: "⚡",
    description: "Equipos eléctricos para tu hogar",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  {
    id: "ropa",
    name: "Ropas",
    icon: "👔",
    description: "Sábanas, toallas  para el hogar",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)"
  },
  {
    id: "viveres",
    name: "Víveres",
    icon: "🛒",
    description: "Alimentos y productos",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)"
  },
  {
    id: "limpieza",
    name: "Limpieza",
    icon: "",
    description: "Productos de limpieza y desinfección",
    gradient: "linear-gradient(135deg, #43e97b, #38f9d7)"
  },
  {
    id: "cocina",
    name: "Cocina ",
    icon: "🍳",
    description: "Utensilios y accesorios de cocina",
    gradient: "linear-gradient(135deg, #fa709a, #fee140)"
  }
];

// Special offers
const specialOffers = [
  {
    id: "offer1",
    title: "🔥 Mega Descuento en Electrodomésticos",
    description: "Hasta 30% de descuento en electrodomésticos seleccionados",
    image: "images/producto/ventiladora Image.jpeg",
    discount: "30%",
    validUntil: "2025-12-31",
    category: "electrodomesticos"
  },
  {
    id: "offer2",
    title: "🎁 Combo Textiles del Hogar",
    description: "Compra 2 juegos de sábanas y lleva 1 set de toallas gratis",
    image: "images/producto/juegos de sabana.jpeg",
    discount: "2x1",
    validUntil: "2025-12-25",
    category: "ropa"
  },
  {
    id: "offertas",
    title: "💰 Ahorra en Víveres",
    description: "Descuentos especiales en productos de la canasta básica",
    image: "images/producto/harina.jpeg",
    discount: "20%",
    validUntil: "2025-12-20",
    category: "viveres"
  },
  {
    id: "ofertas",
    title: "✨ Pack Limpieza Completa",
    description: "Kit completo de limpieza con 25% de descuento",
    image: "images/producto/limpiador ola.jpeg",
    discount: "25%",
    validUntil: "2025-12-28",
    category: "limpieza"
  }
];

// Export data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { productsDatabase, categories, specialOffers };
}
