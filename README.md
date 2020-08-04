# <span id="intro"> WebGameEngine </span>
![](https://img.shields.io/badge/version-1.0.0-blueviolet) ![](https://img.shields.io/apm/l/atomic-design-ui.svg?)
### This Project will provide you with the infrastructure to build games using JavaScript and HTML5 (canvas).
### Advantages:
> - Easy to install and use (plug and play)
> - Focus On Game Content
> - Game States Management
> - Additional (optional) common utilities for game development

### _<b>Quick Navigation: </b>_ [Import Engine](#install), [Use Engine](#bind), [Game Development Using Engine](#dev), [Optional Utilities](#extra).
&nbsp;

# ⛏ <span id="dev"> Game Development </span>
##  <u><b>SE Object</b> - The Smile Game Engine Object</u>
### This object represents the Game Engine and encapsulate the main game loop, inout handling ans state managing.
* ### <u><b>Initialization:</b></u> to initialize a SE (SmileEngine) object you will be required to specify initial data to let the engine know what and how to run the game
    ```javascript
    let initData = { canvasId : "", initState: null, fps: 0, mode: "" };
    ```
    | Attribute | Required | Description                                                                                  |
    | --------- | -------- | -------------------------------------------------------------------------------------------- |  
    | canvasId  |    V     | The ID of the canvas tag that the engine will bind the game to                               |
    | initState |    V     | The initial Game State that will be running when the engine will start                       |
    | fps       |          | Frame Per Seconds that the engine will be runnung in the range [1,1000], default value is 60 |
    | mode      |          | The mode of the context of the graphics in the canvas, '2d'/'3d', default value is '2d'      |
    
   * ### <u><b>SE.constructAndStart(initData)</b></u>- Creates and Initialize the SE object -> Bind with the given settings data -> Start the engine. <b>all with a single static method.</b>

* ### <u><b>Static Access:</b></u> after initialization, you can get static access to global vars from all the states
    | Static Var | Description                                                                                                                                                               |
    | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |  
    | SE.engine  | get the current SE object to access all the methods that it provides                                                                                                      |
    | SE.running | get the value of the current state of the engine to check if it is running or not                                                                                         |
    | SE.keys    | an boolean dictionary that represents if a given keyboard key is pressed, if the key is down 'true' will be returned, false otherwise. keys will be by 'e.key' of event e |
* ### <u><b>SE.engine:</b></u> the (static) engine object to access and manipulate the engine
    | Name              | Type   | Description                                                                                                                                   |
    | ----------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |  
    | width             | Getter | get the current width of the canvas (game space)                                                                                              |
    | height            | Getter | get the current height of the canvas (game space)                                                                                             |
    | Start()           | Method | Start (Or Restart) running the engine, only if the engine is not running already                                                              |
    | Stop()            | Method | Stop the engine from running, only if the engine is running                                                                                   |
    | pushState(state)  | Method | push new Game State to the top of the state stack and set it to run the input state                                                           |
    | popCurrentState() | Method | pop amd return the current running state and switch to run the state that was below it in the stack, if no state remains the engine will stop |

##  <u><b>Game State</b> - A State In The Game</u>
### This object represents the Game State And will Implement to Game, all objects can be considered GameState if they implements the required methods.
### The Engine will handle the calling of the methods base on the current state.
```javascript
class GameState
{
    /**
     * Type:            <Required>
     * Description:     This method will be called every frame and will update the state of the game.
     *                  If true is returened the state will remain active, otherwise the state will pop from the stack
     * Parameters:      elapsedTime - time in miliseconds that elapsed since the last time the method was called.
     */
    update(elapsedTime) { return true; }

    /**
     * Type:            <Required>
     * Description:     This method will be called every frame after update was called to redraw the sate to the canvas.
     * Parameters:      ctx - context object that can draw to the canvas with the noemal canvas methods.
     */
    draw(ctx) {}

    /**
     * Type:            <Optinal>
     * Description:     This method will be called once when the state will become active and can be used to init data.
     *                  if true is retured the state will beome active, otherwise the state will not be added to the stack.
     */
    init() { return true; }

    /**
     * Type:            <Optinal>
     * Description:     If this method is implemented, it will handle all the keyboard events while the state is active.
     *                  ( This method provides more info from the static dictionary 'SE.keys' )
     * Parameters:      e - The key event that was fired
     */
    handleKeysEvent(e) {}

    /**
     * Type:            <Optinal>
     * Description:     If this method is implemented, it will handle all the mouse events while the state is active.
     * Parameters:      e - The mouse event that was fired
     */
    handleMouseEvent(e) {}
}
```
&nbsp;

# 📦 <span id="install"> How To Import Engine To Project </span>
* ## <u>Import To Existing Project </u> - ([binding is needed](#bind))
    > 1. Download the [Engine File](https://github.com/attiasas/WebGameEngine/blob/master/Engine) from the reposetory.
    > 2. Copy `SmileEngine.js` file to your project.
* ## <u>Download latest Template Project</u> - [template project zip](https://github.com/attiasas/WebGameEngine/blob/master/Templates).
&nbsp;

# ⚠️<span id="bind"> How To bind canvas (HTML) with the Engine and The GameState </span>
1. import the Engine File
    ```html
    <script type="text/javascript" src="../Engine/SmileEngine.js"></script>
    ```
2. create canvas with unique id and specify the dimentions
    ```html
    <canvas id="canvas" height="600" width="600">
    ```
3. Bind Canvas to Game with the Engine and Start running
    ```html
    <script>
        SE.constructAndStart({canvasId:"canvas",initState:new GabeState});
    </script>
    ```
&nbsp;

# ➕ <span id="extra"> Extra Game Utilities </span>
## <u>Available Utilities:</u>
### ** Will Be Available In Future Versions **
## <u>Plans for upcoming versions:</u>
| Name                | Info                                                                             | Version |  
| ------------------- | -------------------------------------------------------------------------------- | ------- |  
| _Physics System_    | Momvements (Position/Velocity), Collisions                                       | 1.1.0   |
| _UI Components_     | In Game UserInpur Components (Menu,Buttons,TextFields)                           | Unknown |
| _Input Controller_  | Dynamic Assignment Keys (Actions) to game commands from input                    | Unknown |
| _Camera_            | View Camera (movement speed and control,zoom, follow target) for big states      | Unknown |
| _Common Algorithms_ | Common Algorighms for game development (search,noise generation,timers and more) | Unknown |

&nbsp;

## **[⬆ back to top](#intro)**