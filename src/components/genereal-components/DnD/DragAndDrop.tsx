import React, { useState, useRef } from "react";

interface Item {
  id: string;
  text: string;
}

const standardStyle = {
  border: "1px solid #ccc",
  padding: "6px",
  paddingTop: "3px",
  paddingBottom: "3px",
  borderRadius: 5,
  marginBottom: "4px",
  color: "white",
};

const activeStyle = {
  ...standardStyle,
  backgroundColor: "#3651ec",
  cursor: "pointer",
};

const DragAndDropComponent = ({
  items,
  dragActive,
  setItems,
}: {
  items: Item[];
  dragActive: boolean;
  setItems: (val: Item[]) => void;
}) => {
  const dragItem = useRef<Item | null>(null);

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    if (!dragActive) return;
    dragItem.current = item;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragActive) return;
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!dragActive) return;

    if (dragItem.current) {
      const newItems = [...items];
      const draggedItem = newItems.find(
        (item) => item.id === dragItem.current!.id
      );

      if (draggedItem) {
        newItems.splice(items.indexOf(draggedItem), 1);
        newItems.splice(index, 0, draggedItem);
        setItems(newItems);
      }

      dragItem.current = null;
      console.log(newItems);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
        marginTop: 3,
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable={dragActive}
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          style={dragActive ? activeStyle : standardStyle}
        >
          <div>{item.text}</div>
        </div>
      ))}
    </div>
  );
};

export default DragAndDropComponent;
