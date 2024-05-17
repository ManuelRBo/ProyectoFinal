export default function convertirHora(timestamp) {
  const ahora = new Date(timestamp);
  const hora = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  return `${hora}:${minutos}`;
}
