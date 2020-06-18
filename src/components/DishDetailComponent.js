import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



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
            <div className='row'>
                
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.dish.comments}/>
        </div>
    );
}

export default DishDetail;