# Jogo popcorn
<img width="1920" height="1080" alt="Popcorn" src="https://github.com/user-attachments/assets/e8caaf02-42eb-46b6-9f77-e867bda5e51d" />


O Celebration Popcorn é um jogo onde o jogador / personagem é um milho que tem que
sobreviver por 60 segundos dentro de uma frigideira (cenário) sem que as bolas de
manteiga o atinjam para o tornar milho, para isso o jogador terá até 2 vidas / tentativas para
sobreviver durante esse período de tempo. Para se mover basta-se usar as setas no
teclado ou W, A, S, D. O jogador é limitado a andar apenas sobre a frigideira (cenário), não
podendo se estender para fora dela. O monstro (manteiga) ficará no centro da tela onde
lançará uma quantidade de bolas dispostas aleatoriamente durante um determinado tempo.

- **Link do vídeo:** https://youtu.be/KcMSYhqgp0I
- **Link documentação:** [documentação jogo popcorn.pdf](https://github.com/user-attachments/files/24282323/documentacao.jogo.popcorn.pdf)

## Construção:
- Inteiramente em Javascript + Canvas 2D HTML
- Frontend "Puro" (Nginx) -> Api (Node) -> Banco (PostgreSQL)
- Geometria plana e utilização de calculos Trigonométricos para construção de colisões simuladas no jogo
- Orientação a Objetos pura com a limitação do Javascript ES6

**********************************************
