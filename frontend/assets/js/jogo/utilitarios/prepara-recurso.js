class PreparaRecurso {
    recursos = {};
    caminhos = {};
    totalDeRecursosCarregados = 0;

    static recursosParaCarregar = [];

    constructor(caminhos) {
        this.caminhos = caminhos;
        PreparaRecurso.recursosParaCarregar.push(this);
    } 

    carregarTodos(objetoDeInstancia) {
        for (const nomeCaminho in this.caminhos) {
            const caminho = this.caminhos[nomeCaminho];
            this.carregarRecurso(objetoDeInstancia, nomeCaminho, caminho);
        }
    }

    carregarRecurso(objetoDeInstancia, nomeCaminho, caminho) {
        const recurso = new objetoDeInstancia();

        recurso.src = caminho;
        recurso.onload = () => this.verificarRecursosCarregados();

        this.recursos[nomeCaminho] = recurso;
    }

    verificarRecursosCarregados() {
        this.recursosCarregados++;

        const totalDeRecursosParaCarregar = Object.keys(this.recursos).length;
        if (totalDeRecursosParaCarregar == this.totalDeRecursosCarregados) PreparaRecurso.recursosParaCarregar.shift();
    }

    static verificarTodosRecursosCarregados(funcaoParaExecutar) {
        const todosRecursosCarregados = PreparaRecurso.recursosParaCarregar.length == 0;
        if (todosRecursosCarregados) funcaoParaExecutar();
    }
}

export default PreparaRecurso;