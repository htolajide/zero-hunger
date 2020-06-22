var Team = {
    name:"Team-031",
    project:"Zero Hunger",
    solution:"Unknown",
    members:9,
};
var nav;
nav=(x)=>
{
	//screen navigation controls.
	switch(x)
	{
		case "buy":
            document.getElementById("buy_nav").style.borderBottom ="solid 1vh #73d14b";
            document.getElementById("sell_nav").style.borderBottom ="solid 0vh #73d14b";
            document.getElementById("Mystore_nav").style.borderBottom ="solid 0vh #73d14b";
            document.getElementById("more_nav").style.borderBottom ="solid 0vh #73d14b";
            //change screen
            document.getElementById("product_selection").style.display="flex";
            document.getElementById("sell_section").style.display="none";
            document.getElementById("my_store").style.display="none";
            document.getElementById("more_selection").style.display="none";
            break;
        case "sell":
            document.getElementById("buy_nav").style.borderBottom ="solid 0vh #73d14b";
            document.getElementById("sell_nav").style.borderBottom ="solid 1vh #73d14b";
            document.getElementById("Mystore_nav").style.borderBottom= "solid 0vh #73d14b";
            document.getElementById("more_nav").style.borderBottom ="solid 0vh #73d14b";
            //change screen
            document.getElementById("product_selection").style.display="none";
            document.getElementById("sell_section").style.display="flex";
            document.getElementById("my_store").style.display="none";
			document.getElementById("more_selection").style.display="none";
			loadSellProducts();
            break;
        case "Mystore":
			if(isLoggedin()){
            document.getElementById("buy_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("sell_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("Mystore_nav").style.borderBottom = "solid 1vh #73d14b";
            document.getElementById("more_nav").style.borderBottom = "solid 0vh #73d14b";
            //change screen
            document.getElementById("product_selection").style.display="none";
            document.getElementById("sell_section").style.display="none";
            document.getElementById("my_store").style.display="flex";
			document.getElementById("more_selection").style.display="none";
			loadStore();
			}else openSignin()
            break;
        case "more":
            document.getElementById("buy_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("sell_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("Mystore_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("more_nav").style.borderBottom = "solid 1vh #73d14b";
            //change screen
            document.getElementById("product_selection").style.display="none";
            document.getElementById("sell_section").style.display="none";
            document.getElementById("my_store").style.display="none";
			document.getElementById("more_selection").style.display="flex";
            break;
	}
}
var closexIndex;
closexIndex=()=>
{
	//closes index screen
	document.getElementById("index_page").style.marginLeft="-100vw";
	nav("buy");
}
var openxIndex;
openxIndex=()=>
{
	//index screen, to select opition to buy or sell prodect.
	document.getElementById("index_page").style.marginLeft="0vw";
	//nav("buy");
	//delete session
	sessionStorage.clear();
}
var closeSignin;
closeSignin=()=>
{
	//close login screen 
	document.getElementById("sign_page").style.marginLeft="100vw";
}
var openSignin;
openSignin=()=>
{
	if(isLoggedin()){
		openSellAfterSignin();
	}else{
		//open login screen
		document.getElementById("sign_page").style.marginLeft="0vw";
	}
}
var closeRegister;
closeRegister=()=>
{
	//closes signup screen
	document.getElementById("register_page").style.marginLeft="100vw";
}
var openRegister;
openRegister=()=>
{
	//open signup screen
	document.getElementById("register_page").style.marginLeft="0vw";
}
var closeTraders;
closeTraders=()=>
{
	//closes list of traders
	document.getElementById("select_trader").style.marginLeft="100vw";
}
var openTraders;
openTraders=()=>
{
	//opens list of traders for selected item 
	document.getElementById("select_trader").style.marginLeft="0vw";
}
var closeBooking;
closeBooking=()=>
{
	//closes booking screen
	document.getElementById("place_order").style.marginLeft="100vw";
}
var openBooking;
openBooking=()=>
{
	//open booking screen
	document.getElementById("place_order").style.marginLeft="0vw";
}
var loader;
loader=(x)=>
{
	//used to prevent clicks when loading data from server / api.
	//x = 0 (show).
	//x = 100 (hide).
	//call the fucntion loader(x) when needed.
	document.getElementById("loading_page").style.marginLeft=x+"vw";
}
var increment;
increment=(x)=>
{
	//increase price
	var a=document.getElementById(x).value;
	//convert to integar
	a=parseInt(a,10);
	//return increment
	document.getElementById(x).value=a+5;
}
var decrement;
decrement=(x)=>
{
	//increase price
	var a=document.getElementById(x).value;
	//convert to integar
	a=parseInt(a,10);
	//return decrement
	if(a===0)
	{
		return 0;
	}
	else
	{
		document.getElementById(x).value=a-5;
	}
	
}
// new functions
var isLoggedin;
isLoggedin = () => {
	if(sessionStorage.getItem('token') !== null ) return true;
	return false;
}
var openSellAfterSignin;
openSellAfterSignin=()=>
{
	//closes signin screen
	document.getElementById("sign_page").style.marginLeft="100vw";
	//closee index screen
	document.getElementById("index_page").style.marginLeft="-100vw";
	nav("sell");
}
var login;
login = () => {
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	const signin_btn = document.getElementById('signin');
	const url = 'https://zero-hunger.herokuapp.com/api/v1/farmer/login';
	const parameter = {
		method: 'post',
		url: url,
		body: { email: email, password: password },
	}
	const body = { email: email, password: password };
	signin_btn.textContent = 'signing in...';
	axios.post(url, body, {credentials: 'include'}).then(response => {
		const responseData = response.data;
		if(responseData.status === 'Success') {
			if (typeof(Storage) !== "undefined") {
				sessionStorage.setItem('token', responseData.token);
				sessionStorage.setItem('farmerid', responseData.farmer_id);
				sessionStorage.setItem('fullname', responseData.fullname);
				sessionStorage.setItem('email', responseData.email);
				sessionStorage.setItem('city', responseData.city);
			} else {
				alert('Sorry! No Web Storage support.');
			}
			openSellAfterSignin();
			signin_btn.textContent = 'Sign in';
		};
	}).catch(error => {
		alert(`Login Failed: ${error}`);
		signin_btn.textContent = 'Sign in';
	})
}
var openSellAfterRegister;
openSellAfterRegister = () =>
{
	//closes register screen
	document.getElementById("register_page").style.marginLeft="100vw";
	//closee index screen
	document.getElementById("index_page").style.marginLeft="-100vw";
	nav("sell");
}

var register;
register = () => {
	let email = document.getElementById('r_email').value;
	let password = document.getElementById('r_password').value;
	let fullname = document.getElementById('r_fullname').value;
	const register_btn = document.getElementById('register');
	const url = 'https://zero-hunger.herokuapp.com/api/v1/farmer/signup';
	
	const body = { email: email, password: password, fullname: fullname };
	register_btn.textContent = 'Processing...';
	axios.post(url, body).then(response => {
		const responseData = response.data;
		if(responseData.status === 'Success') {
			if (typeof(Storage) !== "undefined") {
				sessionStorage.setItem('token', responseData.token);
				sessionStorage.setItem('farmerid', responseData.userData._id);
				sessionStorage.setItem('fullname', responseData.userData.fullname);
				sessionStorage.setItem('email', responseData.userData.email);
				sessionStorage.setItem('city', responseData.userData.city);
			} else {
				alert('Sorry! No Web Storage support.');
			}
			alert('Registration Successful');
			register_btn.textContent = 'Register';
			openSellAfterRegister();
		};
	}).catch(error => {
		alert(`Login Failed: ${error}`);
		register_btn.textContent = 'Register';
	})
}
var loadStore;
loadStore = () => {
	const fullname = sessionStorage.getItem('fullname');
	const email = sessionStorage.getItem('email');
	const city = sessionStorage.getItem('city')
	const initial = fullname.charAt(0).toLocaleUpperCase();
	document.getElementById('initial').textContent = initial;
	document.getElementById('p_email').textContent = email;
	document.getElementById('p_fullname').textContent = fullname;
	document.getElementById('city').textContent = city;
	const header = document.getElementById('store_header');
	const p_box = document.getElementById('my_products');
	const requestOptions = {
		  url: 'https://zero-hunger.herokuapp.com/api/v1/farmer/products',
		  method: 'get',
		  headers: {
			  Cookie: `farmerid=${sessionStorage.getItem('farmerid')}; token=${sessionStorage.getItem('token')}`
		  }
	};
	header.textContent = 'Loading products...'
	// checking for cookies
	console.log('cookies', document.cookie);
	axios.request(requestOptions)
	.then( response => {
		let content = '';
		if(response.data.stock.length > 0){	
			response.data.stock.map( product => {
				const lower_name = product.product_name.split(' ').join('').toLowerCase();
				const child = `<div class="content_box">
				<img src="img/food/tomato.png" class="item_image">
				<h2 class="title_small" id="${lower_name}_name">${product.product_name}</h2>
				<h3 class="sub_title" id="${lower_name}_price">price &#8358;${product.price}</h3>
				<h3 class="sub_title" id="${lower_name}_qty_unit">${product.quantity} ${product.unit}</h3>
				<input type="hidden" id="${lower_name}_input" value="${product._id}"/>
				<button class="btn" id="${lower_name}_id" onclick=openUpdatePage(event) style="background:#d14b72;">update</button>
				</div>`;
				content += child;
			});
			p_box.innerHTML = content;
			header.textContent = 'My products';
		}else {
			header.textContent = 'You have no product in store';
		}
	})
	.catch(error => alert(error))
}

var loadSellProducts;
loadSellProducts = () => {
	const header = document.querySelector('#sell_header');
	let content = ''
	const container = document.getElementById('product_sell_list');
	header.textContent = 'Loading Product...';
	axios.get('https://zero-hunger.herokuapp.com/api/v1/products')
	.then(response => {
		response.data.map(item =>{
			tempName = item.name.replace(' ','').toLowerCase();
			content += `
			<div class="content_box_large">
			<img src="img/food/tomato.png" class="item_image">
			<h2 class="title_small" id="${tempName}">${item.name}</h2>
			<p class="sub_title">recomended price &#8358;50</p>
			<div class="input_">
				<img src="img/icons/remove.svg" onclick=decrement("${tempName}_selling_price")>
				<input  type="number" placeholder="50" value="50" id="${tempName}_selling_price">
				<img src="img/icons/sell.svg" onclick=increment("${tempName}_selling_price")>
			</div>
			<p class="sub_title">Quantity</p>
			<div class="input_" >
				<input type="number"  id="${tempName}_quantity" placeholder="Quantity" />
			</div>
			<div class="input_">
				<select class="unit" style="{ width: 100%; height:100%; border: no-border}" id="${tempName}_unit"><option disabled selected>Select Unit</option> </select>
			</div>
			<button class="btn_larger" id="${tempName}_btn" onclick=addStore(event) >Add to store</button>
			</div>`;
		})
		container.innerHTML = content;
	}
	).catch(error => alert(error))
	// preload unit select box
	axios.get('https://zero-hunger.herokuapp.com/api/v1/units')
	.then(
		response => {
			const unit = document.querySelectorAll('.unit');
			for (let i=0; i<unit.length; i++){
				response.data.map( item => {
					let option = document.createElement("option");
					let optiontext = document.createTextNode(item['name']);
					option.setAttribute("value", item['name']);
					option.appendChild(optiontext);
					unit[i].appendChild(option);
				});
			}
			header.textContent = 'Avaliable products';
		}
	).catch(error => alert(error));
}
var addStore;
addStore = (event) => {
	const elementId = event.target.id;
	const submit_btn = document.getElementById(`${elementId}`);
	submit_btn.textContent = 'processing...';
	const productName = elementId.split('_')[0];
	const item_name = document.getElementById(`${productName}`).textContent;
	const price = document.getElementById(`${productName}_selling_price`).value;
	const quantity = document.getElementById(`${productName}_quantity`).value;
	const unit = document.getElementById(`${productName}_unit`).value;
	// here am getting all availabe products and check to either update or add it to farner store
	const requestOptions = {
		url: 'https://zero-hunger.herokuapp.com/api/v1/farmer/products',
		method: 'get',
		headers: {
			Cookie: `farmerid=${sessionStorage.getItem('farmerid')}; token=${sessionStorage.getItem('token')}`
		}
	  };
	  const postOptions = {
		url: 'https://zero-hunger.herokuapp.com/api/v1/farmer/product/add',
		method: 'post',
		data: { name: item_name, price: price, quantity: quantity, unit: unit },
		headers: { Cookie: `farmerid = ${sessionStorage.getItem('farmerid')}; token=${sessionStorage.getItem('token')}`}
	} 
	
	axios.request(requestOptions)
  	.then( response => {
		const myStock = response.data.stock;
		if (myStock.length > 0) {
			for(let i=0; i<myStock.length; i++) {
				if(myStock[i].product_name === item_name){	
					const id = myStock[i]._id;
					const patchOptions = {
						url: `https://zero-hunger.herokuapp.com/api/v1/farmer/product/${id}/edit`,
						method: 'patch',
						data: { name: item_name, price: price, quantity: quantity, unit: unit },
						headers: { 
							cookies: `farmerid = ${sessionStorage.getItem('farmerid')}; token=${sessionStorage.getItem('token')}`
						}
					}
					axios.request(patchOptions).then(
						feedback => {
							console.log('edit 3')
							console.log('Patch Meassge', feedback.data);
							submit_btn.textContent = 'Add to store';
							alert('Product successfully updated');
						}
					).catch(error => {
						alert(`Error: ${error.message}`);
						submit_btn.textContent = 'Add to store';
					})
					return;
				}
			}
		} 
		// post new data to stock, this will throw error if item already exists
		axios.request(postOptions).then( 
			feedback => {
				console.log("Post message",feedback);
				submit_btn.textContent = 'Add to store';
				alert('Product succefully added');
			}
		).catch(error => {
			alert(`Error: ${error}`);
			submit_btn.textContent = 'Add to store';
		});
	}
	).catch(error => { 
		alert('Error: ' + error);
		submit_btn.textContent = 'Add to store';
	});
}

var openUpdatePage;
openUpdatePage = () =>
{
	//open update screen
	const input_name = event.target.id.split('_')[0];
	const id = document.getElementById(`${input_name}_input`).value;
	const name = document.getElementById(`${input_name}_name`).textContent;
	const price = document.getElementById(`${input_name}_price`).textContent.slice(7); // striping price figure from text
	console.log(price);
	const quantity = document.getElementById(`${input_name}_qty_unit`).textContent.split(' ')[0];
	const unit = document.getElementById(`${input_name}_qty_unit`).textContent.split(' ')[1];
	const container = document.getElementById('product_update_form');
	const content = `;
	<div class="content_box_large">
	<img src="img/food/tomato.png" class="item_image">
	<h2 class="title_small" id="${input_name}">${name}</h2>
	<p class="sub_title">recomended price &#8358;50</p>
	<div class="input_">
		<img src="img/icons/remove.svg" onclick=decrement("${input_name}_selling_price")>
		<input  type="number" placeholder="50" value=${price} id="${input_name}_selling_price">
		<img src="img/icons/sell.svg" onclick=increment("${input_name}_selling_price")>
	</div>
	<p class="sub_title">Quantity</p>
	<div class="input_" >
		<input type="number"  id="${input_name}_quantity" placeholder="Quantity value= ${quantity}" />
	</div>
	<div class="input_">
		<select class="unit" style="{ width: 100%; height:100%; border: no-border}" id="${input_name}_unit"><option selected>${unit}</option> </select>
	</div>
	<button class="btn_larger" id="${input_name}_btn" onclick=closeUpdatePage(event) >Update</button>
	</div>`;
	container.innerHTML = content;
	document.getElementById("update_product").style.marginLeft="0vw";
}
var closeUpdatePage;
closeUpdatePage=(event)=>
{
	//close update screen
	document.getElementById("update_product").style.marginLeft="100vw";
}
//add new fuctions / features.