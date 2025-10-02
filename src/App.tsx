import React, { useState, useEffect } from "react";
import "./App.css";

type Question = {
  pregunta: string;
  opciones: string[];
  respuesta: string;
};

// === Tus 40 preguntas ===
const preguntasCompleto: Question[] = [
  { pregunta: "¿Qué grupo español cantaba 'Insurrección'?", opciones: ["El Último de la Fila", "Radio Futura", "Héroes del Silencio", "Los Secretos"], respuesta: "El Último de la Fila" },
  { pregunta: "¿Qué cantante madrileña hizo famoso el tema 'Como una ola'?", opciones: ["Isabel Pantoja", "Rocío Jurado", "Massiel", "Karina"], respuesta: "Rocío Jurado" },
  { pregunta: "¿Qué grupo cantaba 'Sufre Mamón'?", opciones: ["Hombres G", "Tequila", "Radio Futura", "Los Rebeldes"], respuesta: "Hombres G" },
  { pregunta: "¿Qué trío español cantaba 'Me colé en una fiesta'?", opciones: ["Mecano", "Alaska y Dinarama", "La Unión", "Nacha Pop"], respuesta: "Mecano" },
  { pregunta: "¿Quién revolucionó el flamenco en los 80 con 'La Leyenda del Tiempo'?", opciones: ["Camarón de la Isla", "Paco de Lucía", "El Fary", "José Mercé"], respuesta: "Camarón de la Isla" },
  { pregunta: "¿Qué grupo cantaba 'En algún lugar'?", opciones: ["Duncan Dhu", "Mecano", "Nacha Pop", "Héroes del Silencio"], respuesta: "Duncan Dhu" },
  { pregunta: "¿Quién cantaba 'La chica de ayer'?", opciones: ["Nacha Pop", "Radio Futura", "Los Secretos", "Mecano"], respuesta: "Nacha Pop" },
  { pregunta: "¿Qué grupo de Alaska cantaba 'Ni tú ni nadie'?", opciones: ["Alaska y Dinarama", "Kaka de Luxe", "Olé Olé", "Los Nikis"], respuesta: "Alaska y Dinarama" },
  { pregunta: "¿Qué grupo cantaba 'Escuela de calor'?", opciones: ["Radio Futura", "Loquillo", "Mecano", "Los Secretos"], respuesta: "Radio Futura" },
  { pregunta: "¿Quién cantaba 'Don Diablo'?", opciones: ["Miguel Bosé", "Camilo Sesto", "Luis Miguel", "Emmanuel"], respuesta: "Miguel Bosé" },

  { pregunta: "¿Qué película de 1982 trataba sobre un extraterrestre amigo de un niño?", opciones: ["E.T.", "Star Wars", "Regreso al Futuro", "Gremlins"], respuesta: "E.T." },
  { pregunta: "¿Qué actor protagonizó 'Terminator' en 1984?", opciones: ["Arnold Schwarzenegger", "Sylvester Stallone", "Bruce Willis", "Jean-Claude Van Damme"], respuesta: "Arnold Schwarzenegger" },
  { pregunta: "¿En qué ciudad transcurre 'Los Cazafantasmas'?", opciones: ["Nueva York", "Los Ángeles", "Chicago", "Boston"], respuesta: "Nueva York" },
  { pregunta: "¿Quién interpretó a Indiana Jones?", opciones: ["Harrison Ford", "Mel Gibson", "Kevin Costner", "Tom Selleck"], respuesta: "Harrison Ford" },
  { pregunta: "¿Qué película de 1985 introdujo el DeLorean?", opciones: ["Regreso al Futuro", "Blade Runner", "Star Wars", "Los Goonies"], respuesta: "Regreso al Futuro" },
  { pregunta: "¿Quién era el protagonista de 'El coche fantástico'?", opciones: ["David Hasselhoff", "Tom Selleck", "Michael J. Fox", "Richard Dean Anderson"], respuesta: "David Hasselhoff" },
  { pregunta: "¿Qué película de 1984 trataba de unos bichos que no debían mojarse?", opciones: ["Gremlins", "E.T.", "Los Goonies", "Exploradores"], respuesta: "Gremlins" },
  { pregunta: "¿Qué película de 1984 popularizó el tema 'Ghostbusters'?", opciones: ["Los Cazafantasmas", "Cazadores del Arca Perdida", "Los Goonies", "Exploradores"], respuesta: "Los Cazafantasmas" },
  { pregunta: "¿Qué actriz protagonizó 'Flashdance' en 1983?", opciones: ["Jennifer Beals", "Demi Moore", "Brooke Shields", "Olivia Newton-John"], respuesta: "Jennifer Beals" },
  { pregunta: "¿Qué grupo de chicos buscaba un tesoro en 1985?", opciones: ["Los Goonies", "Los Exploradores", "Stand By Me", "Cuenta Conmigo"], respuesta: "Los Goonies" },

  { pregunta: "¿Qué juguete de colores con piezas giratorias fue icono de los 80?", opciones: ["Cubo de Rubik", "Lego", "Scalextric", "Tente"], respuesta: "Cubo de Rubik" },
  { pregunta: "¿Qué muñecos vivían en casas con forma de seta?", opciones: ["Los Pitufos", "Los Gnomos", "Los Fruittis", "Los Osos Amorosos"], respuesta: "Los Pitufos" },
  { pregunta: "¿Qué muñeca coleccionable estaba inspirada en frutas?", opciones: ["Fresita", "Nancy", "Barbie", "Polly Pocket"], respuesta: "Fresita" },
  { pregunta: "¿Qué ositos lanzaban rayos desde sus barrigas?", opciones: ["Osos Amorosos", "Pitufos", "My Little Pony", "Fruittis"], respuesta: "Osos Amorosos" },
  { pregunta: "¿Qué serie de animación tenía al grito 'Por el poder de Grayskull'?", opciones: ["He-Man", "Thundercats", "G.I. Joe", "Transformers"], respuesta: "He-Man" },
  { pregunta: "¿Qué videojuego con fontanero salió en 1985?", opciones: ["Super Mario Bros.", "Sonic", "Donkey Kong", "Zelda"], respuesta: "Super Mario Bros." },
  { pregunta: "¿Qué muñecas pequeñas cabían en un estuche de bolsillo?", opciones: ["Polly Pocket", "Nancy", "Barbie", "Cabbage Patch"], respuesta: "Polly Pocket" },
  { pregunta: "¿Qué consola de Nintendo salió en los 80?", opciones: ["NES", "PlayStation", "GameCube", "Sega Saturn"], respuesta: "NES" },
  { pregunta: "¿Qué serie animada mostraba a unos gatos guerreros?", opciones: ["Thundercats", "He-Man", "Transformers", "Ulises 31"], respuesta: "Thundercats" },
  { pregunta: "¿Qué ositos de peluche eran un boom en los 80?", opciones: ["Cabbage Patch Kids", "Osos Amorosos", "Teddy Ruxpin", "Fresitas"], respuesta: "Cabbage Patch Kids" },

  { pregunta: "¿Quién ganó el Mundial de Fútbol en 1982?", opciones: ["Italia", "Alemania", "Brasil", "Argentina"], respuesta: "Italia" },
  { pregunta: "¿Qué selección ganó el Mundial de México 86?", opciones: ["Argentina", "Alemania", "Italia", "Brasil"], respuesta: "Argentina" },
  { pregunta: "¿Quién ganó Roland Garros en 1989 con 17 años?", opciones: ["Michael Chang", "Andre Agassi", "Boris Becker", "Mats Wilander"], respuesta: "Michael Chang" },
  { pregunta: "¿Qué astronauta dijo en 1981 'Houston, aquí Columbia'?", opciones: ["John Young", "Buzz Aldrin", "Neil Armstrong", "Alan Shepard"], respuesta: "John Young" },
  { pregunta: "¿Quién fue presidente de EE.UU. en los 80?", opciones: ["Ronald Reagan", "George Bush padre", "Jimmy Carter", "Bill Clinton"], respuesta: "Ronald Reagan" },
  { pregunta: "¿Qué muro cayó en 1989?", opciones: ["El Muro de Berlín", "El Muro de Varsovia", "El Muro de Moscú", "El Muro de Praga"], respuesta: "El Muro de Berlín" },
  { pregunta: "¿Quién se casó con Lady Di en 1981?", opciones: ["Carlos de Inglaterra", "Felipe de Edimburgo", "Andrés de York", "Enrique de Sussex"], respuesta: "Carlos de Inglaterra" },
  { pregunta: "¿Qué consola lanzó Sega en 1988?", opciones: ["Mega Drive", "Dreamcast", "Saturn", "Game Gear"], respuesta: "Mega Drive" },
  { pregunta: "¿Qué portátil de Nintendo salió en 1989?", opciones: ["Game Boy", "Game Gear", "PSP", "Atari Lynx"], respuesta: "Game Boy" }
];

