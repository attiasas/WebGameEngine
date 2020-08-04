// engine globals
let context;

class SE
{
    states;
    canvas;
    lastTimeStamp;
    
    static engine;
    static running;
    static keys;

    constructor(initData)
    {
        // validate required properties
        if(!initData.canvasId)
            throw {error:"canvas id should be include in the initial data under the property 'canvasId'"};
        if(!initData.fps)
            initData.fps = 60;
        else if(initData.fps <= 0 || initData.fps > 1000)
            throw {error:"fps parameter should be in the range [1,1000]"};
        
        if(!initData.initState)
            throw {error:"initial game state should be include in the initial data under the property 'initState'"};
        else
        {
            if(!initData.initState.update)
                throw {error:"game state should include method: 'update(elapedTime)'"};
            if(!initData.initState.draw)
                throw {error:"game state should include method: 'draw(context)'"};
        }

        // init general settings
        this.gameData = initData;
        SE.engine = this;
        SE.keys = {};

        // graphics
        this.canvas = document.getElementById(initData.canvasId);
        if(!this.canvas)
            throw {error:"could not find canvas element with the id: " + initData.canvasId};
        if(!initData.mode || (initData.mode !== "2d" && initData.mode !== "3d"))
        {
            context = this.canvas.getContext("2d");
        }
        else context = this.canvas.getContext(initData.mode);

        // inputs listener
        addEventListener("keydown",function(e) {SE.engine.handleKeysEvent(e);});
        addEventListener("keyup",function(e) {SE.engine.handleKeysEvent(e);});

        this.canvas.addEventListener("click",function(e){SE.engine.handleMouseEvent(e)});
        this.canvas.addEventListener("mousemove",function(e){SE.engine.handleMouseEvent(e)});
        this.canvas.addEventListener("mousedown",function(e){SE.engine.handleMouseEvent(e)});
        this.canvas.addEventListener("mouseup",function(e){SE.engine.handleMouseEvent(e)});
    }

    static constructAndStart(initData)
    {
        let engine = new SE(initData);
        engine.start();
    }

    start()
    {
        // init game state and start
        this.states = [];
        this.pushState(this.gameData.initState);

        SE.running = this.states.length > 0;

        if(SE.running) this.interval = setInterval(this.mainLoop, (1000 / this.gameData.fps));
        SE.engine.lastTimeStamp = new Date().getTime();
    }

    pushState(state)
    {
        if(!state.update)
            throw {error:"game state should include method: 'update(elapedTime)'"};
        if(!state.draw)
            throw {error:"game state should include method: 'draw(context)'"};
        
        // init state - if false return dont push
        if(state.init)
        {
            if(!state.init()) return;
        } 

        this.states.push(state);
    }

    popCurrentState()
    {
        if(this.states.length == 0) return null; // no states
        else if(this.states.length == 1) SE.engine.stop(); // last state

        let state = SE.engine.states.pop();

        return state;
    }

    stop()
    {
        console.log("stoping");
        SE.running = false;
        clearInterval(this.interval);
    }

    get width()
    {
        return this.canvas.width;
    }

    get height()
    {
        return this.canvas.height;
    }

    handleKeysEvent(e)
    {
        if(!this.states || this.states.length <= 0) return;

        if(e.type === "keydown") SE.keys[e.key] = true;
        if(e.type === "keyup") SE.keys[e.key] = false;

        if(this.states[this.states.length - 1].handleKeysEvent) this.states[this.states.length - 1].handleKeysEvent(e);
    }

    handleMouseEvent(e)
    {
        if(!this.states || this.states.length <= 0) return;

        if(this.states[this.states.length - 1].handleMouseEvent) this.states[this.states.length - 1].handleMouseEvent(e);
    }

    mainLoop()
    {
        let currentStamp = new Date().getTime();
        let currentState = SE.engine.states[SE.engine.states.length - 1];

        let continueState = currentState.update((currentStamp - SE.engine.lastTimeStamp) / 1000);

        this.canvas.width = this.canvas.width; //clean board
        currentState.draw(context);

        SE.engine.lastTimeStamp = currentStamp;

        //console.log(continueState);
        if(!continueState) SE.engine.popCurrentState();
    }
}