$(document).ready(function () {
    if (localStorage.getItem("NameDepart") === null) {
        window.location.href = "login.html";
    }
    else{
        $("#namedepartemente").html(localStorage.getItem("NameDepart"));
        $("#useremail").html(localStorage.getItem("email"));
        getData();
        getDatahsab();
        getTableEmployer();
        $("#SaveD").click(function(){
            getDatahsab();
        });
    }
});

var hsab = 0 ;
function getData(fetched){
    if(fetched===undefined){
    $.ajax({
        url: '/Company',
        type: 'get',
        success: function (response) {
            if (response.request) {
                AddToTable(response.data);
            }
        },
    });
}else{
    AddToTable(fetched.data);
}
}

function getDatahsab(fetched){
    if(fetched===undefined){
    $.ajax({
        url: '/Employer',
        type: 'get',
        success: function (response) {
            if (response.request) {
                GetInfiEmployer(response.data);  
            }
        },
    });
}else{
    GetInfiEmployer(fetched.data);
}
}

function getTableEmployer(fetched){
    if(fetched===undefined){
    $.ajax({
        url: '/Employer',
        type: 'get',
        success: function (response) {
            if (response.request) {
                AddToTableEmployer(response.data);  
            }
        },
    });
}else{
    AddToTableEmployer(response.data);
}
}

var gv = localStorage.getItem("NameDepart");

function AddToTable(data){
    
    // data correc
    var departement_Data = '';
    $("#resultat").html(departement_Data);
    $.each(data, function (key, value) {
        value.department.forEach(element => {
            if(element.name== gv){
                departement_Data +='<p class="card-text"> <strong>Department Boss : </strong><span id="">' + element.boss + '</span></p><hr>';
                departement_Data +='<p class="card-title"> <strong>Description for departement : </strong><span id="">' + element.description + '</span></p><hr>';   
            }
        });
    });
    $("#resultat").append(departement_Data);
}
var valueId;

// data.length
function GetInfiEmployer(data){
    valueId=data.length + 1;
    AddToDataEmployer();
}

function AddToDataEmployer(){
    var nom = $("#in_nameEmployer").val();
    var Prenom = $("#in_prenoEmployer").val();
    var Age = $("#in_AgeEmployer").val();
    var salaire = $("#in_Salaire").val();
    var departement = localStorage.getItem("NameDepart");
    var Matricule = 'MA'+valueId;
    // console.log('if');
    
    if( nom != "" && departement != "" && salaire != ""){
         $.ajax({
            url:'/AddNewEmployer',
            type:'post',
            data:{Matricule,nom,Prenom,Age,salaire,departement},
            success:function(response){
                if(response.request){
                    // alert('valid ');
                    getTableEmployer();
                } 
            },
            error:function(){
                // alert('not valid 1');
            }
        });
    }else{
        // alert('not valid 2');
    }
}



////////////////////////////////////////////


function AddToTableEmployer(data){
    var nameDepartement = '';
    $("#touEmployer").html(nameDepartement);
    $.each(data, function (key, value) {
        if(value.departement== gv){
            nameDepartement +='<tr class="1">';
            nameDepartement +='<th scope="row">' + value.Matricule + '</th>';
            nameDepartement +='<th scope="row">' + value.nom + '</th>';
            nameDepartement +='<th scope="row">' + value.Prenom + '</th>';
            nameDepartement +='<th scope="row">' + value.Age + '</th>';
            nameDepartement +='<th scope="row">' + value.salaire + '</th>';
            nameDepartement +='<th scope="row">' + value.departement + '</th>';
            nameDepartement +='</tr>';
        }
    });
    $("#touEmployer").append(nameDepartement);
}