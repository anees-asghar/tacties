import { useDroppable } from "@dnd-kit/core";

function GameGridCell(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id
    });
    const style = {
        backgroundColor: isOver ? 'rgba(0, 0, 0, 0.8)' : undefined,
    };

    return (
        <div className="flex items-center justify-center bg-black transition-colors ease-in-out delay-50" ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}

export default GameGridCell;