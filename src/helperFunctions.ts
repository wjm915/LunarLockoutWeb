import { Console } from "console";

    export interface rowColInterface {r:number, c:number}

    export let number2int = Math.trunc;
    
    export const indexToRowCol = (index:number):rowColInterface => {
        let row = number2int(index / 10) - 1
        let col = (index % 10) - 1
        console.log({r:row, c:col})
        return({r:row, c:col}) 
    }

    export const listMember = (item:any, listOfItems:any[]):boolean => {
        if (item === null) { return(true) }

        if (listOfItems.includes(item)) { return true }

        return(false)
    }


    // Checks to see if an item (aka robot) is on the game board.
    export const mapMember = (board:(string | null | undefined)[][], setOfBoards:(string | null | undefined)[][][]):boolean => {
        if (board === null) return(true)
        
        for (let i=0; i<setOfBoards.length; i++ ) {
            let diffs = 0;
            let sBoard:(string | null | undefined)[][] = setOfBoards[i]

            for(let r = 0; r<sBoard.length; r++) {
                for(let c = 0; c<sBoard.length; c++) {
                    if (board[r][c] !== sBoard[r][c]) { ++diffs }
                }   
            }
            if (diffs == 0) return true;
        }
        return(false)
    }

    export const copyGameBoard = (gameBoard: (string | null | undefined)[][]):(string | null | undefined)[][] => {
        let ans = new Array<Array<(string | null | undefined)>>()

        for (let r = 0; r < gameBoard.length; r++) {
            let row = new Array<(string | null | undefined)>()
            for (let c = 0; c < gameBoard.length; c++) {
                row.push(gameBoard[r][c])
            }
            ans.push(row)
        }

        return ans
    }

    export const editGameBoard = (gameBoard: (string | null | undefined)[][], r: number, c:number, value:string):(string | null | undefined)[][] => {
        gameBoard[r][c] = value
        return gameBoard
    }


    /*
    export const setMember = (item:any, setOfItems:any[]) => {
        if (item === null) return(true)

        if (setOfItems.includes(item)) {
            console.log("&&& setMember is true!")
            return(true)
        }
        return(false)
    }

    */