/**
* Libraries
*/

import React,{
    Component
} from 'react';
 
import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

import { SketchPicker } from 'react-color';

/**
* Components
*/

// import Button from '../../library/Button/button';

/**
* Styles
*/

import './paint.scss';

/**
* Selectors
*/

import * as Selectors from '../../reducers/selectors';

/**
* Actions
*/

import * as Actions from '../../actions';

/**
* Utility
*/

import * as Utility from '../../utility';
import Button from '../../library/Button/button';

/**
 * Paint component definition and export
 */


export class Paint extends Component {

    
    /**
    * Methods
    */

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas = () => {
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext("2d");
        canvas.addEventListener('mousedown', (e) => {
            // console.log(e.x, canvas.offsetLeft, canvas.offsetTop)
            // console.log(e.x)
            this.props.mouseDown(true);
            this.props.captureLastXY(e.x - 190, e.y - 10)
            // this.onPaint(e.x - 190, e.y - 10, false)
        })

        canvas.addEventListener('mousemove', (e) => {
            if(this.props.mousePressed){
                this.props.captureXY(e.x - 190, e.y - 10)
                // this.onPaint(e.x - 190, e.y - 10, true)
                this.onPaint()
            }
            
        })

        canvas.addEventListener('mouseup', (e) => {
            this.props.mouseDown(false);
        })

        // canvas.addEventListener('mouseleave', (e) => {
        //     this.props.mouseDown(false);
        // })
        
    }

    onPaint = () => {
        this.ctx.strokeStyle = this.props.color;
        this.ctx.lineWidth = 10;
        this.ctx.lineJoin = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.props.lastX, this.props.lastY);
        
        this.ctx.lineTo(this.props.x, this.props.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    clearCanvas = () => {
        this.ctx.clearRect(0, 0, (innerWidth - 35), innerHeight);
    }

    handleChangeComplete  = (color, event) => {
 
        // let color = `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`;
        this.props.getColor(color);
        console.log(color, event)
    }
    

    /**
    * Markup
    */

    render(){
        return(
            <div className="paint">
                <div className="paint-tool-box">
                    {/* <SketchPicker
                    onChangeComplete={this.handleChangeComplete }
                        // onChange={(e)=>this.colorPicker(e)}
                    /> */}
                </div>
                <canvas width={window.innerWidth - 200} height={window.innerHeight-30} style={{border: "2px solid black"}} ref="canvas" ></canvas>
                {/* <Button
                    onClick={this.clearCanvas}
                    text={"Press"}
                    // disabled={isNaN(this.props.numberOfBalls)}
                /> */}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            mousePressed: Selectors.getMousePressedState(state),
            color: Selectors.getColorState(state),
            lastX: Selectors.getLastXState(state),
            lastY: Selectors.getLastYState(state),
            x: Selectors.getXState(state),
            y: Selectors.getYState(state),
        };
    },
    (dispatch) => {
        return {
            mouseDown: bindActionCreators(Actions.mouseDown, dispatch),
            getColor: bindActionCreators(Actions.getColor, dispatch),
            captureLastXY: bindActionCreators(Actions.captureLastXY, dispatch),
            captureXY: bindActionCreators(Actions.captureXY, dispatch),
        };
    }
)(Paint);
 