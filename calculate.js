var num1Input=document.getElementById("num1")
var num2Input=document.getElementById("num2")
var operator=document.getElementById("operator")
var result=document.getElementById("result")

function calculate(){
    // console.log(operator.value)
    // console.log(num1Input.value)
    // console.log(num2Input.value)
    
    // var num1=Number(num1Input.value)
    // var num2=Number(num2Input.value)
    // var op=operator.value
  if(num1Input.value==="" ||  num2Input.value===""){
         alert("Please Enter Both Number")
         result.value="Number Not Entered"}

else{
    if(operator.value==="-"){
        result.value=(num1Input.value)-(num2Input.value)}

    else if(operator.value==="*"){
        result.value=parseInt(num1Input.value)*parseInt(num2Input.value)}
        
    else if(operator.value==="/"){
        result.value=parseInt(num1Input.value)/parseInt(num2Input.value)
     
    }else{
        result.value=parseInt(num1Input.value)+parseInt(num2Input.value)
}}}