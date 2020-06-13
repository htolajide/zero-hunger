 
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

            document.getElementById("buy_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("sell_nav").style.borderBottom = "solid 0vh #73d14b";
            document.getElementById("Mystore_nav").style.borderBottom = "solid 1vh #73d14b";
            document.getElementById("more_nav").style.borderBottom = "solid 0vh #73d14b";
            //change screen
            document.getElementById("product_selection").style.display="none";
            document.getElementById("sell_section").style.display="none";
            document.getElementById("my_store").style.display="flex";
            document.getElementById("more_selection").style.display="none";
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
	nav("buy");
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
	//open login screen
	document.getElementById("sign_page").style.marginLeft="0vw";
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
		if(responseData.status === 'success') {
			console.log(responseData);
			nav("sell");
		};
		alert(responseData.status);
	}).catch(error => alert(`Login Failed: ${error}`))
}
//add new fuctions / features.