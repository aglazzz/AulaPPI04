import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const host = "0.0.0.0";
const porta = 3000;
var listaUsuarios = [];

const server = express();

// na aula 04 vamos estudar o uso de sessao e de cookies para dar ao servidor e ao cliente
//capacidade de manter informacoes entre as requisicoes e respostas
//implementar cookies: informacoes sobre o ultimo acesso
//uso de sessao: login no sistema
//para manipular cookies, vamos usar o middleware 'cookie-parser'
//para gerenciar uma sessao, vamos usar o middleware 'express-session'

//preparar o servidor a fim de identificar se um determinado usuario esta logado ou nao
//sera preciso criar sessoes na aplicacao
server.use(session({
    secret:"manu123",
    resave: true, 
    saveUninitialized: true, 
        maxAge: 1000 * 60 * 15 // 1000ms = 1s * 60 = 1min * 15 = 15min
    }
));

//preparar o servidor a fim de processar dados vindos no corpo da requisicao
server.use(express.urlencoded({extended: true}));

//preparar o servidor para usar o cookie-parser
server.use(cookieParser());



server.get("/", verificarUsuarioLogado, (requisicao, resposta) => {
    //disponibilizar o menu para o usuario
    //verificar a exustencia do cookie
    let ultimoAcesso = requisicao.cookies?.ultimoAcesso;

    const data = new Date();
    resposta.cookie("ultimoAcesso", data.toLocaleString());
    resposta.setHeader("Content-Type", "text/html");
    resposta.write(`
            <DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                    <title>Menu do sistema</title>
                </head>
                <body>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Menu</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Cadastros
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="/cadastroUsuario">Usuarios</a></li>
                            </ul>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="d-flex">
                            <div class="p-2">
                                <p>Ultimo acesso: ${ultimoAcesso || " Primeiro acesso"}</p>
                            </div>
                        </div>
                    </nav>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>
        `);

        resposta.end();
});
server.get("/cadastroUsuario", verificarUsuarioLogado, (requisicao, resposta) => {
    resposta.send(`
            <DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                    <title>Document</title>
                </head>
                <body>
                    <div class="container">
                        <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Usuario</h1>
                        <form method="POST" action="/adicionarUsuario" class="row g-3 needs-validation m-3 p-3 bg-light" novalidate>
                            <div class="col-md-4">
                                <label for="nome" class="form-label">Nome</label>
                                <!-- O atributo 'id' identifica um elemento HTML na pagina para o navegador -->
                                <!-- O atributo 'name' rotula o conteudo que esse elemento armazena para o destinatario -->
                                <input type="text" class="form-control" id="nome" name="nome">
                            </div>
                            <div class="col-md-4">
                                <label for="sobrenome" class="form-label">Sobrenome</label>
                                <input type="text" class="form-control" id="sobrenome" name="sobrenome">
                            </div>
                            <div class="col-md-4">
                                <label for="usuario" class="form-label">Usuario</label>
                                <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" class="form-control" id="usuario" name="usuario" aria-describedby="inputGroupPrepend">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input type="text" class="form-control" id="cidade" name="cidade">
                            </div>
                            <div class="col-md-3">
                                <label for="uf" class="form-label">UF</label>
                                <select class="form-select" id="uf" name="uf">
                                    <option selected disabled value="">Selecione um estado</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                    <option value="EX">Estrangeiro</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="cep" class="form-label">CEP</label>
                                <input type="text" class="form-control" id="cep" name="cep">
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                        </form>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>
        `);
});

server.post('/adicionarUsuario', verificarUsuarioLogado, (requisicao, resposta) => {
    
    const nome = requisicao.body.nome;
    const sobrenome = requisicao.body.sobrenome;
    const usuario = requisicao.body.usuario;
    const cidade = requisicao.body.cidade;
    const uf = requisicao.body.uf;
    const cep = requisicao.body.cep;

    if(nome && sobrenome && usuario && cidade && uf && cep){
        
        listaUsuarios.push({nome, sobrenome, usuario, cidade, uf, cep});
        resposta.redirect("/listarUsuarios");
    }else{
        let conteudo = `
            <DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                    <title>Document</title>
                </head>
                <body>
                    <div class="container">
                        <h1 class="text-center border m-3 p-3 bg-light">Cadastro de Usuario</h1>
                        <form method="POST" action="/adicionarUsuario" class="row g-3 needs-validation m-3 p-3 bg-light" novalidate>
                            <div class="col-md-4">
                                <label for="nome" class="form-label">Nome</label>
                                <!-- O atributo 'id' identifica um elemento HTML na pagina para o navegador -->
                                <!-- O atributo 'name' rotula o conteudo que esse elemento armazena para o destinatario -->
                                <input type="text" class="form-control" id="nome" name="nome" value="${nome}">
                        `;
        if(!nome){
            conteudo += `
                <div>
                    <p class="text-danger">Por favor, voce deve informar o nome do usuario.</p>
                </div>`;                    
        }

        conteudo += `</div>
                            <div class="col-md-4">
                                <label for="sobrenome" class="form-label">Sobrenome</label>
                                <input type="text" class="form-control" id="sobrenome" name="sobrenome" value="${sobrenome}">
                            `;
        if(!sobrenome){
            conteudo += `
                <div>
                    <p class="text-danger">Por favor, voce deve informar o sobrenome do usuario.</p>
                </div>`;  
        }
                       
        
        conteudo += `</div>
                            <div class="col-md-4">
                                <label for="usuario" class="form-label">Usuario</label>
                                <div class="input-group has-validation">
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" class="form-control" id="usuario" name="usuario" aria-describedby="inputGroupPrepend" value="${usuario}">
                                </div>
                            `;
        if(!usuario){
            conteudo += `
                <div>
                    <p class="text-danger">Por favor, voce deve informar o usuario.</p>
                </div>`;
        }


        conteudo += `</div>
                            <div class="col-md-6">
                                <label for="cidade" class="form-label">Cidade</label>
                                <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}">
                            `;
        if(!cidade){
            conteudo += `
                <div>
                    <p class="text-danger">Por favor, voce deve informar a cidade do usuario.</p>
                </div>`;
        }

        conteudo += `</div>
                            <div class="col-md-3">
                                <label for="uf" class="form-label">UF</label>
                                <select class="form-select" id="uf" name="uf" value="${uf}">
                                    <option selected disabled value="">Selecione um estado</option>
                                    <option value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                    <option value="EX">Estrangeiro</option>
                                </select>
                            `;
        if(!uf){
            conteudo += `
                <div>
                    <p class="text-danger">Por favor, voce deve informar a UF do usuario.</p>
                </div>`;
        }
        
        conteudo += `</div>
                            <div class="col-md-3">
                                <label for="cep" class="form-label">CEP</label>
                                <input type="text" class="form-control" id="cep" name="cep" value="${cep}">
                            `;
        if(!cep){
            conteudo += `
                <div>
                    <p class="text-danger">Por favor, voce deve informar o CEP do usuario.</p>
                </div>`;
        }

        conteudo += `</div>
                            <div class="col-12">
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                        </form>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>`;

        resposta.send(conteudo);
        
    }


});

