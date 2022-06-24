const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
var sys = new system();

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sys.draw(ctx, canvas);
}
resize();
window.addEventListener('resize', resize);

// ideas
// you can drag bodies around
// you can add velocity to them

sys.addBody(300, 300, 200);
sys.addBody(600, 500, 100);
sys.addBody(900, 500, 100);

function integration() {
    sys.draw(ctx, canvas);
    sys.calc();
    window.requestAnimationFrame(integration);
}

window.addEventListener('mousedown', e => {
    sys.addBody(e.clientX, e.clientY, Math.floor(Math.random()*100)+50);
});

integration();