// === util: función para barajar arrays ===
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App(): JSX.Element {
  const [preguntas, setPreguntas] = useState<Question[]>([]);
  const [indice, setIndice] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [terminado, setTerminado] = useState(false);

  // Barajar preguntas Y opciones al inicio (solo una vez)
  useEffect(() => {
    const mezcladas = shuffleArray(
      preguntasCompleto.map((q) => ({
        ...q,
        opciones: shuffleArray(q.opciones) // <-- barajamos las 4 opciones aquí
      }))
    );
    setPreguntas(mezcladas);
  }, []);

  const manejarRespuesta = (opcion: string) => {
    if (preguntas.length === 0) return;

    // comparación insensible a mayúsculas y espacios
    const opcionClean = opcion.trim().toLowerCase();
    const correctaClean = preguntas[indice].respuesta.trim().toLowerCase();

    if (opcionClean === correctaClean) {
      setPuntuacion((p) => p + 1);
    }

    const siguiente = indice + 1;
    if (siguiente < preguntas.length) {
      setIndice(siguiente);
    } else {
      setTerminado(true);
    }
  };

  const reiniciarJuego = () => {
    const mezcladas = shuffleArray(
      preguntasCompleto.map((q) => ({
        ...q,
        opciones: shuffleArray(q.opciones)
      }))
    );
    setPreguntas(mezcladas);
    setIndice(0);
    setPuntuacion(0);
    setTerminado(false);
  };

  if (preguntas.length === 0) return <div>Cargando...</div>;

  return (
    <div className="app-container">
      <h1>🎉 Trivial de los 80 🎶</h1>

      {!terminado ? (
        <div>
          <h2>{preguntas[indice].pregunta}</h2>
          <div className="opciones">
            {preguntas[indice].opciones.map((opcion, i) => (
              <button key={i} onClick={() => manejarRespuesta(opcion)}>
                <strong style={{ marginRight: 8 }}>{String.fromCharCode(65 + i)}.</strong>
                {opcion}
              </button>
            ))}
          </div>
          <p style={{ marginTop: 12 }}>Pregunta {indice + 1} / {preguntas.length}</p>
        </div>
      ) : (
        <div>
          <h2>Has acertado {puntuacion} de {preguntas.length} preguntas</h2>
          <button onClick={reiniciarJuego}>Jugar de nuevo</button>
        </div>
      )}
    </div>
  );
}
