import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { pageCopy } from "../data/portfolio.js";

const PLAY_TABS = [
  { id: "2048", label: "2048", note: "数字合并" },
  { id: "snake", label: "贪吃蛇", note: "方向操控" },
  { id: "tictactoe", label: "井字棋", note: "双人对战" },
];

function randomChoice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createEmptyBoard(size) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function getEmptyCells(board) {
  const cells = [];

  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) {
        cells.push([rowIndex, colIndex]);
      }
    });
  });

  return cells;
}

function spawnTile(board) {
  const emptyCells = getEmptyCells(board);

  if (emptyCells.length === 0) {
    return board;
  }

  const [row, col] = randomChoice(emptyCells);
  const next = cloneBoard(board);
  next[row][col] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function create2048State() {
  let board = createEmptyBoard(4);
  board = spawnTile(board);
  board = spawnTile(board);
  return { board, score: 0, over: false };
}

function collapseLine(line) {
  const values = line.filter(Boolean);
  const merged = [];
  let scoreGain = 0;

  for (let index = 0; index < values.length; index += 1) {
    if (values[index] === values[index + 1]) {
      const value = values[index] * 2;
      merged.push(value);
      scoreGain += value;
      index += 1;
    } else {
      merged.push(values[index]);
    }
  }

  while (merged.length < line.length) {
    merged.push(0);
  }

  return { line: merged, scoreGain };
}

function move2048(board, direction) {
  const size = board.length;
  const next = createEmptyBoard(size);
  let moved = false;
  let scoreGain = 0;

  for (let index = 0; index < size; index += 1) {
    let original;

    if (direction === "left" || direction === "right") {
      original = [...board[index]];
    } else {
      original = board.map((row) => row[index]);
    }

    const working =
      direction === "right" || direction === "down"
        ? [...original].reverse()
        : original;
    const collapsed = collapseLine(working);
    const finalLine =
      direction === "right" || direction === "down"
        ? [...collapsed.line].reverse()
        : collapsed.line;

    if (finalLine.some((value, valueIndex) => value !== original[valueIndex])) {
      moved = true;
    }

    scoreGain += collapsed.scoreGain;

    for (let valueIndex = 0; valueIndex < size; valueIndex += 1) {
      if (direction === "left" || direction === "right") {
        next[index][valueIndex] = finalLine[valueIndex];
      } else {
        next[valueIndex][index] = finalLine[valueIndex];
      }
    }
  }

  return { board: next, moved, scoreGain };
}

function canMove2048(board) {
  if (getEmptyCells(board).length > 0) {
    return true;
  }

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      const current = board[row][col];

      if (board[row + 1]?.[col] === current || board[row]?.[col + 1] === current) {
        return true;
      }
    }
  }

  return false;
}

function DirectionPad({ onMove, labels = {} }) {
  return (
    <div className="direction-pad" aria-label="方向控制">
      <button type="button" onClick={() => onMove("up")}>
        {labels.up ?? "上"}
      </button>
      <div className="direction-pad-row">
        <button type="button" onClick={() => onMove("left")}>
          {labels.left ?? "左"}
        </button>
        <button type="button" onClick={() => onMove("down")}>
          {labels.down ?? "下"}
        </button>
        <button type="button" onClick={() => onMove("right")}>
          {labels.right ?? "右"}
        </button>
      </div>
    </div>
  );
}

function GameShell({ eyebrow, title, description, aside, children }) {
  return (
    <div className="game-shell">
      <div className="game-header">
        <div>
          <p className="game-eyebrow">{eyebrow}</p>
          <h3>{title}</h3>
          <p className="game-description">{description}</p>
        </div>
        {aside ? <div className="game-aside">{aside}</div> : null}
      </div>
      {children}
    </div>
  );
}

