import { Draggable } from '.';

function Piece({id, piecePriority, disabled}) {
    const diameter = (() => {
        if      (piecePriority === 0) return "30px"; 
        else if (piecePriority === 1) return "55px"; 
        else if (piecePriority === 2) return "85px";
    })();

    return (
        <Draggable id={id} disabled={disabled} moreStyle={{
            width: diameter,
            height: diameter,
            background: id[1] === "1" ? "#39AC80" : "#D68877",
            borderRadius: "100%"
        }} />
    );
}

export default Piece;