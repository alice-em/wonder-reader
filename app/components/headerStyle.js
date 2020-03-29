const textShadowSpectrum = [
  'rgb(135, 169, 214) 0px 3px 0px',
  'rgba(0, 0, 0, 0.15) 0px 10px 10px',
  'rgba(0, 0, 0, 0.1) 0px 10px 2px',
  'rgba(0, 0, 0, 0.1) 0px 34px 30px',
];
const textShadow = textShadowSpectrum.reduce((a, c) => a + c, '');

const headerStyle = {
  color: '#fff',
  fontFamily: 'Carter One',
  textShadow,
  cursor: 'default',
};

export default headerStyle;
