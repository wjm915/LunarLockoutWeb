//import { GameBoard } from './GameBoard';
import { mapMember, copyGameBoard } from './helperFunctions'

export interface moveInterface {
    r0: number,
    c0: number,
    robot: (string | null | undefined),
    r1: number,
    c1: number
}

export const solvePuzzle = (function () {

    //----------------------------------------------
    // Interface for the singleton!
    let instance: solvePuzzleInterface;

    // Interfaces
    interface solvePuzzleInterface {
        solver: (gameBoard: (string | null | undefined)[][]) => moveInterface[]
    }

    let bitBucket: any

    //----------------------------------------------
    // Functions
    // This is the entry point
    const solver = (gameBoard: (string | null | undefined)[][]): moveInterface[] => {
        let movesList = null
        let solution = solve(25, gameBoard, [gameBoard])

        console.log(solution)

        if (solution !== null) {
            movesList = buildMovesList(solution)
        }

        return (movesList)
    }


    const findMoves = (gameBoard: (string | null | undefined)[][]): moveInterface[] => {
        let ans = new Array<moveInterface>();
        for (var r = 0; r < gameBoard.length; r++) {
            for (var c = 0; c < gameBoard.length; c++) {
                if (gameBoard[r][c] != ' ' && gameBoard[r][c] != '#') {
                    ans.push(lookLeft(gameBoard, r, c))
                    ans.push(lookRight(gameBoard, r, c))
                    ans.push(lookUp(gameBoard, r, c))
                    ans.push(lookDown(gameBoard, r, c))
                    ans = ans.filter((m) => { return (m !== null) })
                }
            }
        }
        return ans
    }

    // Note: row & col are indices of a robot!!
    const lookLeft = (board: (string | null | undefined)[][], row: number, col: number): moveInterface => {
        let c = col - 1
        while (c >= 0 && (board[row][c] == ' ' || board[row][c] == '#')) c--;

        if (c < 0 || c == col - 1) {
            return null
        } else {
            return { r0: row, c0: col, robot: board[row][col], r1: row, c1: c + 1 }
        }
    }


    const lookRight = (board: (string | null | undefined)[][], row: number, col: number): moveInterface => {
        let c = col + 1

        while (c < board.length && (board[row][c] == ' ' || board[row][c] == '#')) c++;

        if (c >= board.length || c == col + 1) {
            return null
        } else {
            return { r0: row, c0: col, robot: board[row][col], r1: row, c1: c - 1 }
        }
    }


    const lookUp = (board: (string | null | undefined)[][], row: number, col: number): moveInterface => {
        let r = row - 1

        while (r >= 0 && (board[r][col] == ' ' || board[r][col] == '#')) r--;

        if (r < 0 || r == row - 1) {
            return null
        } else {
            return { r0: row, c0: col, robot: board[row][col], r1: r + 1, c1: col }
        }
    }


    const lookDown = (board: (string | null | undefined)[][], row: number, col: number): moveInterface => {
        let r = row + 1

        while (r < board.length && (board[r][col] == ' ' || board[r][col] == '#')) r++;

        if (r >= board.length || r == row + 1) {
            return null
        } else {
            return { r0: row, c0: col, robot: board[row][col], r1: r - 1, c1: col }
        }
    }

    const applyMove = (move: (moveInterface | undefined), board: (string | null | undefined)[][]):
        (string | null | undefined)[][] => {
        let newBoard = copyGameBoard(board)

        // Apply the move by swapping the labels (or ids as in Scala)
        if (move != undefined) {
            if (move.r1 === 2 && move.c1 === 2) {
                let tempLabel = ' '
                newBoard[move.r1][move.c1] = newBoard[move.r0][move.c0]
                newBoard[move.r0][move.c0] = tempLabel
            } else {
                let tempLabel = newBoard[move.r1][move.c1]
                newBoard[move.r1][move.c1] = newBoard[move.r0][move.c0]
                newBoard[move.r0][move.c0] = tempLabel
            }

            return (newBoard)
        }
        return null
    }


    const solve = (sanity: number, currentBoard: (string | null | undefined)[][],
        currentSet: [(string | null | undefined)[][]]): [(string | null | undefined)[][]] => {

        if (sanity < 1) return null

        //Check for a winning state
        if (currentBoard[2][2] == 'X') {
            return currentSet
        }

        // Generate all the valid moves given the current game   
        let moves = findMoves(currentBoard)

        if (moves == null) return null

        let move = null;
        let newBoard = null;

        switch (moves) {
            case null: {
                return null
            }
            default: {
                while (moves !== null && moves.length > 0) {
                    move = moves.pop()

                    newBoard = applyMove(move, currentBoard)

                    if (!mapMember(newBoard, currentSet)) {
                        bitBucket = currentSet.push(newBoard);
                        var ans: [(string | null | undefined)[][]] = solve((sanity - 1), newBoard, currentSet)

                        switch (ans) {
                            case null: {
                                bitBucket = currentSet.pop()
                                break
                            }

                            default: {
                                return ans
                            }
                        }
                    }
                }
            }
        }
        return null
    }

    // Build the move list from the solution
    const buildMovesList = (solution: [(string | null | undefined)[][]]): moveInterface[] => {
        let movesList = new Array<moveInterface>();
        if (solution == null) return movesList

        if (solution.length > 0) {
            for (let index: number = 1; index < solution.length; index++) {
                let m0 = solution[index - 1]
                let m1 = solution[index]
                movesList.push(getDiff(m0, m1))
            }
        }
        return movesList
    }


    const getDiff = (m0: (string | null | undefined)[][], m1: (string | null | undefined)[][]): moveInterface => {
        let ans: moveInterface = { r0: 0, c0: 0, robot: '-', r1: 0, c1: 0 }
        let tempStack = new Array<number>()

        for (let r = 0; r < m0.length; r++) {
            for (let c = 0; c < m0.length; c++) {
                if (m0[r][c] !== m1[r][c]) {
                    tempStack.push(r)
                    tempStack.push(c)
                }
            }
        }

        ans.r0 = tempStack[0]
        ans.c0 = tempStack[1]
        ans.r1 = tempStack[2]
        ans.c1 = tempStack[3]

        return ans
    }



    //----------------------------------------------
    // Initialization function
    const init = (): solvePuzzleInterface => {

        return {
            solver: solver
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }

})();