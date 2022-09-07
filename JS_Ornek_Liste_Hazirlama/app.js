// Storage Controller
const StorageController = (function(){

    return{
        
        getProducts: function(){
            let products;

            if(localStorage.getItem("products") === null){
                products = [];
            }
            else{
                products = JSON.parse(localStorage.getItem("products"));
            }
            return products;
        },

        setStorage: function(){
            localStorage.setItem("products",JSON.stringify(ProductController.getProducts()));
        }

    }

})();


// Product Controller
const ProductController = (function(){

    const Product = function(id,name,price){
        this.id = id;
        this.name = name;
        this.price = price;
    }

    const data = {
        products : StorageController.getProducts(),
        selectedProduct:null,
        totalPrice:0
    }

    return{
        getProducts: function(){
            return data.products;
        },
        
        getData: function(){
            return data;
        },
        
        setCurrentProduct: function(prd){
            data.selectedProduct = prd;
        },

        getCurrentProduct: function(){
            return data.selectedProduct;
        },

        addProduct: function(name,price){
            let id;

            if(data.products.length>0){
                id = data.products[data.products.length-1].id+1;
            }
            else{
                id = 0;
            }

            const newProduct = new Product(id,name,parseFloat(price));
            data.products.push(newProduct);
            return newProduct;
        },

        updateProduct: function(productName, productPrice){
            let product = null;

            data.products.forEach(prd => {
                if(prd.id == data.selectedProduct.id){
                    prd.name = productName;
                    prd.price = parseFloat(productPrice);
                    product = prd;
                }
            })

            return product;
        },

        deleteProduct: function(prd){
            data.products.forEach((product,index) => {
                if(product.id == prd.id){
                    data.products.splice(index,1);
                }
            });
        },

        getTotal : function(){
            let total = 0;

            data.products.forEach(item => {
                total += item.price;
            });

            data.totalPrice = total;
            return data.totalPrice;
        },

        getProductById: function(id){
            let product = null;

            data.products.forEach(prd => {
                if(prd.id == id){
                    product = prd;
                }
            }); 

            return product;
        },

    }

})();


// UI Controller
const UIController = (function(){

    const Selectors = {
        productList : "#item-list",
        productListItems : "#item-list tr",
        addButton : ".addBtn",
        updateButton : ".updateBtn",
        deleteButton : ".deleteBtn",
        cancelButton : ".cancelBtn",
        productName : "#productName",
        productPrice : "#productPrice",
        productCard : "#productCard",
        totalTL : "#totalTL",
        totalDolar : "#totalDolar",
    }


    return{
        createProductList: function(products){
            let html="";

            products.forEach(prd => {
                html += `
                    <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}$</td>
                        <td class="text-right">
                            <i class="far fa-edit edit-product"></i>
                        </td>
                    </tr>
                `;

            });

            document.querySelector(Selectors.productList).innerHTML = html;
        },

        getSelectors : function(){
            return Selectors;
        },

        addProduct: function(prd){

            document.querySelector(Selectors.productCard).style.display = "block";

            var item =`
                <tr>
                    <td>${prd.id}</td>
                    <td>${prd.name}</td>
                    <td>${prd.price}$</td>
                    <td class="text-right">
                        <i class="far fa-edit edit-product"></i>
                    </td>
                </tr>
            `;

            document.querySelector(Selectors.productList).innerHTML += item;

        },

        updateProduct: function(prd){

            let updatedItem = null;

            let items = document.querySelectorAll(Selectors.productListItems);

            items.forEach(function(item){
                if(item.classList.contains("bg-warning")){
                    item.children[1].textContent = prd.name;
                    item.children[2].textContent = prd.price+"$";
                    updatedItem = item;
                }
            });

            return updatedItem;

        },

        deleteProduct: function(id){

            let products = document.querySelector(Selectors.productList);

            for(let i=0;i<products.childElementCount;i++){
                if(products.children[i].children[0].textContent == id){
                    products.children[i].remove();
                }
            }

        },


        clearInputs: function(){
           document.querySelector(Selectors.productName).value = ""; 
           document.querySelector(Selectors.productPrice).value = ""; 
        },

        clearWarnings: function(){
            
            const items = document.querySelectorAll(Selectors.productListItems);
            
            items.forEach(item => {
                if(item.classList.contains("bg-warning")){
                    item.classList.remove("bg-warning");
                }
            });

        },

        hideCard: function(){
            document.querySelector(Selectors.productCard).style.display ="none";
        },

        showTotal: function(total){
            document.querySelector(Selectors.totalDolar).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = total*18;
        },

        addProductToForm: function(){
            const selectedProduct = ProductController.getCurrentProduct();

            document.querySelector(Selectors.productName).value = selectedProduct.name;

            document.querySelector(Selectors.productPrice).value = selectedProduct.price;

        },

        addingState: function(){
            this.clearWarnings();
            this.clearInputs();
            document.querySelector(Selectors.addButton).style.display="inline";
            document.querySelector(Selectors.updateButton).style.display="none";
            document.querySelector(Selectors.deleteButton).style.display="none";
            document.querySelector(Selectors.cancelButton).style.display="none";
        },

        editState: function(tr){
            this.clearWarnings();
            tr.classList.add("bg-warning");
            document.querySelector(Selectors.addButton).style.display="none";
            document.querySelector(Selectors.updateButton).style.display="inline";
            document.querySelector(Selectors.deleteButton).style.display="inline";
            document.querySelector(Selectors.cancelButton).style.display="inline";

        }


    }

})();




