import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import addIcon from '../../assets/addIcon.svg'
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IMaskInput } from "react-imask";
import Select from 'react-select';
import './style.css';

//Import Components
import Header from '../../component/header';
import Title from '../../component/gerencia/Title';
import PopupCreate from '../../component/gerencia/popCreate';
import PopUpEdit from '../../component/gerencia/popEdit';
import PopUpSearch from '../../component/gerencia/popSearch';
import PopUpDelete from '../../component/gerencia/popDelete';

const ProcessoTable = ({ data, onEdit, onDelete }) => (
    <table className='table table-sm tableClients'>
        <thead>
            <tr>
                <th scope="col">PROTOCOLO</th>
                <th scope="col">CLIENTE</th>
                <th scope="col">ESTAGIÁRIO</th>
                <th scope="col">TIPO</th>
                <th scope="col">SITUAÇÃO</th>
                <th scope="col">AÇÕES</th>
            </tr>
        </thead>
        <tbody>
            {data.map((processo, index) => {
                const dataFecha = processo.dataFecha ? new Date(
                    processo.dataFecha.split('/').reverse().join('-')
                ) : null;
                const status = dataFecha && dataFecha > new Date() ? 'Ativo' : 'Fechado';
                const statusClassName = status === 'Ativo' ? 'processoAtivo' : 'processoFechado';

                return (
                    <tr key={index}>
                        <td>{processo.numero}</td>
                        <td>{processo.nomeCli}</td>
                        <td>{processo.nomeEstg}</td>
                        <td>{processo.tipo}</td>
                        <td><p className={statusClassName}>{status}</p></td>
                        <td>
                            <button className='button-13' onClick={() => onEdit(processo)}><img src={editIcon} /></button>
                            <button className='button-13' onClick={() => onDelete(processo)}><img src={deleteIcon} /></button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);

function ProcessoPage() {
    const [searchCategory, setSearchCategory] = useState('Selecione');
    const [searchTerm, setSearchTerm] = useState('');
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);

    const [nomeCli_proc, setNomeClienteProcesso] = useState('');
    const [nomeEstg_proc, setNomeEstagiarioProcesso] = useState('');
    const [nomeAdd_proc, setNomeAddProcesso] = useState('');
    const [nomeProf_proc, setNomeProfessorProcesso] = useState('');
    const [numero_proc, setNumeroProcesso] = useState('');
    const [tipo_proc, setTipoProcesso] = useState('');
    const [vara_proc, setVaraProcesso] = useState('');
    const [instancia_proc, setInstanciaProcesso] = useState('');
    const [tribunal_proc, setTribunalProcesso] = useState('');
    const [dataAbert_proc, setDataAberturaProcesso] = useState('');
    const [dataFecha_proc, setDataFechamentoProcesso] = useState('');
    const [desc_proc, setDescricaoProcesso] = useState('');

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

    const [processoDataEdit, setProcessoDataEdit] = useState({ nomeCli: '', nomeEstg: '', nomeAdd: '', nomeProf: '', numero: '', tipo: '', vara: '', instancia: '', tribunal: '', dataAbert: '', dataFecha: '', paisOrigem: '', desc: '' });
    const [processoDataEditBefore, setProcessoDataEditBefore] = useState({});
    const [processoDataDelete, setProcessoDataDelete] = useState({});

    var matrixProcesso = { nomeCli: '', nomeEstg: '', nomeAdd: '', nomeProf: '', numero: '', tipo: '', vara: '', instancia: '', tribunal: '', dataAbert: '', dataFecha: '', paisOrigem: '', desc: '' }

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

    var professores = [
        { nome: 'Professor 1', identificacao: 'ID1', cpf: '111.111.111-11', telefone: '(11) 1111-1111', email: 'professor1@email.com' },
        { nome: 'Professor 2', identificacao: 'ID2', cpf: '222.222.222-22', telefone: '(22) 2222-2222', email: 'professor2@email.com' },
        { nome: 'Professor 3', identificacao: 'ID3', cpf: '333.333.333-33', telefone: '(33) 3333-3333', email: 'professor3@email.com' },
        { nome: 'Professor 4', identificacao: 'ID4', cpf: '444.444.444-44', telefone: '(44) 4444-4444', email: 'professor4@email.com' },
        { nome: 'Professor 5', identificacao: 'ID5', cpf: '555.555.555-55', telefone: '(55) 5555-5555', email: 'professor5@email.com' },
        { nome: 'Professor 6', identificacao: 'ID6', cpf: '666.666.666-66', telefone: '(66) 6666-6666', email: 'professor6@email.com' },
        { nome: 'Professor 7', identificacao: 'ID7', cpf: '777.777.777-77', telefone: '(77) 7777-7777', email: 'professor7@email.com' },
        { nome: 'Professor 8', identificacao: 'ID8', cpf: '888.888.888-88', telefone: '(88) 8888-8888', email: 'professor8@email.com' },
        { nome: 'Professor 9', identificacao: 'ID9', cpf: '999.999.999-99', telefone: '(99) 9999-9999', email: 'professor9@email.com' },
        { nome: 'Professor 10', identificacao: 'ID10', cpf: '101.010.101-10', telefone: '(10) 1010-1010', email: 'professor10@email.com' },
        { nome: 'Professor 11', identificacao: 'ID11', cpf: '111.111.111-11', telefone: '(11) 1111-1111', email: 'professor11@email.com' },
        { nome: 'Professor 12', identificacao: 'ID12', cpf: '121.212.121-21', telefone: '(21) 1212-1212', email: 'professor12@email.com' },
        { nome: 'Professor 13', identificacao: 'ID13', cpf: '131.313.131-31', telefone: '(31) 1313-1313', email: 'professor13@email.com' },
        { nome: 'Professor 14', identificacao: 'ID14', cpf: '141.414.141-41', telefone: '(41) 1414-1414', email: 'professor14@email.com' },
        { nome: 'Professor 15', identificacao: 'ID15', cpf: '151.515.151-51', telefone: '(51) 1515-1515', email: 'professor15@email.com' },
        { nome: 'Professor 16', identificacao: 'ID16', cpf: '161.616.161-61', telefone: '(61) 1616-1616', email: 'professor16@email.com' },
        { nome: 'Professor 17', identificacao: 'ID17', cpf: '171.717.171-71', telefone: '(71) 1717-1717', email: 'professor17@email.com' },
        { nome: 'Professor 18', identificacao: 'ID18', cpf: '181.818.181-81', telefone: '(81) 1818-1818', email: 'professor18@email.com' },
        { nome: 'Professor 19', identificacao: 'ID19', cpf: '191.919.191-91', telefone: '(91) 1919-1919', email: 'professor19@email.com' }
    ];

    var processos = [
        { nomeCli: 'João Silva', nomeEstg: 'Estagiário1', nomeAdd: 'Endereço1', nomeProf: 'Profissão1', numero: '123', tipo: 'Tipo1', vara: 'Vara1', instancia: 'Instância1', tribunal: 'Tribunal1', dataAbert: '01/01/2022', dataFecha: '31/12/2024', paisOrigem: 'País1', desc: 'Descrição1', },
        { nomeCli: 'Professor2', nomeEstg: 'Estagiário2', nomeAdd: 'Endereço2', nomeProf: 'Profissão2', numero: '456', tipo: 'Tipo2', vara: 'Vara2', instancia: 'Instância2', tribunal: 'Tribunal2', dataAbert: '01/02/2022', dataFecha: '28/02/2022', paisOrigem: 'País2', desc: 'Descrição2', },
        { nomeCli: 'Professor3', nomeEstg: 'Estagiário3', nomeAdd: 'Endereço3', nomeProf: 'Profissão3', numero: '789', tipo: 'Tipo3', vara: 'Vara3', instancia: 'Instância3', tribunal: 'Tribunal3', dataAbert: '15/03/2022', dataFecha: '30/04/2022', paisOrigem: 'País3', desc: 'Descrição3', },
        { nomeCli: 'Professor4', nomeEstg: 'Estagiário4', nomeAdd: 'Endereço4', nomeProf: 'Profissão4', numero: '101', tipo: 'Tipo4', vara: 'Vara4', instancia: 'Instância4', tribunal: 'Tribunal4', dataAbert: '01/05/2022', dataFecha: '30/06/2022', paisOrigem: 'País4', desc: 'Descrição4', },
        { nomeCli: 'Professor5', nomeEstg: 'Estagiário5', nomeAdd: 'Endereço5', nomeProf: 'Profissão5', numero: '112', tipo: 'Tipo5', vara: 'Vara5', instancia: 'Instância5', tribunal: 'Tribunal5', dataAbert: '01/07/2022', dataFecha: '31/08/2022', paisOrigem: 'País5', desc: 'Descrição5', }
    ]

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

    // Pesquisar Processos

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);
    };

    function handleSearchCategoryChange(e) {
        setSearchCategory(e.target.value);
    };

    useEffect(() => {
        setResultadosPesquisa(processos);
        setComponentData()
    }, []);

    function handleSearchSimple() { //função para retornar resultados da pesquisa simples
        const resultadosFiltrados = processos.filter(processo => {
            if (searchCategory === 'Selecione' || searchTerm === '') {
                return true;
            } else {
                const normalizedSearchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                switch (searchCategory) {
                    case 'Protocolo':
                        return processo.numero.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
                    case 'Cliente':
                        return processo.nomeCli.includes(searchTerm);
                    case 'Estagiário':
                        return processo.nomeEstg.includes(searchTerm);
                    case 'Tipo':
                        return processo.tipo.includes(searchTerm);
                    default:
                        return true;
                }
            }
        });

        handleSearchResult(resultadosFiltrados);
    }

    function handleSearchAdvanced() { //função para retornar resultados da pesquisa
        const base = { nomeCli: '', nomeEstg: '', nomeAdd: '', nomeProf: '', numero: '', tipo: '', vara: '', instancia: '', tribunal: '', dataAbert: '', dataFecha: '', paisOrigem: '', desc: '' };
        const keys = Object.keys(base).filter(key => eval(`${key}_proc`) !== base[key]);
        const values = keys.map(key => eval(`${key}_proc`));

        const result = processos.filter(processo =>
            keys.every(key => String(processo[key]).toLowerCase().includes(String(eval(`${key}_proc`)).toLowerCase()))
        );

        handleSearchResult(result, keys, values)
    }

    function handleSearchResult(result, keys, values) {
        setResultadosPesquisa(result);
        openSnackBarMessage()
        if (result.length === 0) {
            setSnackBarMessage('Não foram encontrados resultados')
            setSnackBarStyle({ sx: { background: "#BE5353", color: "white", borderRadius: '15px' } })
        } else {
            setSnackBarMessage('Pesquisa realizada com sucesso')
            setSnackBarStyle({ sx: { background: "#79B874", color: "white", borderRadius: '15px' } })
        }
        returnSearch()
    }

    function returnSearch() { //função para limpar
        const resetFields = ['NomeClienteProcesso', 'NomeEstagiarioProcesso', 'NomeAddProcesso', 'NomeProfessorProcesso', 'NumeroProcesso', 'TipoProcesso', 'VaraProcesso', 'InstanciaProcesso', 'TribunalProcesso', 'DataAberturaProcesso', 'DataFechamentoProcesso', 'DescricaoProcesso']
        resetFields.forEach(field => eval(`set${field}('')`));
        setSearchCategory('Selecione');
        setSearchTerm('');
        setErrorMessage('');
        setShowSectionOneCreate(true);
        setShowSectionOneEdit(true);
        setShowSectionOneDelete(true);
        setShowPopSearch(false)
        setShowPopCreate(false)
        setShowPopEdit(false)
        setShowPopDelete(false)
    }

    // Criar Processo

    function handleCreateProcesso() {
        const requiredFields = ['nomeCli_proc', 'nomeEstg_proc', 'nomeAdd_proc', 'nomeProf_proc', 'numero_proc', 'tipo_proc', 'vara_proc', 'instancia_proc', 'tribunal_proc', 'dataAbert_proc', 'dataFecha_proc', 'desc_proc']
        if (requiredFields.some(field => !eval(field))) {
            setErrorMessage('Preencha todos os campos antes de adicionar.');
        } else {
            formatProcessoData()
            openSnackBarMessage();
            setSnackBarMessage('Processo criado com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            returnSearch();
        }
    }

    function formatProcessoData() {
        const processoFields = ['nomeEstg', 'nomeAdd', 'nomeProf', 'numero', 'tipo', 'vara', 'instancia', 'tribunal', 'dataAbert', 'dataFecha', 'desc']
        processoFields.forEach(field => matrixProcesso[field] = eval(`${field}_proc`))
    }

    // Editar Processo

    function openEditPop(originalData) {
        setProcessoDataEdit((prevData) => {
            setProcessoDataEditBefore(prevData);
            return { ...originalData };
        });
        setShowPopEdit(true);
        setShowPopCreate(false);
        setShowPopSearch(false);
        setShowPopDelete(false);
        setProcessoDataEditBefore(processoDataEdit);
    }

    const handleEditProcesso = () => {
        const requiredFields = ['nomeCli_proc', 'nomeEstg_proc', 'nomeAdd_proc', 'nomeProf_proc', 'numero_proc', 'tipo_proc', 'vara_proc', 'instancia_proc', 'tribunal_proc', 'dataAbert_proc', 'dataFecha_proc', 'desc_proc']

        if (requiredFields.some(field => !processoDataEdit[field])) {
            setErrorMessage('Preencha todos os campos antes de alterar.');
        } else {
            openSnackBarMessage();
            setSnackBarMessage('Processo editado com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            console.log('Informações antigos do processo editada:', processoDataEditBefore);
            console.log('Novas informações do processo editada:', processoDataEdit);
            returnSearch();
        }
    };

    // Deletar Processo

    const openDeletePopup = (originalData) => {
        setProcessoDataDelete({ ...originalData });
        setShowPopEdit(false);
        setShowPopCreate(false);
        setShowPopDelete(true);
    };

    const handleDeleteProcesso = () => {
        const requiredFilds = ['nomeCli', 'nomeEstg', 'nomeAdd', 'nomeProf', 'numero', 'tipo', 'vara', 'instancia', 'tribunal', 'dataAbert', 'dataFecha', 'desc']
        if (requiredFilds.some(field => !processoDataDelete[field])) {
            setErrorMessage('Preencha todos os campos antes de deletar.');
        } else {
            openSnackBarMessage();
            setSnackBarMessage('Processo removido com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            returnSearch();
        }
    };


    //Components

    const [titleComponent, setTitleComponent] = useState('')

    function setComponentData() {
        setTitleComponent(['Gerenciamento de processos', 'Todos os aspectos relacionados aos processos do sistema podem ser gerenciados nesta página'])
    }


    const optionsClients = clients.map(client => ({
        value: client.nome,
        label: client.nome,
    }));

    const optionsEstg = estagiarios.map(estagiario => ({
        value: estagiario.nome,
        label: estagiario.nome,
    }));

    const optionsProf = professores.map(professor => ({
        value: professor.nome,
        label: professor.nome,
    }));

    const optionsTipo = [
        { value: 'Conhecimento', label: 'Conhecimento' },
        { value: 'Cautelar', label: 'Cautelar' },
        { value: 'Execução', label: 'Execução' },
    ];

    const optionsVara = [
        { value: 'Vara1', label: 'Vara1' },
        { value: 'Vara2', label: 'Vara2' },
        { value: 'Vara3', label: 'Vara3' },
    ];

    const optionsInstancia = [
        { value: 'Instancia1', label: 'Instancia1' },
        { value: 'Instancia2', label: 'Instancia2' },
        { value: 'Instancia3', label: 'Instancia3' },
    ];

    const optionsTribunal = [
        { value: 'Tribunal1', label: 'Tribunal1' },
        { value: 'Tribunal2', label: 'Tribunal2' },
        { value: 'Tribunal3', label: 'Tribunal3' },
    ];

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
                        <button className='button-12' onClick={() => setShowPopCreate(true)}>Cadastrar um processo</button>
                    </div>
                    <div className="bodyContainerDesktop">
                        <div className="gerenciaContainer">
                            <div className="searchBoxHistory">
                                <div className="searchBoxInputs">
                                    <input type='text' placeholder="Pesquisar por nome, cpf ..." className='form-3' value={searchTerm} onChange={handleSearchTermChange} />
                                    <select value={searchCategory} onChange={handleSearchCategoryChange} className='searchBoxSelect'>
                                        <option value='Selecione'>Categoria</option>
                                        <option>Protocolo</option>
                                        <option>Cliente</option>
                                        <option>Estagiário</option>
                                        <option>Tipo</option>
                                    </select>
                                </div>
                                <div className="searchBoxButtons">
                                    <button className='button-10' onClick={handleSearchSimple}>Pesquisar</button>
                                    <button className='button-11' onClick={() => setShowPopSearch(true)}>Pesquisa avançada</button>
                                </div>
                            </div>
                            <ProcessoTable data={resultadosPesquisa} onEdit={openEditPop} onDelete={openDeletePopup} />
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={closeSnackBarMessage}
                    message={snackBarMessage}
                    action={alertBox}
                    ContentProps={snackBarStyle}
                />
            </Container>
            <PopupCreate
                showPopCreate={showPopCreate}
                onClose={returnSearch}
                headerText="Adicionar processo"
                oneSection={false}
                onSubmit={handleCreateProcesso}
                errorMessage={errorMessage}
                onChangeSection={handleChangeSectionCreate}
                nav={
                    <>
                        <button
                            className={`${showSectionOneCreate ? 'button-nav-enable' : 'button-nav-disable'}`}
                            onClick={() => setShowSectionOneCreate(true)}
                        >
                            Informações principais
                        </button>
                        <button
                            className={`${!showSectionOneCreate ? 'button-nav-enable  margin-left-30' : 'button-nav-disable margin-left-30'}`}
                            onClick={() => setShowSectionOneCreate(false)}
                        >
                            Detalhes do caso
                        </button>
                    </>
                }
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do cliente</span>
                                <Select defaultValue={nomeCli_proc} onChange={(e) => setNomeClienteProcesso(e.target.value)} options={optionsClients} placeholder='Selecione uma opção' className='select1' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estagiário responsável</span>
                                <Select defaultValue={nomeEstg_proc} onChange={(e) => setNomeEstagiarioProcesso(e.target.value)} options={optionsEstg} placeholder='Selecione uma opção' className='select1' />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome de outras partes envolvidas (caso exista)</span>
                                <input className='form-1' value={nomeAdd_proc} onChange={(e) => setNomeAddProcesso(e.target.value)} type='text' placeholder='Digite o nome completo...' style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Professor responsável</span>
                                <Select value={nomeProf_proc} onChange={(e) => setNomeProfessorProcesso(e.target.value)} options={optionsProf} placeholder='Selecione uma opção' className='select1' />
                            </div>
                        </div>
                        <div className="popUpCreateLineThree">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número do protocolo*</span>
                                <input type="number" className='form-1' value={numero_proc} onChange={(e) => setNumeroProcesso(e.target.value)} placeholder='Digite o numero do protocolo...' style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                    </>
                }
                sectionTwoContent={
                    <>
                        <div className="popUpCreateLineFour">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Tipo</span>
                                <Select value={tipo_proc} onChange={(e) => setTipoProcesso(e.target.value)} options={optionsTipo} placeholder='Selecione uma opção' className='select2' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Vara</span>
                                <Select value={vara_proc} onChange={(e) => setVaraProcesso(e.target.value)} options={optionsVara} placeholder='Selecione uma opção' className='select2' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Instância</span>
                                <Select value={instancia_proc} onChange={(e) => setInstanciaProcesso(e.target.value)} options={optionsInstancia} placeholder='Selecione uma opção' className='select2' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Tribunal</span>
                                <Select value={tribunal_proc} onChange={(e) => setTribunalProcesso(e.target.value)} options={optionsTribunal} placeholder='Selecione uma opção' className='select2' />
                            </div>
                        </div>
                        <div className="popUpCreateLineFive">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de abertura</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data de abertura..." className='form-1' value={dataAbert_proc} onChange={(e) => setDataAberturaProcesso(e.target.value)} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de fechamento</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data de fechamento..." className='form-1' value={dataFecha_proc} onChange={(e) => setDataFechamentoProcesso(e.target.value)} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                        <div className="popUpCreateProcessoLineSix">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Descrição do caso</span>
                                <textarea value={desc_proc} className='form-1' placeholder='Digite a descrição do caso...' onChange={(e) => setDescricaoProcesso(e.target.value)} style={{ padding: '10px 0 0 10px', width: '1050px', minWidth: '1050px', maxWidth: '1050px', height: '87px', minHeight: '87px', maxHeight: '87px' }} >
                                </textarea>
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
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do cliente</span>
                                <Select defaultValue={nomeCli_proc} onChange={setNomeClienteProcesso} options={optionsClients} placeholder='Selecione uma opção' className='select1' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estagiário responsável</span>
                                <Select defaultValue={nomeEstg_proc} onChange={setNomeEstagiarioProcesso} options={optionsEstg} placeholder='Selecione uma opção' className='select1' />
                            </div>
                        </div>
                        <div className="popUpSearchLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome de outras partes envolvidas (caso exista)</span>
                                <input className='form-1' value={nomeAdd_proc} onChange={setNomeAddProcesso} type='text' placeholder='Digite o nome completo...' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Professor responsável</span>
                                <Select value={nomeProf_proc} onChange={setNomeProfessorProcesso} options={optionsProf} placeholder='Selecione uma opção' className='select1' />
                            </div>
                        </div>
                        <div className="popUpSearchLineThree">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número do protocolo*</span>
                                <input type="number" className='form-1' value={numero_proc} onChange={(e) => setNumeroProcesso(e.target.value)} placeholder='Digite o numero do protocolo...' style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                        <div className="popUpSearchLineFour">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Tipo</span>
                                <Select value={tipo_proc} onChange={setTipoProcesso} options={optionsTipo} placeholder='Selecione uma opção' className='select2' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Vara</span>
                                <Select value={vara_proc} onChange={setVaraProcesso} options={optionsVara} placeholder='Selecione uma opção' className='select2' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Instância</span>
                                <Select value={instancia_proc} onChange={setInstanciaProcesso} options={optionsInstancia} placeholder='Selecione uma opção' className='select2' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Tribunal</span>
                                <Select value={tribunal_proc} onChange={setTribunalProcesso} options={optionsTribunal} placeholder='Selecione uma opção' className='select2' />
                            </div>
                        </div>
                        <div className="popUpSearchLineFive">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de abertura</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data de abertura..." className='form-1' value={dataAbert_proc} onChange={(e) => setDataAberturaProcesso(e.target.value)} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de fechamento</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data de fechamento..." className='form-1' value={dataFecha_proc} onChange={(e) => setDataFechamentoProcesso(e.target.value)} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                    </>
                }
                errorMessage={errorMessage}
            />
            <PopUpEdit
                showPopEdit={showPopEdit}
                headerText="Editar processo"
                onSubmit={handleEditProcesso}
                errorMessage={errorMessage}
                onClose={returnSearch}
                onChangeSection={handleChangeSectionEdit}
                oneSection={false}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do cliente</span>
                                <Select value={processoDataDelete.nomeCli} onChange={(e) => setProcessoDataEdit({ ...processoDataEdit, nomeCli: e.target.value })} options={optionsClients} placeholder='Selecione uma opção' className='select1' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estagiário responsável</span>
                                <Select value={processoDataDelete.nomeEstg} onChange={setNomeEstagiarioProcesso} options={optionsEstg} placeholder='Selecione uma opção' className='select1' />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome de outras partes envolvidas (caso exista)</span>
                                <input className='form-1' value={processoDataDelete.nomeAdd} onChange={(e) => setProcessoDataEdit({ ...processoDataEdit, nomeAdd: e.target.value })} type='text' placeholder='Digite o nome completo...' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Professor responsável</span>
                                <Select value={nomeProf_proc} onChange={setNomeProfessorProcesso} options={optionsProf} placeholder='Selecione uma opção' className='select1' />
                            </div>
                        </div>
                        <div className="popUpCreateLineThree">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número do protocolo*</span>
                                <input type="number" className='form-1' value={numero_proc} onChange={(e) => setNumeroProcesso(e.target.value)} placeholder='Digite o numero do protocolo...' style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                    </>
                }
                sectionTwoContent={
                    <>
                        <div className="popUpCreateLineFour">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Tipo</span>
                                <Select value={tipo_proc} onChange={setTipoProcesso} options={optionsTipo} placeholder='Selecione uma opção' className='select2' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Vara</span>
                                <Select value={vara_proc} onChange={setVaraProcesso} options={optionsVara} placeholder='Selecione uma opção' className='select2' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Instância</span>
                                <Select value={instancia_proc} onChange={setInstanciaProcesso} options={optionsInstancia} placeholder='Selecione uma opção' className='select2' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Tribunal</span>
                                <Select value={tribunal_proc} onChange={setTribunalProcesso} options={optionsTribunal} placeholder='Selecione uma opção' className='select2' />
                            </div>
                        </div>
                        <div className="popUpCreateLineFive">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de abertura</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data de abertura..." className='form-1' value={dataAbert_proc} onChange={(e) => setDataAberturaProcesso(e.target.value)} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de fechamento</span>
                                <IMaskInput mask="00/00/0000" placeholder="Digite a data de fechamento..." className='form-1' value={dataFecha_proc} onChange={(e) => setDataFechamentoProcesso(e.target.value)} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                        <div className="popUpCreateProcessoLineSix">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Descrição do caso</span>
                                <textarea value={desc_proc} className='form-1' placeholder='Digite a descrição do caso...' onChange={(e) => setDescricaoProcesso(e.target.value)} rows="4" cols="100" style={{ padding: '10px 0 0 10px', width: '1050px', minWidth: '1050px', maxWidth: '1050px', height: '87px', minHeight: '87px', maxHeight: '87px' }} >
                                </textarea>
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
                            Informações principais
                        </button>
                        <button
                            className={`${!showSectionOneEdit ? 'button-nav-enable  margin-left-30' : 'button-nav-disable margin-left-30'}`}
                            onClick={() => setShowSectionOneEdit(false)}
                        >
                            Detalhes do caso
                        </button>
                    </>
                }
            />
            <PopUpDelete
                showPopDelete={showPopDelete}
                onClose={returnSearch}
                headerText="Deletar processo"
                oneSection={false}
                pageDataTitle={'Processo'}
                onSubmit={handleDeleteProcesso}
                errorMessage={errorMessage}
                onChangeSection={handleChangeSectionDelete}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome do cliente</span>
                                <input value={processoDataDelete.nomeCli} className='form-1' style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Estagiário responsável</span>
                                <input value={processoDataDelete.nomeEstg} className='form-1' style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome de outras partes envolvidas (caso exista)</span>
                                <input className='form-1' value={processoDataDelete.nomeAdd} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Professor responsável</span>
                                <input value={processoDataDelete.nomeProf} className='form-1' style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                        <div className="popUpCreateLineThree">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número do protocolo</span>
                                <input type="number" className='form-1' value={processoDataDelete.numero} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                    </>
                }
                sectionTwoContent={
                    <>
                        <div className="popUpCreateLineFour">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Tipo</span>
                                <input value={processoDataDelete.tipo} className='form-1' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Vara</span>
                                <input value={processoDataDelete.vara} className='form-1' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Instância</span>
                                <input value={processoDataDelete.instancia} className='form-1' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Tribunal</span>
                                <input value={processoDataDelete.tribunal} className='form-1' />
                            </div>
                        </div>
                        <div className="popUpCreateLineFive">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de abertura</span>
                                <IMaskInput mask="00/00/0000" className='form-1' value={processoDataDelete.dataAbert} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Data de fechamento</span>
                                <IMaskInput mask="00/00/0000" className='form-1' value={processoDataDelete.dataFecha} style={{ width: '300px', minWidth: '300px' }} />
                            </div>
                        </div>
                        <div className="popUpCreateProcessoLineSix">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Descrição do caso</span>
                                <textarea value={processoDataDelete.desc} className='form-1' rows="4" cols="100" style={{ padding: '10px 0 0 10px', width: '1050px', minWidth: '1050px', maxWidth: '1050px', height: '87px', minHeight: '87px', maxHeight: '87px' }} >
                                </textarea>
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
                            Informações principais
                        </button>
                        <button
                            className={`${!showSectionOneDelete ? 'button-nav-enable  margin-left-30' : 'button-nav-disable margin-left-30'}`}
                            onClick={() => setShowSectionOneDelete(false)}
                        >
                            Detalhes do caso
                        </button>
                    </>
                }
            />
        </>
    )
}

export default ProcessoPage