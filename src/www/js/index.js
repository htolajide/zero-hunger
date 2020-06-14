 
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
			loadProfile();
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
	axios.post(url, body).then(response => {
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
			signin_btn.textContent = 'sign in';
		};
	}).catch(error => alert(`Login Failed: ${error}`))
}

openSellAfterRegister=()=>
{
	//closes signin screen
	document.getElementById("register_page").style.marginLeft="-100vw";
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
				sessionStorage.setItem('farmerid', responseData.farmer_id);
				sessionStorage.setItem('fullname', responseData.userData.fullname);
				sessionStorage.setItem('email', responseData.userData.email);
				sessionStorage.setItem('city', responseData.userData.city);
			} else {
				alert('Sorry! No Web Storage support.');
			}
			openSellAfterRegister();
			register_btn.textContent = 'Register';
		};
	}).catch(error => alert(`Login Failed: ${error}`))
}
var loadProfile;
loadProfile = () => {
	const fullname = sessionStorage.getItem('fullname');
	const email = sessionStorage.getItem('email');
	const city = sessionStorage.getItem('city')
	const initial = fullname.charAt(0).toLocaleUpperCase();
	document.getElementById('initial').textContent = initial;
	document.getElementById('p_email').textContent = email;
	document.getElementById('full_name').textContent = fullname;
	document.getElementById('city').textContent = city;
}
//add new fuctions / features.