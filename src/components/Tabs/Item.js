import React from 'react';



export default class TabItemComponent extends React.Component {


    render() {
        const { children } = this.props;
        return (
            <div >
                {
                    children
                }
            </div>
        )
    }
}