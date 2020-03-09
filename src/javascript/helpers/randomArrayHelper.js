
const loseArrays = [
    [3,4,1],
    [2,1,2],
    [3,2,1]
];

export function randomArrayHelper(gameLastResults){
    console.log("last res", gameLastResults);
    const initialArray = [[0,0,0], [0,0,0], [0,0,0]];

    if(gameLastResults.length === 0){
        console.log("random");
        return getRandomArray();
    }else if(gameLastResults.includes(1)){
        return getLoseResult()
    }else if(gameLastResults.length === 4){
        return getWinResult()
    }else {
        console.log("random > 1");
        return getRandomArray();
    }


    function getWinResult() {
        console.log("win");
        let randomArray =  getRandomArray();
        console.log(randomArray);
        if(checkIfWin(randomArray).result){
            return randomArray
        }else{
            randomArray[1][1] = randomArray[0][1];
            randomArray[2][1] = randomArray[0][1];
            return randomArray
        }
    }


    function getLoseResult() {
        console.log("lose");
        let randomArray =  getRandomArray();
        if(!checkIfWin(randomArray).result){
            return randomArray
        }else{
            return loseArrays
        }
    }

    function getRandomArray() {
        return initialArray.map(array => (
            array.map(() => {
                return Math.floor(Math.random() * 4)
            })
        ))
    }

}

export function checkIfWin(arrays) {
    let winRow = null;

    const transposedArray = arrays[0].map((col, i) => arrays.map(row => row[i]));

    transposedArray.forEach((row, index) => {
        let filteredRow = row.filter(item => {
            if(!row.includes(0) && row[0] === item){
                return true;
            }else if(row.filter(item => item === 0).length === 2){
                return true
            }else if(row.filter(item => item === 0).length === 1){
               return item === row.find(item => item !== 0) || item === 0
            }
            return false
        });

        console.log("filtered", filteredRow);
        if(filteredRow.length === 3){
            winRow = index
        }
    });
    console.log("transposed", transposedArray);

    return {
        result: winRow !== null,
        winRow: 1
        }
    }