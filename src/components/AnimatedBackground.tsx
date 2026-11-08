/** Фон внутренних страниц: едва заметный узор из восьмиконечных звёзд.
 *  (Раньше здесь были светящиеся пятна и случайные частицы — Math.random
 *  в рендере к тому же давал расхождение разметки сервера и клиента.) */
const AnimatedBackground = () => (
  <div className="wn-tile pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
);

export default AnimatedBackground;
