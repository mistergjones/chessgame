export default class Piece {
    constructor(player, chessImage) {
        this.player = player;
        this.style = { backgroundImage: "url('" + chessImage + "')" };
        // this.style = { backgroundImage: `url(${chesspiece})` };
    }
}
