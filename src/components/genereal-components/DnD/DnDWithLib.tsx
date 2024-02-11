import React, { useState } from "react";
import Draggable from "react-draggable";

interface Item {
  id: string;
  text: string;
}

const DraggableContainer = ({ items }: { items: Item[] }) => {
  const [containerPosition, setContainerPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: any, data: any) => {
    // Aktualisiere die Position des Containers
    setContainerPosition({ x: data.x, y: data.y });
  };

  const handleStop = () => {
    // Hier kannst du zusätzliche Aktionen durchführen, wenn das Ziehen abgeschlossen ist
  };

  const handleDrop =
    (index: number) => (e: React.DragEvent<HTMLDivElement>) => {
      // Verhindere den Standard-Drop und handle den Tausch der Elemente
      e.preventDefault();
      const draggedItem = items.find(
        (item) => item.id === e.dataTransfer.getData("text")
      );
      const updatedItems = [...items];

      if (draggedItem) {
        const draggedIndex = items.indexOf(draggedItem);
        updatedItems.splice(index, 0, draggedItem);
        updatedItems.splice(
          draggedIndex < index ? draggedIndex : draggedIndex + 1,
          1
        );
      }

      // Aktualisiere das Array mit den verschobenen Elementen
      // Hier kannst du die Logik für die Aktualisierung des Redux-States oder anderen Aktionen hinzufügen
      console.log(updatedItems);
    };

  return (
    <Draggable
      position={containerPosition}
      onDrag={handleDrag}
      onStop={handleStop}
      bounds="parent" // Beschränke das Ziehen auf den Elterncontainer
    >
      <div style={{ position: "relative" }}>
        {items.map((item, index) => (
          <div
            key={item.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop(index)}
            draggable
            style={{
              width: "100px",
              height: "50px",
              margin: "10px",
              border: "1px solid #ccc",
              position: "absolute",
              top: "0",
              left: `${index * 120}px`, // Setze die Position basierend auf dem Index
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </Draggable>
  );
};

export default DraggableContainer;
