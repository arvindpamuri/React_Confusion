import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem , 
        Button, Modal, ModalHeader, ModalBody, Row, Col, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Errors, Control } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'

const required = (val) => val && val.length;
const minLength = (len) => (val) => (val) &&  (val.length >= len);
const maxLength = (len) => (val) => !(val) ||  (val.length <= len);



class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
        <div className='col-12 col-md-6'>
            <Button outline onClick={this.toggleModal}>
                <span className='fa fa-pencil fa-lg'> Submit Comments</span>
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                        <Row className='form-group'>
                            <Label htmlfor='rating' md={12}>Rating</Label>
                            <Col>
                                <Input type="select" name="selectMulti" id="exampleSelectMulti">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlfor='rating' md={12}>Your Name</Label>
                            <Col>
                                <Control.text model='.author' id='author' name='author'
                                    placeholder='Your Name'
                                    className='form-control'
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                <Errors
                                    className='text-danger' 
                                    model='.author'
                                    show='touched'
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be more than 2 characters',
                                        maxLength: 'Must not be more than 15 characters'
                                    }} />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlfor='comment' md={12}>Comment</Label>
                            <Col>
                                <Control.textarea model='.comment' id='comment' name='comment'
                                    rows='5'
                                    className='form-control' />
                            </Col>
                        </Row> 
                        <Row className='form-group'>
                            <Col md={{size: 10}}>
                                <Button type='submit' color='primary' value='submit'>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

function RenderDish({dish}){

    if (dish == null){
        return(
            <div></div>
        );
    }
    return(
        <div className='col-12 col-md-5 m-1'>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments, addComment, dishId}){

    let comms = comments.map((comm) => {

        if (comm == null){
            return(
                <div></div>
            );
        }
        var d = new Date(comm.date);
        const mm = d.toLocaleString('default',{ month: 'short' });
        const dd = d.getDate();
        const yy = d.getFullYear();
        return (
            <li key={comm.id}>
                <p>{comm.comment}</p>
                <p>--{comm.author}, {mm} {dd}, {yy}</p>
            </li>
        );
    });

    return(
        <div className='col-12 col-md-5 m-1'>
            <h4>Comments</h4>
            {comms}
            <div className='row'>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        </div>
    );
}


const DishDetail = (props) => {

    if(props.isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    
    else if (props.errMess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else {
        return(
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>   
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id} />
                </div>
            </div>
        );
    }
}

export default DishDetail;