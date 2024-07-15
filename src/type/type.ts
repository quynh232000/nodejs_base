export class UserModelType{
    username: String;
    email:  String;
    phone_number: String;
    address: String;
    avatar: String;
    authentication: any;
    role: String;
    constructor(){
        this.username = ""
        this.email = ""
        this.phone_number = ""
        this.address = ""
        this.avatar = ""
        this.authentication = null
        this.role = ""
    }
}
export class ProductModelType{
    name: String;
    images: String; 
    image_cover: String;
    slug: String;
    origin: String;
    origin_detail: String;
    description: String;
    type: String;
    is_show: boolean;
    quantity: Number;
    price: Number;
    percent_sale: Number;
    category: String;
    constructor(){
        this.name = ""
        this.images = ""
        this.image_cover = ""
        this.slug = ""
        this.origin = ""
        this.origin_detail = ""
        this.description = ""
        this.type = ""
        this.is_show = true
        this.quantity = 0
        this.price = 0
        this.percent_sale = 0
        this.category = ""
    }
}

export class CategoryModelType{
    name: String;
    image: String;
    slug: String;
    constructor(){
        this.name = ""
        this.image = ""
        this.slug = ""
    }
}
export class OrderDetailModelType{
    product: String;
    price: Number;
    quantity: Number;
    constructor(){
        this.product = ""
        this.price = 0
        this.quantity = 0
    }
}
export class OrderModelType{
    province: String;
    ward: String;
    district: String;
    name_receiver: String;
    address: String;
    total: Number;
    sub_total: Number;
    free_ship: Number;
    status: String;
    user: String;
    phone: number;
    order_details: OrderDetailModelType[]
    constructor(){
        this.province = ""
        this.ward = ""
        this.district = ""
        this.name_receiver = ""
        this.address = ""
        this.total = 0
        this.sub_total = 0
        this.free_ship = 0
        this.status = ""
        this.user = ""
        this.phone = 0
        this.order_details = [new OrderDetailModelType()]
    }
}