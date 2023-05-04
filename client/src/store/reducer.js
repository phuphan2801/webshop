const initCartState = {
    total: 0,
    quantity: 0,
    products: [],
    isCheckOut: false,
    allProducts: [],
    paymentMethod: ''
}

const initFilterState = {
    clothess: '',
    electronics: '',
    furniture: '',
    shoes: '',
    priceRange: [],
    searchFilter: ''
}

function cartReducer(state,action) {
    let updateProducts;
    switch(action.type) {
        case "INCREASE":
            return {...state,quantity:action.payload+state.quantity};
        case "ADD_PRODUCT":
            return {...state,products: [...state.products,{...action.payload}]};
        case "GET_PRODUCTS":
            return {...state,allProducts: action.payload};
        case "INCREMENT":
            updateProducts = state.products.map((item) => {
                if(item._id===String(action.payload)) {
                    return {...item,qty:item.qty+1,isLessOne:item.isLessOne=false};
                } 
                return item;
            })
            return {...state,quantity: state.quantity+1,products:updateProducts};
        case "DECREMENT":
            updateProducts = state.products
            .map((item) => {
                if(item._id===String(action.payload)) {
                    return {...item,qty:item.qty-1};
                }
                return item;
            })
            .filter((item) => {
                return item.qty!==0
            });
            console.log(updateProducts);
            return {...state,quantity:state.quantity-1,products:updateProducts};
        case "REMOVEPRODUCT":
            const qty = action.payload.qty;
            const price = action.payload.price;
            updateProducts = state.products.filter(item => item._id!==String(action.payload.id));
            return {...state,quantity:state.quantity-qty,products:updateProducts,total: state.total-price*qty};
        case "TOTALPRODUCTINCREASE":
            let sumOrder = state.products.reduce((prev,curr) => {
                return prev +curr.qty*curr.price;
            },0)
            return {...state,total:sumOrder};
        case "TOTALPRODUCTDECREASE":
            let subOrder = state.products.reduce((prev,curr) => {
                return Math.abs(prev - (curr.qty)*curr.price);
            },0)
            return {...state,total:subOrder};
        case "SHOWMESSAGE":
            return {...state,isCheckOut: action.payload};
        case "ADDPAYMENTMETHOD":
            return {...state,paymentMethod:action.payload};
        case "CLEARCART":
            return initCartState;
        case "CLEARCARTBUTNOTCLOSEMESSAGE":
            return {total: 0,quantity: 0,products: [],isCheckOut: action.payload,allProducts: [],paymentMethod: ''}
        default:
        throw new Error("Invalid action");
    }
}

function productReducer(state,action) {
    switch(action.type) {
        case "ALL":
            return {...state,clothess: '',electronics: '',furniture: '',shoes: ''};
        case "CLOTHESS":
            return {...state,electronics: '',furniture: '',shoes: '',clothess:action.payload};
        case "ELECTRONICS":
            return {...state,clothess: '',furniture: '',shoes: '',electronics:action.payload};
        case "FURNITURE":
            return {...state,clothess: '',electronics: '',shoes: '',furniture:action.payload};
        case "SHOES":
            return {...state,clothess: '',electronics: '',furniture: '',shoes:action.payload};
        case "ADD PRICERANGE":
            return {...state,priceRange:action.payload};
        case "GETSEARCH":
            return {...state,searchFilter: action.payload};
        case "CLEARFILTER":
            return initFilterState;
        default: 
            throw new Error("Invalid action");
    }
}

export {initCartState,cartReducer,initFilterState,productReducer};
