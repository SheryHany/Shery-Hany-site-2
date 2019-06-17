import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-bootstrap';

export default class CardSlider extends React.Component {
    //35%
    constructor(props) {
        super(props);
        this.sliderRef = React.createRef();
        this.slideLeft = this.slideLeft.bind(this);
        this.slideRight = this.slideRight.bind(this);
        this.state = {
            leftIndex: 0
        }
    }
    slideRight() {
        if (this.props.list.length - this.state.leftIndex > 3) {
            const rightValue = parseInt(this.sliderRef.current.style.right);
            this.sliderRef.current.style.right =
                isNaN(rightValue) ? "33%" : `${rightValue + 33}%`;

            this.setState({ leftIndex: this.state.leftIndex + 1 });
        }
    }
    slideLeft() {
        if (this.state.leftIndex > 0) {
            const rightValue = parseInt(this.sliderRef.current.style.right);
            this.sliderRef.current.style.right =
                isNaN(rightValue) ? "-33%" : `${rightValue - 33}%`;

            this.setState({ leftIndex: this.state.leftIndex - 1 });
        }
    }
    render() {
        const { children, list } = this.props;
        // console.log(children);
        return (
            <>
                <Row className="no-gutters  justify-content-around">
                    <Col md={1} className=" d-flex align-items-center justify-content-center">
                        <button className="card-slider__btn" onClick={this.slideLeft}> <FontAwesomeIcon icon={faChevronLeft} /> </button>

                    </Col>
                    <Col md={9}>
                        <div className="card-slider__container">
                            <div className="card-slider" ref={this.sliderRef}>
                                {
                                    list.map(el => (
                                        <div key={el.id}><div className="card-slider__item">{React.cloneElement(children, el)}</div></div>
                                    ))
                                }
                            </div>
                        </div>
                    </Col>
                    <Col md={1} className=" d-flex align-items-center justify-content-center">
                        <button className="card-slider__btn" onClick={this.slideRight}> <FontAwesomeIcon icon={faChevronRight} /> </button>
                    </Col>
                </Row>
            </>
        )
    }
}