import { useDroppable } from "@dnd-kit/core";

function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id
    });
    const style = {
        color: isOver ? 'red' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} className={props.className}>
            {props.children}
        </div>
    );
}

export default Droppable;