import express from "express";

const host = "0.0.0.0";
const porta = 3000;
var listaUsuarios = [];

const server = express();

//preparar o servidor a fim de processar dados vindos no corpo da requisicao
server.use(express.urlencoded({extended: true}));


server.get("/", (requisicao, resposta) => {
    //disponibilizar o menu para o usuario
    resposta.send(`
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
                    </nav>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
            </html>
        `);
});
server.get("/cadastroUsuario", (requisicao, resposta) => {
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

server.post('/adicionarUsuario', (requisicao, resposta) => {
    
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

server.get("/listarUsuarios", (requisicao, resposta) => {
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
server.listen(porta, host, () => {
    console.log(`Servidor executando em http://${host}:${porta}`);
});