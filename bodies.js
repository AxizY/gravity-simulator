function random255() {
    return Math.floor(Math.random()*256);
}

function distance(a, b) {
    return Math.sqrt(Math.pow(a.x-b.x, 2)+Math.pow(a.y-b.y, 2));
}

function unitVector(a, b) {
    var dist = distance(a,b);
    return {x:(b.x-a.x)/dist, y:(b.y-a.y)/dist};
}

class system {
    constructor() {
        this.bodies = [];
        this.deleteList = [];
    }

    addBody(x, y, mass) {
        this.bodies.push(new body(x, y, mass));
    }

    draw(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.bodies.forEach(b => {
            b.draw(ctx);
        });
    }

    delete(b) {
        for(var i = 0; i <= this.bodies.length; i++) {
            if (this.bodies[i] == b) {
                this.deleteList.push(i);
            }
        }
    }

    calc() {
        this.bodies.forEach(b => {
            b.calc(this);
        });
        this.bodies.forEach(b => {
            b.move();
            b.resetVelocity();
        });
        this.deleteList.forEach(b => {
            this.bodies.splice(b, 1);
        });
        this.deleteList = [];
    }
}

class body {
    constructor(x, y, mass) {
        this.x = x;
        this.y = y;
        this.xvel = 0;
        this.yvel = 0;
        this.mass = mass;
        this.color = 'rgba('+random255()+','+random255()+','+random255()+', 1.0)';
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.mass/2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    

    calc(sys) {
        // this.colliding = [];
        sys.bodies.forEach(other => {
            if (other != this) {
                //distance(this, other) > (this.mass/2+other.mass/2)
                // could check next frame position and see if its closer and if so just merge
                if (distance(this, other) > 5) {
                    var accel = (((this.mass*other.mass)/distance(this, other))/this.mass);
                    var vect = unitVector(this, other);
                    this.xvel += vect.x*accel;
                    this.yvel += vect.y*accel;

                } else {
                    // this.colliding.push(other);
                    if (other.mass >= this.mass) {
                        other.mass += this.mass/2;
                        sys.delete(this);
                    } else {
                        this.mass += other.mass/2;
                        sys.delete(other);
                    }
                }
            }
        });
    }

    move() {
        this.x += this.xvel;
        this.y += this.yvel;
    }

    resetVelocity() {
        this.xvel = 0;
        this.yvel = 0;
    }
}