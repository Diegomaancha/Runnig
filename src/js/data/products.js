export const products = [
  {
    id: "vento-pro",
    name: "Zapatillas Vento Pro",
    desc: "Reactividad alta y amortiguación estable. Perfectas para entrenos exigentes y días rápidos.",
    price: 129.99,
    category: "ropa",
    badge: "Top ventas",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
    specs: {
      Drop: "8 mm",
      Peso: "248 g",
      Uso: "Entrenamiento / series",
      Terreno: "Asfalto"
    }
  },
  {
    id: "aerodry-tee",
    name: "Camiseta AeroDry",
    desc: "Tejido técnico ultra transpirable con costuras planas anti-rozaduras. Secado rápido real.",
    price: 34.95,
    category: "ropa",
    badge: "Novedad",
    img: "../Images/images.jpg",
    specs: {
      Material: "Poliéster técnico",
      Corte: "Regular",
      Secado: "Rápido",
      Uso: "Running"
    }
  },
  {
    id: "compress-x",
    name: "Malla Compress X",
    desc: "Compresión media para mejorar sujeción en tiradas largas. Bolsillos para geles.",
    price: 49.90,
    category: "ropa",
    badge: "Top ventas",
    img: "../Images/mallas.jpg",
    specs: {
      Compresión: "Media",
      Bolsillo: "Trasero + lateral",
      Uso: "Larga distancia",
      Temporada: "Todo el año"
    }
  },
  {
    id: "pacetrack-gps",
    name: "Reloj PaceTrack GPS",
    desc: "GPS + métricas clave. Interfaz clara y perfiles de entrenamiento. Batería para semanas.",
    price: 169.00,
    category: "tecnologia",
    badge: "Top ventas",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
    specs: {
      GPS: "Sí",
      Batería: "7 días",
      Resistencia: "5 ATM",
      Uso: "Entreno / carrera"
    }
  },
  {
    id: "hidrarun-belt",
    name: "Cinturón HidraRun",
    desc: "Hidratación cómoda + bolsillo para geles y móvil. Ajuste estable sin rebotes.",
    price: 24.50,
    category: "accesorios",
    badge: "Top ventas",
    img: "../Images/descarga.jpg",
    specs: {
      Capacidad: "500 ml",
      Bolsillos: "2",
      Ajuste: "Elástico",
      Uso: "Running"
    }
  },
  {
    id: "antiblister-socks",
    name: "Calcetines AntiBlister",
    desc: "Refuerzo y ventilación para minimizar rozaduras. Costuras confort y tejido técnico.",
    price: 12.99,
    category: "ropa",
    badge: "Novedad",
    img: "../Images/Calcetos.jpg",
    specs: {
      Tejido: "Técnico",
      Refuerzo: "Talón/Puntera",
      Altura: "Tobillo",
      Uso: "Running"
    }
  }
];

export const getProductById = (id) => products.find((p) => p.id === id);