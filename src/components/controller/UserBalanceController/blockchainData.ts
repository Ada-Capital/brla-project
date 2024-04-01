const BRLA_CONTRACT_ADDRESSES = {
    1: '0x75367437Ec165ea275B64aB54DefD937107fE416',
    11155111: '0x75367437Ec165ea275B64aB54DefD937107fE416',
    137: '0xE6A537a407488807F0bbeb0038B79004f19DDDFb',
    80001: '0x658e5EA3c7690f0626aFF87cEd6FC30021A93657',
    66: '0x459b1AC9E3cb8ecC95b7D4f92Bd5A852D9A7078c',
    65: '0x459b1AC9E3cb8ecC95b7D4f92Bd5A852D9A7078c',
  };

const USDC_CONTRACT_ADDRESSES = {
    1: '',
    11155111: '',
    137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    80001: '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23',
    66: '',
    65: '',
  };

const USDT_CONTRACT_ADDRESSES = {
    1: '',
    11155111: '',
    137: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    80001: '0xF829E45519804caC42376d67D054D70e64C19d29',
    66: '',
    65: '',
  };


// 137 -> produção
// 80001 -> sandbox
export const BRLA_CONTRACT_ADDRESS = BRLA_CONTRACT_ADDRESSES[80001];
export const USDC_CONTRACT_ADDRESS = USDC_CONTRACT_ADDRESSES[80001];
export const USDT_CONTRACT_ADDRESS = USDT_CONTRACT_ADDRESSES[80001];

const POLYGON_URL_SANDBOX = 'https://rpc.ankr.com/polygon_mumbai';
const POLYGON_URL_PRODUCTION = 'https://rpc.ankr.com/polygon'

export const POLYGON_URL = POLYGON_URL_SANDBOX;