import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  const renderSquare = (index) => (
    <Button
      variant="outline"
      className="w-16 h-16 text-2xl"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </Button>
  );

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-center text-3xl mb-4">Tic-Tac-Toe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">{status}</div>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, index) => renderSquare(index))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;