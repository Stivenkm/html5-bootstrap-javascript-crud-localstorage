class ProductList {

    jsonProduct = {
        code: '',
        product: '',
        qty: '',
        price: ''
    }

    constructor(formFields) {
        this.jsonProduct = formFields;
    }

    add = () => {
        let newProduct = this.readFormData()
        let currentData = this.read() || []
        let finalData = [newProduct,...currentData]
        localStorage.setItem(DB_NAME, JSON.stringify(finalData))
        this.refreshData()
        this.resetForm();
    }

    read = () => JSON.parse(localStorage.getItem(DB_NAME))

    readFormData = () => {
        return {
            code: document.getElementById(this.jsonProduct.code).value,
            product: document.getElementById(this.jsonProduct.product).value,
            qty: document.getElementById(this.jsonProduct.qty).value,
            price: document.getElementById(this.jsonProduct.price).value
        }
    }

    onEdit = (i) => {
        let listaProductos = this.read();
        document.getElementById(this.jsonProduct.code).value = listaProductos[i].code;
        document.getElementById(this.jsonProduct.product).value = listaProductos[i].product;
        document.getElementById(this.jsonProduct.qty).value = listaProductos[i].qty;
        document.getElementById(this.jsonProduct.price).value = listaProductos[i].price;
        document.getElementById(`buttons${i}`).innerHTML = `<input class="btn btn-primary btn-sm" type="button" value='Update' onclick='objetoProductList.update(${i})'>`
    }

    update(i) {
        let listaProductos = this.read();
        listaProductos[i].code = document.getElementById(this.jsonProduct.code).value
        listaProductos[i].product = document.getElementById(this.jsonProduct.product).value
        listaProductos[i].qty = document.getElementById(this.jsonProduct.qty).value
        listaProductos[i].price = document.getElementById(this.jsonProduct.price).value
        localStorage.setItem(DB_NAME, JSON.stringify(listaProductos))
        this.refreshData();
        this.resetForm();
    }

    onDelete = (td, i) => {
        let listaProductos = this.read();
        if (confirm(`Do you want to delete the product ${listaProductos[i].code}`)) {
            listaProductos.splice(i, 1)
            localStorage.setItem(DB_NAME, JSON.stringify(listaProductos))
            this.refreshData()
        }

    }


    resetForm = () => {
        document.getElementById(this.jsonProduct.code).value = '';
        document.getElementById(this.jsonProduct.product).value = '';
        document.getElementById(this.jsonProduct.qty).value = '';
        document.getElementById(this.jsonProduct.price).value = '';
        this.refreshData();
    }

    refreshData = () => {
        let listaProductos = this.read();
        listaProductos = listaProductos.map((obj, i) => `
            <tr>
                <td>${i+1}</td>
                <td>${obj.code}</td>
                <td>${obj.product}</td>
                <td>${obj.qty}</td>
                <td>${obj.price}</td>
                <td >
                    <input class="btn btn-primary btn-sm" type="button" value='Edit' onclick='objetoProductList.onEdit(${i})'>
                </td>
                <td>
                    <input class="btn btn-danger btn-sm" type="button" value='Delete' onclick='objetoProductList.onDelete(this,${i})'>
                </td>
                <td id='buttons${i}'>
                
                </td>
            </tr>`)

        document.getElementById(TABLE_NAME).innerHTML = listaProductos.join(' ')

    }
}

const DB_NAME = "storeList";
const TABLE_NAME = 'tbody';
const formFields = {
    code: "productCode",
    product: "product",
    qty: "qty",
    price: "perPrice"
}
const objetoProductList = new ProductList(formFields);
objetoProductList.refreshData();