var mysql = require('mysql');
let bcrypt = require("bcrypt"); 
let flash = require('connect-flash'); 
var bodyParser = require('body-parser');  
var express = require('express');
var session = require('express-session')
var ses;
var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

//database system
  // Create connection
  const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
  });

  // Connect
  db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
  }); 


exports.create_table = function(req, res, next) {    
    let sql = 'CREATE TABLE register(id int AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('register table created...');
    });  
}


exports.show_login = function(req, res, next) {
	res.render('user/login');
}

 
exports.sudslogin = function(req, res, next) {   
	console.log("ses"); 
	console.log(ses); 
	if(ses){
		res.render('welcome'); 
	} else{
		res.end('who are u?');
	} 
}
exports.logout = function(req, res, next) {    
	ses=null 
	req.session.destroy();    
	res.render('user/login'); 
}  

 

exports.login = function(req, res, next) {  
	let takeUname = req.body.RegUsername;     
	let takeUpass = req.body.RegPassword;    
	console.log(takeUname);
    let sql = `SELECT * FROM register WHERE username = "${takeUname}" and password ="${takeUpass}"`; 
    let query = db.query(sql, (err, results) => {  
        if(err) throw err; 
        if(results[0]){
            ses=req.session.id;  
            console.log("ada");  
            res.redirect('sudahlogin'); 
        }else{
            console.log("gaada"); 
            console.log(results); 
            res.render('user/login');  
        }
    });    


 
}
 











exports.get = function(req, res, next) {  
	res.render('halaman', { title: 'Express' });   
}
exports.submit_data = function(req, res, next) {   
    console.log("username : ",req.body.RegUsername); 
    console.log("password : ",req.body.RegPassword);
    
    
	let post = {username:req.body.RegUsername, password:req.body.RegPassword};
	let sql = 'INSERT INTO register SET ?';
	let query = db.query(sql, post, (err, result) => {
		if(err) throw err;
		console.log(result); 
	}); 

	res.redirect('/leads');// this will trigger controll/index.js router.get('/leads',dbSystem1.showusers); 
	// res.render('halaman', { title: 'welcome to homepage' });   
}

exports.AllshowUser = function(req, res, next) {   
    let sql = 'SELECT * FROM register';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;  
        res.render('halaman');   
    });   
}

exports.all_user_page = function(req, res, next) {   
    let sql = 'SELECT * FROM register';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;  
        res.render('common/user_page', { title: 'All User', lala:results });   
    });   
}

exports.showUserProfile = function(req, res, next) {   
    takeId = req.params.user_id;         
    let sql = `SELECT * FROM register WHERE id = ${takeId}`; 
    let query = db.query(sql, (err, results) => { 
        if(err) throw err;   
        res.render('userSpec', {lala:results[0],title:"asdfasd"}  ); 
    });    
}

exports.edit_form = function(req, res, next) {   
    takeId = req.params.user_id;                 
    let sql = `SELECT * FROM register WHERE id = ${takeId}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;  
        res.render('edit_form', { lala:results[0] });  
    });  
}

exports.submit_edit = function(req, res, next) {  
    let takeId = req.params.user_id;       
    let post = {username:req.body.RegUsername, password:req.body.RegPassword}; 
    let sql = 'UPDATE register SET ? WHERE id = ?';
    let query = db.query(sql,[post,takeId], (err, result) => {
        if(err) throw err; 
    }); 
    res.redirect('/leads');
     
}

exports.delete_data = function(req, res, next) {  
    let takeId = req.params.user_id;         
    let sql = `DELETE FROM register WHERE id = ${takeId}`; 
    let query = db.query(sql, (err, result) => {
        if(err) throw err; 
    }); 
    res.redirect('/leads/');  
}
 
exports.delete_lead_json = function(req, res, next) {  
    let takeId = req.params.user_id;         
    console.log("asdfasdfasdf = "+takeId);
    let sql = `DELETE FROM register WHERE id = ${takeId}`; 
    let query = db.query(sql, (err, result) => {
        if(err) throw err; 
    }); 
    res.send({ msg: "Success" });
}
 