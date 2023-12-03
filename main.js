const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
      this._field = field;
    }
    
    print(field) {
        for (let row of field) {
            let line = [];
            for (let character of row) {
                line.push(character);
            }
            let lineStr = line.join('');
            console.log(lineStr);
            line = [];
        }
    };

    static generateField(width, heigh, percentage) {
        let field = [];
        let row = [];

        for (let i=1; i<= heigh; i++) {
            for (let j=1; j<=width; j++){
                row.push(fieldCharacter);
            }
            field.push(row);
            row = [];
        }
        // Calculation numbers of holes
        let numOfHoles = Math.floor(width*heigh*(percentage/100))
        
        // Making holes in a field
        for (let l= 0; l < numOfHoles; l++){
          let x = Math.floor(Math.random()*width);
          let y = Math.floor(Math.random()*heigh);
         field[y][x] = hole;
        }
        
        // putting hat onto field
        let y = Math.floor(Math.random()*heigh + 1);
        let x = Math.floor(Math.random()*width);
        if (x === width){
          x = width-1;
        };
        field[y][x] = hat;

        // Putting path character on the start position
        field[0][0] = pathCharacter;

        return field;
    };
    // Gameplay metod
    play() {
      let x = 0;
      let y = 0;
      let gameOver = false;
      console.log('\nPlease enter direction pres: "l" - left, "r" - right, "u" - up, "d" - down. \n')
      
        while (!gameOver) {
            this.print(this._field);
            let direction = prompt('Which way?');
            
            // Changing coordinates due to move direction
            switch (direction.toLocaleLowerCase()) {
                case 'u' :
                    y-=1;
                    break;
                case 'd' :
                    y+=1;
                    break;
                case 'l' :
                    x-=1;
                    break;
                case 'r' :
                    x+=1;
                    break;
                default:
                    console.log('Please enter correct direction.');
            };
            
            // Checking borders holes and hat
            if(x<0 || y<0){
                console.log('You are behind the field. \n Game Over!');
                gameOver = true;
            }else if(this._field[y][x] === hole) {
                console.log('You got into the hole!\nGame Over!');
                gameOver = true;
            }else if(this._field[y][x] === hat){
                console.log('You Win!!! You found the hat!');
                gameOver = true;
            }else{
                this._field[y][x] = pathCharacter;
            }

        }
    }

}

let field = new Field(Field.generateField(40, 30, 30));
field.play() 
