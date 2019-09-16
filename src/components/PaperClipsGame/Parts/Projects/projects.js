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

/**
* Components
*/

import Card from '../../SmallParts/Card/card';

/**
* Styles
*/

import './projects.scss';

/**
* Actions
*/

import * as Actions from '../../../../actions';

/**
* Const
*/

import * as projectsToAdd from '../../../../constants/projectsToAdd';

/**
* Projects component definition and export
*/

class Projects extends Component {

    /**
    * Constructor
    */

    constructor (props){
        super(props);
        this.state = {
            card1:  {
                text1: "Improved AutoClippers (750 ops)",
                text2 : "Increases AutoClipper performance 25%",
                price: {
                    ops: 5
                },
                action: 25,
                next: 'AutoClippers25',
                valid: false,
                id: "card1",
                terminal: "AutoClippper performance boosted by 25%"
            },
            card2: {
                text1: "Improved Wire Extrusion (1,750 ops)",
                text2 : "50% more wire supply from every spool",
                price: {
                    ops: 5
                },
                action: 50,
                next: 'wireExtrusion50',
                valid: false,
                id: "card2",
                terminal: "Wire extrusion technique improved, 1,500 supply from every spool"
            },
            card3: {
                text1: "RecTracker (500 ops)",
                text2 : "Automatically calculates average revenue",
                text3 : "per second",
                price: {
                    ops: 5
                },
                action: null,
                next: 'showRevTracker',
                valid: false,
                id: "card3",
                terminal: "RevTracker online"
            }
        }
    }

    handleOnClick = (id, next, price, action) => {
        this.props.deleteCard(id);
        switch(next){
            case 'showRevTracker':
                this.props.showRevTracker(price.ops);
                break;
            case 'AutoClippers25':
                this.props.addProject(projectsToAdd.AutoClippers50);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveAutoClippers(action);
                this.props.stop();
                this.props.autoPaperclipsStart(this.props.paperclipPrice, this.props.delay, this.props.delayAutoPaperClippers, this.props.wire);
                break;
            case 'autoClippers50':
                this.props.addProject(projectsToAdd.OptimizedAutoClippers75);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveAutoClippers(action);
                this.props.stop();
                this.props.autoPaperclipsStart(this.props.paperclipPrice, this.props.delay, this.props.delayAutoPaperClippers, this.props.wire);
                break;
            case 'autoClippers75':
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveAutoClippers(action);
                this.props.stop();
                this.props.autoPaperclipsStart(this.props.paperclipPrice, this.props.delay, this.props.delayAutoPaperClippers, this.props.wire);
                break;
            case 'wireExtrusion50':
                this.props.addProject(projectsToAdd.WireExtrusion75);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveWireExtrusion(action);
                break;
            case 'wireExtrusion75':
                this.props.addProject(projectsToAdd.MicrolatticeShapecasting100);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveWireExtrusion(action);
                break;
            case 'microlatticeShapecasting100':
                this.props.addProject(projectsToAdd.SpectralFrothAnnealment200);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveWireExtrusion(action);
                break;
            case 'spectralFrothAnnealment200':
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveWireExtrusion(action);
                break;
            case 'creativity':
                this.props.removePriceOfProjectOps(price.ops);
                this.props.creativityTurnOn();
                break;
                
        }


        
    }

    /**
    * Methods
    */

    renderCards = () => {
        return(
            <div>
                {this.props.cards.map((el,i)=>{
                    if(el){
                        return(
                            <Card
                                key={el.id}
                                onClick={() => this.handleOnClick(el.id, el.next, el.price, el.action)}
                                valid={el.valid}
                                price={el.price.ops}
                                id={el.id}
                                action={el.action}
                                i={i}
                            >
                                <div>{el.text1}</div>
                                <div>{el.text2}</div>
                                {el.text3 ? <div>{el.text3}</div> : null}
                            </Card>
                        )
                    }
                   
                })}
            </div>
        )        
    }

    componentWillMount = () => {
        this.props.initProjects(this.state.card1, this.state.card2, this.state.card3)
    }

    // componentWillMount = () => {
    //     this.props.initProjects(this.state.card1, this.state.card2, this.state.card3)
    // }
    
    /**
    * Markup
    */

    render(){
        return(
            <div className="projects">
                <div className="projects-label">Projects</div>
                <div className="projects-line"/>
                {this.renderCards()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            cards: state.business.cards,
            paperclipPrice: state.business.paperclipPrice,
            wire: state.business.wire,
            delay: state.business.delay,
            delayAutoPaperClippers: state.business.delayAutoPaperClippers,
            ops: state.business.ops,
            opsMax: state.business.opsMax,
        };
    },
    (dispatch) => {
        return {
            initProjects: bindActionCreators(Actions.initProjects, dispatch),
            deleteCard: bindActionCreators(Actions.deleteCard, dispatch),
            showRevTracker: bindActionCreators(Actions.showRevTracker, dispatch),
            addProject: bindActionCreators(Actions.addProject, dispatch),
            removePriceOfProjectOps: bindActionCreators(Actions.removePriceOfProjectOps, dispatch),
            improveAutoClippers: bindActionCreators(Actions.improveAutoClippers, dispatch),
            stop: bindActionCreators(Actions.stop, dispatch),
            autoPaperclipsStart: bindActionCreators(Actions.autoPaperclipsStart, dispatch),
            improveWireExtrusion: bindActionCreators(Actions.improveWireExtrusion, dispatch),
            creativityTurnOn: bindActionCreators(Actions.creativityTurnOn, dispatch),
        };
    }
)(Projects);