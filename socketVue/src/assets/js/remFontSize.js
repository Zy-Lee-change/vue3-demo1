export const remFontSize = (rem) => {
  var fontSize = Math.floor((rem * document.body.offsetWidth) / 3840);
  return fontSize + "px";
};
