
function GAME()
{
    var gl = GL.create(),           // lightgl instance
        lrc = 0, udc = 0, dir = -1, // left right and up down counters (used for detecting yes no interactions); dir: 0 [right], 1 [up], 2 [down], 3 [left]...
        cam = new GL.Vector(0.0, -0.45, -1.0), // the camera aka "player's head position" (the player follows this, the world is render from cam)
        angleX = angleY = 0,        // change names to caX and caY ??? or cX and cY ???
        shakey      = 0,            // should we be shaking the camera?
        trg         = 0.0,  // "turning" value - goes from 0 to 1 if dmn is 1.0 (responsible for making the "transformation" of people into demons in the shader)
        skv         = [ 0.26, 0.26 ], // the sky colors value (clearColor and fog), this will go up to 1.0 (only R and B channels, G stays always the same: 0.26)
        dmn         = 0.0,          // are they turning to demons or not? (1 = true)
        ddt         = -7.0,         // demon death time - how long since the last demon we killed? (used for re-spawning demons)
        stt         = 0.0,          // step time, when was the last time you walked? (used for SFX)
        goc         = 0.0,          // game over counter (in seconds from the time you are touched by demons)
        ft          = true,         // is this the first time we are running? (needed to initialize audio)
        lastDelta   = 0.016,        // used for retrieving delta time between frames
        totalTime   = 0.0,          // total time since the game is running
        tno         = 0,            // total number of npc's. we shouldn't spawn more than 100
        touchingNpc = false,        // flag triggered when touching an npc
        tte         = false,        // touching tree
        who         = null,         // the npc you are touching
        tig         = null,         // triggered - the npc that started it all
        ttt         = 0.0,          // text time timer - how long since the text was changed?
        sup         = 0,            // saved souls!
        dup         = 0,            // murdered souls! (demons)
        tsg         = 10.0,         // time since last shot - used for shooting but also "lighting shit up" (changing .l value on sprites)
        move        = true,         // can the player move?
        zzfx        = null,         // initialized in zfx
        skip        = false,        // can we skip the priest mambo jambo?
        runs        = 0,            // how many times you played this?
        chuchu      = GL.Mesh.bo(0, "LRGCFB"),      // the church model lol (a "room", uses the "box" method with all 6 sides)
        chuss       = GL.Mesh.bo(0, "F"),           // church sides
        skybox      = GL.Mesh.bo(1, "C"),           // it used to be an actual skybox, now it's just the top (ceiling) plane
        spr         = [],                           // list of sprites. everything is an sprite and gets rendered as such

        // NOTE: for whatever reason (bad UV's I think) there might appear some stupid at the edge of sprites - try to leave 1 pixel
        // list of meshes. meshes are instanced one and referenced by "sprites". note that we can mix different types of meshes (billboards or boxes)
        ms =
        [
            //         u,v,s,t (from 0 to 128)      width / height (world units, not meters)
            GL.Mesh.bd(64,      0,  79,     31,     0.13,   0.30),  // priest
            GL.Mesh.bd(0,       0,  15,     31,     0.13,   0.30),  // woman
            GL.Mesh.bd(16,      0,  31,     31,     0.13,   0.30),  // babcia lol
            GL.Mesh.bd(32,      0,  47,     31,     0.13,   0.30),  // femme (fatale)
            GL.Mesh.bd(48,      0,  63,     31,     0.13,   0.30),  // dwarf
            GL.Mesh.bd(80,      0,  95,     31,     0.13,   0.30),  // bandit
            GL.Mesh.bd(96,      0,  111,    31,     0.13,   0.30),  // traveler
            GL.Mesh.bd(112,     0,  128,    31,     0.13,   0.30),  // knight

            GL.Mesh.bd(0,       80, 15,     95,     0.22,   0.22),  // bullet
            GL.Mesh.bd(32,      80, 63,     96,     1.0,    0.50),  // castle
            GL.Mesh.bd(0,       64, 79,     80,     1.00,   0.30),  // "feast night"
            GL.Mesh.bd(112,     64, 128,    95,     0.35,   0.70),  // tall tree - it used to be 16 pixels taller until I ran out of space lol
            GL.Mesh.bd(96,      64, 112,    95,     0.35,   0.70),  // short tree
            GL.Mesh.bd(80,      63, 95,     79,     0.20,   0.20),  // bush / grass
            GL.Mesh.bd(64,      96, 96,     112,    1.0,    0.5),   // mountain - this is unused because it's shit
            GL.Mesh.bd(32,      96, 64,     112,    1.0,    0.5),   // MOON

            GL.Mesh.bo(1, "G"), // outerworld ground (the "church" has it's own ground)
            GL.Mesh.bo(2, "LC") // the "handcannon" (shotgun)
        ];

    // This one is the key for the whole "metagame" loop - based on how many times you played you will receive different messages from "Peter"
    if(localStorage.getItem("_feast_night_runs_") === null)
    {
        runs = 0;
        localStorage.setItem("_feast_night_runs_", "0");
    }
    else
    {
        runs = parseInt(localStorage.getItem("_feast_night_runs_"));
    }


    /*
    // During development I used all of these constants, but at the end I ran out of space so I switched to just numbers
    const
        // npcs
        MESH_PRIEST     = 0,         // swapped places so we don't spawn the priest on the forest
        MESH_WOMAN      = 1,
        MESH_BABCIA     = 2,
        MESH_FEMME      = 3,
        MESH_DWARF      = 4,
        MESH_BANDIT     = 5,
        MESH_TRAVELER   = 6,
        MESH_KNIGHT     = 7,

        // objects / stuff
        MESH_BULLET     = 8,
        MESH_CASTLE     = 9,
        MESH_FEAST      = 10,
        MESH_TREE_TALL  = 11,
        MESH_TREE_SMALL = 12,
        MESH_BUSH       = 13,
        MESH_MOUNTAIN   = 14,
        MESH_MOON       = 15,

        MESH_GROUND     = 16,   // an experiment - using "bo" meshes as objects too. we should put the room here as well!
        MESH_SHOTGUN    = 17,

        // once a person was turned into a demon, everybody else turns into a demon (we should turn them only after killing one, but whatever)
        // RESOUTS are the possible results of interactions with characters
        // (I didn't want to call this results and neither output, so... resout lol)
        RESOUT_PRIEST   = 0,    // what happens once you talk to the priest - "go to the main game"
        RESOUT_NONE     = 1,    // when you talk to someone and it has no effect
        RESOUT_BOTH     = 2,    // both options turn them into a demon
        RESOUT_TURN_YES = 3,    // if you say yes, they will turn to a demon
        RESOUT_TURN_NO  = 4;    // if you say no, they will turn into a demon

        // general types of objects (useful for rendering and updating them)
        TYPE_NPC        = 0,    // npc's turn towards the player, talk to you and will chase you (if demonized)
        TYPE_BULLET     = 1,    // bullets go in straight line but from the angle of your gun (and I hacked them so they also act as billboards)
        TYPE_SPRITE     = 2,    // general sprites - they just stay where they are (no billboarding)
        TYPE_SPRITE_BDB = 3,    // billboarded sprites - same as regular sprites, but with billboarding (useful for trees)
        TYPE_PLAYER     = 4,    // the player - used for collisions and stuff player-related (has no mesh, it's invisible)
        TYPE_WEAPON     = 5,    // we need this to draw the FPS gun differently - it doesn't go through the usual loop (but we need visibility and other flags)

        // game state machine
        STATE_CLICK_HERE        = 0,    // first screen - black and the player must click
        STATE_TALK_WITH_PRIEST  = 1,    // intro screen / tutorial (talk with the priest)
        STATE_FEAST_NIGHT       = 2,    // logo screen "feast night"
        STATE_GAME_MAIN         = 3,    // the actual game
        STATE_GAME_OVER         = 4,
        STATE_YOU_WIN_LOL       = 5,
    */


    // the game's state. a super simple state machine
    var state = 0 /*STATE_CLICK_HERE*/;

    /*
        MO aka "make object" - a method that creates objects ("3d sprites") to be rendered (and basically everything else in the game except "rooms")
            m:              a number from 0..to..meshes.length. index the meshes array (use the constants to make it easier). can be null.
            px, py, pz:     position. this will be used to calculate bounding box (GL.Vector)
            dx, dy, dz:     dimensions (half size), used to calculate the bounding box of this sprite
            t:              type - check the TYPE_* constants above (this started to grow over time)
            x:              text message this character might say (only required if t is NPC)
            y:              what the character says if you answer "yes"
            m:              what the character says if you answer "no"
            o:              the output of your action (transform into monster or not) - check the RESOUT_* constant
    */
    mo = function(m, t, px, py, pz, dx, dy, dz, x, y, n, o) // meshes are visible by default, set to 0 to make them non visible
    {
        if(t == 0 /*TYPE_NPC*/)
        {
            tno++;
            if(tno > 100)
            {
                //console.log("TOO MANY MONSTERS ON THE DANCE FLOOR");
                return null;
            }
        }

        var r = {
            m: m != null ? ms[m] : null,        // mesh. can be null (ie the player)
            v: 1,                               // 1: visible. 0: not visible
            p: new GL.Vector(px, py, pz),       // position
            d: new GL.Vector(dx, dy, dz),       // dimensions
            mn: new GL.Vector(0, 0, 0),         // mn: the min bb vector
            mx: new GL.Vector(0, 0, 0),         // mx: the max bb vector
            t: t,                               // object type
            a: 0,                               // angle (only bullets use that for now). this is used only for movement, has no effect on drawing
            x: x,                               // text to say upon contact
            y: y,                               // YES answer
            n: n,                               // NO answer
            o: o,                               // resout OUTCOME
            h: 0,                               // h: counter of how many times its message has been shown - only valid for npcs
            l: 1.0,                             // light override (used to multiply the final color of the sprite, useful for making sprites brighter)
            s: 1.0,                             // scale (gl.scale)
            f: 0.0                              // factor (animate this shit). 0 = original sprite. 1 = new sprite (32 pixels up)
        };

        spr.push(r);
        return r;
    };


    /*
        the big list of messages. NPC's will get some from here randomly - unless you overwrite them (like the priest)
        each item contains:
            [0] utterance (stored to sprite.t)
            [1] "yes" case (stored in sprite.y)
            [2] "no" case (stored in sprite.n)
            [3] outcome ("resout" stored in sprite.o)
    */
    var msg =
    [
        [   "Is God with you, Father?",
            "Good! I have a message<br>from his Son...",
            "THEN YOU ARE MINE",
            2 /*RESOUT_BOTH*/],

        [   "Does Hell exist?",
            "It does, indeed",
            "No? LET ME SHOW YOU",
            2 /*RESOUT_BOTH*/],

        [   "Will you punish me for killing that little...?",
            "I knew you'd fall with me...",
            "BUT I DESERVE TO BE PUNISHED!",
            2 /*RESOUT_BOTH*/],

        [   "SINNERS, THEY ARE ALL SINNERS!",
            "Yes? Yes we are... ",
            "Let's change that",
            4 /*RESOUT_TURN_NO*/],

        [   "Come drink with me, father!",
            "YES, THE BLOOD OF THE INNOCENT,<br>DRINK FATHER, DRINK!",
            "Piss off!",
            3 /*RESOUT_TURN_YES*/],

        [   "I saw gold... over there...<br>can we take it, Father?",
            "Yes, YES! It's over there, it's...",
            "No? But I'm tired of eating shit...",
            3 /*RESOUT_TURN_YES*/],

        [   "Are...are you drunk Father? Like me?",
            "I ~burp~ knew it!",
            "~burp~",
            3 /*RESOUT_TURN_YES*/],

        [   "Dance with me, Father!",
            "Yes! Let's dance NOW",
            "Boring!",
            3 /*RESOUT_TURN_YES*/],

        [   "EAT FATHER, EAT EAT EAT!",
            "Like it? Tastes like FLESH",
            "FORGIVE ME FATHER, HE MADE ME DO IT!",
            3 /*RESOUT_TURN_YES*/],

        [   "Will you go to Heaven?",
            "Lying is a sin, Father!",
            "Ha! I knew it!",
            3 /*RESOUT_TURN_YES*/],

        [   "Do you repent, Father?",
            "So you are truly a man of God...",
            "Perhaps you should...",
            1 /*RESOUT_NONE*/],

        [   "Oh Father, I'm so drunk...<br>Can you help me?",
            "God bless you Father!",
            "Not even a priest helps me...",
            1 /*RESOUT_NONE*/],

        [   "All I wanted was to fly to the Sun...",
            "We are much alike, Father. I like that",
            "Does God forbid it, or men?",
            1 /*RESOUT_NONE*/],

        [   "Is God blue?",
            "Nice!",
            "No? But then why is the sky blue...?",
            1 /*RESOUT_NONE*/]
    ],

    spc = "<br><br><mark>[press space]</mark>",

    // "message priest data" lol
    mpd =
    [
        [   "Brother Doen!<br>Do you know what's your mission tonight?<br><br><mark>[NOD or SHAKE to answer]</mark>",
            "Well then... good luck out there<br>Sin is everywhere, specially on a..." + spc,
            "Help our people! Follow the Moon<br>and purify the souls of the Sinners this..." + spc,
            0 /*RESOUT_PRIEST*/],

        [   "Wasn't expecting you so soon...<br>Do you know why are you here now?",
            "DIES IRAE, BROTHER!<br>Now get out. PURIFY YOUR SOUL"+ spc,
            "Well, it's easy: save FIVE souls<br>and survive God's judgement"+ spc,
            0 /*RESOUT_PRIEST*/],

        [   "Did you meet God out there?",
            "Don't you think that meeting God would<br>free you from this loop?",
            "I bet you didn't. But I'm sure<br>you saw plenty of lost souls...like you",
            0 /*RESOUT_PRIEST*/],

        [   "What a glorious DIES IRAE!<br>Do you know what it is?",
            "Then why you don't escape your Judgement?",
            "Your Judgement, brother Doen!",
            0 /*RESOUT_PRIEST*/],

        [   "Aren't you a bit bored already?",
            "THEN ESCAPE!<br>Go, save someone. FIVE souls!",
            "Good thing, good thing!<br>I might even like you",
            0 /*RESOUT_PRIEST*/],

        [   "Do you know me, Brother Doen?",
            "Ah! Are you sure?<br>Really sure?",
            "Call me... Peter ~wink wink~",
            0 /*RESOUT_PRIEST*/],

        [   "Still here! What was it this time?<br>Demons? Wolves? Ale?",
            "Demons out there?<br>It's just people!",
            "None of those? Well, don't lose faith:<br>follow the moon, purify your soul...blah blah",
            0 /*RESOUT_PRIEST*/],

        [   "Once more: true purification comes<br>from loving and caring. Ok?",
            "Good. Now get out there and<br>save FIVE souls!",
            "~SIGH~",
            0 /*RESOUT_PRIEST*/],

        [   "Do you know how many were Judged already?",
            "Then stop making me waste my time!<br>Save your Soul...or stay in hell FOREVER",
            "A LOT OF THEM!<br>I cannot stay with you for eternity, Doen...",
            0 /*RESOUT_PRIEST*/],

        [   "Ten times. Do you know that?",
            "Then escape already. Time's almost up, Doen",
            "Ten times you failed your Judgement! ARGH!",
            0 /*RESOUT_PRIEST*/],

        [   "I'm sorry, Doen... but you failed<br>You will be trapped here now. Forever",
            "Use your time wisely<br>and FREE YOURSELF. Goodbye, my friend",
            "I never thought it would end like this. Goodbye, my friend",
            0 /*RESOUT_PRIEST*/],
    ];

    var fix = false; // this is terrible but my brain is jelly, sorry
    if(runs >= 11)
    {
        runs = 10;
        fix = true;
    }


                  // m,                     type                  pos,                    dimensions
    var shotgun = mo(17  /*MESH_SHOTGUN*/,  5 /*TYPE_WEAPON*/,    0.2,   -0.2,  -0.18,    0,     0,     0),
        player  = mo(null,                  4 /*TYPE_PLAYER*/,    0,      0,     0,       0.25,  0.25,  0.25),
        bullet  = mo(8   /*MESH_BULLET*/,   1 /*TYPE_BULLET*/,    100000, 0.3,   100000,  0.25,  0.25,  0.25),
        feast   = mo(10  /*MESH_FEAST*/,    2 /*TYPE_SPRITE*/,    0,      0.5,   0,       0,     0,     0);
        priest  = mo(0   /*MESH_PRIEST*/,   0 /*TYPE_NPC*/,       0,      0.30,  0,       0.015, 0.30,  0.05,
                mpd[runs][0], mpd[runs][1], mpd[runs][2], mpd[runs][3]);

    shotgun.s = 0.07; // scale
    shotgun.v = player.v = feast.v = feast.l = 0.0; // visibility and "light" (over) parameter

    // it was late, my brain wasn't working and this was the only solution I came up with for some issues with localstorage :shrug:
    runs++;
    if(fix) runs = 12;
    localStorage.setItem("_feast_night_runs_", "" + runs);

    // set the string of the "text" label
    text = function(what)
    {
        if(what != "")
        {
            ttt = 0.0;
        }
        document.getElementById("upper").innerHTML = what; //sprites working. silly physics too."; // "lol this is working";
    };

    // set the "tint color" for the "text" label
    ttc = function(what)
    {
        document.getElementById("upper").style.color = what;
    };

    // random between a and b. I'm not very happy with this - it's shit with very small numbers and results tend to repeat more than I'd like :(
    rn = function(a, b)
    {
        return Math.random() * (b - a + 1) + a;
    };

    // I still wonder why there's no clamping method in Math
    clamp = function(a,b,c)
    {
        return Math.min(Math.max(a, b), c);
    };

    // outworld - spawn the main "level"
    ow = function()
    {
        var i = 0,
            u = [1,5,7,3,6,4,2], // npcs
            g = mo(16  /*MESH_GROUND*/, 2 /*TYPE_SPRITE*/,  0, 0,     0,    0,   0,   0);       // ground
            mn = mo(15 /*MESH_MOON*/,   2 /*TYPE_SPRITE*/,  0, 2.0,  -50.0, 0.5, 0.5, 0.5);     // moon
            ctl = mo(9 /*MESH_CASTLE*/, 2 /*TYPE_SPRITE*/,  0, 0.75, -40.0, 0.5, 0.5, 0.5);     // castle

        g.s = 100.0;
        mn.s = 2.0;
        ctl.s = 1.5;

        // TREES
        for(i = 0; i < 140; i++)
        {
            var mud = 11 /*MESH_TREE_TALL*/;
            if(rn(0, 100) < 50) mud++;

            mo(mud, 3 /*TYPE_SPRITE_BDB*/, rn(-3.0, -0.5), 0.6, -(i * 0.3), 0.015, 0.5, 0.015); // small or "big" trees
            mo(mud, 3 /*TYPE_SPRITE_BDB*/, rn(0.5, 3.0), 0.6,   -(i * 0.3), 0.015, 0.5, 0.015);

            mo(mud, 3 /*TYPE_SPRITE_BDB*/, rn(-6.0, -4.0), 0.6, 4.0 -(i * 0.3), 0.015, 0.5, 0.015); // trees that are on the sides of the road
            mo(mud, 3 /*TYPE_SPRITE_BDB*/, rn( 4.0,  6.0), 0.6, 4.0 -(i * 0.3), 0.015, 0.5, 0.015);

            mo(13 /*MESH_BUSH*/,  2 /*TYPE_SPRITE*/,  rn(-3.0, -0.25), 0.1, 2.0 -(i * 0.3),  0.05, 0.2, 0.05); // bushes
            mo(13 /*MESH_BUSH*/,  2 /*TYPE_SPRITE*/,  rn(0.25, 3.0),   0.1, 2.0 -(i * 0.3),  0.0, 0.0, 0.0);
        }

        // NPCS !!!
        var j = 0;
        for(i = u.length-1; i >=0 ; i--)
        {
            var alt = u.splice(Math.floor(Math.random()*u.length), 1);
            var ww = msg[j + Math.floor(rn(0, 1))];
            var r = mo(alt[0], 0 /*TYPE_NPC*/, rn(-1.25, 1.25), 0.3, -(i*3) - rn(0.0, 1.0),  0.015, 0.30, 0.05, ww[0], ww[1], ww[2], ww[3]);
            r.over = 2.0;

            j+=2;
        }
    };


    //ow(); // if you want to play directly the game - you need to call this (used to populate the world)


    // our atlas!
    var texture = GL.Texture.fromImage(tileset);


    /*
        super tiny, good shader :D
        features:
            1. textured
            2. fog (based on distance, same for all sprites)
            3. "factor": blends between the current sprite and the one right above (good for animations or other effects)
            4. "over": stupid "overlay" for multiplying the final color (awful name)
            5. "sky": controls fog color (only R and B, since G remains constant throughout the game)
            6. alpha pixels get discarded to avoid alpha fuckups (sprites are sorted, but still...)
            7. bright colors don't get faded with fog (used in the moon and the demon's eyes)
    */
    var shader = new GL.Shader('\
        varying vec2 coord;\
        varying vec4 pos;\
        void main() {\
            coord = gl_TexCoord.xy;\
            gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
            pos = gl_Position;\
        }\
        ', '\
        uniform sampler2D texture;\
        uniform float factor;\
        uniform float over;\
        uniform vec2 sky;\
        varying vec2 coord;\
        varying vec4 pos;\
        float fogf(float d) {\
            const float LOG2 = -1.442695;\
            return 1.0 - clamp(exp2(d*d*LOG2), 0.0, 1.0);\
        }\
        void main() {\
            vec4 os = texture2D(texture, coord);\
            vec4 ms = texture2D(texture, coord + vec2(0.0, 0.25));\
            os = mix(os, ms, factor);\
            if(os.a < 0.8) discard;\
            float fog = fogf(gl_FragCoord.z/gl_FragCoord.w * 0.5);\
            float d = (1.0 / distance(vec4(0.0, 0.0, 0.0, 0.0), pos)) * (over - 1.0);\
            gl_FragColor = mix(os, vec4(sky.x, 0.26, sky.y, 1.0), fog) + (vec4(0.87, 0.46, 0.051, 1.0) * d);\
            if(os.r > 0.9 && os.g > 0.9) gl_FragColor = os;\
        }\
        ');

    // initialize ZzFX here - done on first click
    zfx = function()
    {
        // ZzFX - Zuper Zmall Zound Zynth - Micro Edition
        // MIT License - Copyright 2019 Frank Force
        // https://github.com/KilledByAPixel/ZzFX
        var xV=.3;      // volume - make this global if we need it
        zzfx=           // play sound
        (p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=
        0,B=0,M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g
        =0,H=0,a=0,n=1,I=0,J=0,f=0,x,h)=>{e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d
        /R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<
        q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1),-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.
        round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:-1)*M.abs(f)**D*xV
        *p*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/2+(c>a?0:
        (a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin
        (a)+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n||=1);p=zzfxX.
        createBuffer(1,h,R);p.getChannelData(0).set(k);b=zzfxX.createBufferSource();b.
        buffer=p;b.connect(zzfxX.destination);b.start();return b};zzfxX=new AudioContext;

        ft = false;
    };

    // SFX related sounds. why are they down here? so they are closer to the sfx implementation I guess
    const
        SFX_SHOTGUN = 0,
        SFX_STEP    = 1,
        SFX_HIT     = 2,    // when they hit YOU
        SFX_FEAST   = 3,
        SFX_MINI    = 4,    // our tiny bongo
        SFX_DRUM    = 5,    // "the real deal"
        SFX_HAT     = 6,    // this is shit - unused
        SFX_DEMONIC = 7,
        SFX_BLIMP   = 8,    // this is shit - not sure if used, no time to check
        SFX_PUFF    = 9,    // when a demon is killed
        SFX_SAVED   = 10,   // when a soul is "saved" (should have added another sound for when you collect 5 souls...)

        ssf =
        [
            [2.01,.3,111,,.08,.3,3,,-5,.6,,.01,.11,.2,-1,.3,.03,.74,.02],       // crunchy shotgun
            [2,0.2,100,.01,.02,.02,,1.9,-7.4,,,,.07,1.5,,,.1,,.08,.47],         // step
            [2,,528,.01,,.48,,.6,-11.6,,,,.32,4.2],                             // hit
            [2,,11,,2,3,,,,,55,.22,.03,,22,,.15,,1],                            // feast weird sound
            [2,0.15,555,,,.02,,1.13,,,,,,.2,-131,,,,,.01],                      // mini bongo
            [2,,250,,.08,.06,1,.5,-4,-1,,,,.1,,,.04,.62,.08],                   // super drum
            [1.27,,5555,.01,.08,.08,4,2.57,,.1,-50,.02,.01,2,-1,,,.37,.08,.01], // hat
            [1.94,,1,,2,2,1,1.08,1.5,-0.4,,,,,33,.1,.06,.61,1,.46],             // demonic
            [1.99,.1,1429,,.02,.2,,.73,,-2,25,.02,,,,,.07,.73,.04,.08],         // blimp
            [2.01,,90,.01,.06,.06,,1.12,7.9,.7,,,.03,,,,.19,.83,.07],           // demon puff
            [2,,177,.12,.01,0,,2.48,,31,,,.07,,,,.2,.6,.01],                    // saved
        ];

    sfx = function(which)
    {
        // don't play sounds if you are out of focus
        if(document.hasFocus())
        {
            zzfx(...ssf[which]);
        }
    };

    var mst = 0.0,  // music timer
        msc = 0,    // music counter. where are we now?
        mgg =
        [
            1, 0, 1, 1,
            1, 0, 2, 0,
            1, 0, 1, 0,
            1, 0, 2, 0
        ]; // music song

    msx = function(dt)
    {
        if(!document.hasFocus()) return;

        mst += dt;
        if(!ft && mst > 0.1)
        {
            if(mgg[msc] == 1 && dmn ==1)
            {
                sfx(SFX_DRUM);
            }
            mst -= 0.1;
            msc++;
            if(msc >= mgg.length) msc = 0;
        }
    };

    // CLICK. lockpointer is handled in lightgl.js implementation
    gl.onmousedown = function(e)
    {
        // once you reach this - you are done
        if(runs > 11) return;

        // if first time - start audio
        if(ft)
        {
            text(""); // clear up the "click to play" text
            zfx();
            state = 1 /*STATE_TALK_WITH_PRIEST*/;
            return;
        }

        // don't allow shooting - unless it's time to
        if(state != 3 /*STATE_GAME_MAIN*/ || dmn == 0 || tsg < 0.3) return;

        tsg = 0.0; // "time since gun" lol

        // shoot!
        bullet.p.x = -cam.x;
        bullet.p.z = -cam.z;
        bullet.v = 1;
        bullet.a = angleY * 3.14 / 180.0;

        // "light shit up"
        for(var i = 0; i < spr.length; i++)  spr[i].l = 1.8;

        shotgun.p.z = -0.12; // set the shotgun backwards a bit so it will return to position and look like a reload animation (or something like that)
        sfx(SFX_SHOTGUN);
    };

    // reset up down / left right detection
    gl.onmouseup = function(e)
    {
        lrc = udc = 0;
    };

    // move the mouse!
    gl.onmousemove = function(e)
    {
        if(state == 2 /*STATE_FEAST_NIGHT*/ || runs > 11 || state == 4 /*STATE_GAME_OVER*/ || state == 5 /*STATE_YOU_WIN_LOL*/) return;

        // move camera around
        angleX += e.my * lastDelta * 4.0;
        angleY += e.mx * lastDelta * 4.0;
        angleX = clamp(angleX,-90,90); // if we don't clamp this, you can break your neck lol

        /*
            detect a YES or NO
            basically: check in which direction you are moving the camera. first, check which axis is bigger (is this vertical or horizontal?)
            if you stay on the same axis - check when you swap the direction (udc and lrc are counters for this)
            once you reach a value - we trigger "yes" or "no". works more or less ok
        */
        if(touchingNpc)
        {
            // horizontal axis is bigger and wins - let's check left/right
            if(Math.abs(e.mx) > Math.abs(e.my))
            {
                // move right
                if(e.mx < 0 && dir != 0)
                {
                    dir = udc = 0;
                    lrc++;
                }
                else if(e.mx > 0 && dir != 1)
                {
                    dir = 1;
                    udc = 0;
                    lrc++;
                }
            }
            // vertical wins - up/down
            else
            {
                // down?
                if(e.my > 0 && dir != 2)
                {
                    dir = 2;
                    lrc = 0;
                    udc++;
                }
                // up?
                else if(e.my < 0 && dir != 3)
                {
                    dir = 3;
                    lrc = 0;
                    udc++;
                }
            }

            // used for "yes / no". needs to improve this.
            if(lrc > 2 && questionAsked && touchingNpc)
            {
                //console.log("NOPE");
                say(0);
                lrc = udc = 0;
            }
            else if(udc > 2 && questionAsked && touchingNpc)
            {
                //console.log("YES");
                say(1);
                lrc = udc = 0;
            }
        }
    };


    // update all sprite objects
    usp = function(c, dt)
    {
        c.mn = c.p.subtract(c.d);
        c.mx = c.p.add(c.d);

        // bullets
        if(c.t == 1 /*TYPE_BULLET*/)
        {
            c.p.x += Math.sin(c.a) * dt * 10.0;// * 0.1;
            c.p.z -= Math.cos(c.a) * dt * 10.0;// * 0.1;
        }

        // sprites should always face the player (bullets too but we cannot mess with their internal angle)
        else if(c.t == 0 /*TYPE_NPC*/ || c.t == 3 /*TYPE_SPRITE_BDB*/)
        {
            c.a = Math.atan2( -cam.x - c.p.x, -cam.z - c.p.z ) * ( 180 / Math.PI );
        }

        // npcs
        // super stupid way of making the npcs walk towards the player
        // if you are an npc and the "demon" flag is triggered = chase the player! (TODO: check collision with player)
        if(c.t == 0 /*TYPE_NPC*/ && dmn == 1)
        {
            var sp = dt*0.85;

            // super shitty fix to attempt getting the npc's to "spread out": they will only chase you in X if they are close enough
            // (otherwise they just move in straight line)
            if(Math.abs(cam.z + c.p.z) < 1.0)
            {
                if(-cam.x > c.p.x) c.p.x += sp;
                else c.p.x -= sp;
            }

            if(-cam.z > c.p.z) c.p.z += sp;
            else c.p.z -= sp;
        }
    };

    // aabb vs aabb
    // we assume a and b have two vectors mn (min) and mx (max) which determine their bounding box
    // you need to call update on them (usp) so the min and max are calculated based on their (p)osition +- (d)imensions
    abab = function(a, b)
    {
        return (a.mn.x <= b.mx.x && a.mx.x >= b.mn.x && a.mn.y <= b.mx.y && a.mx.y >= b.mn.y && a.mx.z <= b.mx.z && a.mx.z >= b.mn.z);
    };

    // shitty wrapper function (it's called from 2 places)
    gotofeast = function()
    {
        // if we are still talking with the priest, we can go to the feast state
        if(state == 1 /*STATE_TALK_WITH_PRIEST*/)
        {
            text("");
            cam.x       = 0.0;
            cam.z       = -1.0;
            angleX      = angleY = 0.0;
            state       = 2 /*STATE_FEAST_NIGHT*/;
            feast.v     = 1;
            skip        = false;
            totalTime   = 0.0; // we reset the totaltime timer so it's easier to track time on each state without extra vars
            sfx(SFX_FEAST);
        }
    };

    // if you are touching an NPC and he never asked a question (.h) then go ahead
    var questionAsked = false;
    askQuestion = function()
    {
        if(!questionAsked && who != null && who.h == 0)
        {
            lrc = udc = 0;
            text(who.x);
            questionAsked = true;
        }
    }

    // "say" is called by the user motion (nod / shake, yes / no)
    // 0: said nope
    // 1: said yes
    say = function(what)
    {
        if(questionAsked && touchingNpc && who.h == 0)
        {
            text("");

            // if this is the priest - freeze the player right away
            if(who.o == 0 /*RESOUT_PRIEST*/)
            {
                move = false;
            }

            setTimeout(() =>
            {
                // if it's a negative reaction (that will turn them to demons) - change the text to red
                if(who.o == 2 /*RESOUT_BOTH*/ || (who.o == 3 /*RESOUT_TURN_YES*/ && what == 1) || (who.o == 4 /*RESOUT_TURN_NO*/ && what == 0))
                {
                    ttc("#F00"); // make the text go red

                    shakey = 1.0; // we could animate this, perhaps using it as a multiplier
                    tig = who; // store who is being transformed - we need to move this one a few steps backwards
                    sfx(SFX_DEMONIC);

                    setTimeout(() =>
                    {
                        text("");

                        // turn them into demons
                        trg = 0.0;
                        dmn = 1.0;
                        shotgun.v = 1.0;
                        shakey = 0.0;
                        tig = null;
                    }, "3000");
                }
                else
                {
                    sup++; // you saved one!
                    if(who.o != 0 /*RESOUT_PRIEST*/) // we don't save the "priest"
                    {
                        sfx(SFX_SAVED);
                    }
                    //console.log("saved!")
                }

                // print the NPC's answer based on your reaction
                (what == 1) ? text(who.y) : text(who.n);

                if(who.o == 0 /*RESOUT_PRIEST*/)
                {
                    skip = true;
                    setTimeout(() =>
                    {
                        gotofeast();
                    }, "15000"); // if after 15 seconds you didn't press enter... I guess I will have to help you lol
                }
            }, "1000");
            who.h++;
        }
    }


    // called every frame, dt is the delta time in seconds
    gl.onupdate = function(dt)
    {
        lastDelta = dt;
        totalTime += dt;
        ttt += dt;

        if(runs > 11) return;

        // hide text after 3 seconds (this will automatically update if you are still touching an npc)
        if(ttt > 2 && !touchingNpc) text(""); // delete the text automatically

        // had to create a special case here...
        if(state == 1 /*STATE_TALK_WITH_PRIEST*/ && skip && GL.keys.SPACE)
        {
            gotofeast();
            return;
        }

        if(state == 2 /*STATE_FEAST_NIGHT*/ || !move || state == 4 /*STATE_GAME_OVER*/ || state == 5 /*STATE_YOU_WIN_LOL*/) return;

        // demon death timer
        if(dmn == 1) ddt += dt;
        stt += dt;
        tsg += dt;

        // todo: check later on where to put the music
        if(state == 3 /*STATE_GAME_MAIN*/)
        {
            msx(dt);

            // animate the shotgun moving back to position (after shooting)
            shotgun.p.z = clamp(shotgun.p.z - dt * 0.25, -0.18, -0.12);
        }

        /*
        // I decided it made no sense to keep these variables since I could just go straight and use them in the if's....
        var up      = GL.keys.W | GL.keys.UP,
            down    = GL.keys.S | GL.keys.DOWN,
            left    = GL.keys.A | GL.keys.LEFT,
            right   = GL.keys.D | GL.keys.RIGHT,
            */
        var speed = side = strife = 0.0, i = 0;

        // control the player's speed
        if(GL.keys.W | GL.keys.UP /*up*/ && !touchingNpc && !tte) speed = -dt * 1.0; // change this 1.0 to modify the player's velocity
        else if(GL.keys.S | GL.keys.DOWN /*down*/) speed = dt * 1.0;

        if(GL.keys.D | GL.keys.RIGHT /*right*/)
        {
            side = 90;
            strife = -dt;
        }
        else if(GL.keys.A | GL.keys.LEFT /*left*/)
        {
            side = -90;
            strife = -dt;
        }

        // play the step each ~0.35 seconds or so
        if((speed != 0.0 || side != 0.0) && (stt > 0.35)){ sfx(SFX_STEP); stt = 0.0; }

        var strafeRot = (angleY + side) * 3.14/180,
            stepRot = (angleY) * 3.14/180;

        // there are probably better ways to do this, but it's working, so....
        // step 1: update strafing
        cam.x += Math.sin(strafeRot) * strife;
        cam.z -= Math.cos(strafeRot) * strife;

        // step 2: update step (move forward / backwards)
        cam.x += Math.sin(stepRot) * speed;
        cam.z -= Math.cos(stepRot) * speed;

        // clamp the camera (player position) so we don't get outside the playable area lol
        if(state == 1 /*STATE_TALK_WITH_PRIEST*/)
        {
            cam.x = clamp(cam.x, -0.8, 0.8);
            cam.z = clamp(cam.z, -0.8, 0.8);
        }
        else if(state == 3 /*STATE_GAME_MAIN*/)
        {
            //cam.x = clamp(cam.x, -2.2, 2.2);
            cam.x = clamp(cam.x, -4.0, 4.0);
            cam.z = clamp(cam.z, -1.2, 39.8);

            /*
            // wolves or some other shit
            if(cam.x < -6.0 || cam.x > 6.0)
            {
                sfx(SFX_HIT);
                state = STATE_GAME_OVER;
                totalTime = 0.0;
            }*/

            if(cam.z > 38.8)
            {
                state = 5 /*STATE_YOU_WIN_LOL*/; // you made it, yay!
                totalTime = 0.0;
                cam.x = 0.0;
                cam.z = -1.0;
                angleX = angleY = totalTime = shakey = 0.0;
            }
        }

        // we move the CAMERA and set the player. it's negative because the camera gets translated by the positive axis so....
        player.p.x = -cam.x;
        player.p.y = -cam.y;
        player.p.z = -cam.z;
        touchingNpc = tte = false;

        // attempting sort in order to unfuck the bug of broken alpha on sprites when drawing them out of order... it's kinda working
        spr.sort(function(a, b)
        {
            return parseFloat(b.p.z) - parseFloat(-a.p.z);
        });

        // used to detect if "any demon" was touched during "demon mode"
        var anyone = false;

        // super weird case: when the npc's transform into monsters, we want them to get away from the player. right now we only move them on z
        // we can only use shakey BEFORE they become fully demons - this is the moment they should be moving
        if(tig != null && shakey == 1.0 && dmn == 0.0)
        {
            tig.p.z -= dt * 0.25;
        }

        // update all sprite objects. use the objects themselves and their type (t) to determine flags (movement, etc)
        for(i = 0; i < spr.length; i++)
        {
            // update each one (position and so on)
            usp(spr[i], dt);

            // update sprite shading (shooting)
            spr[i].l = clamp(spr[i].l - dt * 4.0, 1.0, 2.0);

            // checking against npc's - don't collide against invisible things...
            if(spr[i].t == 0 /*TYPE_NPC*/)
            {

                // reanimate fallen demons and spawn one new EACH TIME! (this should bring lots of demons to kill)
                if(dmn == 1.0 && ddt > 2.0)
                {
                    for(var j = 0; j < spr.length; j++)
                    {
                        if(spr[j].t == 0 /*TYPE_NPC*/ &&spr[j].v == 0)
                        {
                            spr[j].v = 1;
                            spr[j].p.x += rn(-4.0, 4.0); // re-spawn the poor thing between our path limits
                            spr[j].p.z += rn(-5.0, 5.0); // this is kinda shitty but gives interesting results - sometimes spawns a demon right behind you and it's funny
                            mo(3 /*MESH_FEMME*/, 0 /*TYPE_NPC*/, rn(-4.0, 4.0), 0.3, -cam.z + rn(-5.0, 5.0),  0.015, 0.30, 0.05);
                        }
                    }
                    ddt = 0.0;
                }

                // the sprite is visible
                if(spr[i].v == 1)
                {
                    // if you collide with the player
                    if(abab(spr[i], player))
                    {
                        // talk to people ONLY while they are in HUMAN form (demon flag = 0)
                        if(dmn == 0)
                        {
                            touchingNpc = true;
                            if(spr[i].x != null)
                            {
                                who = spr[i];
                                askQuestion();
                            }
                        }
                        else if(dmn == 1)
                        {
                            anyone = true;
                            goc += dt;
                            if(goc > 0.3)
                            {
                                shakey = 1.0;
                                sfx(SFX_HIT);  // todo: camera shake!
                                if(goc > 0.5)
                                {
                                    // todo: play SFX here!
                                    state = 4 /*STATE_GAME_OVER*/;
                                    cam.x = 0.0;
                                    cam.z = -1.0;
                                    angleX = angleY = totalTime = shakey = 0.0;
                                }
                            }
                        }
                    }

                    // we don't care about bullets outside of the main game
                    if(state == 3 /*STATE_GAME_MAIN*/ && spr[i].t == 0 /*TYPE_NPC*/ && abab(spr[i], bullet))
                    {
                        // TODO: SPAWN PARTICLES!!!
                        spr[i].v = 0; // bye bye
                        bullet.p.x=bullet.p.z=10000;
                        ddt = 0;
                        //console.log("BOOM");
                        dup++; // one more soul "purified" lol
                        sfx(SFX_PUFF);
                    }
                }
            }
            // trees - we only calculate collisions with them and nothing else
            else if(spr[i].t == 3 /*TYPE_SPRITE_BDB*/)
            {
                if(abab(spr[i], player))
                {
                    tte = true; // once upon a time, trees were... npc's. but then the code grew up. a lot. now we need to check them separately :(
                }
            }
        }

        // if no demos are touching you - you are safe!
        if(!anyone)
        {
            goc = 0.0;
            if(trg > 0.9) shakey = 0; // this is a weird case - we need to detect when we aren't touching a demon but also when we aren't turning. so we use trg
        }

        // used to clean up the text - should remove this based on time, but... whatever.
        if(!touchingNpc)
        {
            //text("");
            questionAsked = false; // todo: we should clean this up. now we keep track of the counter inside each npc, but this seems to work, so....
        }
    };

    /*
        draw "box"
        boxes are simple lightgl.js Meshes that have from 1 to 6 faces.
            b:          the actual mesh (the mesh object, not the number from the list of meshes)
            x, y, z:    the position in the world
            s:          scale (right now scales in all axis at the same time)
        TODO: unify this with the sprites !!!!!
    */
    dbu = function(b, x, y, z, s)
    {
        gl.pushMatrix();
            gl.translate(x, y, z);
            gl.scale(s, s, s);
            // these objects (basically the shotgun and the church) do not need factor (no dmeonization) but SHOULD have the "over" flag - FIX ME!!!!
            shader.uniforms({ texture: 0,  factor: 0.0, sky: skv, over: 1.0 });
            shader.draw(b);
        gl.popMatrix();
    };


    // draw billboard (all sprites are billboards, hence the name)
    // NEW: we have inside the sprite some other meshes too, they are good to go (as long as you create them using the method "mo")
    dbd = function(c) //, f)
    {
        // if the object is visible...
        if(c.v > 0)
        {
            // THIS IS WORKING! if an object is farther than 5 units (positive or negative in the Z axis) it's not drawn (culled)
            // this only applies to trees right now (TYPE_SPRITE_BDB)
            if(c.t == 3 /*TYPE_SPRITE_BDB*/ && Math.abs(cam.z + c.p.z) > 5.0)
            {
                return;
            }

            gl.pushMatrix();
                gl.translate(c.p.x, c.p.y, c.p.z);

                // this is working but it's kinda shitty - we either need to move the rotation calculation outside or do something else !!!
                if(c.t == 1 /*TYPE_BULLET*/)
                {
                    // bullets already use the attribute .a (angle) for updating its position, so I had to calculate this here :(
                    gl.rotate(Math.atan2( -cam.x - c.p.x, -cam.z - c.p.z ) * ( 180 / Math.PI ), 0.0, 1.0, 0.0);
                }
                else
                {
                    gl.rotate(c.a, 0.0, 1.0, 0.0);
                }

                // scale if not identity
                if(c.s != 1.0)
                {
                    gl.scale(c.s, c.s, c.s);
                }

                // this is awful but it has to be done :(
                // if not done here I would have to add additional logic outside and it would look like shit
                // basically this updates the "factor" value (controls the demonization effect)
                if(c.t == 0 /*TYPE_NPC*/)
                {
                    c.f = trg;
                }

                shader.uniforms({ texture: 0, factor: c.f, sky: skv, over: c.l });
                shader.draw(c.m); // draw the mesh (when creating the object, the mesh object gets converted from index to actual mesh)
            gl.popMatrix();
        }
    };

    glcb = function()
    {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
    };

    // draw the frame!
    gl.ondraw = function()
    {
        var i = 0;

        // "background" color. matches the fog color.
        gl.clearColor(skv[0], 0.26, skv[1], 1.0)
        gl.clear(16384 | 256); // gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT
        gl.loadIdentity();

        // binding the texture we will use (we only have this one...). perhaps could be done once outside of the loop, but whatever
        // shader uniforms NEED to get updated before each object is drawn (to pass custom uniforms).
        // could optimize this into separate arrays so the uniforms would only need to be udpated once per object type, but we don't need to
        texture.bind(0);

        // the shotgun needs to be drawn separately - before we move everything to camera's coordinates
        // later on it's probably redrawn together with all other "sprites", but with its position it gets always out of screen lol
        if(shotgun.v == 1.0)
        {
            // sideways movement - I had to disable upward movement because there was an issue with UV that was distracting :(
            shotgun.p.x += (Math.sin(totalTime * 2.5) * 0.00015);

            gl.pushMatrix();
                dbd(shotgun);
            gl.popMatrix();
        }

        // SCREEN SHAKE WORKING! now we need to make a function out of it lol (todo: wrap the stupid "random from array" lol)
        if(shakey == 1)
        {
            var rotlol = [-0.1, 0.1, -0.17, 0.15]; // this is a terrible hack because rn doesn't handle numbers so small apparently :/
            gl.rotate(angleX + rotlol[Math.floor(Math.random() * rotlol.length)], 1, 0, 0);
            gl.rotate(angleY + rotlol[Math.floor(Math.random() * rotlol.length)], 0, 1, 0);
        }
        else
        {
            gl.rotate(angleX, 1, 0, 0);
            gl.rotate(angleY, 0, 1, 0);
        }

        gl.translate(cam.x, cam.y, cam.z);

        // the skybox! (basically, a ceiling plane )
        // CAREFUL! if this is too low it will fuck up objects on the ground (it will cut through them)
        dbu(skybox, -cam.x, -3.4, -cam.z, 5.1);


        // note: I don't like mixing updating and rendering, but since I've got most of the logic here, I will continue putting it here
        // and leave update for collisions. sorry, js13k life is hard!
        if(state == 0 /*STATE_CLICK_HERE*/)
        {
            glcb();
            gl.clear(16384 | 256);

            if(runs <= 11)
            {
                text("<mark>[click to play]</mark>");
            }
            else
            {
                text("<mark>Brother Doen failed God's Judgment<br>This is all there is for him now<br>GAME OVER</mark>");
            }
        }
        else if(state == 1 /*STATE_TALK_WITH_PRIEST*/)
        {
            feast.v = 0;
            priest.v = 1.0;                                 // perhaps we can skip this later on
            dbu(chuchu, 0, 0, 0, 1.0);                      // change this to use dbd later on!
            for(i = 1; i < spr.length; i++) dbd(spr[i]);    // draw sprites
        }
        else if(state == 2 /*STATE_FEAST_NIGHT*/)
        {
            // animate the feast "lighting" (from dark to red to yellowish)
            feast.l = clamp(feast.l + (lastDelta * 0.5), 0, 3.0);

            // I know what you are thinking. are we clearing the buffers TWICE during the intro? (and a few other states.....)
            // yes we are. I needed black color and I didn't want to make exceptions for the case that is running 99.99% of the frames, so fuck it :D
            glcb();
            gl.clear(16384 | 256);
            dbd(feast); // manually draw the feast logo

            // after 5 seconds - let's go to the game
            if(totalTime >= 3.0)
            {
                state = 3 /*STATE_GAME_MAIN*/;
                move = true;
                feast.v = 0;
                priest.v = 0;

                // if this was a bigger game I would NEVER do something like this (load the world from the rendering loop). but... :shrug:
                // this one generates the outerworld "level"
                ow();
            }
        }
        else if(state == 3 /*STATE_GAME_MAIN*/)
        {
            // for some reason, this... dude kept appearing on the game and I needed to make sure he wasn't there, so... bye bye!
            priest.v = 0;

            // if we are on demon mode - start turning them into demons (this changes the color sky too)
            if(dmn == 1.0)
            {
                var ut = lastDelta*2.0;
                trg = clamp(trg + ut, 0.0, 1.0 );
                skv[0] = clamp(skv[0] + ut, 0.26, 1.0);
                skv[1] = clamp(skv[1] - ut, 0.18, 0.27);

                if(dup > 0)
                {
                    ttc("#d00");
                    text("[" + dup + "]");
                }
            }

            dbu(chuchu, 0.0, 0.0, 2.5, 1.0);
            for(i = -4; i < 6; i+= 2) dbu(chuss, i, 0.0, 2.5, 1.0);     // church wall
            for(i = -4; i < 6; i+= 2) dbu(chuss, i, -0.5, -41.1, 1.0);  // castle wall
            for(i = 0; i < spr.length; i++) dbd(spr[i]);
        }
        else if(state == 4 /*STATE_GAME_OVER*/)
        {
            // the same shit again, sorry :D
            glcb();
            gl.clear(16384 | 256);

            move = false;
            cam.z = -1.0;
            priest.p.x = priest.p.z = cam.x = 0.0;
            priest.l = 2.0;
            priest.a = 0.0;
            trg = 1.0;
            priest.v = 1.0;
            dbd(priest);

            if(totalTime > 1.0)
            {
                ttc("#F42");
                if(dup < 10)
                {
                    text("YOU 'PURIFIED' " + dup + " SOULS<br>(BUT YOU NEED TO SAVE FIVE...)")
                }
                else if(dup < 15)
                {
                    text("INTERESTING..." + dup + " SOULS!<br>STILL NOT ENOUGH")
                }
                else if(dup < 35)
                {
                    text("THAT'S AN A FOR EFFORT! " + dup + " SOULS!<br>(you don't escape by killing people!)")
                }
                else if(dup < 75)
                {
                    text("" + dup + " SOULS ARE DANCING NOW<br>YOUR RANK IS 'S'!<br>(stop killing or you will become the new Devil!)")
                }
                else
                {
                    text("" + dup + " SOULS MEANS YOU ARE THE NEW DEVIL!<br>Come here my Child. I knew you could do it <3")
                    totalTime = 0.0;
                }
            }

            if(totalTime > 7.0 || GL.keys.SPACE)
            {
                location.reload();
            }
        }
        else if(state == 5 /*STATE_YOU_WIN_LOL*/)
        {
            gl.clearColor(0.7, 0.7, 0.7, 1.0);
            gl.clear(16384 | 256);

            move = false;
            priest.p.x = priest.p.z = cam.x = 0.0;
            cam.z = -1.0;
            priest.l = 0.1;
            priest.a = 0.0;
            priest.v = 1.0;
            dbd(priest);


            var mm="<br><br>[press space]";
            if(totalTime > 1.0)
            {
                ttc("#000");

                if(dup > 0)
                {
                    ttc("#F00");
                    text("You really thought that Hand Cannon would 'save souls'?<br>Go away"+mm);
                }
                else
                {
                    if(sup == 1)
                    {
                        text("Reached the gate but saved none other than yourself<br>Don't deserve to reach Heaven... yet"+mm);
                    }
                    else if(sup > 2 && sup < 6)
                    {
                        text("You saved " + sup + " souls, that's awesome!<br>But we need 5...<br>(Cannot play cards with less people)"+mm);
                    }
                    else
                    {
                        // we don't block this state.....
                        text("Welcome to Heaven, Brother Doen<br>Enjoy your peace<br>And thank you for the souls you saved :)");
                        totalTime = 0.0;
                    }
                }
            }

            if(totalTime > 10.0 || GL.keys.SPACE) // again awful coding but it's too late and I have to finish this!
            {
                location.reload();
            }
        }
    };

    gl.enable(2929); // gl.DEPTH_TEST
    gl.enable(3042); // gl.BLEND - warning: in order to have true alpha you need to discard values on the shader (otherwise you get some not fully transparent ghosts)
    gl.blendFunc(770, 771);     // gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA
    gl.fullscreen();
    gl.animate();
}

window.onload = function()
{
	GAME()
}
