const c = document.querySelector("#main-canv");
const ctx = c.getContext("2d");
const slider = document.querySelector("#rotationAngle");

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

function drawTriangle(p1, p2, p3){
    // console.log(p1.x, p1.y);
    // console.log(p2.x, p2.y);
    // console.log(p3.x, p3.y);

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke(); 
}

function rotatePoint(p, angle){
    const x = p.x * Math.cos(angle) - p.y * Math.sin(angle);
    const y = p.x * Math.sin(angle) + p.y * Math.cos(angle);
    return new Point(Math.round(x),Math.round(y));
}

function rotatePointCustomOrigin(p, origin, angle){
    const nX = p.x - origin.x;
    const nY = p.y - origin.y;

    const nP = rotatePoint(new Point(nX,nY), angle);
    nP.x += origin.x;
    nP.y += origin.y;
    return nP;
}

function drawAll(angleInDeg){
    const p1 = new Point(50,150);
    const p2 = new Point(100,50);
    const p3 = new Point(150,150);

    drawTriangle(p1, p2, p3);

    const angle = angleInDeg * (Math.PI / 180);

    const origin = new Point(100,150);

    const p11 = rotatePointCustomOrigin(p1, origin, angle);
    const p22 = rotatePointCustomOrigin(p2, origin, angle);
    const p33 = rotatePointCustomOrigin(p3, origin, angle);

    drawTriangle(p11, p22, p33);
}

drawAll(20);

slider.oninput = (x) => {
    ctx.clearRect(0,0,c.width,c.height);
    console.log(x.target.value);
    drawAll(x.target.value);
}
