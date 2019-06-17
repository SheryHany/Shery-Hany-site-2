import React from 'react';


export default class TabsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: this.props.children.map((el) => el.props.header),
            activeIndex: 0
        }
    }
    changeIndex(index) {
        return (e) => {
            this.setState({ activeIndex: index });
        }
    }

    render() {
        // debugger;
        const { children, position, view } = this.props;
        const { headers, activeIndex } = this.state;
        return (
            <div className="Tabs">
                <div className={`Tabs__headers Tabs__headers--${view || 'primary'} ${position || 'center'}`}>
                    {headers.map((el, index) => <div className={index === this.state.activeIndex ? 'active' : ''} onClick={this.changeIndex(index)} key={el}>{el}</div>)}
                </div>
                <div>
                    {children[activeIndex]}
                </div>
            </div>
        )
    }
}