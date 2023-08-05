import { useDraggable } from "@dnd-kit/core";

function Draggable({id, children, disabled, moreStyle}) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
        disabled: disabled
    });

    const style = transform ? {
        ...moreStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : moreStyle;
    
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}

export default Draggable;