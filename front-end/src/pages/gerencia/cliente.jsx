import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import './style.css';
import addIcon from '../../assets/addIcon.svg'
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IMaskInput } from "react-imask";

//Import Components
import PopupCreate from '../../component/gerencia/popCreate';
import PopUpEdit from '../../component/gerencia/popEdit';
import PopUpSearch from '../../component/gerencia/popSearch';
import PopUpDelete from '../../component/gerencia/popDelete';
import Header from '../../component/header'
import Title from '../../component/gerencia/Title'


const ClientTable = ({ data, onEdit, onDelete }) => (
    <table className='table table-sm tableClients'>
        <thead>
            <tr>
                <th scope="col">NOME</th>
                <th scope="col">CPF</th>
                <th scope="col">RG</th>
                <th scope="col">TELEFONE</th>
                <th scope="col">EMAIL</th>
                <th scope="col">AÇÕES</th>
            </tr>
        </thead>
        <tbody>
            {data.map((cliente, index) => (
                <tr key={index}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.rg}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.email}</td>
                    <td>
                        <button className='button-13' onClick={() => onEdit(cliente)}>
                            <img src={editIcon} alt="Edit" />
                        </button>
                        <button className='button-13' onClick={() => onDelete(cliente)}>
                            <img src={deleteIcon} alt="Delete" />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

function ClientPage() {
    const [searchCategory, setSearchCategory] = useState('Selecione');
    const [searchTerm, setSearchTerm] = useState('');
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);

    const [nome_cli, setNomeCliente] = useState('');
    const [rg_cli, setRgCliente] = useState('');
    const [cpf_cli, setCpfCliente] = useState('');
    const [data_cli, setDataCliente] = useState('');
    const [prof_cli, setProfissaoCliente] = useState('');
    const [sexo_cli, setSexoCliente] = useState('');
    const [estCiv_cli, setEstadoCivCliente] = useState('');
    const [nomeMae_cli, setNomeMaeCliente] = useState('');
    const [nomePai_cli, setNomePaiCliente] = useState('');
    const [tel_cli, setTelefoneCliente] = useState('');
    const [email_cli, setEmailCliente] = useState('');
    const [pais_cli, setPaisCliente] = useState('');
    const [log_cli, setLogradouroCliente] = useState('');
    const [cep_cli, setCepCliente] = useState('');
    const [bairro_cli, setBairroCliente] = useState('');
    const [cid_cli, setCidadeCliente] = useState('');
    const [estd_cli, setEstadoCliente] = useState('');
    const [num_cli, setNumeroCliente] = useState('');
    const [comp_cli, setComplementoCliente] = useState('');

    const [open, setOpen] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: "white", color: "black", borderRadius: '10px' } })
    const [showPopSearch, setShowPopSearch] = useState(false);
    const [showPopCreate, setShowPopCreate] = useState(false);
    const [showPopEdit, setShowPopEdit] = useState(false);
    const [showPopDelete, setShowPopDelete] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSectionOneCreate, setShowSectionOneCreate] = useState(true);
    const [showSectionOneEdit, setShowSectionOneEdit] = useState(true);
    const [showSectionOneDelete, setShowSectionOneDelete] = useState(true);

    const [clientDataEdit, setClientDataEdit] = useState({ nome: '', rg: '', cpf: '', datanascimento: '', profissao: '', sexo: '', estadoCivil: '', nomeMae: '', nomePai: '', telefone: '', email: '', paisOrigem: '', log: '', cep: '', bairro: '', cidade: '', estado: '', num: '', comp: '' });

    const [clientDataEditBefore, setClientDataEditBefore] = useState({});
    const [clientDataDelete, setClientDataDelete] = useState({})

    var matrixClient = { nome: '', rg: '', cpf: '', datanascimento: '', sexo: '', estadoCivil: '', nomeMae: '', nomePai: '', telefone: '', email: '', paisOrigem: '', logradouro: '', cep: '', bairro: '', cidade: '', estado: '', numero: '', complemento: '', profissao: ''}

    var clients = [
        { nome: "João Silva", rg: "1234567", cpf: "123.456.789-01", datanascimento: "15/05/1980", sexo: "Não especificado", estadoCivil: "Solteiro", nomeMae: "Maria Silva", nomePai: "José Silva", telefone: "(11) 1234-5678", email: "joao.silva@email.com", paisOrigem: "Brasil", logradouro: "Rua A", cep: "12345-678", bairro: "Centro", cidade: "São Paulo", estado: "SP", numero: "123", complemento: "Apto 45", profissao: "Engenheiro" },
        { nome: "Maria Oliveira", rg: "9876543", cpf: "987.654.321-09", datanascimento: "1995-08-20", sexo: "Feminino", estadoCivil: "Casado", nomeMae: "Ana Oliveira", nomePai: "Carlos Oliveira", telefone: "(21) 9876-5432", email: "maria.oliveira@email.com", paisOrigem: "Portugal", logradouro: "Av. B", cep: "54321-876", bairro: "Bela Vista", cidade: "Lisboa", estado: "LIS", numero: "456", complemento: "Casa 2", profissao: "Engenheiro" },
        { nome: "Pedro Santos", rg: "8765432", cpf: "876.543.210-98", datanascimento: "1988-02-10", sexo: "Masculino", estadoCivil: "Divorciado", nomeMae: "Sandra Santos", nomePai: "Paulo Santos", telefone: "(31) 8765-4321", email: "pedro.santos@email.com", paisOrigem: "Brasil", logradouro: "Rua C", cep: "98765-432", bairro: "Jardim", cidade: "Belo Horizonte", estado: "MG", numero: "789", complemento: "Cobertura", profissao: "Engenheiro" },
        { nome: "Ana Silva", rg: "5432109", cpf: "543.210.987-65", datanascimento: "1992-12-03", sexo: "Feminino", estadoCivil: "Solteiro", nomeMae: "Beatriz Silva", nomePai: "Ricardo Silva", telefone: "(41) 5432-1098", email: "ana.silva@email.com", paisOrigem: "Brasil", logradouro: "Rua D", cep: "87654-321", bairro: "Vila Nova", cidade: "Curitiba", estado: "PR", numero: "321", complemento: "Apartamento 5", profissao: "Engenheiro" },
        { nome: "Carlos Mendes", rg: "6543210", cpf: "654.321.098-76", datanascimento: "1985-06-25", sexo: "Masculino", estadoCivil: "Casado", nomeMae: "Lúcia Mendes", nomePai: "Antônio Mendes", telefone: "(51) 6543-2109", email: "carlos.mendes@email.com", paisOrigem: "Brasil", logradouro: "Av. E", cep: "76543-210", bairro: "Centro", cidade: "Porto Alegre", estado: "RS", numero: "567", complemento: "Sala 15", profissao: "Engenheiro" },
        { nome: "Isabel Oliveira", rg: "7654321", cpf: "765.432.109-87", datanascimento: "1990-09-14", sexo: "Feminino", estadoCivil: "Viúvo", nomeMae: "Clara Oliveira", nomePai: "Fernando Oliveira", telefone: "(61) 7654-3210", email: "isabel.oliveira@email.com", paisOrigem: "Brasil", logradouro: "Rua F", cep: "65432-109", bairro: "Parque das Flores", cidade: "Brasília", estado: "DF", numero: "987", complemento: "Casa 8", profissao: "Engenheiro" },
        { nome: "Rafaela Almeida", rg: "3210987", cpf: "321.098.765-43", datanascimento: "1987-03-08", sexo: "Feminino", estadoCivil: "Solteiro", nomeMae: "Fernanda Almeida", nomePai: "Ricardo Almeida", telefone: "(12) 3210-9876", email: "rafaela.almeida@email.com", paisOrigem: "Brasil", logradouro: "Av. G", cep: "87654-321", bairro: "Vila Esperança", cidade: "São José dos Campos", estado: "SP", numero: "654", complemento: "Cobertura 3", profissao: "Engenheiro" },
        { nome: "Daniel Pereira", rg: "8765432", cpf: "876.543.210-98", datanascimento: "1983-11-30", sexo: "Masculino", estadoCivil: "Casado", nomeMae: "Lúcia Pereira", nomePai: "José Pereira", telefone: "(81) 8765-4321", email: "daniel.pereira@email.com", paisOrigem: "Brasil", logradouro: "Rua H", cep: "76543-210", bairro: "Boa Vista", cidade: "Recife", estado: "PE", numero: "876", complemento: "Apartamento 10", profissao: "Engenheiro" },
        { nome: "Juliana Costa", rg: "5432109", cpf: "543.210.987-65", datanascimento: "1994-07-22", sexo: "Feminino", estadoCivil: "Solteiro", nomeMae: "Luciana Costa", nomePai: "Fernando Costa", telefone: "(62) 5432-1098", email: "juliana.costa@email.com", paisOrigem: "Brasil", logradouro: "Av. I", cep: "87654-321", bairro: "Jardim Primavera", cidade: "Goiânia", estado: "GO", numero: "321", complemento: "Casa 7", profissao: "Engenheiro" },
        { nome: "Miguel Santos", rg: "6543210", cpf: "654.321.098-76", datanascimento: "1986-04-18", sexo: "Masculino", estadoCivil: "Divorciado", nomeMae: "Patrícia Santos", nomePai: "Rui Santos", telefone: "(48) 6543-2109", email: "miguel.santos@email.com", paisOrigem: "Brasil", logradouro: "Rua J", cep: "76543-210", bairro: "Centro", cidade: "Florianópolis", estado: "SC", numero: "567", complemento: "Sala 20", profissao: "Engenheiro" },
        { nome: "Fernanda Lima", rg: "7654321", cpf: "765.432.109-87", datanascimento: "1991-10-11", sexo: "Feminino", estadoCivil: "Solteiro", nomeMae: "Camila Lima", nomePai: "Ricardo Lima", telefone: "(17) 7654-3210", email: "fernanda.lima@email.com", paisOrigem: "Brasil", logradouro: "Rua K", cep: "65432-109", bairro: "Vila Industrial", cidade: "São José do Rio Preto", estado: "SP", numero: "987", complemento: "Cobertura 5", profissao: "Engenheiro" },
        { nome: "Gustavo Alves", rg: "3210987", cpf: "321.098.765-43", datanascimento: "1989-05-27", sexo: "Masculino", estadoCivil: "Casado", nomeMae: "Cristina Alves", nomePai: "Paulo Alves", telefone: "(92) 3210-9876", email: "gustavo.alves@email.com", paisOrigem: "Brasil", logradouro: "Av. L", cep: "87654-321", bairro: "Parque das Árvores", cidade: "Manaus", estado: "AM", numero: "654", complemento: "Casa 12", profissao: "Engenheiro" },
        { nome: "Larissa Martins", rg: "8765432", cpf: "876.543.210-98", datanascimento: "1984-01-06", sexo: "Feminino", estadoCivil: "Viúvo", nomeMae: "Silvana Martins", nomePai: "Eduardo Martins", telefone: "(27) 8765-4321", email: "larissa.martins@email.com", paisOrigem: "Brasil", logradouro: "Rua M", cep: "76543-210", bairro: "Jardim América", cidade: "Vitória", estado: "ES", numero: "876", complemento: "Apartamento 15", profissao: "Engenheiro" },
        { nome: "Lucas Pereira", rg: "6543210", cpf: "654.321.098-76", datanascimento: "1982-08-14", sexo: "Masculino", estadoCivil: "Solteiro", nomeMae: "Márcia Pereira", nomePai: "José Pereira", telefone: "(16) 6543-2109", email: "lucas.pereira@email.com", paisOrigem: "Brasil", logradouro: "Av. N", cep: "87654-321", bairro: "Jardim Botânico", cidade: "Ribeirão Preto", estado: "SP", numero: "567", complemento: "Sala 18", profissao: "Engenheiro" },
        { nome: "Camila Santos", rg: "7654321", cpf: "765.432.109-87", datanascimento: "1993-03-02", sexo: "Feminino", estadoCivil: "Casado", nomeMae: "Lúcia Santos", nomePai: "Fernando Santos", telefone: "(62) 7654-3210", email: "camila.santos@email.com", paisOrigem: "Brasil", logradouro: "Rua O", cep: "65432-109", bairro: "Vila Nova", cidade: "Goiânia", estado: "GO", numero: "321", complemento: "Casa 9", profissao: "Engenheiro" },
        { nome: "Renato Lima", rg: "3210987", cpf: "321.098.765-43", datanascimento: "1996-12-17", sexo: "Masculino", estadoCivil: "Solteiro", nomeMae: "Adriana Lima", nomePai: "Ricardo Lima", telefone: "(79) 3210-9876", email: "renato.lima@email.com", paisOrigem: "Brasil", logradouro: "Av. P", cep: "87654-321", bairro: "Parque Industrial", cidade: "Aracaju", estado: "SE", numero: "654", complemento: "Cobertura 8", profissao: "Engenheiro" },
        { nome: "Carolina Oliveira", rg: "8765432", cpf: "876.543.210-98", datanascimento: "1981-04-05", sexo: "Feminino", estadoCivil: "Divorciado", nomeMae: "Tânia Oliveira", nomePai: "Roberto Oliveira", telefone: "(85) 8765-4321", email: "carolina.oliveira@email.com", paisOrigem: "Brasil", logradouro: "Rua Q", cep: "76543-210", bairro: "Aldeota", cidade: "Fortaleza", estado: "CE", numero: "876", complemento: "Apartamento 22", profissao: "Engenheiro" }
    ];

    // Componente de Alerta

    const openSnackBarMessage = () => { 
        setOpen(true);
    };

    const closeSnackBarMessage = (event, reason) => { 
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const alertBox = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeSnackBarMessage}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // Pesquisar Cliente

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);
    };

    function handleSearchCategoryChange(e) {
        setSearchCategory(e.target.value);
    };

    useEffect(() => {
        setResultadosPesquisa(clients);
        setComponentData()
    }, []);

    function handleSearchSimple() {
        const resultadosFiltrados = clients.filter(cliente => {
            if (searchCategory === 'Selecione' || searchTerm === '') {
                return true;
            } else {
                const normalizedSearchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

                switch (searchCategory) {
                    case 'Nome':
                        return cliente.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
                    case 'RG':
                        return cliente.rg.includes(searchTerm);
                    case 'CPF':
                        return cliente.cpf.includes(searchTerm);
                    case 'Telefone':
                        return cliente.tel.includes(searchTerm);
                    case 'Email':
                        return cliente.email.includes(searchTerm);
                    default:
                        return true;
                }
            }
        });

        handleSearchResult(resultadosFiltrados);
    }

    function handleSearchAdvanced() {
        const base = { nome: '', rg: '', cpf: '', data: '', prof: '', sexo: '', estCiv: '', nomeMae: '', nomePai: '', tel: '', email: '', pais: '', log: '', cep: '', bairro: '', cid: '', estd: '', num: '', comp: '' };

        const keys = Object.keys(base).filter(key => eval(`${key}_cli`) !== base[key]);
        const values = keys.map(key => eval(`${key}_cli`));

        const result = clients.filter(cliente =>
            keys.every(key => String(cliente[key]).toLowerCase().includes(String(eval(`${key}_cli`)).toLowerCase()))
        );

        handleSearchResult(result, keys, values);
    }

    function handleSearchResult(result, keys, values) {
        setResultadosPesquisa(result);
        openSnackBarMessage();
        if (result.length === 0) {
            setSnackBarMessage('Não foram encontrados resultados');
            setSnackBarStyle({ sx: { background: '#BE5353', color: 'white', borderRadius: '15px' } });
        } else {
            setSnackBarMessage('Pesquisa realizada com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
        }

        returnSearch();
    }

    function returnSearch() {
        const resetFields = ['NomeCliente', 'RgCliente', 'CpfCliente', 'DataCliente', 'ProfissaoCliente', 'SexoCliente', 'EstadoCivCliente', 'NomeMaeCliente', 'NomePaiCliente', 'TelefoneCliente', 'EmailCliente', 'PaisCliente', 'LogradouroCliente', 'CepCliente', 'BairroCliente', 'CidadeCliente', 'EstadoCliente', 'NumeroCliente', 'ComplementoCliente'];
        resetFields.forEach(field => eval(`set${field}('')`));
        setSearchCategory('Selecione');
        setSearchTerm('');
        setErrorMessage('');
        setShowSectionOneCreate(true);
        setShowSectionOneEdit(true);
        setShowSectionOneDelete(true);
        setShowPopCreate(false);
        setShowPopSearch(false);
        setShowPopDelete(false);
        setShowPopEdit(false);
    }


    // Criar Cliente

    function handleCreateClient() {
        const requiredFields = ['nome_cli', 'rg_cli', 'cpf_cli', 'data_cli', 'sexo_cli', 'estCiv_cli', 'nomeMae_cli', 'nomePai_cli', 'tel_cli', 'email_cli', 'pais_cli', 'log_cli', 'cep_cli', 'bairro_cli', 'cid_cli', 'estd_cli', 'num_cli', 'comp_cli', 'prof_cli'];

        if (requiredFields.some(field => !eval(field))) {
            setErrorMessage('Preencha todos os campos antes de adicionar.');
        } else {
            formatClientData();
            openSnackBarMessage();
            setSnackBarMessage('Cliente criado com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            returnSearch();
        }
    }

    function formatClientData() {
        const clientFields = ['nome', 'rg', 'cpf', 'datanascimento', 'sexo', 'estadoCivil', 'nomeMae', 'nomePai', 'telefone', 'email', 'paisOrigem', 'logradouro', 'cep', 'bairro', 'cidade', 'estado', 'numero', 'complemento', 'profissao'];

        clientFields.forEach(field => matrixClient[field] = eval(`${field}_cli`));
    }


    // Editar Cliente

    function openEditPop(originalData) {
        setClientDataEdit((prevData) => {
            setClientDataEditBefore(prevData);
            return { ...originalData };
        });
        setShowPopEdit(true);
        setShowPopCreate(false);
        setShowPopSearch(false);
        setShowPopDelete(false);
        setClientDataEditBefore(clientDataEdit);
    }

    const handleEditClient = () => {
        const requiredFields = ['nome', 'rg', 'cpf', 'datanascimento', 'sexo', 'estadoCivil', 'nomeMae', 'nomePai', 'telefone', 'email', 'paisOrigem', 'logradouro', 'cep', 'bairro', 'cidade', 'estado', 'numero', 'complemento', 'profissao'];

        if (requiredFields.some(field => !clientDataEdit[field])) {
            setErrorMessage('Preencha todos os campos antes de alterar.');
        } else {
            openSnackBarMessage();
            setSnackBarMessage('Cliente editado com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            console.log('Informações antigas do cliente editadas:', clientDataEditBefore);
            console.log('Novas informações do cliente editadas:', clientDataEdit);
            returnSearch();
        }
    };


    // Deletar Cliente

    const openDeletePopup = (originalData) => {
        setClientDataDelete({ ...originalData });
        setShowPopEdit(false);
        setShowPopSearch(false);
        setShowPopCreate(false);
        setShowPopDelete(true);
    };

    const handleDeleteClient = () => {
        const requiredFields = ['nome', 'rg', 'cpf', 'datanascimento', 'sexo', 'estadoCivil', 'nomeMae', 'nomePai', 'telefone', 'email', 'paisOrigem', 'logradouro', 'cep', 'bairro', 'cidade', 'estado', 'numero', 'complemento', 'profissao'];

        if (requiredFields.some(field => !clientDataDelete[field])) {
            setErrorMessage('Preencha todos os campos antes de deletar.');
        } else {
            openSnackBarMessage();
            setSnackBarMessage('Cliente removido com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            returnSearch();
        }
    };

    // Components

    const [titleComponent, setTitleComponent] = useState('')

    function setComponentData() {
        setTitleComponent(['Gerenciamento de clientes', 'Todos os aspectos relacionados aos clientes do sistema podem ser gerenciados nesta página'])
    }

    const handleChangeSectionCreate = (newShowSectionOne) => {
        setShowSectionOneCreate(newShowSectionOne);
    };

    const handleChangeSectionEdit = (newShowSectionOne) => {
        setShowSectionOneEdit(newShowSectionOne);
    };

    const handleChangeSectionDelete = (newShowSectionOne) => {
        setShowSectionOneDelete(newShowSectionOne);
    };

    return (
        <>
            <Header />
            <Container className='containerDesktop'>
                <div className='boxContainerDesktop'>
                    <div className="headContainerDesktop">
                        <Title parentToChild={titleComponent} />
                        <button className='button-12' onClick={() => setShowPopCreate(true)}>Cadastrar um cliente</button>
                    </div>
                    <div className="bodyContainerDesktop">
                        <div className="gerenciaContainer">
                            <div className="searchBoxHistory">
                                <div className="searchBoxInputs">
                                    <input type='text' placeholder="Pesquisar por nome, cpf ..." className='form-3' value={searchTerm} onChange={handleSearchTermChange} />
                                    <select value={searchCategory} onChange={handleSearchCategoryChange} className='searchBoxSelect'>
                                        <option value='Selecione'>Categoria</option>
                                        <option>Nome</option>
                                        <option>RG</option>
                                        <option>CPF</option>
                                        <option>Telefone</option>
                                        <option>Email</option>
                                    </select>
                                </div>
                                <div className="searchBoxButtons"> <button className='button-10' onClick={handleSearchSimple}>Pesquisar</button> <button className='button-11' onClick={() => setShowPopSearch(true)}>Pesquisa avançada</button>
                                </div>
                            </div>
                            <ClientTable data={resultadosPesquisa} onEdit={openEditPop} onDelete={openDeletePopup} />
                        </div>
                    </div>
                </div>
                <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackBarMessage} message={snackBarMessage} action={alertBox} ContentProps={snackBarStyle}
                />
            </Container>
            <PopupCreate
                showPopCreate={showPopCreate}
                onClose={returnSearch}
                headerText="Adicionar cliente"
                oneSection={false}
                onSubmit={handleCreateClient}
                errorMessage={errorMessage}
                onChangeSection={handleChangeSectionCreate}
                nav={
                    <>
                        <button
                            className={`${showSectionOneCreate ? 'button-nav-enable' : 'button-nav-disable'}`}
                            onClick={() => setShowSectionOneCreate(true)}
                        >
                            Informações pessoais
                        </button>
                        <button
                            className={`${!showSectionOneCreate ? 'button-nav-enable  margin-left-30' : 'button-nav-disable margin-left-30'}`}
                            onClick={() => setShowSectionOneCreate(false)}
                        >
                            Informações de contato
                        </button>
                    </>
                }
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' value={nome_cli} onChange={(e) => setNomeCliente(e.target.value)} placeholder='Digite o nome completo...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>RG</span>
                                <input className='form-1' value={rg_cli} onChange={(e) => setRgCliente(e.target.value)} type='number' placeholder='012345678'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o cpf..." className='form-1' value={cpf_cli} onChange={(e) => setCpfCliente(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de nascimento</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data de nascimento..." className='form-1' value={data_cli} onChange={(e) => setDataCliente(e.target.value)}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Profissão</span>
                                <input className='form-1' value={prof_cli} onChange={(e) => setProfissaoCliente(e.target.value)} type='text' placeholder='Digite uma profissão...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Sexo</span>
                                <select value={sexo_cli} onChange={(e) => setSexoCliente(e.target.value)} className='form-1'> <option style={{ color: '#BBBDBF' }} value='' disabled>Selecione uma opção</option> <option>Feminino</option> <option>Masculino</option> <option>Não especificado</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estado civil</span>
                                <select value={estCiv_cli} onChange={(e) => setEstadoCivCliente(e.target.value)} className='form-1'> <option value='' disabled>Selecione uma opção</option> <option>Solteiro</option> <option>Casado</option> <option>Separado</option> <option>Divorciado</option> <option>Viúvo</option>
                                </select>
                            </div>
                        </div>
                        <div className="popUpCreateLineThree">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo da mãe</span>
                                <input type="text" className='form-2' value={nomeMae_cli} onChange={(e) => setNomeMaeCliente(e.target.value)} placeholder='Digite o nome completo da mãe...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo do pai</span>
                                <input className='form-2' value={nomePai_cli} onChange={(e) => setNomePaiCliente(e.target.value)} type='number' placeholder='Digite o nome completo do pai...'
                                />
                            </div>
                        </div>
                    </>
                }
                sectionTwoContent={
                    <>
                        <div className="popUpCreateLineFour">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' value={tel_cli} onChange={(e) => setTelefoneCliente(e.target.value)}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' value={email_cli} onChange={(e) => setEmailCliente(e.target.value)} type='text' placeholder='name@website.com'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>País de origem</span>
                                <select value={pais_cli} onChange={(e) => setPaisCliente(e.target.value)} className='form-1'> <option value='' disabled>Selecione uma opção</option> <option>Brasil</option> <option>Afeganistão</option> <option>África do Sul</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estado</span>
                                <input className='form-1' value={estd_cli} onChange={(e) => setEstadoCliente(e.target.value)} type='text' placeholder='Digite o estado...'
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineFive">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Cidade</span>
                                <input type="text" className='form-1' value={cid_cli} onChange={(e) => setCidadeCliente(e.target.value)} placeholder='Digite a cidade...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Bairro</span>
                                <input className='form-1' value={bairro_cli} onChange={(e) => setBairroCliente(e.target.value)} type='text' placeholder='Digite o bairro...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Complemento</span>
                                <input className='form-1' value={comp_cli} onChange={(e) => setComplementoCliente(e.target.value)} type='text' placeholder='Digite o complemento...'
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineSix">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CEP</span>
                                <IMaskInput mask="00000-000" placeholder="Digite o cep..." className='form-1' value={cep_cli} onChange={(e) => setCepCliente(e.target.value)}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Logradouro</span>
                                <input className='form-1' value={log_cli} onChange={(e) => setLogradouroCliente(e.target.value)} type='text' placeholder='Digite o logradouro...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número</span>
                                <input placeholder='S/N' className='form-1' value={num_cli} onChange={(e) => setNumeroCliente(e.target.value)} type='number'
                                />
                            </div>
                        </div>
                    </>
                }
            />
            <PopUpSearch
                onClose={returnSearch}
                showPopSearch={showPopSearch}
                onSubmit={() => { setShowPopSearch(false); handleSearchAdvanced }}
                headerText="Pesquisa avançada"
                sectionOneContent={
                    <>
                        <div className="popUpSearchLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' value={nome_cli} onChange={(e) => setNomeCliente(e.target.value )} placeholder='Digite o nome completo...' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>RG</span>
                                <input className='form-1' value={rg_cli} onChange={(e) => setRgCliente(e.target.value )} type='number' placeholder='012345678' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o cpf..." className='form-1' value={cpf_cli} onChange={(e) => setCpfCliente(e.target.value )} />
                            </div>
                        </div>
                        <div className="popUpSearchLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de nascimento</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data de nascimento..." className='form-1' value={data_cli} onChange={(e) => setDataCliente(e.target.value )} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Profissão</span>
                                <input className='form-1' value={prof_cli} onChange={(e) => setProfissaoCliente(e.target.value )} type='text' placeholder='Digite uma profissão...' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Sexo</span>
                                <select value={sexo_cli} onChange={(e) => setSexoCliente(e.target.value )} className='form-1'>
                                    <option style={{ color: '#BBBDBF' }} value='' disabled>Selecione uma opção</option>
                                    <option>Feminino</option> <option>Masculino</option>
                                    <option>Não especificado</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estado civil</span>
                                <select value={estCiv_cli} onChange={(e) => setEstadoCivCliente(e.target.value )} className='form-1'>
                                    <option value='' disabled>Selecione uma opção</option>
                                    <option>Solteiro</option>
                                    <option>Casado</option>
                                    <option>Separado</option>
                                    <option>Divorciado</option>
                                    <option>Viúvo</option>
                                </select>
                            </div>
                        </div>
                        <div className="popUpSearchLineThree">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo da mãe</span>
                                <input type="text" className='form-2' value={nomeMae_cli} onChange={(e) => setNomeMaeCliente(e.target.value)} placeholder='Digite o nome completo da mãe...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo do pai</span>
                                <input className='form-2' value={nomePai_cli} onChange={(e) => setNomePaiCliente(e.target.value)} type='text' placeholder='Digite o nome completo do pai...'
                                />
                            </div>
                        </div>
                        <div className="popUpSearchLineFour">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' value={tel_cli} onChange={(e) => setTelefoneCliente(e.target.value)}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' value={email_cli} onChange={(e) => setEmailCliente(e.target.value )} type='text' placeholder='name@website.com'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>País de origem</span>
                                <select value={pais_cli} onChange={(e) => setPaisCliente(e.target.value )} className='form-1'>
                                    <option value='' disabled>Selecione uma opção</option>
                                    <option>Brasil</option> <option>Afeganistão</option>
                                    <option>África do Sul</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estado</span>
                                <input className='form-1' value={estd_cli} onChange={(e) => setEstadoCliente(e.target.value )} type='text' placeholder='Digite o estado...'
                                />
                            </div>
                        </div>
                        <div className="popUpSearchLineFive">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Cidade</span>
                                <input type="text" className='form-1' value={cid_cli} onChange={(e) => setCidadeCliente(e.target.value)} placeholder='Digite a cidade...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Bairro</span>
                                <input className='form-2' value={bairro_cli} onChange={(e) => setBairroCliente(e.target.value)} type='text' placeholder='Digite o bairro...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Complemento</span>
                                <input className='form-1' value={comp_cli} onChange={(e) => setComplementoCliente(e.target.value)} type='text' placeholder='Digite o complemento...'
                                />
                            </div>
                        </div>
                        <div className="popUpSearchLineSix">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CEP</span>
                                <IMaskInput mask="00000-000" placeholder="Digite o cep..." className='form-1' value={cep_cli} onChange={(e) => setCepCliente(e.target.value)}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Logradouro</span>
                                <input className='form-1' value={log_cli} onChange={(e) => setLogradouroCliente(e.target.value)} type='text' placeholder='Digite o logradouro...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número</span>
                                <input placeholder='S/N' className='form-1' value={num_cli} onChange={(e) => setNumeroCliente(e.target.value)} type='number'
                                />
                            </div>
                        </div>
                    </>
                }
                errorMessage={errorMessage}
            />
            <PopUpEdit
                showPopEdit={showPopEdit}
                headerText="Editar cliente"
                onClose={returnSearch}
                onChangeSection={handleChangeSectionEdit}
                oneSection={false}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' value={clientDataEdit.nome} onChange={(e) => setClientDataEdit({ ...clientDataEdit, nome: e.target.value })} placeholder='Digite o nome completo...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>RG</span>
                                <input className='form-1' value={clientDataEdit.rg} onChange={(e) => setClientDataEdit({ ...clientDataEdit, rg: e.target.value })} type='number' placeholder='012345678'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o cpf..." className='form-1' value={clientDataEdit.cpf} onChange={(e) => setClientDataEdit({ ...clientDataEdit, cpf: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de nascimento</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data de nascimento..." className='form-1' value={clientDataEdit.datanascimento} onChange={(e) => setClientDataEdit({ ...clientDataEdit, datanascimento: e.target.value })}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Profissão</span>
                                <input className='form-1' value={clientDataEdit.profissao} onChange={(e) => setClientDataEdit({ ...clientDataEdit, profissao: e.target.value })} type='text' placeholder='Digite uma profissão...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Sexo</span>
                                <select value={clientDataEdit.sexo} onChange={(e) => setClientDataEdit({ ...clientDataEdit, sexo: e.target.value })} className='form-1'> <option style={{ color: '#BBBDBF' }} value='' disabled>Selecione uma opção</option> <option>Feminino</option> <option>Masculino</option> <option>Não especificado</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estado civil</span>
                                <select value={clientDataEdit.estadoCivil} onChange={(e) => setClientDataEdit({ ...clientDataEdit, estadoCivil: e.target.value })} className='form-1'> <option value='' disabled>Selecione uma opção</option> <option>Solteiro</option> <option>Casado</option> <option>Separado</option> <option>Divorciado</option> <option>Viúvo</option>
                                </select>
                            </div>
                        </div>
                        <div className="popUpCreateLineThree">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo da mãe</span>
                                <input type="text" className='form-2' value={clientDataEdit.nomeMae} onChange={(e) => setClientDataEdit({ ...clientDataEdit, datanascimento: e.target.value })} placeholder='Digite o nome completo da mãe...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo do pai</span>
                                <input className='form-2' value={clientDataEdit.nomePai} onChange={(e) => setClientDataEdit({ ...clientDataEdit, nomePai: e.target.value })} type='text' placeholder='Digite o nome completo do pai...'
                                />
                            </div>
                        </div>
                    </>
                }
                sectionTwoContent={
                    <>
                        <div className="popUpCreateLineFour">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' value={clientDataEdit.telefone} onChange={(e) => setClientDataEdit({ ...clientDataEdit, telefone: e.target.value })}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' value={clientDataEdit.email} onChange={(e) => setClientDataEdit({ ...clientDataEdit, email: e.target.value })} type='text' placeholder='name@website.com'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>País de origem</span>
                                <select value={clientDataEdit.paisOrigem} onChange={(e) => setClientDataEdit({ ...clientDataEdit, paisOrigem: e.target.value })} className='form-1'> <option value='' disabled>Selecione uma opção</option> <option>Brasil</option> <option>Afeganistão</option> <option>África do Sul</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estado</span>
                                <input className='form-1' value={clientDataEdit.estado} onChange={(e) => setClientDataEdit({ ...clientDataEdit, estado: e.target.value })} type='text' placeholder='Digite o estado...'
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineFive">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Cidade</span>
                                <input type="text" className='form-1' value={clientDataEdit.cidade} onChange={(e) => setClientDataEdit({ ...clientDataEdit, cidade: e.target.value })} placeholder='Digite a cidade...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Bairro</span>
                                <input className='form-2' value={clientDataEdit.bairro} onChange={(e) => setClientDataEdit({ ...clientDataEdit, bairro: e.target.value })} type='text' placeholder='Digite o bairro...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Complemento</span>
                                <input className='form-1' value={clientDataEdit.complemento} onChange={(e) => setClientDataEdit({ ...clientDataEdit, complemento: e.target.value })} type='text' placeholder='Digite o complemento...'
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineSix">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CEP</span>
                                <IMaskInput mask="00000-000" placeholder="Digite o cep..." className='form-1' value={clientDataEdit.cep} onChange={(e) => setClientDataEdit({ ...clientDataEdit, cep: e.target.value })}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Logradouro</span>
                                <input className='form-1' value={clientDataEdit.logradouro} onChange={(e) => setClientDataEdit({ ...clientDataEdit, logradouro: e.target.value })} type='text' placeholder='Digite o logradouro...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número</span>
                                <input placeholder='S/N' className='form-1' value={clientDataEdit.numero} onChange={(e) => setClientDataEdit({ ...clientDataEdit, numero: e.target.value })} type='number'
                                />
                            </div>
                        </div>
                    </>
                }
                nav={
                    <>
                        <button
                            className={`${showSectionOneEdit ? 'button-nav-enable' : 'button-nav-disable'}`}
                            onClick={() => setShowSectionOneEdit(true)}
                        >
                            Informações pessoais
                        </button>
                        <button
                            className={`${!showSectionOneEdit ? 'button-nav-enable  margin-left-30' : 'button-nav-disable margin-left-30'}`}
                            onClick={() => setShowSectionOneEdit(false)}
                        >
                            Informações de contato
                        </button>
                    </>
                }
                onSubmit={handleEditClient}
                errorMessage={errorMessage}
            />
            <PopUpDelete
                showPopDelete={showPopDelete}
                onClose={returnSearch}
                headerText="Deletar Cliente"
                oneSection={false}
                onSubmit={handleDeleteClient}
                errorMessage={errorMessage}
                pageDataTitle={'Cliente'}
                onChangeSection={handleChangeSectionDelete}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' disabled={true} value={clientDataDelete.nome} onChange={(e) => setClientDataDelete({ ...clientDataDelete, nome: e.target.value })} placeholder='Digite o nome completo...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>RG</span>
                                <input className='form-1' value={clientDataDelete.rg} disabled={true} onChange={(e) => setClientDataDelete({ ...clientDataDelete, rg: e.target.value })} type='number' placeholder='012345678'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o cpf..." className='form-1' value={clientDataDelete.cpf} disabled={true} onChange={(e) => setClientDataDelete({ ...clientDataDelete, cpf: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de nascimento</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data de nascimento..." className='form-1' value={clientDataDelete.datanascimento} disabled={true} onChange={(e) => setClientDataDelete({ ...clientDataDelete, datanascimento: e.target.value })}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Profissão</span>
                                <input className='form-1' value={clientDataDelete.profissao} disabled={true} onChange={(e) => setClientDataDelete({ ...clientDataDelete, profissao: e.target.value })} type='text' placeholder='Digite uma profissão...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Sexo</span>
                                <select value={clientDataDelete.sexo} onChange={(e) => setClientDataDelete({ ...clientDataDelete, sexo: e.target.value })} className='form-1' disabled={true}> <option style={{ color: '#BBBDBF' }} value='' disabled>Selecione uma opção</option> <option>Feminino</option> <option>Masculino</option> <option>Não especificado</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estado civil</span>
                                <select value={clientDataDelete.estadoCivil} onChange={(e) => setClientDataDelete({ ...clientDataDelete, estadoCivil: e.target.value })} className='form-1' disabled={true}> <option value='' disabled>Selecione uma opção</option> <option>Solteiro</option> <option>Casado</option> <option>Separado</option> <option>Divorciado</option> <option>Viúvo</option>
                                </select>
                            </div>
                        </div>
                        <div className="popUpCreateLineThree">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo da mãe</span>
                                <input type="text" className='form-2' disabled={true} value={clientDataDelete.nomeMae} onChange={(e) => setClientDataDelete({ ...clientDataDelete, datanascimento: e.target.value })} placeholder='Digite o nome completo da mãe...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo do pai</span>
                                <input className='form-2' value={clientDataDelete.nomePai} disabled={true} onChange={(e) => setClientDataDelete({ ...clientDataDelete, nomePai: e.target.value })} type='text' placeholder='Digite o nome completo do pai...'
                                />
                            </div>
                        </div>
                    </>
                }
                sectionTwoContent={
                    <>
                        <div className="popUpCreateLineFour">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' disabled={true} value={clientDataDelete.telefone} onChange={(e) => setClientDataDelete({ ...clientDataDelete, telefone: e.target.value })}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' disabled={true} value={clientDataDelete.email} onChange={(e) => setClientDataDelete({ ...clientDataDelete, email: e.target.value })} type='text' placeholder='name@website.com'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>País de origem</span>
                                <select value={clientDataDelete.paisOrigem} onChange={(e) => setClientDataDelete({ ...clientDataDelete, paisOrigem: e.target.value })} className='form-1' disabled={true}> <option value='' disabled>Selecione uma opção</option> <option>Brasil</option> <option>Afeganistão</option> <option>África do Sul</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estado</span>
                                <input className='form-1' disabled={true} value={clientDataDelete.estado} onChange={(e) => setClientDataDelete({ ...clientDataDelete, estado: e.target.value })} type='text' placeholder='Digite o estado...'
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineFive">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Cidade</span>
                                <input type="text" disabled={true} className='form-1' value={clientDataDelete.cidade} onChange={(e) => setClientDataDelete({ ...clientDataDelete, cidade: e.target.value })} placeholder='Digite a cidade...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Bairro</span>
                                <input className='form-2' disabled={true} value={clientDataDelete.bairro} onChange={(e) => setClientDataDelete({ ...clientDataDelete, bairro: e.target.value })} type='text' placeholder='Digite o bairro...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Complemento</span>
                                <input className='form-1' disabled={true} value={clientDataDelete.complemento} onChange={(e) => setClientDataDelete({ ...clientDataDelete, complemento: e.target.value })} type='text' placeholder='Digite o complemento...'
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineSix">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CEP</span>
                                <IMaskInput mask="00000-000" placeholder="Digite o cep..." className='form-1' disabled={true} value={clientDataDelete.cep} onChange={(e) => setClientDataDelete({ ...clientDataDelete, cep: e.target.value })}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Logradouro</span>
                                <input className='form-1' disabled={true} value={clientDataDelete.logradouro} onChange={(e) => setClientDataDelete({ ...clientDataDelete, logradouro: e.target.value })} type='text' placeholder='Digite o logradouro...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número</span>
                                <input placeholder='S/N' className='form-1' disabled={true} value={clientDataDelete.numero} onChange={(e) => setClientDataDelete({ ...clientDataDelete, numero: e.target.value })} type='number'
                                />
                            </div>
                        </div>
                    </>
                }
                nav={
                    <>
                        <button
                            className={`${showSectionOneDelete ? 'button-nav-enable' : 'button-nav-disable'}`}
                            onClick={() => setShowSectionOneDelete(true)}
                        >
                            Informações pessoais
                        </button>
                        <button
                            className={`${!showSectionOneDelete ? 'button-nav-enable  margin-left-30' : 'button-nav-disable margin-left-30'}`}
                            onClick={() => setShowSectionOneDelete(false)}
                        >
                            Informações de contato
                        </button>
                    </>
                }
            />
        </>
    )
}

export default ClientPage