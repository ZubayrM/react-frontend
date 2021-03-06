import * as React from "react";
import {NavLink} from "react-router-dom";
import PlanProduct from "./PlanProduct";
import PlanController from "../../../../controller/PlanController";
import style from "./PlanProduct.module.css"

export default class PlanProductList extends React.Component {

    state = {
        products: [],
        active: null
    }



    constructor(props) {
        super(props);
        this.state.active = this.props.active
        
        this.getProducts = this.getProducts.bind(this)
    }

    componentDidMount() {
        PlanController.byId(this.props.active).then(p => {
            console.log(p.data)
            this.setState({
                products: p.data.products
            })
        })

    }

    getProducts(){
        return this.state.products
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps.active + " против " + this.props.active)

        if (this.props.active !== prevProps.active){
            PlanController.byId(this.props.active).then(p => {
                console.log(p.data)
                this.setState({
                    products: p.data.products
                })
            })
        }

    }


    render() {
        return(
            <div className={style.page}>
                {this.state.products.map(p=> {
                    return (
                        <div onClick={()=> this.props.setActive(p.id)} >
                            <NavLink strict to={ p.cipher} activeClassName={style.active} >
                                <PlanProduct  name = {p.name} cipher = {p.cipher} />
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        )
    }
}
