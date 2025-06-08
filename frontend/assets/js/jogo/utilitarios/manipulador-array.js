class ManipuladorArray {
    static gerar(numero) {
        let array = [];

        for (let contador = 0; contador < numero; contador++) {
            array.push(contador + 1);
        }

        return array;
    }

    static embaralhar(array) {
        const limiteArray = array.length - 1;

        for (let contador = 0; contador < array.length; contador++) {
            const gerarPosicaoAleatoria = Math.floor(Math.random() * limiteArray);
            const valorPosicaoAtual = array[contador];
            
            array[contador] = array[gerarPosicaoAleatoria];
            array[gerarPosicaoAleatoria] = valorPosicaoAtual;
        }

        return array;
    }
}

export default ManipuladorArray;