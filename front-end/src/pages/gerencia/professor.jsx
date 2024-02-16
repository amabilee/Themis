import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import addIcon from '../../assets/addIcon.svg'
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IMaskInput } from "react-imask";
import './style.css';

//Import Components
import Header from '../../component/header';
import Title from '../../component/gerencia/Title';
import PopupCreate from '../../component/gerencia/popCreate';
import PopUpEdit from '../../component/gerencia/popEdit';
import PopUpSearch from '../../component/gerencia/popSearch';
import PopUpDelete from '../../component/gerencia/popDelete';

const ProfessorTable = ({ data, onEdit, onDelete}) => (
    <table className='table table-sm tableClients'>
        <thead>
            <tr>
                <th scope="col">NOME</th>
                <th scope="col">IDENTIFICAÇÃO</th>
                <th scope="col">CPF</th>
                <th scope="col">TELEFONE</th>
                <th scope="col">EMAIL</th>
                <th scope="col">AÇÕES</th>
            </tr>
        </thead>
        <tbody>
            {data.map((professor, index) => (
                <tr key={index}>
                    <td>{professor.nome}</td>
                    <td>{professor.identificacao}</td>
                    <td>{professor.cpf}</td>
                    <td>{professor.telefone}</td>
                    <td>{professor.email}</td>
                    <td>
                        <button className='button-13' onClick={() => onEdit(professor)}>
                            <img src={editIcon} alt="Edit" />
                        </button>
                        <button className='button-13' onClick={() => onDelete(professor)}>
                            <img src={deleteIcon} alt="Delete" />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

function ProfessorPage() {
    const [searchCategory, setSearchCategory] = useState('Selecione');
    const [searchTerm, setSearchTerm] = useState('');
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
    const [popUpButtonOneStyle, setPopUpButtonOneStyle] = useState('button-nav-enable');
    const [nome_prof, setNomeProfessor] = useState('');
    const [identificacao_prof, setIdentificacaoProfessor] = useState('');
    const [cpf_prof, setCpfProfessor] = useState('');
    const [telefone_prof, setTelefoneProfessor] = useState('');
    const [email_prof, setEmailProfessor] = useState('');
    const [open, setOpen] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: "white", color: "black", borderRadius: '10px' } })
    const [showPopSearch, setShowPopSearch] = useState(false);
    const [showPopCreate, setShowPopCreate] = useState(false);
    const [showPopEdit, setShowPopEdit] = useState(false);
    const [showPopDelete, setShowPopDelete] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [professorDataEdit, setProfessorDataEdit] = useState({ nome: '', identificacao: '', cpf: '', telefone: '', email: '' });
    const [professorDataEditBefore, setProfessorDataEditBefore] = useState({});
    const [professorDataDelete, setProfessorDataDelete] = useState({});

    var matrixProfessor = { nome: '', identificacao: '', cpf: '', telefone: '', email: '' }

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

    // Pesquisar Professor

    useEffect(() => {
        setResultadosPesquisa(professores);
        setComponentData()

    }, []);

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);
    };

    function handleSearchCategoryChange(e) {
        setSearchCategory(e.target.value);
    };

    function handleSearchSimple() {
        const resultadosFiltrados = professores.filter(professores => {
            if (searchCategory === 'Selecione' || searchTerm === '') {
                return true;
            } else {
                const normalizedSearchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                switch (searchCategory) {
                    case 'Nome':
                        return professores.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
                    case 'Identificação':
                        return professores.identificacao.includes(searchTerm);
                    case 'CPF':
                        return professores.cpf.includes(searchTerm);
                    case 'Telefone':
                        return professores.telefone.includes(searchTerm);
                    case 'Email':
                        return professores.email.includes(searchTerm);
                    default:
                        return true;
                }
            }
        });

        handleSearchResult(resultadosFiltrados)
    }

    function handleSearchAdvanced() {
        const base = { nome: '', identificacao: '', cpf: '', telefone: '', email: '' };
        const keys = Object.keys(base).filter(key => eval(`${key}_prof`) !== base[key]);
        const values = keys.map(key => eval(`${key}_prof`));

        const result = professores.filter(professor =>
            keys.every(key => String(professor[key]).toLowerCase().includes(String(eval(`${key}_prof`)).toLowerCase()))
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

    function returnSearch() {
        const resetFields = ['NomeProfessor', 'IdentificacaoProfessor', 'CpfProfessor', 'TelefoneProfessor', 'EmailProfessor']
        resetFields.forEach(field => eval(`set${field}('')`))
        setShowPopSearch(false)
        setShowPopCreate(false)
        setShowPopEdit(false)
        setShowPopDelete(false)
        setSearchCategory('Selecione');
        setSearchTerm('');
        setErrorMessage('');
    }

    // Criar Professor

    function formatProfessorData() {
        const professorFields = ['nome', 'identificacao', 'cpf', 'telefone', 'email']
        professorFields.forEach(field => matrixProfessor[field] = eval(`${field}_prof`))
    }

    function handleCreateProfessor() {
        const requiredFields = ['nome_prof', 'identificacao_prof', 'cpf_prof', 'telefone_prof', 'email_prof']

        if (requiredFields.some(field => !eval(field))) {
            setErrorMessage('Preencha todos os campos antes de adicionar.');
        } else {
            formatProfessorData()
            openSnackBarMessage();
            setSnackBarMessage('Professor criado com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            returnSearch();
        }
    }

    // Editar Professor

    function openEditPop(originalData) {
        setProfessorDataEdit((prevData) => {
            setProfessorDataEditBefore(prevData);
            return { ...originalData };;
        });
        setShowPopEdit(true);
        setShowPopCreate(false);
        setShowPopSearch(false);
        setShowPopDelete(false);
        setProfessorDataEditBefore(professorDataEdit);
    }

    const handleEditProfessor = () => {
        const requiredFields = ['nome', 'identificacao', 'cpf', 'telefone', 'email']
        if (requiredFields.some(field => !professorDataEdit[field])) {
            setErrorMessage('Preencha todos os campos antes de alterar.');
        } else {
            openSnackBarMessage();
            setSnackBarMessage('Professor editado com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            console.log('Informações antigas do professor editado:', professorDataEditBefore);
            console.log('Novas informações do professor editado:', professorDataEdit);
            returnSearch();
        }
    };

    // Deletar Professor

    const handleDeleteProfessor = () => {
        const requiredFields = ['nome', 'identificacao', 'cpf', 'telefone', 'email']

        if (requiredFields.some(field => !professorDataDelete[field])) {
            setErrorMessage('Preencha todos os campos antes de deletar.');
        } else {
            openSnackBarMessage();
            setSnackBarMessage('Professor removido com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            returnSearch();
        }
    };

    const openDeletePopup = (originalData) => {
        setProfessorDataDelete({ ...originalData });
        setShowPopEdit(false);
        setShowPopCreate(false);
        setShowPopSearch(false);
        setShowPopDelete(true);
    };

    //Components

    const [titleComponent, setTitleComponent] = useState('')

    function setComponentData() {
        setTitleComponent(['Gerenciamento de professores', 'Todos os aspectos relacionados aos professores do sistema podem ser gerenciados nesta página'])
    }

    return (
        <>
            <Header />
            <Container className='containerDesktop'>
                <div className='boxContainerDesktop'>
                    <div className="headContainerDesktop">
                        <Title parentToChild={titleComponent} />
                        <button className='button-12' onClick={() => setShowPopCreate(true)}>Cadastrar um professor</button>
                    </div>
                    <div className="bodyContainerDesktop">
                        <div className="gerenciaContainer">
                            <div className="searchBoxHistory">
                                <div className="searchBoxInputs">
                                    <input
                                        type='text'
                                        placeholder="Pesquisar por nome, cpf ..."
                                        className='form-3'
                                        value={searchTerm}
                                        onChange={handleSearchTermChange}
                                    />
                                    <select value={searchCategory} onChange={handleSearchCategoryChange} className='searchBoxSelect'>
                                        <option value='Selecione'>Categoria</option>
                                        <option>Nome</option>
                                        <option>Identificação</option>
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
                            <ProfessorTable data={resultadosPesquisa} onEdit={openEditPop} onDelete={openDeletePopup} />
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
                headerText="Adicionar professor"
                oneSection={true}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' value={nome_prof} onChange={(e) => setNomeProfessor(e.target.value)} placeholder='Digite o nome completo...' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número de identificação</span>
                                <input className='form-1' value={identificacao_prof} onChange={(e) => setIdentificacaoProfessor(e.target.value)} type='number' placeholder='012345678' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o cpf..." className='form-1' value={cpf_prof} onChange={(e) => setCpfProfessor(e.target.value)} />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' value={telefone_prof} onChange={(e) => setTelefoneProfessor(e.target.value)} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' value={email_prof} onChange={(e) => setEmailProfessor(e.target.value)} type='text' placeholder='name@website.com' />
                            </div>
                        </div>
                    </>
                }
                nav={
                    <>
                        <button className={popUpButtonOneStyle}>Informações pessoais</button>
                    </>}
                onSubmit={handleCreateProfessor}
                errorMessage={errorMessage}
            />
            <PopUpSearch
                showPopSearch={showPopSearch}
                returnSearch={() => setShowPopSearch(false)}
                headerText="Pesquisa avançada"
                sectionOneContent={
                    <>
                        <div className="popUpSearchLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' value={nome_prof} onChange={(e) => setNomeProfessor(e.target.value)} placeholder='Digite o nome completo...' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número de identificação</span>
                                <input className='form-1' value={identificacao_prof} onChange={(e) => setIdentificacaoProfessor(e.target.value)} type='number' placeholder='012345678' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o telefone..." className='form-1' value={cpf_prof} onChange={(e) => setCpfProfessor(e.target.value)} />
                            </div>
                        </div>
                        <div className="popUpSearchLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' value={telefone_prof} onChange={(e) => setTelefoneProfessor(e.target.value)} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' value={email_prof} onChange={(e) => setEmailProfessor(e.target.value)} type='text' placeholder='name@website.com' />
                            </div>
                        </div>
                    </>
                }
                onSubmit={handleSearchAdvanced}
                errorMessage={errorMessage}
            />
            <PopUpEdit
                showPopEdit={showPopEdit}
                returnSearch={returnSearch}
                headerText="Editar professor"
                oneSection={true}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' value={professorDataEdit.nome} onChange={(e) => setProfessorDataEdit({ ...professorDataEdit, nome: e.target.value })} placeholder='Digite o nome completo...' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número de identificação</span>
                                <input className='form-1' value={professorDataEdit.identificacao} onChange={(e) => setProfessorDataEdit({ ...professorDataEdit, identificacao: e.target.value })} placeholder='Código de identificação' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o telefone..." className='form-1' value={professorDataEdit.cpf} onChange={(e) => setProfessorDataEdit({ ...professorDataEdit, cpf: e.target.value })} />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' value={professorDataEdit.telefone} onChange={(e) => setProfessorDataEdit({ ...professorDataEdit, telefone: e.target.value })} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' value={professorDataEdit.email} onChange={(e) => setProfessorDataEdit({ ...professorDataEdit, email: e.target.value })} type='text' placeholder='name@website.com' />
                            </div>
                        </div>
                    </>
                }
                nav={
                    < button className={popUpButtonOneStyle}>Informações pessoais</button>
                }
                onSubmit={handleEditProfessor}
                errorMessage={errorMessage}
            />
            <PopUpDelete
                showPopDelete={showPopDelete}
                onClose={returnSearch}
                pageDataTitle={'Professor'}
                headerText="Deletar professor"
                oneSection={true}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' disabled={true} value={professorDataDelete.nome} onChange={(e) => setProfessorDataDelete({ ...professorDataDelete, nome: e.target.value })} placeholder='Digite o nome completo...' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>RG</span>
                                <input className='form-1' value={professorDataDelete.identificacao} disabled={true} onChange={(e) => setProfessorDataDelete({ ...professorDataDelete, identificacao: e.target.value })} placeholder='012345678' />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o telefone..." className='form-1' value={professorDataDelete.cpf} disabled={true} onChange={(e) => setProfessorDataDelete({ ...professorDataDelete, cpf: e.target.value })} />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' disabled={true} value={professorDataDelete.telefone} onChange={(e) => setProfessorDataDelete({ ...professorDataDelete, telefone: e.target.value })} />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' disabled={true} value={professorDataDelete.email} onChange={(e) => setProfessorDataDelete({ ...professorDataDelete, email: e.target.value })} type='text' placeholder='name@website.com' />
                            </div>
                        </div>
                    </>
                }
                nav={
                    <button className={popUpButtonOneStyle}>Informações pessoais</button>
                }
                onSubmit={handleDeleteProfessor}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default ProfessorPage