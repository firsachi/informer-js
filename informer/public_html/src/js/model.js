/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var url = 'http://tomcat:8080/task/api/';
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