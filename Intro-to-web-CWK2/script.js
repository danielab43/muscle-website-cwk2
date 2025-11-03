let trans = () => {
  document.documentElement.classList.add('transition');
  window.setTimeout(() => {
    document.documentElement.classList.remove('transition')
  }, 1000)
}

function changeImage() {
  var image = document.getElementById('Logo');
  var storedTheme = localStorage.getItem("currentTheme");
  if (storedTheme == "dark") {
      image.src = "images/png/logo-no-background.png";
  }
  else {
      image.src = "images/png/logo-black.png";
  }
}

function update(){
  document.documentElement.setAttribute('data-theme', localStorage.getItem("currentTheme"));
  var storedTheme = localStorage.getItem("currentTheme");
  if(storedTheme =="dark") {
    const checkboxes = document.querySelectorAll('input[name=theme]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    
  });
  }
  changeImage();
}

var checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change', function() { 
  if(this.checked) {
    localStorage.setItem("currentTheme", "dark");
    update();
    trans();
  } else { 
    localStorage.setItem("currentTheme", "light");
    update();
    trans();
  }
});

update();

function required(inputtx) 
   {
     if (isFinite(inputtx))
      { 
       if(inputtx!=0){
         return true
       }   
       else {
         return false
       }
      }  	
      return false; 
    } 

function isImperial() {
  var getSelectedValue = document.querySelector( 'input[name="unit_radio"]:checked');   
  if(getSelectedValue != null) {
    if(getSelectedValue.value == "imp_radio"){
      return true;
    } 
    else{
      return false;
    }
  }  
}

function changeInputDisplay(){
  var Imp = document.getElementById('bmiImperial');
  var Met = document.getElementById('bmiMetric');
  if(isImperial()) {
    Imp.style.display = 'block';
    Met.style.display = 'none';
  }
  else {
    Imp.style.display = 'none';
    Met.style.display = 'block';
  }
}

function calcBMI(){
  var totalWeight = 0;
  var totalHeight = 0;
  var BMI = 0;
  if(isImperial()){
    var ft = document.getElementById("imp_ft_txt").value;
    var ins = document.getElementById("imp_ins_txt").value;
    var st = document.getElementById("imp_st_txt").value;
    var lbs = document.getElementById("imp_lbs_txt").value;
    totalWeight = Number(lbs) + (st * 14);
    totalHeight =  Number(ins) + (ft * 12);
    BMI = 703 * (totalWeight / (totalHeight * totalHeight));
  }
  else{
    var heightUnit = document.getElementById("metric-choice").value;
    if(heightUnit == "centimetres"){
      var cm = document.getElementById("met_height_txt").value;
      totalHeight = cm / 100;
    }
    else{
      totalHeight = document.getElementById("met_height_txt").value;
    }
    totalWeight = document.getElementById("met_kgs_txt").value;
    BMI = totalWeight / (totalHeight * totalHeight);
  }
  postBMI(BMI)
}

function clearFourmBMI(){
  document.getElementById("imp_ft_txt").value = "";
  document.getElementById("imp_ins_txt").value = "";
  document.getElementById("imp_st_txt").value = "";
  document.getElementById("imp_lbs_txt").value = "";
  document.getElementById("met_height_txt").value = "";
  document.getElementById("met_kgs_txt").value = "";
}

function postBMI(BMI){
  if(required(BMI)) {
    document.getElementById("BMI-result").innerHTML = BMI.toFixed(2)
  }
  else {
    document.getElementById("BMI-result").innerHTML = 'Invalid Inputs, Please check for any missing sections.'
  }
}