function Game2048({ active }) {
  const [state, setState] = useState(create2048State);

  const handleMove = useCallback((direction) => {
    setState((current) => {
      if (current.over) {
        return current;
      }

      const movedState = move2048(current.board, direction);

      if (!movedState.moved) {
        return current;
      }

      const boardWithTile = spawnTile(movedState.board);
      const over = !canMove2048(boardWithTile);

      return {
        board: boardWithTile,
        score: current.score + movedState.scoreGain,
        over,
      };
    });
  }, []);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    function onKeyDown(event) {
      const mapping = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      if (mapping[event.key]) {
        event.preventDefault();
        handleMove(mapping[event.key]);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, handleMove]);

  return (
    <GameShell
      eyebrow="数字实验"
      title="2048"
      description="合并相同数字，尽量冲到 2048。支持键盘方向键和屏幕按钮。"
      aside={
        <div className="game-stats">
          <span>分数 {state.score}</span>
          <span>{state.over ? "本局结束" : "继续合成"}</span>
        </div>
      }
    >
      <div className="game-layout game-layout-2048">
        <div className="board-2048" role="img" aria-label="2048 游戏盘">
          {state.board.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                className={`tile-2048 tile-value-${cell || "empty"}`}
                key={`${rowIndex}-${colIndex}`}
              >
                {cell || ""}
              </div>
            )),
          )}
        </div>

        <div className="game-side-panel">
          <div className="game-actions">
            <button type="button" onClick={() => setState(create2048State())}>
              重新开始
            </button>
          </div>
          <DirectionPad onMove={handleMove} />
        </div>
      </div>
    </GameShell>
  );
}

function createSnakeState() {
  return {
    snake: [
      [4, 4],
      [4, 3],
      [4, 2],
    ],
    direction: "right",
    food: [2, 7],
    running: false,
    score: 0,
    over: false,
  };
}

function pointKey([row, col]) {
  return `${row}-${col}`;
}

function nextFood(snake, size) {
  const occupied = new Set(snake.map(pointKey));
  const candidates = [];

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (!occupied.has(`${row}-${col}`)) {
        candidates.push([row, col]);
      }
    }
  }

  return candidates.length ? randomChoice(candidates) : null;
}

function GameSnake({ active }) {
  const size = 10;
  const [state, setState] = useState(createSnakeState);
  const directionRef = useRef(state.direction);

  useEffect(() => {
    directionRef.current = state.direction;
  }, [state.direction]);

  const setDirection = useCallback((nextDirection) => {
    const opposite = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };

    setState((current) => {
      if (opposite[current.direction] === nextDirection || current.over) {
        return current;
      }

      return { ...current, direction: nextDirection };
    });
  }, []);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    function onKeyDown(event) {
      const mapping = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      if (mapping[event.key]) {
        event.preventDefault();
        setDirection(mapping[event.key]);
      }

      if (event.code === "Space") {
        event.preventDefault();
        setState((current) => ({ ...current, running: current.over ? false : !current.running }));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, setDirection]);

  useEffect(() => {
    if (!active || !state.running || state.over) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setState((current) => {
        const offsets = {
          up: [-1, 0],
          down: [1, 0],
          left: [0, -1],
          right: [0, 1],
        };
        const [headRow, headCol] = current.snake[0];
        const [rowOffset, colOffset] = offsets[current.direction];
        const nextHead = [headRow + rowOffset, headCol + colOffset];

        const hitWall =
          nextHead[0] < 0 ||
          nextHead[0] >= size ||
          nextHead[1] < 0 ||
          nextHead[1] >= size;
        const hitSelf = current.snake.some(
          (segment, index) =>
            index < current.snake.length - 1 &&
            segment[0] === nextHead[0] &&
            segment[1] === nextHead[1],
        );

        if (hitWall || hitSelf) {
          return { ...current, running: false, over: true };
        }

        const ateFood =
          nextHead[0] === current.food[0] && nextHead[1] === current.food[1];
        const nextSnake = [nextHead, ...current.snake];

        if (!ateFood) {
          nextSnake.pop();
        }

        return {
          ...current,
          snake: nextSnake,
          food: ateFood ? nextFood(nextSnake, size) ?? current.food : current.food,
          score: ateFood ? current.score + 1 : current.score,
        };
      });
    }, 220);

    return () => window.clearInterval(timer);
  }, [active, size, state.over, state.running]);

  const snakeSet = useMemo(() => new Set(state.snake.map(pointKey)), [state.snake]);
  const foodKey = pointKey(state.food);

  return (
    <GameShell
      eyebrow="轻交互"
      title="贪吃蛇"
      description="吃到光点就加分，撞墙或撞到自己就结束。支持空格暂停。"
      aside={
        <div className="game-stats">
          <span>得分 {state.score}</span>
          <span>{state.over ? "已结束" : state.running ? "进行中" : "待开始"}</span>
        </div>
      }
    >
      <div className="game-layout game-layout-snake">
        <div className="board-snake" role="img" aria-label="贪吃蛇棋盘">
          {Array.from({ length: size * size }, (_, index) => {
            const row = Math.floor(index / size);
            const col = index % size;
            const key = `${row}-${col}`;
            const isHead =
              state.snake[0][0] === row && state.snake[0][1] === col;

            let className = "snake-cell";

            if (snakeSet.has(key)) {
              className += isHead ? " snake-head" : " snake-body";
            } else if (foodKey === key) {
              className += " snake-food";
            }

            return <div className={className} key={key} />;
          })}
        </div>

        <div className="game-side-panel">
          <div className="game-actions">
            <button
              type="button"
              onClick={() =>
                setState((current) => ({
                  ...current,
                  running: current.over ? false : !current.running,
                }))
              }
            >
              {state.running ? "暂停" : "开始"}
            </button>
            <button type="button" onClick={() => setState(createSnakeState())}>
              重开
            </button>
          </div>
          <DirectionPad onMove={setDirection} />
        </div>
      </div>
    </GameShell>
  );
}

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line };
    }
  }

  return null;
}

function GameTicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = useMemo(() => calculateWinner(board), [board]);
  const isDraw = !winner && board.every(Boolean);
  const activeLine = winner?.line ?? [];

  function handleCellClick(index) {
    if (board[index] || winner) {
      return;
    }

    const next = [...board];
    next[index] = xIsNext ? "X" : "O";
    setBoard(next);
    setXIsNext((current) => !current);
  }

  const status = winner
    ? `${winner.player} 获胜`
    : isDraw
      ? "平局"
      : `轮到 ${xIsNext ? "X" : "O"}`;

  return (
    <GameShell
      eyebrow="桌面对战"
      title="井字棋"
      description="一个适合随手玩的双人小游戏，也可以拿来测试手机触控和页面响应。"
      aside={<div className="game-stats"><span>{status}</span></div>}
    >
      <div className="game-layout game-layout-ttt">
        <div className="board-ttt" role="grid" aria-label="井字棋棋盘">
          {board.map((cell, index) => (
            <button
              className={`ttt-cell ${activeLine.includes(index) ? "is-winning" : ""}`}
              key={index}
              onClick={() => handleCellClick(index)}
              type="button"
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="game-side-panel">
          <div className="game-actions">
            <button
              type="button"
              onClick={() => {
                setBoard(Array(9).fill(""));
                setXIsNext(true);
              }}
            >
              再来一局
            </button>
          </div>
          <div className="game-hint-card">
            <strong>玩法</strong>
            <p>两人轮流落子，先连成一条线的一方获胜。</p>
          </div>
        </div>
      </div>
    </GameShell>
  );
}

export function PlayLabSection() {
  const [activeTab, setActiveTab] = useState("2048");

  return (
    <section className="section play-section" id="play">
      <div className="section-inner play-lab-panel">
        <div className="section-heading play-heading">
          <div>
            <p className="section-note">{pageCopy.play.note}</p>
            <h2>{pageCopy.play.title}</h2>
          </div>
          <p className="play-intro">{pageCopy.play.body}</p>
        </div>

        <div className="play-tab-bar" role="tablist" aria-label="小游戏切换">
          {PLAY_TABS.map((tab) => (
            <button
              aria-selected={activeTab === tab.id}
              className={`play-tab ${activeTab === tab.id ? "is-active" : ""}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              type="button"
            >
              <strong>{tab.label}</strong>
              <span>{tab.note}</span>
            </button>
          ))}
        </div>

        <div className="play-stage">
          {activeTab === "2048" ? <Game2048 active /> : null}
          {activeTab === "snake" ? <GameSnake active /> : null}
          {activeTab === "tictactoe" ? <GameTicTacToe /> : null}
        </div>
      </div>
    </section>
  );
}
