import React from 'react';

//sass file
import '../../sass/components/_rating.scss';

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '',
            clicked: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let classes = e.target.classList;
        let flag = false;

        for (let index = 0; index < classes.length; index++) {
            if (classes[index] === 'checked') {
                flag = true;
            }
        }

        if (!flag) {
            classes.add('checked');
        } else {
            classes.remove('checked');
        }
    }

    render() {
        return (
            <>
                <h2>Star Rating</h2>
                <span className="fa fa-star" onClick={e => this.handleChange(e)}></span>
                <span className="fa fa-star" onClick={e => this.handleChange(e)}></span>
                <span className="fa fa-star" onClick={e => this.handleChange(e)}></span>
                <span className="fa fa-star" onClick={e => this.handleChange(e)}></span>
                <span className="fa fa-star" onClick={e => this.handleChange(e)}></span>
            </>
        )
    }

}
export default Rating;