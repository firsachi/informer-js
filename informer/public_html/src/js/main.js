/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global updatePage */
"use strict";
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
});

function  setTitle(){
    $('title').text(selectedCompany.name);
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

function fillDepartment(){
    for (var index = 0; index < listDepartment.length; index++  ){
        var department = listDepartment[index];
        $('#menuDepartment').append('<a href="#" data-department="'+ index +'" class="list-group-item">'+ department.name +'</a>');
    }
    $('#menuDepartment > a:first').addClass('active');
    $('#menuDepartment > a').on('click', clickDepartmentMenu);
};

function clickDepartmentMenu(){
    sessionStorage.setItem('department', $(this).attr("data-department"));
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
    $('#nameDepartment').text(selectedDeaprtment.name);
    $('#numberPhone').text(selectedDeaprtment.phone);
    $('#numberFax').text(selectedDeaprtment.fax);
};

function compareEmployee(empl1, empl2){
    if (empl1.importance > empl2.importance) return 1;
    if (empl1.importance < empl2.importance) return -1;
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
