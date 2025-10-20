// En una aplicación real, estos datos vendrían de una API o base de datos.
export const libros = [
  // Ficción
  {
    id: 1,
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    genero: 'Realismo Mágico',
    categoria: 'ficcion',
    imagenUrl: '/imagen/3812f54c9c10992f538ead2c95d775ed.webp'
  },
  {
    id: 2,
    titulo: '1984',
    autor: 'George Orwell',
    genero: 'Distopía',
    categoria: 'ficcion',
    // Corregido: Usamos el nombre de archivo que sí existe
    imagenUrl: '/imagen/Diapositiva1-34-e1593899389735.jpg' 
  },
  // No Ficción
  {
    id: 3,
    titulo: 'Sapiens: De animales a dioses',
    autor: 'Yuval Noah Harari',
    genero: 'Historia, Antropología',
    // Corregido: No teníamos esta imagen, usamos una de las existentes como ejemplo
    categoria: 'no-ficcion',
    imagenUrl: '/imagen/8571a0be08f051d5befeb4676fcf15f9.webp' 
  },
  {
    id: 4,
    titulo: 'El diario de Ana Frank',
    autor: 'Ana Frank',
    genero: 'Biografía, Historia',
    // Corregido: No teníamos esta imagen, usamos una de las existentes como ejemplo
    categoria: 'no-ficcion',
    imagenUrl: '/imagen/978848365337.gif'
  },
  // Ciencia y Tecnología
  {
    id: 5,
    titulo: 'Cosmos',
    autor: 'Carl Sagan',
    genero: 'Astronomía, Ciencia',
    // Corregido: No teníamos esta imagen, usamos una de las existentes como ejemplo
    categoria: 'ciencia-tecnologia',
    imagenUrl: '/imagen/661a3760157941a94cb8db3f5a9d5060.webp'
  },
  {
    id: 6,
    titulo: 'Clean Code',
    autor: 'Robert C. Martin',
    genero: 'Informática, Programación',
    // Corregido: No teníamos esta imagen, usamos una de las existentes como ejemplo
    categoria: 'ciencia-tecnologia',
    imagenUrl: '/imagen/aabc3a10f47e5d37cde9f3bc9bdf2667.webp'
  },
  // Infantil y Juvenil
  {
    id: 7,
    titulo: 'El Principito',
    autor: 'Antoine de Saint-Exupéry',
    genero: 'Fábula, Infantil',
    categoria: 'infantil-juvenil',
    imagenUrl: '/imagen/02fb19970ccf22763313a73744bfdaf7.webp'
  },
  {
    id: 8,
    titulo: 'Matilda',
    autor: 'Roald Dahl',
    genero: 'Infantil, Humor',
    categoria: 'infantil-juvenil',
    imagenUrl: '/imagen/978842041710.gif'
  },
];

