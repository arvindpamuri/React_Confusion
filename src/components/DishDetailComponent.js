import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import{ Link } from 'react-router-dom';



function RenderDish({dish}){

    if (dish == null){
        return(
            <div></div>
        );
    }
    return(
        <div className='col-12 col-md-5 m-1'>
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}){

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
        </div>
    );
}


const DishDetail = (props) => {

    if(props.dish == null)
    {
        return(
            <div></div>
        );
    }

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
                <RenderComments comments={props.comments}/>
            </div>
        </div>
    );
}

export default DishDetail;