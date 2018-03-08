
var URL = "http://demo.redmine.org/";


var expect = require('Chai').expect;
var request = require('superagent');

/*
1.	   ENTRAR NO AMBIENTE http://demo.redmine.org/
2.	   CADASTRE O USUARIO
3.	   VALIDE O CADASTRO CRIADO COM SUCESSO
4.	   DESLOQUE O USUARIO NA OPÇÃO "SAIR"
*/
describe('User signup', () => {
	it('should return 200', (done) => {
		request.get(URL, (err, res, body) => {
			expect(err).to.be.a('null');
			expect( res.statusCode ).to.equal(200);
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