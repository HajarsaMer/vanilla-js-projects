
var myProducts;
if(localStorage.getItem("productX")==null)
{
    myProducts=[];
}
else{
    myProducts = JSON.parse(localStorage.getItem("productX"));
    display();
}
var categorys=["mobiles","tv","tablets","pcs"];
function displayCategory()
{
    var temp="";
    for(var i=0;i<categorys.length;i++)
    {
      temp+="<option value='"+categorys[i]+"'>"+categorys[i]+"</option>";
    }
document.getElementById("productCategory").innerHTML=temp;
}
displayCategory();
function addProduct()
{
   var productName=document.getElementById("productName").value;
   var productPrice=document.getElementById("productPrice").value;
   var productCategory=document.getElementById("productCategory").value;
   var sale;
   var radioButtons=document.getElementsByName("sale");
   if(radioButtons[0].checked == true)
   {
       sale=true;
   }

   else{sale=false}


   var myobj={
       pname:productName,
       pprice:productPrice,
       pcategory:productCategory,
       sale:sale
   }

   myProducts.push(myobj);
   localStorage.setItem("productX",JSON.stringify(myProducts));
   console.log(myProducts);
   display();
   clear();

}



function display()
{
    var temp=``;
    for(var i=0;i<myProducts.length;i++)
    {
      temp+=`
          <div class="col-md-4" id="col">
          <h2 class="text-center">`+myProducts[i].pprice+`</h2>
          <img class="img-fluid" src="images/1.jpg">
          <h5 class="mt-2">`+myProducts[i].pname+`<span class="badge badge-info ml-4">`+myProducts[i].pcategory+`</span></h5>
          <button class="btn btn-danger" id="del" onclick="deleteme(`+ i +`)">delete</button>
          <button class="btn btn-warning" onclick="update(`+i+`)">update</button>`;
         
          if(myProducts[i].sale == true)
         {
             temp +=`<div class="sale">sale</div>`;

         }
         
          
         temp +=`</div>
         </div>`;       
    
    }


    document.getElementById("productRow").innerHTML=temp;
}


function searchProducts(term){
    var temp=``;

if(term != undefined)
{
for(var i=0 ;i<myProducts.length;i++)
{

    
if(myProducts[i].pname.toLowerCase().includes(term.toLowerCase() ))
{
    
    
    temp +=`
    <div class="col-md-3">
            <h2 class="text-center">`+myProducts[i].pprice+`</h2>
        <div class="product">
            <img src="images/1.jpg" class="img-fluid">
            <h5>`+myProducts[i].pname+`<span class="ml-3 badge badge-info">`+myProducts[i].pcategory+`</span> </h5>
            <button class="btn btn-danger">delete</button>
          <button class="btn btn-warning">update</button>`;
            

    if(myProducts[i].sale == true)
    {
        temp +=`<div class="sale">sale</div>`;

    }
       
       
            temp +=`</div>
          </div>`;
    
}
}
}
document.getElementById("productRow").innerHTML=temp;
}

function deleteme(index)
{
    console.log(index);
    var del=myProducts.splice(index,1);
    localStorage.setItem("productX",JSON.stringify(myProducts))
    display();
}

function update(index)
{
    document.getElementById("productName").value=myProducts[index].pname;
    document.getElementById("productPrice").value=myProducts[index].pprice;
    document.getElementById("productCategory").value=myProducts[index].pcategory;
    document.getElementById("add").innerHTML="update";       
}

function clear(){
    var c=document.getElementsByClassName("form-control");
    for(var i=0;i<c.length;i++)
    {
        c[i].value="";
    }
}