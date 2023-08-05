import { useDroppable } from "@dnd-kit/core";

function GameGridCell(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id
    });
    const style = {
        backgroundColor: isOver ? 'rgba(255, 255, 255, 0.1)' : undefined,
    };

    return (
        <div className="h-1/3 w-1/3 border-2 flex items-center justify-center" ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}

export default GameGridCell;