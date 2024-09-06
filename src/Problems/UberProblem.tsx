import { useState, useEffect } from "react";

const BOX_DATA = [
  [0, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 1],
];

const selectedColor = "#0bcc59";

const calculateSizeOfMatrix = (matrix: number[][]) => {
  let sum = 0;
  for (const array of matrix) {
    for (const item of array) {
      sum += item;
    }
  }
  return sum;
};

const waitFor = (cb: () => void) => {
  return new Promise((res) => {
    setTimeout(() => {
      cb();
      res(true);
    }, 600);
  });
};

export function UberProblem() {
  const [selectedItems, setSelectedItems] = useState<Set<String>>(new Set());
  const totalCells = calculateSizeOfMatrix(BOX_DATA);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (selectedItems.size !== totalCells) return;
    const handleDeselection = async () => {
      setIsProcessing(true);
      const itemsInArray = Array.from(selectedItems);
      for (const item of itemsInArray) {
        await waitFor(() => {
          setSelectedItems((prev) => {
            if (prev.has(item)) {
              prev.delete(item);
              return new Set([...prev]);
            }
            return new Set(prev);
          });
        });
      }
      setIsProcessing(false);
    };
    handleDeselection();
  }, [selectedItems]);

  const handleSelect = (row: number, cell: number) => {
    if (isProcessing) return;
    const item = JSON.stringify({ row, cell });
    setSelectedItems((prev) => new Set(prev.add(item)));
  };
  const isSelected = (row: number, cell: number) => {
    const item = JSON.stringify({ row, cell });
    return selectedItems.has(item);
  };

  return (
    <div>
      {BOX_DATA.map((row, rowIndex) => (
        <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
          {row.map((cell, cellIndex) =>
            cell === 1 ? (
              <div
                style={{
                  border: "1px solid",
                  padding: "12px",
                  cursor: "pointer",
                  background: isSelected(rowIndex, cellIndex)
                    ? selectedColor
                    : "white",
                }}
                onClick={() => handleSelect(rowIndex, cellIndex)}
              />
            ) : (
              <div style={{ padding: "13px" }} />
            )
          )}
        </div>
      ))}
    </div>
  );
}
