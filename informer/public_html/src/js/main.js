/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global updatePage */

var url = 'http://localhost:8080/task/api/';
var listCompany = [];
var listDepartment = [];
var listEmployees = [];
var selectedCompany;
var selectedDeaprtment;

$(document).ready(function (){
    checkSelectedCompany();
    checkSelectDepartment();
    loadCompany();
    loadDepartment();
    /* if (null === sessionStorage.getItem('company')){
        sessionStorage.setItem('company', company);
    }
    selectedCompany = company;
    
    fillTable();
    */
});

function  loadCompany(){
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', url + 'crunchifyService');
    xhr.onload = function() {
        listCompany = JSON.parse(this.responseText);
        fillCompany();
    };
    xhr.onerror = function() {
        alert( 'Ошибка ' + this.status );
    };
    xhr.send();
};

function  setTitle(){
    $('title').empty();
    $('title').append(selectedCompany.name);
}

function  fillCompany(){
    checkSelectedCompany();
    setTitle();
    for (var index=0; index < listCompany.length; index++){
        var tmp = '<li';
        if (selectedCompany.name === listCompany[index].name){
            tmp = tmp + ' class="active"';
        }
        tmp = tmp + '><a href="#">' +listCompany[index].name +'</a></li>';
        $('.navbar-nav').append(tmp);
    }
};

function checkSelectedCompany(){
    if (null === sessionStorage.getItem('company')){
        selectedCompany = listCompany[0];
    }else{
        selectedCompany = listCompany[sessionStorage.getItem('company')];
    }
};

function loadDepartment(){
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', url + 'loadDepartments');
    xhr.onload = function() {
        listDepartment.length = 0;
        listDepartment = JSON.parse(this.responseText);
        fillDepartment();
        fillDeaprtmentInfo();
        checkSelectDepartment();
        loadEmployees();
    };
    xhr.onerror = function() {
        alert( 'Ошибка ' + this.status );
    };
    xhr.send();
};

function fillDepartment(){
    for (var index = 0; index < listDepartment.length; index++  ){
        var department = listDepartment[index];
        $('#menuDepartment').append('<a href="#" id="department_'+ index +'" class="list-group-item">'+ department.name +'</a>');
    }
    $('#menuDepartment > a:first').addClass('active');
    $('#menuDepartment > a').on('click', clickDepartmentMenu);
};
function clickDepartmentMenu($event){
    sessionStorage.setItem('department', $event.currentTarget.id.split('_')[1]);
    fillDeaprtmentInfo();
    loadEmployees();
};

function checkSelectDepartment(){
    if (null === sessionStorage.getItem('department')){
        selectedDeaprtment = listDepartment[0];
    }else{
        selectedDeaprtment = listDepartment[sessionStorage.getItem('department')];
    }
}

function fillDeaprtmentInfo(){
    checkSelectDepartment();
    $('#nameDepartment').empty();
    $('#nameDepartment').append(selectedDeaprtment.name);
    $('#numberPhone').empty();
    $('#numberPhone').append(selectedDeaprtment.phone);
    $('#numberFax').empty();
    $('#numberFax').append(selectedDeaprtment.fax);
};

function compareEmployee(empl1, empl2){
    if (empl1.importance > empl2.importance) return 1;
    if (empl1.importance < empl2.importance) return -1;
};

function loadEmployees(){
    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    var xhr = new XHR();
    xhr.open('GET', url + 'loadEmployes/' + selectedDeaprtment.idDepartment);
    xhr.onload = function() {
        listEmployees.length = 0;
        listEmployees = JSON.parse(this.responseText);
        fillTable();
    };
    xhr.onerror = function() {
        alert( 'Ошибка ' + this.status );
    };
    xhr.send();
};



function fillTable(){
    $('#infoEmployees tr:not(:first)').remove();
    var size = listEmployees.length;
    listEmployees.sort(compareEmployee);
    for (var index = 0; index < size; index++){
        var empl = listEmployees[index];
        var rowEmployee = '<tr>' + 
                '<td>' + empl.fullName + '</td>' +
                '<td>' + empl.post + '</td>' +
                '<td>' + empl.phone + '</td>' +
                '<td>' + empl.room + '</td>' +
                '<td><a href="mailto:'+ empl.fullName + '<'+empl.email +'>">' + 
                empl.email + '</a></td>' +
                '</tr>';
        $('#infoEmployees').append(rowEmployee);
    }
}

function fullName(employee) {
        var result = employee.surname + ' ' + employee.name + ' ' + employee.patronymic;
        return result;
    };
