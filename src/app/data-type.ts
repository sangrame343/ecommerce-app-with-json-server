export interface signUp{
    name:string,
    email:string,
    password:string
}
export interface logIn{
    name:string,
    email:string,
    password:string
}
export interface product{
    name:string,
    price:string,
    color:string,
    category:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined|number
}

export interface cart{
    name:string,
    price:string,
    color:string,
    category:string,
    description:string,
    image:string,
    id:number|undefined,
    quantity:undefined|number
    userId:number,
    productId:number 
}