// App Controller
const App = (function(PCntrl,UICntrl,SCntrl){

    const UISelectors = UICntrl.getSelectors();

    const loadEventListeners = function(){

        //add product event
        document.querySelector(UISelectors.addButton).addEventListener("click",productAddSubmit);

        //edit product click
        document.querySelector(UISelectors.productList).addEventListener("click",productEditClick);

        //edit product submit
        document.querySelector(UISelectors.updateButton).addEventListener("click",productEditSubmit);

        //delete product click
        document.querySelector(UISelectors.deleteButton).addEventListener("click",deleteProduct);

        //cancel button click
        document.querySelector(UISelectors.cancelButton).addEventListener("click",cancelUpdate);

    }

    const productAddSubmit = function(e){

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if(productName !== "" && productPrice !== ""){
            //Add Product
            const newProduct = PCntrl.addProduct(productName,productPrice);

            UICntrl.addProduct(newProduct);

            //set storage
            SCntrl.setStorage();

            //set total price
            const total = PCntrl.getTotal();

            UICntrl.showTotal(total);

            UICntrl.clearInputs();

        }

        e.preventDefault();
    }

    const productEditClick = function(e){

        if(e.target.classList.contains("edit-product")){

            const id = e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            
            //get selected product
            const product = PCntrl.getProductById(id);
            
            //set current product
            PCntrl.setCurrentProduct(product);

            UICntrl.addProductToForm();

            UICntrl.editState(e.target.parentNode.parentNode);
        }

        e.preventDefault();
    }

    const productEditSubmit = function(e){

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;
        
        if(productName !== "" && productPrice !== ""){
            
            //Update Product
            const updatedProduct = PCntrl.updateProduct(productName,productPrice);

            //set storage
            SCntrl.setStorage();
            
            //Update UI
            const item = UICntrl.updateProduct(updatedProduct);

            //update total price
            const total = PCntrl.getTotal();

            UICntrl.showTotal(total);

            UICntrl.addingState();

        }

        e.preventDefault();
    }

    const cancelUpdate = function(e){

        UICntrl.addingState();
        UICntrl.clearWarnings();

        e.preventDefault();
    }

    const deleteProduct = function(e){

        let product = PCntrl.getCurrentProduct();

        PCntrl.deleteProduct(product);

        SCntrl.setStorage();

        UICntrl.deleteProduct(product.id);

        UICntrl.addingState();

        const total = PCntrl.getTotal();

        UICntrl.showTotal(total);

        console.log(PCntrl.getProducts());
        if(PCntrl.getProducts().length == 0){
            UICntrl.hideCard();
        }
        
        e.preventDefault();
    }

    return{
        init: function(){
            console.log("starting app..."); 

            UICntrl.addingState();
            const products = PCntrl.getProducts();

            if(products.length == 0){
                UICntrl.hideCard();
            }
            else{
                UICntrl.createProductList(products);
            }
            
            loadEventListeners();

        }
    }


})(ProductController,UIController,StorageController);


App.init();