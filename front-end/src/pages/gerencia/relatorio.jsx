import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IMaskInput } from "react-imask";
import Select from 'react-select';
import './style.css';

//Import Components
import PopupCreate from '../../component/gerencia/popCreate';
import PopUpEdit from '../../component/gerencia/popEdit';
import PopUpSearch from '../../component/gerencia/popSearch';
import PopUpDelete from '../../component/gerencia/popDelete';
import Header from '../../component/header'
import Title from '../../component/gerencia/Title'

const RelatorioTable = ({ dataRelatorio, onEdit, onDelete }) => (
    <table className='table table-sm tableClients'>
        <thead>
            <tr>
                <th scope="col">CLIENTE</th>
                <th scope="col">ESTAGIÁRIO</th>
                <th scope="col">PROTOCOLO</th>
                <th scope="col">DATA</th>
                <th scope="col">SITUAÇÃO</th>
                <th scope="col">AÇÕES</th>
            </tr>
        </thead>
        <tbody>
            {dataRelatorio.map((relatorio, index) => {
                const statusClassName = relatorio.situacao === 'Revisado' ? 'processoAtivo' : 'processoFechado';

                return (
                    <tr key={index}>
                        <td>{relatorio.nomeCli}</td>
                        <td>{relatorio.nomeEstg}</td>
                        <td>{relatorio.numero}</td>
                        <td>{relatorio.data}</td>
                        <td><p className={statusClassName}>{relatorio.situacao}</p></td>
                        <td>
                            <button className='button-13' onClick={() => onEdit(relatorio)}><img src={editIcon} /></button>
                            <button className='button-13' onClick={() => onDelete(relatorio)}><img src={deleteIcon} /></button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);

function RelatorioPage() {
    const [searchCategory, setSearchCategory] = useState('Selecione');
    const [searchTerm, setSearchTerm] = useState('');
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
    const [popUpSectionOneStyle, setPopUpSectionOneStyle] = useState('popUpSectionOne');
    const [popUpButtonOneStyle, setPopUpButtonOneStyle] = useState('button-nav-enable');
    const [nomeCli_rel, setNomeClienteRelatorio] = useState('');
    const [nomeEstg_rel, setNomeEstagiarioRelatorio] = useState('');
    const [numero_rel, setNumeroRelatorio] = useState('');
    const [situacao_rel, setSituacaorRelatorio] = useState('');
    const [data_rel, setDataRelatorio] = useState('');
    const [descricao_rel, setDescricaoRelatorio] = useState('');
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

    const [relatorioDataEdit, setRelatorioDataEdit] = useState({ nomeCli: '', nomeEstg: '', numero: '', situacao: '', data: '', descricao: '' });
    const [relatorioDataEditBefore, setRelatorioDataEditBefore] = useState({});
    const [relatorioDataDelete, setRelatorioDataDelete] = useState({});

    var matrixRelatorio = { nomeCli: '', nomeEstg: '', numero: '', situacao: '', data: '', descricao: '' }

    var estagiarios = [
        { nome: 'Ana Silva', matricula: '12345', cpf: '111.222.333-44', telefone: '(11) 98765-4321', email: 'ana.silva@email.com' },
        { nome: 'Carlos Oliveira', matricula: '54321', cpf: '222.333.444-55', telefone: '(22) 87654-3210', email: 'carlos.oliveira@email.com' },
        { nome: 'Maria Santos', matricula: '67890', cpf: '333.444.555-66', telefone: '(33) 76543-2109', email: 'maria.santos@email.com' },
        { nome: 'João Pereira', matricula: '98765', cpf: '444.555.666-77', telefone: '(44) 65432-1098', email: 'joao.pereira@email.com' },
        { nome: 'Pedro Souza', matricula: '13579', cpf: '555.666.777-88', telefone: '(55) 54321-0987', email: 'pedro.souza@email.com' },
        { nome: 'Mariana Costa', matricula: '24680', cpf: '666.777.888-99', telefone: '(66) 43210-9876', email: 'mariana.costa@email.com' },
        { nome: 'Rafaela Almeida', matricula: '11223', cpf: '777.888.999-00', telefone: '(77) 32109-8765', email: 'rafaela.almeida@email.com' },
        { nome: 'Lucas Santos', matricula: '33445', cpf: '888.999.000-11', telefone: '(88) 21098-7654', email: 'lucas.santos@email.com' },
        { nome: 'Fernanda Lima', matricula: '55667', cpf: '999.000.111-22', telefone: '(99) 10987-6543', email: 'fernanda.lima@email.com' },
        { nome: 'Gustavo Oliveira', matricula: '77889', cpf: '000.111.222-33', telefone: '(00) 09876-5432', email: 'gustavo.oliveira@email.com' },
        { nome: 'Camila Silva', matricula: '99011', cpf: '111.222.333-44', telefone: '(11) 98765-4321', email: 'camila.silva@email.com' },
        { nome: 'Bruno Pereira', matricula: '22334', cpf: '222.333.444-55', telefone: '(22) 87654-3210', email: 'bruno.pereira@email.com' },
        { nome: 'Juliana Santos', matricula: '44556', cpf: '333.444.555-66', telefone: '(33) 76543-2109', email: 'juliana.santos@email.com' },
        { nome: 'Rodrigo Oliveira', matricula: '66778', cpf: '444.555.666-77', telefone: '(44) 65432-1098', email: 'rodrigo.oliveira@email.com' },
        { nome: 'Aline Costa', matricula: '88990', cpf: '555.666.777-88', telefone: '(55) 54321-0987', email: 'aline.costa@email.com' },
        { nome: 'Vinícius Almeida', matricula: '00112', cpf: '666.777.888-99', telefone: '(66) 43210-9876', email: 'vinicius.almeida@email.com' },
        { nome: 'Laura Santos', matricula: '22334', cpf: '777.888.999-00', telefone: '(77) 32109-8765', email: 'laura.santos@email.com' },
        { nome: 'Ricardo Lima', matricula: '44556', cpf: '888.999.000-11', telefone: '(88) 21098-7654', email: 'ricardo.lima@email.com' },
        { nome: 'Carolina Oliveira', matricula: '66778', cpf: '999.000.111-22', telefone: '(99) 10987-6543', email: 'carolina.oliveira@email.com' },
        { nome: 'Diego Silva', matricula: '88990', cpf: '000.111.222-33', telefone: '(00) 09876-5432', email: 'diego.silva@email.com' }
    ];

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

    const relatorios = [
        { nomeCli: 'Cliente1', nomeEstg: 'Advogado1', numero: '001', situacao: 'Revisar', data: '14/02/2024', descricao: 'Descrição do caso 1' },
        { nomeCli: 'Cliente2', nomeEstg: 'Advogado2', numero: '002', situacao: 'Revisado', data: '20/02/2024', descricao: 'Descrição do caso 2' },
        { nomeCli: 'Cliente3', nomeEstg: 'Advogado3', numero: '003', situacao: 'Revisado', data: '23/02/2024', descricao: 'Descrição do caso 3' },
        { nomeCli: 'Cliente4', nomeEstg: 'Advogado4', numero: '004', situacao: 'Revisar', data: '14/02/2024', descricao: 'Descrição do caso 4' },
        { nomeCli: 'Cliente5', nomeEstg: 'Advogado5', numero: '005', situacao: 'Revisado', data: '14/02/2024', descricao: 'Descrição do caso 5' },
        { nomeCli: 'Cliente6', nomeEstg: 'Advogado6', numero: '006', situacao: 'Revisado', data: '14/02/2024', descricao: 'Descrição do caso 6' },
        { nomeCli: 'Cliente7', nomeEstg: 'Advogado7', numero: '007', situacao: 'Revisar', data: '14/02/2024', descricao: 'Descrição do caso 7' },
        { nomeCli: 'Cliente8', nomeEstg: 'Advogado8', numero: '008', situacao: 'Revisado', data: '14/02/2024', descricao: 'Descrição do caso 8' },
        { nomeCli: 'Cliente9', nomeEstg: 'Advogado9', numero: '009', situacao: 'Revisado', data: '18/02/2024', descricao: 'Descrição do caso 9' },
        { nomeCli: 'Cliente10', nomeEstg: 'Advogado10', numero: '010', situacao: 'Revisar', data: '14/02/2024', descricao: 'Descrição do caso 10' }
    ];


    // Componentes de Alerta

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

    // Pesquisar Relatorio

    useEffect(() => {
        setResultadosPesquisa(relatorios);
        setComponentData()
    }, []);

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);
    };

    function handleSearchCategoryChange(e) {
        setSearchCategory(e.target.value);
    };

    function handleSearchSimple() {
        const resultadosFiltrados = relatorios.filter(relatorio => {
            if (searchCategory === 'Selecione' || searchTerm === '') {
                return true;
            } else {
                const normalizedSearchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                switch (searchCategory) {
                    case 'Estagíario':
                        return relatorio.nomeEstg.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
                    case 'Protocolo':
                        return relatorio.numero.includes(searchTerm);
                    case 'Situação':
                        return relatorio.situacao.includes(searchTerm);
                    default:
                        return true;
                }
            }
        });

        handleSearchResult(resultadosFiltrados);
    }

    function handleSearchAdvanced() {
        const base = { nomeCli: '', nomeEstg: '', numero: '', situacao: '', data: '', descricao: '' };
        const keys = Object.keys(base).filter(key => eval(`${key}_rel`) !== base[key]);
        const values = keys.map(key => eval(`${key}_rel`));

        const result = relatorios.filter(relatorio =>
            keys.every(key => String(relatorio[key]).toLowerCase().includes(String(eval(`${key}_rel`)).toLowerCase()))
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
        const resetFields = ['NomeClienteRelatorio', 'NomeEstagiarioRelatorio', 'NumeroRelatorio', 'SituacaorRelatorio', 'DataRelatorio', 'DescricaoRelatorio']
        resetFields.forEach(field => eval(`set${field}('')`))

        setShowSectionOneCreate(true);
        setShowSectionOneEdit(true);
        setShowSectionOneDelete(true);
        setShowPopCreate(false);
        setShowPopSearch(false);
        setShowPopDelete(false);
        setShowPopEdit(false);
        setSearchCategory('Selecione');
        setSearchTerm('');
        setErrorMessage('');
    }

    // Criar Relatorio

    function formatRelatorioData() {
        const relatorioFields = ['nomeCli', 'nomeEstg', 'numero', 'situacao', 'data', 'descricao']
        relatorioFields.forEach(field => matrixRelatorio[field] = eval(`${field}_rel`));
    }

    function handleCreateRelatorio() {
        const requiredFields = ['nomeCli_rel', 'nomeEstg_rel', 'numero', 'situacao', 'data', 'descricao'];
        if (requiredFields) {
            setErrorMessage('Preencha todos os campos antes de adicionar.');
        } else {
            formatEstagiarioData()
            openSnackBarMessage();
            setSnackBarMessage('Estagiário criado com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            returnSearch();
        }
    }

    // Editar Relatorio

    function openEditPop(originalData) {
        setRelatorioDataEdit((prevData) => {
            setRelatorioDataEditBefore(prevData);
            return { ...originalData };
        });
        setShowPopEdit(true);
        setShowPopCreate(false);
        setShowPopSearch(false);
        setShowPopDelete(false);
        setRelatorioDataEditBefore(relatorioDataEdit);
    }

    const handleEditRelatorio = () => {
        const requiredFields = ['nomeCli', 'nomeEstg', 'numero', 'situacao', 'data', 'descricao']

        if (requiredFields.some(field => !relatorioDataEdit[field])) {
            setErrorMessage('Preencha todos os campos antes de alterar.');
        } else {
            openSnackBarMessage();
            setSnackBarMessage('Relatorio editado com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            console.log('Informações antigas do relatorio editadas:', clientDataEditBefore);
            console.log('Novas informações do relatorio editadas:', clientDataEdit);
            returnSearch;
        }
    };

    // Deletar Relatorio

    const handleDeleteRelatorio = () => {
        const requiredFields = ['nomeCli', 'nomeEstg', 'numero', 'situacao', 'data', 'descricao'];

        if (requiredFields.some(field => !relatorioDataDelete[field])) {
            setErrorMessage('Preencha todos os campos antes de deletar.');
        } else {
            openSnackBarMessage();
            setSnackBarMessage('Relatorio removido com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            returnSearch();
        }
    };

    const openDeletePopup = (originalData) => {
        setRelatorioDataDelete({ ...originalData });
        setShowPopEdit(false);
        setShowPopCreate(false);
        setShowPopSearch(false);
        setShowPopDelete(true);
    };

    const [titleComponent, setTitleComponent] = useState('')

    function setComponentData() {
        setTitleComponent(['Gerenciamento de relatorios', 'Todos os aspectos relacionados aos relatorios do sistema podem ser gerenciados nesta página'])
    }

    const optionsClients = clients.map(client => ({
        value: client.nome,
        label: client.nome,
    }));

    const optionsEstg = estagiarios.map(estagiario => ({
        value: estagiario.nome,
        label: estagiario.nome,
    }));

    return (
        <>
            <Header />
            <Container className='containerDesktop'>
                <div className='boxContainerDesktop'>
                    <div className="headContainerDesktop">
                        <Title parentToChild={titleComponent} />
                        <button className='button-12' onClick={() => setShowPopCreate(true)}>Cadastrar um relatorio</button>
                    </div>
                    <div className="bodyContainerDesktop">
                        <div className="gerenciaContainer">
                            <div className="searchBoxHistory">
                                <div className="searchBoxInputs">
                                    <input type='text' placeholder="Pesquisar por nome, protocolo ..." className='form-3' value={searchTerm} onChange={handleSearchTermChange} />
                                    <select value={searchCategory} onChange={handleSearchCategoryChange} className='searchBoxSelect'>
                                        <option value='Selecione'>Categoria</option>
                                        <option>Nome</option>
                                        <option>Matrícula</option>
                                        <option>CPF</option>
                                        <option>Telefone</option>
                                        <option>Email</option>
                                    </select>
                                </div>
                                <div className="searchBoxButtons">
                                    <button className='button-10' onClick={handleSearchSimple}>Pesquisar</button>
                                    <button className='button-11' onClick={() => setShowPopSearch(true)}>Pesquisa avançada</button>
                                </div>
                            </div>
                            <RelatorioTable dataRelatorio={resultadosPesquisa} onEdit={openEditPop} onDelete={openDeletePopup} />
                        </div>
                    </div>
                </div>
                <Snackbar open={open} autoHideDuration={4000} onClose={closeSnackBarMessage} message={snackBarMessage} action={alertBox} ContentProps={snackBarStyle} />
            </Container>
            <PopupCreate
                showPopCreate={showPopCreate}
                onClose={returnSearch}
                headerText="Adicionar relatório"
                oneSection={true}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do Cliente</span>
                                <Select value={nomeCli_rel} onChange={(e) => setNomeClienteRelatorio(e.target.value)} options={optionsClients} placeholder='Selecione uma opção' className='select1' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do Estagiário</span>
                                <Select value={nomeEstg_rel} onChange={(e) => setNomeEstagiarioRelatorio(e.target.value)} options={optionsEstg} placeholder='Selecione uma opção' className='select1' />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número de Protocolo</span>
                                <input placeholder="Digite o protocolo..." className='form-1' value={numero_rel} onChange={(e) => setNumeroRelatorio(e.target.value)} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Situação</span>
                                <select value={situacao_rel} onChange={(e) => setTelefoneEstagiario(e.target.value)} className='form-1' >
                                    <option value='Selecione'>Selecionar</option>
                                    <option>Revisar</option>
                                    <option>Revisado</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data..." className='form-1' value={data_rel} onChange={(e) => setEmailEstagiario(e.target.value)} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                    </>
                }
                nav={
                    <>
                        <button className={popUpButtonOneStyle}>Dados de relatório</button>
                    </>}
                onSubmit={handleCreateRelatorio}
                errorMessage={errorMessage}
            />
            <PopUpSearch
                onClose={returnSearch}
                showPopSearch={showPopSearch}
                onSubmit={handleSearchAdvanced}
                headerText="Pesquisa avançada"
                sectionOneContent={
                    <>
                        <div className="popUpSearchLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do Cliente</span>
                                <input className='form-2' value={nomeCli_rel} onChange={(e) => setNomeClienteRelatorio(e.target.value)} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do Estagiário</span>
                                <input className='form-2' value={nomeEstg_rel} onChange={(e) => setNomeEstagiarioRelatorio(e.target.value)} />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número de Protocolo</span>
                                <input placeholder="Digite o protocolo..." className='form-1' value={numero_rel} onChange={(e) => setNumeroRelatorio(e.target.value)} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Situação</span>
                                <select value={situacao_rel} onChange={(e) => setSituacaorRelatorio(e.target.value)} className='form-1' >
                                    <option value='Selecione'>Selecionar</option>
                                    <option>Revisar</option>
                                    <option>Revisado</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data..." className='form-1' value={data_rel} onChange={(e) => setDataRelatorio(e.target.value)} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                    </>
                }
                errorMessage={errorMessage}
            />
            <PopUpEdit
                showPopEdit={showPopEdit}
                onClose={returnSearch}
                headerText="Editar relatório"
                oneSection={true}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do cliente</span>
                                <input type="text" className='form-2' value={relatorioDataEdit.nomeCli} onChange={(e) => setRelatorioDataEdit({ ...relatorioDataEdit, nomeCli: e.target.value })} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do estagiário</span>
                                <input className='form-1' value={relatorioDataEdit.nomeEstg} onChange={(e) => setRelatorioDataEdit({ ...relatorioDataEdit, nomeEstg: e.target.value })} />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número de protocolo</span>
                                <input className='form-1' value={relatorioDataEdit.numero} onChange={(e) => setRelatorioDataEdit({ ...relatorioDataEdit, numero: e.target.value })} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Situação</span>
                                <select className='form-1' value={relatorioDataEdit.situacao} onChange={(e) => setRelatorioDataEdit({ ...relatorioDataEdit, situacao: e.target.value })}>
                                    <option value='Selecione'>Selecionar</option>
                                    <option>Revisar</option>
                                    <option>Revisado</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data</span>
                                <input className='form-1' value={relatorioDataEdit.data} onChange={(e) => setRelatorioDataEdit({ ...relatorioDataEdit, data: e.target.value })}/>
                            </div>
                        </div>
                    </>
                }
                nav={
                    < button className={popUpButtonOneStyle}>Informações pessoais</button>
                }
                onSubmit={handleEditRelatorio}
                errorMessage={errorMessage}
            />
            <PopUpDelete
                showPopDelete={showPopDelete}
                onClose={returnSearch}
                headerText="Deletar relatório"
                pageDataTitle={'Relatório'}
                oneSection={true}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do cliente</span>
                                <input type="text" className='form-2' value={relatorioDataDelete.nomeCli} onChange={(e) => setRelatorioDataDelete({ ...relatorioDataDelete, nomeCli: e.target.value })} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do estagiário</span>
                                <input className='form-1' value={relatorioDataDelete.nomeEstg} onChange={(e) => setRelatorioDataDelete({ ...relatorioDataDelete, nomeEstg: e.target.value })} />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número de protocolo</span>
                                <input className='form-1' value={relatorioDataDelete.numero} onChange={(e) => setRelatorioDataDelete({ ...relatorioDataDelete, numero: e.target.value })} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Situação</span>
                                <select className='form-1' value={relatorioDataDelete.situacao} onChange={(e) => setRelatorioDataDelete({ ...relatorioDataDelete, situacao: e.target.value })}>
                                    <option value='Selecione'>Selecionar</option>
                                    <option>Revisar</option>
                                    <option>Revisado</option>
                                </select>
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data</span>
                                <input className='form-1' value={relatorioDataDelete.data} onChange={(e) => setRelatorioDataDelete({ ...relatorioDataDelete, data: e.target.value })}/>
                            </div>
                        </div>
                    </>
                }
                nav={
                    <button className={popUpButtonOneStyle}>Informações pessoais</button>
                }
                onSubmit={handleDeleteRelatorio}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default RelatorioPage