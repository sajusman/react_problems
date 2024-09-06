import { useState } from "react";

interface Node {
  left: Node | null;
  right: Node | null;
  value: number;
}

const createNode = (value: number): Node => ({
  left: null,
  right: null,
  value,
});

const insertLeft = (node: Node, value: number): Node => ({
  ...node,
  left: addToTree(node.left, value),
});

const insertRight = (node: Node, value: number): Node => ({
  ...node,
  right: addToTree(node.right, value),
});

const addToTree = (node: Node | null, value: number): Node => {
  if (node === null) return createNode(value);
  else if (value <= node.value) return insertLeft(node, value);
  return insertRight(node, value);
};

const Tree = ({ node }: { node: Node | null }) => {
  if (node === null) return null;
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white h-10 w-10 text-black rounded-full border border-white flex justify-center items-center">
        {node.value}
      </div>
      <div className="flex justify-center items-start gap-4 w-full">
        <div className="flex justify-center">
          {node.left ? (
            <Tree node={node.left} />
          ) : (
            // PLACEHOLDER_PLACE
            <div className="w-10"></div>
          )}
        </div>
        <div className="flex justify-center">
          {node.right ? (
            <Tree node={node.right} />
          ) : (
            // PLACEHOLDER_PLACE
            <div className="w-10"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TreeBalancing = () => {
  const [node, setNode] = useState<Node | null>(null);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    setInput("");
    const value = parseFloat(input);
    if (Number.isNaN(value)) return;
    setNode(addToTree(node, value));
  };

  return (
    <div className="flex flex-col gap-20">
      <div className="flex gap-2">
        <input
          placeholder="Add to tree"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="flex items-center justify-center flex-col">
        <Tree node={node} />
      </div>
    </div>
  );
};
