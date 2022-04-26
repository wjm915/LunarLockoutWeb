import { buttonInterface} from "./ButtonInterface";
import { solvePuzzle, moveInterface } from "./SolvePuzzleSingleton"
import { mapMember, listMember, editGameBoard, copyGameBoard } from "./helperFunctions";

export const myData = (function () {

    //----------------------------------------------
    // Interface for the singleton!
    let instance: myDataInterface;

    // Interfaces
    interface myDataInterface {
        robots: buttonInterface[],
        gameBoard: buttonInterface[][],
        controls: buttonInterface[],
        buildLabelMap: () => (string | null | undefined)[][]
    }

    interface stackDataInterface {
        type: string,
        index: number
    }

    //----------------------------------------------
    // Data Structures & Functions
    
    const stack = new Array<stackDataInterface>()


    const pushRobot = (i: number) => {
        let item: stackDataInterface = { type: 'r', index: i }
        
        while (stack.length > 0) stack.pop();
        if (!listMember(robotData[i].label, buildLabelMap().flat())) {
            stack.push(item)
        }
    }


    const pushTile = (index: number) => {
        let length = stack.length
        
        switch (length) {
            // Game board title reset
            case 0: {
                let tgt: string = 'tile_' + index.toString();
                if (index === 33) {
                    document.getElementById(tgt)?.setAttribute('value', '#')
                    document.getElementById(tgt)?.setAttribute('style', 'background-color:white;')
                } else {
                    document.getElementById(tgt)?.setAttribute('value', ' ')
                    document.getElementById(tgt)?.setAttribute('style', 'background-color:gray;')
                }
                break
            }
            // Move robot to the game board.
            case 1: {
                let item: stackDataInterface = { type: 't', index: index }
                stack.push(item)
                moveRobot2Tile()
                break
            }
            default: {
                break;
            }
        }
    }


    const moveRobot2Tile = () => {
        if (stack.length === 2 && stack[0].type === 'r' && stack[1].type === 't') {
            let tgt:string = 'tile_'+stack[1].index.toString();
            
            let robot = robotData[stack[0].index];

            document.getElementById(tgt)?.setAttribute('value', robot.label.trim())
            document.getElementById(tgt)?.setAttribute('style', 'background-color:' + robot.color + ';')
        }
        // Clean up the stack
        while(stack.length > 0) stack.pop()
    }


    // The LabelMap is an array of characters used to solve the puzzle.
    const buildLabelMap = ():(string | null | undefined)[][] => {
        let labelMap:(string | null | undefined)[][] = gameBoardData.map((row) => {
            return(row.map((item) => {
                let tgt:string = 'tile_' + item.index.toString();
                return(document.getElementById(tgt)?.getAttribute('value'))
            }))
        })
        return(labelMap)
    }


    const resetGameBoard = () => {
        let index:number = 0
        let tgt:string = ""

        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                // **** Note: the index format: index=[r][c], where r = [1..5] & c = [1..5] 
                index = ((r +1) * 10) + (c+1)
                tgt = 'tile_' + index.toString();
                if (index === 33) {
                    document.getElementById(tgt)?.setAttribute('value', '#')
                    document.getElementById(tgt)?.setAttribute('style', 'background-color:white;')
                } else {
                    document.getElementById(tgt)?.setAttribute('value', ' ')
                    document.getElementById(tgt)?.setAttribute('style', 'background-color:gray;')
                }
            }
        }
    }

    //----------------------------------------

    const animatePuzzle = async (moves: moveInterface[]) => {
        console.log("moves: ", moves)
        for(let i=0; i < moves.length; i++) {
            let move = moves[i];

            let index0 = ((move.r0 +1) * 10) + (move.c0+1)
            let tgt0 = 'tile_' + index0.toString();

            let index1 = ((move.r1 +1) * 10) + (move.c1+1)
            let tgt1 = 'tile_' + index1.toString();

            //swap the tiles...

            let v0 = document.getElementById(tgt0)?.getAttribute('value')
            let c0 = document.getElementById(tgt0)?.getAttribute('style')

            let v1 = document.getElementById(tgt1)?.getAttribute('value')
            let c1 = document.getElementById(tgt1)?.getAttribute('style')

            if (index0 != 33 && index1 != 33) {
                document.getElementById(tgt0)?.setAttribute('value', v1)
                document.getElementById(tgt0)?.setAttribute('style', c1)

                document.getElementById(tgt1)?.setAttribute('value', v0)
                document.getElementById(tgt1)?.setAttribute('style', c0)
            } else {
                // move from
                if(index0 === 33) {
                    // The center is empty
                    if (v0 === '#') {
                        document.getElementById(tgt0)?.setAttribute('value', v1)
                        document.getElementById(tgt0)?.setAttribute('style', c1)
                    
                        document.getElementById(tgt1)?.setAttribute('value', ' ')
                        document.getElementById(tgt1)?.setAttribute('style', 'background-color:gray;')
                    } else {
                        document.getElementById(tgt1)?.setAttribute('value', v0)
                        document.getElementById(tgt1)?.setAttribute('style', c0)

                        document.getElementById(tgt0)?.setAttribute('value', '#')
                        document.getElementById(tgt0)?.setAttribute('style', 'background-color:white;')

                    }
                }

                if (index1 === 33) {
                    if (v1 === '#') {
                        document.getElementById(tgt1)?.setAttribute('value', v0)
                        document.getElementById(tgt1)?.setAttribute('style', c0)
                    
                        document.getElementById(tgt0)?.setAttribute('value', ' ')
                        document.getElementById(tgt0)?.setAttribute('style', 'background-color:gray;')
                    } else {
                        document.getElementById(tgt0)?.setAttribute('value', v1)
                        document.getElementById(tgt0)?.setAttribute('style', c1)

                        document.getElementById(tgt1)?.setAttribute('value', '#')
                        document.getElementById(tgt1)?.setAttribute('style', 'background-color:white;')

                    }
                }

                // Need to clear up the 'escape hatch'
                /*
                tgt0 = 'tile_33';
                v0 = document.getElementById(tgt0)?.getAttribute('value')
                if (v0 === ' ') {
                    document.getElementById(tgt0)?.setAttribute('value', '#')
                    document.getElementById(tgt0)?.setAttribute('style','background-color:white;' )
                }
                */
            }

            await delay(2500);
        }

    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    //----------------------------------------------
    // Data
    // List of robot buttons
    let controlData: buttonInterface[] = [
        {
            index: 100,
            label: 'Reset',
            color: 'yellow',
            onClickCB: () => { resetGameBoard() }
        },

        {
            index: 101,
            label: 'Solve',
            color: 'green',
            onClickCB: () => {
                let moves = solvePuzzle.getInstance().solver(buildLabelMap())
                
                if (moves.length == 0) {
                    alert("No solution found.")
                    resetGameBoard()
                } else {
                    animatePuzzle(moves)
                }

            }
        },
    ]

    let robotData: buttonInterface[] = [
        {
            index: 0,
            label: 'A',
            color: 'orange',
            onClickCB: () => { pushRobot(0) }
        },

        {
            index: 1,
            label: 'B',
            color: 'green',
            onClickCB: () => { pushRobot(1) }
        },

        {
            index: 2,
            label: 'C',
            color: 'purple',
            onClickCB: () => { pushRobot(2) }
        },
        {
            index: 3,
            label: 'D',
            color: 'yellow',
            onClickCB: () => { pushRobot(3) }
        },

        {
            index: 4,
            label: 'E',
            color: 'blue',
            onClickCB: () => { pushRobot(4) }
        },

        {
            index: 5,
            label: 'X',
            color: 'red',
            onClickCB: () => { pushRobot(5) }
        }
    ]

    // Build the game board
    let gameBoardData = new Array<Array<buttonInterface>>()

    const buildGameBoard = () => {

        for (let r = 0; r < 5; r++) {
            let row = new Array<buttonInterface>()
            for (let c = 0; c < 5; c++) {
                // **** Note: the index format: index=[r][c], where r = [1..5] & c = [1..5] 
                let index = ((r +1) * 10) + (c+1)
                row.push({
                    index: index,
                    label: ' ',
                    color: 'gray',
                    onClickCB: () => { pushTile(index) }
                })
            }
            gameBoardData.push(row)
        }

        // Create the center (aka goal position)
        gameBoardData[2][2].label = "#"
        gameBoardData[2][2].color = "white"

    }

    //----------------------------------------------
    // Initialization function
    const init = ():myDataInterface => {
        buildGameBoard();

        return {
                robots: robotData,
                gameBoard: gameBoardData,
                controls: controlData,
                buildLabelMap: buildLabelMap  
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

/*
           onClickCB: () => {
                let moves = solvePuzzle.getInstance().solver(buildLabelMap())
                if (moves.length == 0) {
                    alert("No solution found.")
                    resetGameBoard()
                } else {
                    console.log("DataSingleton: sp: ", moves)
                    animatePuzzle(moves)
                }
            }
*/


/*

                let a = buildLabelMap()
                a = editGameBoard(copyGameBoard(a), 1, 2, 'a')
                console.log("a: ", a)

                let b = editGameBoard(copyGameBoard(a), 1, 2, 'b')
                console.log("b: ", b)

                let c = editGameBoard(copyGameBoard(a), 1, 2, 'c')
                console.log("c: ", c)

                let d = editGameBoard(copyGameBoard(a), 3, 4, 'c')
                console.log("d: ", d)

                let testSet = [a]
                testSet.push(b)
                testSet.push(c)
                console.log("testSet: ", testSet)

                if (setMember(a, testSet)) {
                    console.log("Found 'a'!")
                } else {
                    console.log("a: Nope!!!!")
                }

                if (setMember(c, testSet)) {
                    console.log("Found 'c'!")
                } else {
                    console.log("c: Nope!!!!")
                }

                if (setMember(d, testSet)) {
                    console.log("Found 'd'!")
                } else {
                    console.log("d: Nope!!!!")
                }

*/