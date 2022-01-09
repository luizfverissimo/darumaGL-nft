import web3 from './web3';
import Daruma from './build/Daruma.json';

const instance = new web3.eth.Contract(
  JSON.parse(Daruma),
  '0xb9f71AC8F7eb233BA3C4bcf2154717CcA2864A3c'
);

export default instance;