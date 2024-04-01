

export const is0Value = (inputValue: string, outputValue: string) => {

    if(inputValue === '00,00' || outputValue === '00,00') {
        return 'Insira um valor para continuar';
    } 
    return '';

}

export const isTheSameCoin = (inputCoin: string, outputCoin: string) => {

    if(inputCoin === outputCoin) {
        return 'Conversões para um mesmo tipo não são permitidas';
    } else {
        return '';
    }

}

export const isBalanceLessThanValue = (inputValue: number, balance: number) => {

    if(inputValue > balance) {
        return 'Saldo insuficiente';
    } else {
        return '';
    }

}