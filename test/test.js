//var request = require('superagent');
const request = require('supertest');
const describe = require('mocha').describe;
const expect = require('chai').expect;
const it = require('mocha').it;

const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const URL = "http://demo.redmine.org/";

const URL_REGISTER = 'account/register';
const URL_ACCOUNT = 'my/account';
const URL_LOGOUT = 'logout';

/*
1.	   ENTRAR NO AMBIENTE http://demo.redmine.org/
2.	   CADASTRE O USUARIO
3.	   VALIDE O CADASTRO CRIADO COM SUCESSO
4.	   DESLOQUE O USUARIO NA OPÇÃO "SAIR"
*/
describe('User signup', () => {
		
	const http = request(URL);
	const agent = request.agent(URL);
	
	const user_name = Math.random().toString(36).substr(2, 10);
	
	var token;	
	
	it('should return 200', (done) => {
		http.get('/')
		.end( (err, res) => {
			expect( err ).to.be.a('null');
			expect( res.statusCode ).to.equal(200);
			done();
		});
	});	
	
	
	it('should return a csrf-token', (done) => {
		agent
		.get( URL_REGISTER )
		.end( (err, res) => {
			expect( err ).to.be.a('null');
			expect( res.statusCode ).to.equal(200);			
			
			var html = new JSDOM( res.text );
			token = html.window.document.querySelector("input[name=authenticity_token]").value;
			
			expect( token ).to.be.a('string');			
			done();
		});		
	});	
	
	
	it('should register new user', (done) => {	
		
		var user = {
			'authenticity_token': token,
			'user[login]': user_name,
			'user[password]': 'senha',
			'user[password_confirmation]': 'senha',
			'user[firstname]': 'Sr',
			'user[lastname]': user_name,
			'user[mail]': user_name + '@asdff.com',
			'user[language]': 'pt-BR',
		};
		
		agent.post( URL_REGISTER )
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.send(user)
		.end( (err, res) => {			
			expect( err ).to.be.a('null');
			expect( res.statusCode ).to.equal( 302 );
			expect( res.headers.location ).to.equal( URL + URL_ACCOUNT);
			done();
		});		
	});	
	
	it('should be logged in', (done) => {
		agent.get( URL_ACCOUNT )
		.end( (err, res) => {			
			expect( err ).to.be.a('null');
			expect( res.statusCode ).to.equal( 200 );
			
			var html = new JSDOM( res.text );
			var name = html.window.document.querySelector(".user.active").text;
			
			expect(name).to.equal( user_name );
			
			done();
		});		
	});	
	
	
	it('should return a csrf-token to logout', (done) => {
		agent
		.get( URL_LOGOUT )
		.end( (err, res) => {
			expect( err ).to.be.a('null');
			expect( res.statusCode ).to.equal(200);			
			
			var html = new JSDOM( res.text );
			token = html.window.document.querySelector("input[name=authenticity_token]").value;
			
			expect( token ).to.be.a('string');			
			done();
		});		
	});	
	
	it('should logout', (done) => {	
		agent
		.post( URL_LOGOUT )
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.send({
			"authenticity_token": token
		})
		.end( (err, res) => {						
			expect( err ).to.be.a('null');
			expect( res.statusCode ).to.equal( 302 );
			expect( res.headers.location ).to.equal( URL );
			
			done();
		});		
	});
});





/*
5.	   LOGUE COM O USUARIO
6.	   VALIDE O LOGIN DO USUARIO
7.	   ACESSE A AREA DE PROJETOS E CRIE UM NOVO PROJETO COM SOMENTE O TIPO (BUG) SELECIONADO
8.	   VALIDE A CRIAÇÃO DO NOVO PROJETO  COM SUCESSO
9.	   ACESSE O PROJETO PELO MENO "Projetos"
10.	   CLIQUE NO PROJETO CRIADO
11.	   ENTRE NA ABA DE "NOVA TAREFA"
12.	   ATRAVÉS DE UM JSON DE DADOS DE CADASTRO DE "TAREFAS", CRIE 30 TAREFAS COM DADOS QUE ESTÃO NA MASSA DE DADOS DO JSON
13.	   ENTRE NA ABA DE "TAREFAS"
14.	   FAÇA A PAGINAÇÃO DO GRID DE TAREFAS E VALIDE SE A 29ª TAREFA POSSUI O TIPO, SITUAÇÃO, PRIORIDADE E TÍTULO CONFORME OUTRO JSON DEVALIDAÇÃO DE TAREFAS
*/
describe('Projects', function(){

});