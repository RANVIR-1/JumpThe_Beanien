import kaboom from "kaboom";
kaboom()//Let's start by initializing the context with the kaboom() function.

loadSprite("bean", "sprites/bean.png")

// add something to screen
//add bean sprite as an player
const bean=add([//add parts to the screen
      sprite("bean"),//add a sprite as bean
      pos(100,200),//position
  rotate(360),//rotate angle
  color(255,255,255),//colour white rgb value
  area(),//it has an area to check the collision
  body(),//physical body to respond to the gravity
  // .jump() when "space" key is pressed
])

//add an surface to jump
add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(0, 0, 255),
])

// .jump() when "space" key is pressed
onKeyPress("space", () => {
    if (bean.isGrounded()) {
        bean.jump();
    }
});

//Let's try the loop() function, which performs an action every x seconds
loop(2,() =>{
// add tree
add([
    //rect(48, 64), normal constant rect
  rect(48, rand(24, 64)),//different rect dimension 
    area(),
    outline(4),
    pos(width(), height() - 48),
    origin("botleft"),
    color(255, 180, 255),
    move(LEFT, 240),
    "tree", //To add a tag we simply put a string in the component array. Then we can check for collision between Bean and any object with tag "tree".


]);
});

bean.onCollide("tree", () => {
    shake();
});//if bean collide with tree 

/*
function spawnTree() {
    add([
        // the tree components
    ]);
    wait(rand(0.5, 1.5), () => {
        spawnTree();
    });
}
spawnTree();
It'll be more fun if the trees spawn at different intervals. We cannot do that from loop(), but we can compose that with recursive wait()s, which waits for x seconds to execute some code.
*/
let score = 0;
const scoreLabel = add([
    text(score),
    pos(24, 24)
])
onUpdate(() => {
    score++;
    scoreLabel.text = score;
});//score part

scene("lose", () => {
  add([
    text("Game over"),
    pos(24,24),
  ])
    add([
      text(score),
        pos(center()),
        origin("center"),
    ])
})//lose scene

bean.onCollide("tree", () => {
    shake();
    go("lose"); // go to "lose" scene here
});
