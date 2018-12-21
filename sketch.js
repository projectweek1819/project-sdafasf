let grid = [];
let rows = 8;
let cols = 8;
function setup() {
    createCanvas(400, 400);
    // een 8 op 8 array maken met random nummers
    for( var i=0; i<rows; i++ ) {
        grid.push( [] );
    }

        for (var i = 0; i < rows; i++) {
            for (var j = grid[i].length; j < cols; j++) {
                grid[i].push(Math.floor((Math.random() * 6) + 1));
            }
        }
        let chainsx = horizontalChain(grid);
        let chainsy = verticalChain(grid);

        if(verticalChain() !== []){
                for (let k = 0; k < chainsy.length; k++) {
                    let strcount = chainsy[k]['strCount'];
                    let numba = 0;
                    if (grid[chainsy[k]['y']][chainsy[k]['x']] !== "") {
                        // let test = {${strcolor}: ${strcount} }
                        for (let x = 0; x < strcount; x++) {
                            grid[chainsy[k]['y'] - x][chainsy[k]['x']] = Math.floor((Math.random() * 6) + 1);
                            while (numba === grid[chainsy[k]['y'] - x][chainsy[k]['x']]) {
                                grid[chainsy[k]['y'] - x][chainsy[k]['x']] = Math.floor((Math.random() * 6) + 1);
                            }
                            numba = grid[chainsy[k]['y'] - x][chainsy[k]['x']];
                        }
                    }
                }
            }
        if(horizontalChain() !==[]) {
            for (let k = 0; k < chainsx.length; k++) {
                    let strcount = chainsx[k]['strCount'];
                    let numba = 0;
                    if (grid[chainsx[k]['y']][chainsx[k]['x']] !== "") {
                         for (let x = 0; x < strcount; x++) {
                           grid[chainsx[k]['y']][chainsx[k]['x'] - x] = Math.floor((Math.random() * 6) + 1);
                             while (numba === grid[chainsx[k]['y']][chainsx[k]['x'] - x]) {
                                 grid[chainsx[k]['y']][chainsx[k]['x'] - x] = Math.floor((Math.random() * 6) + 1);
                             }
                             numba = grid[chainsx[k]['y']][chainsx[k]['x'] - x];
                         }
                     }
            }
        }

}

function draw() {
    background(200);
    collapse();
    removeChains();
    collapse();
    for (var i = 0; i < rows; i++)
    {
        for (var j =  0; j < cols; j++){

            switch (grid[j][i]) {
                case 1:
                    var c = color(255, 0, 0); // Define color 'c'
                    break;
                case 2:
                        var c = color(0, 102, 0); // Define color 'c'
                    break;
                case 3:
                    var c = color(0, 0, 255); // Define color 'c'
                    break;
                case 4:
                    var c = color(255, 255, 0); // Define color 'c'
                    break;
                case 5:
                    var c = color(204, 102, 153); // Define color 'c'
                    break;
                case 6:
                    var c = color(255, 255, 255); // Define color 'c'
                    break;
                case 7: refill();
                        removeChains();
            }
            if (c) {
                fill(c); // Use color variable 'c' as fill color
                noStroke(); // Don't draw a stroke around shapes
                rect(i * width / rows, j * height / cols, width / rows, height / cols); // Draw rectangle
            }
        }
    }

    for (var x = 0; x < width; x += width /grid[0].length) {
        for (var y = 0; y < height; y += height / grid.length) {
            stroke(0);
            strokeWeight(1);
            line(x, 0, x, height);
            line(0, y, width, y);
        }
    }
    fix();
}
let lastClick = null;
function mousePressed(){
    if ( !lastClick )
    {
        lastClick = {x: mouseX, y: mouseY };
        console.log('firstpos')
    }
    else
    {
        const firstPosition = lastClick;
        const secondPosition = { x: mouseX, y: mouseY };
        lastClick = null;

            let py = (Math.ceil((firstPosition.y) / (height / rows))-1);
            console.log('py',Math.ceil((firstPosition.y) / (height / rows))-1);

            let px = (Math.ceil((firstPosition.x) / (width / cols))-1);
            console.log('px',Math.ceil((firstPosition.y) / (width / rows))-1);

            let qy = (Math.ceil((secondPosition.y) / (height / rows))-1);
            console.log('qy',Math.ceil((secondPosition.y) / (height / rows))-1);

            let qx = (Math.ceil((secondPosition.x) / (width / cols))-1);
            console.log('qx',Math.ceil((secondPosition.x) / (width / rows))-1);

            let dummy = grid[py][px];
             grid[py][px] = grid[qy][qx];
             grid[qy][qx]= dummy;

        setTimeout(fix, 3000);
    }
   }