server.get("/listarUsuarios", verificarUsuarioLogado, (requisicao, resposta) => {
    let conteudo = `
        <DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                <title>Lista de Usuarios no SIstema</title>
            </head>
            <body>
                <div class="container">
                    <h1 class="text-center border m-3 p-3 bg-light">Lista de Usuarios</h1>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Usuario</th>
                                <th>Cidade</th>
                                <th>UF</th>
                                <th>CEP</th>
                            </tr>
                        </thead>
                        <tbody>`;
 
    for(let i = 0; i < listaUsuarios.length; i++){
        conteudo += `
            <tr>
                <td>${listaUsuarios[i].nome}</td>
                <td>${listaUsuarios[i].sobrenome}</td>
                <td>${listaUsuarios[i].usuario}</td>
                <td>${listaUsuarios[i].cidade}</td>
                <td>${listaUsuarios[i].uf}</td>
                <td>${listaUsuarios[i].cep}</td>
            </tr>
        `;
    }

    conteudo += `
                        </tbody>
                    </table>
                    <a class="btn btn-secondary m-3" href="/cadastroUsuario">Voltar</a>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </html>
    `;

    resposta.send(conteudo);
});

server.get("/login", (requisicao, resposta) => {
    resposta.send(`
            <!DOCTYPE html>

            <head>
                <meta charset="utf-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            </head>

            <body>
                <div class="container w-25">
                    <form action='/login' method='POST' class="row g-3 needs-validation" novalidate>
                        <fieldset class="border p-2">
                            <legend class="mb-3">Autenticação do Sistema</legend>
                            <div class="col-md-4">
                                <label for="" class="form-label">Usuário:</label>
                                <input type="text" class="form-control" id="usuario" name="usuario" required>
                            </div>
                            <div class="col-md-4">
                                <label for="senha" class="form-label">Senha</label>
                                <input type="password" class="form-control" id="senha" name="senha" required>
                            </div>
                            <div class="col-12 mt-2">
                                <button class="btn btn-primary" type="submit">Login</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                    crossorigin="anonymous"></script>
            </body>

            </html>       
        `)
});

server.post("/login", (requisicao, resposta) => {
    const {usuario, senha} = requisicao.body;

    if(usuario === "admin" && senha === "admin"){
    requisicao.session.dadosLogin = {
        nome: "Administrador",
        logado: true,
    }
        resposta.redirect("/");
    }else{
        resposta.write(`
                <!DOCTYPE html>

                <head>
                    <meta charset="utf-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
                </head>

                <body>
                    <div class="container w-25">
                        <form action='/login' method='POST' class="row g-3 needs-validation" novalidate>
                            <fieldset class="border p-2">
                                <legend class="mb-3">Autenticação do Sistema</legend>
                                <div class="col-md-4">
                                    <label for="" class="form-label">Usuário:</label>
                                    <input type="text" class="form-control" id="usuario" name="usuario" required>
                                </div>
                                <div class="col-md-4">
                                    <label for="senha" class="form-label">Senha</label>
                                    <input type="password" class="form-control" id="senha" name="senha" required>
                                </div>
                                <div class="col-12 mt-2">
                                    <button class="btn btn-primary" type="submit">Login</button>
                                </div>
                            </fieldset>
                        </form>
                        <div class="col-12 mt-2">
                            <p class="text-danger">Usuário ou senha inválidos!</p>
                        </div>
                    </div>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                        crossorigin="anonymous"></script>
                </body>

                </html>              
            `)
    }
});
// funcao middleware para verificar se o usuario esta logado
function verificarUsuarioLogado(requisicao, resposta, proximo){
    if(requisicao.session.dadosLogin?.logado){
        proximo();
    }else{
        resposta.redirect("/login");
    }
}

server.listen(porta, host, () => {
    console.log(`Servidor executando em http://${host}:${porta}`);
});