function refill() {

    for (a = 1; a < grid.length; a++){
        for (i = 1; i < grid.length; i++){
            for (j = 0; j < grid[0].length; j++){
                if(grid[i][j] == 7){
                    p = {x: j, y: i};
                    q = {x: j, y: i - 1};
                    grid[i][j] = Math.floor((Math.random() * 6) + 1);
                }
            }
        }
    }
}

function verticalChain(){
    var chains = [];

    for (let x = 0; x < grid[0].length; x++)
    {
        var count = 1;
        let kleur = null;

        for (var y = 0; y < grid.length; y++)
        {
            if (grid[y][x] === kleur)
                count++;
            else
            {
                if (count >= 3) {chains.push({strKleur:kleur,x:x,y:y-1,strCount:count})}
                count = 1;
                kleur = grid[y][x];
            }
        }
        if (count >= 3) {chains.push({strKleur:kleur,x:x,y:y-1,strCount:count})}

    }
    return chains;
}
function horizontalChain(){
    var chains = [];

    for (let y = 0; y < grid.length; y++)
    {
        var count = 1;
        let kleur = null;

        for (var x = 0; x < grid[y].length; x++)
        {
            if (grid[y][x] === kleur)
                count++;
            else
            {
                if (count >= 3) {chains.push({strKleur:kleur,x:x-1,y:y,strCount:count})}
                count = 1;
                kleur = grid[y][x];
            }
        }
        if (count >= 3) {chains.push({strKleur:kleur,x:x-1,y:y,strCount:count})}

    }
    return chains;
}
function collapse(){
    for (a = 1; a < grid.length; a++){
        for (i = 1; i < grid.length; i++){
            for (j = 0; j < grid[0].length; j++){
                if(grid[i][j] == 7){
                    p = {x: j, y: i};
                    q = {x: j, y: i - 1};
                    swap(grid, p, q);
                }
            }
        }
    }

}
function swap(grid,p,q) {
    let dummy = grid[p.y][p.x];
    grid[p.y][p.x] = grid[q.y][q.x];
    grid[q.y][q.x]= dummy;
}
function removeChains() {
    let chainsx = horizontalChain(grid);
    let chainsy = verticalChain(grid);
    let output = {};



    for (let k = 0; k < chainsy.length; k++) {
        let strcount = chainsy[k]['strCount'];

        if (grid[chainsy[k]['y']][chainsy[k]['x']] !== "")
        {
            // let test = {${strcolor}: ${strcount} }
            for (let x = 0; x < strcount; x++)
            {
                grid[chainsy[k]['y']-x][chainsy[k]['x']] = 7;
            }
        }
    }



    for (let k = 0; k < chainsx.length; k++) {
        let strcount = chainsx[k]['strCount'];

        if (grid[chainsx[k]['y']][chainsx[k]['x']] !== "")
        {
            for (let x = 0; x < strcount; x++)
            {
                grid[chainsx[k]['y']][chainsx[k]['x']-x] = 7;
            }
        }
    }
    setTimeout(fix , 2000)
}
function fix() {
    while (horizontalChain().length >2 || verticalChain()>2) {
        collapse();
        refill();
        removeChains();
        draw();
    }

}