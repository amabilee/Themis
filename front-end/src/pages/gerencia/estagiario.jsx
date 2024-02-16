import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import editIcon from '../../assets/editIcon.svg'
import deleteIcon from '../../assets/deleteIcon.svg'
import CloseIcon from '@mui/icons-material/Close';
import { IMaskInput } from 'react-imask';
import { Container } from 'react-bootstrap'

//Import Components
import Header from '../../component/header';
import Title from '../../component/gerencia/Title';
import PopupCreate from '../../component/gerencia/popCreate';
import PopUpEdit from '../../component/gerencia/popEdit';
import PopUpSearch from '../../component/gerencia/popSearch';
import PopUpDelete from '../../component/gerencia/popDelete';


const EstagiarioTable = ({ data, onEdit, onDelete }) => (
    <table className='table table-sm tableClients'>
        <thead>
            <tr>
                <th scope="col">NOME</th>
                <th scope="col">MATRÍCULA</th>
                <th scope="col">CPF</th>
                <th scope="col">TELEFONE</th>
                <th scope="col">EMAIL</th>
                <th scope="col">AÇÕES</th>
            </tr>
        </thead>
        <tbody>
            {data.map((estagiario, index) => (
                <tr key={index}>
                    <td>{estagiario.nome}</td>
                    <td>{estagiario.matricula}</td>
                    <td>{estagiario.cpf}</td>
                    <td>{estagiario.telefone}</td>
                    <td>{estagiario.email}</td>
                    <td>
                        <button className='button-13' onClick={() => onEdit(estagiario)}>
                            <img src={editIcon} alt="Edit" />
                        </button>
                        <button className='button-13' onClick={() => onDelete(estagiario)}>
                            <img src={deleteIcon} alt="Delete" />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

function EstagiarioPage() {
    const [searchCategory, setSearchCategory] = useState('Selecione');
    const [searchTerm, setSearchTerm] = useState('');
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
    const [popUpButtonOneStyle, setPopUpButtonOneStyle] = useState('button-nav-enable');
    const [nome_estg, setNomeEstagiario] = useState('');
    const [matricula_estg, setMatriculaEstagiario] = useState('');
    const [cpf_estg, setCpfEstagiario] = useState('');
    const [telefone_estg, setTelefoneEstagiario] = useState('');
    const [email_estg, setEmailEstagiario] = useState('');
    const [open, setOpen] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('')
    const [snackBarStyle, setSnackBarStyle] = useState({ sx: { background: "white", color: "black", borderRadius: '10px' } })
    const [showPopSearch, setShowPopSearch] = useState(false);
    const [showPopCreate, setShowPopCreate] = useState(false);
    const [showPopEdit, setShowPopEdit] = useState(false);
    const [showPopDelete, setShowPopDelete] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [estagiarioDataEdit, setEstagiarioDataEdit] = useState({ nome: '', matricula: '', cpf: '', telefone: '', email: ''});
    const [estagiarioDataEditBefore, setEstagiarioDataEditBefore] = useState({});
    const [estagiarioDataDelete, setEstagiarioDataDelete] = useState({});
    var matrixEstagiario = { nome: '', matricula: '', cpf: '', telefone: '', email: ''}
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

    // Pesquisar Estagiario

    useEffect(() => {
        setResultadosPesquisa(estagiarios);
        setComponentData()
    }, []);

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);
    };

    function handleSearchCategoryChange(e) {
        setSearchCategory(e.target.value);
    };

    function handleSearchSimple() {
        const resultadosFiltrados = estagiarios.filter(estagiarios => {
            if (searchCategory === 'Selecione' || searchTerm === '') {
                return true;
            } else {
                const normalizedSearchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                
                switch (searchCategory){
                    case 'Nome':
                        return estagiarios.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(normalizedSearchTerm);
                    case 'Matrícula':
                        return estagiarios.matricula.includes(searchTerm);
                    case 'CPF':
                        return estagiarios.cpf.includes(searchTerm);
                    case 'Telefone':
                        return estagiarios.telefone.includes(searchTerm);
                    case 'Email':
                        return estagiarios.email.includes(searchTerm);
                    default:
                        return true;
                }
            }
        });

        handleSearchResult(resultadosFiltrados);
    }

    function handleSearchAdvanced() {
        const base = { nome: '', matricula: '', cpf: '', telefone: '', email: '' };

        const keys = Object.keys(base).filter(key => eval(`${key}_estg`) !== base[key]);
        const values = keys.map(key => eval(`${key}_estg`));

        const result = estagiarios.filter(estagiario =>
            keys.every(key => String(estagiario[key]).toLowerCase().includes(String(eval(`${key}_estg`)).toLowerCase()))
        );
        
        handleSearchResult(result, keys, values)
    }

    function handleSearchResult(result, keys, values){
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
        const resetFields = ['NomeEstagiario', 'MatriculaEstagiario', 'CpfEstagiario', 'TelefoneEstagiario', 'EmailEstagiario']

        resetFields.forEach(field => eval(`set${field}('')`));

        setShowPopSearch(false)
        setShowPopCreate(false)
        setShowPopEdit(false)
        setShowPopDelete(false)
        setSearchCategory('Selecione');
        setSearchTerm('');
        setErrorMessage('');
    }

    // Criar Estagiario

    function formatEstagiarioData() {
        const estagiarioFields = ['nome', 'matricula', 'cpf', 'telefone', 'email'];

        estagiarioFields.forEach(field => matrixEstagiario[field] = eval(`${field}_estg`));
    }

    function handleCreateEstagiario() {
        const requiredFields = ['nome', 'matricula', 'cpf', 'telefone', 'email'];

        if (requiredFields.some(field => !eval(`${field}_estg`))) {
            setErrorMessage('Preencha todos os campos antes de adicionar.');
        } else {
            formatEstagiarioData()
            openSnackBarMessage();
            setSnackBarMessage('Estagiário criado com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            returnSearch();
        }
    }

    // Editar Estagiario

    function openEditPop(originalData) {
        setEstagiarioDataEdit((prevData) => {
            setEstagiarioDataEditBefore(prevData);
            return { ...originalData };
        });
        setShowPopEdit(true);
        setShowPopCreate(false);
        setShowPopSearch(false);
        setShowPopDelete(false);
        setEstagiarioDataEditBefore(estagiarioDataEdit);
    }

    const handleEditEstagiario = () => {
        const requiredFields = ['nome', 'matricula', 'cpf', 'telefone', 'email'];
        if (requiredFields.some(field => !estagiarioDataEdit[field])) {
            setErrorMessage('Preencha todos os campos antes de alterar.');
        } else {
            openSnackBarMessage();
            setSnackBarMessage('Estagiário editado com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            console.log('Informações antigas do estagiário editado:', estagiarioDataEditBefore);
            console.log('Novas informações do estagiário editado:', estagiarioDataEdit);
            returnSearch();
        }
    };

    // Deletar Estagiario

    const openDeletePopup = (originalData) => {
        setEstagiarioDataDelete({ ...originalData });
        setShowPopEdit(false);
        setShowPopCreate(false);
        setShowPopSearch(false);
        setShowPopDelete(true);
    };

    const handleDeleteEstagiario = () => {
        const requiredFields = ['nome', 'matricula', 'cpf', 'telefone', 'email'];
        if (requiredFields.some(field => !estagiarioDataDelete[field])) {
            setErrorMessage('Preencha todos os campos antes de deletar.');
        } else {
            openSnackBarMessage();
            setSnackBarMessage('Estagiário removido com sucesso');
            setSnackBarStyle({ sx: { background: '#79B874', color: 'white', borderRadius: '15px' } });
            returnSearch();
        }
    };

    // Components

    const [titleComponent, setTitleComponent] = useState('')

    function setComponentData() {
        setTitleComponent(['Gerenciamento de estagiários', 'Todos os aspectos relacionados aos estagiários do sistema podem ser gerenciados nesta página'])
    }

    return (
        <>
            <Header />
            <Container className='containerDesktop'>
                <div className='boxContainerDesktop'>
                    <div className="headContainerDesktop">
                        <Title parentToChild={titleComponent} />
                        <button className='button-12' onClick={() => setShowPopCreate(true)}>Cadastrar um estagiário</button>
                    </div>
                    <div className="bodyContainerDesktop">
                        <div className="gerenciaContainer">
                            <div className="searchBoxHistory">
                                <div className="searchBoxInputs">
                                    <input type='text' placeholder="Pesquisar por nome, cpf ..." className='form-3' value={searchTerm} onChange={handleSearchTermChange} />
                                    <select value={searchCategory} onChange={handleSearchCategoryChange} className='searchBoxSelect'>
                                        <option value='Selecione'>Categoria</option>
                                        <option>Nome</option>
                                        <option>Matrícula</option>
                                        <option>CPF</option>
                                        <option>Telefone</option>
                                        <option>Email</option> </select>
                                </div>
                                <div className="searchBoxButtons">
                                    <button className='button-10' onClick={handleSearchSimple}>Pesquisar</button>
                                    <button className='button-11' onClick={() => setShowPopSearch(true)}>Pesquisa avançada</button>
                                </div>
                            </div>
                            <EstagiarioTable data={resultadosPesquisa} onEdit={openEditPop} onDelete={openDeletePopup} />
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
                headerText="Adicionar estagiário"
                oneSection={true}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' value={nome_estg} onChange={(e) => setNomeEstagiario(e.target.value)} placeholder='Digite o nome completo...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número de matrícula</span>
                                <input className='form-1' value={matricula_estg} onChange={(e) => setMatriculaEstagiario(e.target.value)} type='number' placeholder='012345678'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o cpf..." className='form-1' value={cpf_estg} onChange={(e) => setCpfEstagiario(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' value={telefone_estg} onChange={(e) => setTelefoneEstagiario(e.target.value)}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' value={email_estg} onChange={(e) => setEmailEstagiario(e.target.value)} type='text' placeholder='name@website.com'
                                />
                            </div>
                        </div>
                    </>
                }
                nav={
                    <>
                        <button className={popUpButtonOneStyle}>Informações pessoais</button>
                    </>}
                onSubmit={handleCreateEstagiario}
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
                                <input type="text" className='form-2' value={nome_estg} onChange={(e) => setNomeEstagiario(e.target.value)} placeholder='Digite o nome completo...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número de matrícula</span>
                                <input className='form-1' value={matricula_estg} onChange={(e) => setMatriculaEstagiario(e.target.value)} type='number' placeholder='012345678'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o telefone..." className='form-1' value={cpf_estg} onChange={(e) => setCpfEstagiario(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="popUpSearchLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' value={telefone_estg} onChange={(e) => setTelefoneEstagiario(e.target.value)}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' value={email_estg} onChange={(e) => setEmailEstagiario(e.target.value)} type='text' placeholder='name@website.com'
                                />
                            </div>
                        </div>
                    </>
                }
                onSubmit={handleSearchAdvanced}
                errorMessage={errorMessage}
            />
            <PopUpEdit
                showPopEdit={showPopEdit}
                headerText="Editar estagiário"
                oneSection={true}
                onClose={returnSearch}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' value={estagiarioDataEdit.nome} onChange={(e) => setEstagiarioDataEdit({ ...estagiarioDataEdit, nome: e.target.value })} placeholder='Digite o nome completo...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Número de matrícula</span>
                                <input className='form-1' value={estagiarioDataEdit.matricula} onChange={(e) => setEstagiarioDataEdit({ ...estagiarioDataEdit, matricula: e.target.value })} type='number' placeholder='012345678'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o telefone..." className='form-1' value={estagiarioDataEdit.cpf} onChange={(e) => setEstagiarioDataEdit({ ...estagiarioDataEdit, cpf: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' value={estagiarioDataEdit.telefone} onChange={(e) => setEstagiarioDataEdit({ ...estagiarioDataEdit, telefone: e.target.value })}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' value={estagiarioDataEdit.email} onChange={(e) => setEstagiarioDataEdit({ ...estagiarioDataEdit, email: e.target.value })} type='text' placeholder='name@website.com'
                                />
                            </div>
                        </div>
                    </>
                }
                nav={
                    < button className={popUpButtonOneStyle}>Informações pessoais</button>
                }
                onSubmit={handleEditEstagiario}
                errorMessage={errorMessage}
            />
            <PopUpDelete
                showPopDelete={showPopDelete}
                onClose={returnSearch}
                headerText="Deletar estagiário"
                pageDataTitle={'Estagiário'}
                oneSection={true}
                sectionOneContent={
                    <>
                        <div className="popUpCreateLineOne">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Nome completo</span>
                                <input type="text" className='form-2' disabled={true} value={estagiarioDataDelete.nome} onChange={(e) => setEstagiarioDataDelete({ ...estagiarioDataDelete, nome: e.target.value })} placeholder='Digite o nome completo...'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Matrícula</span>
                                <input className='form-1' value={estagiarioDataDelete.matricula} disabled={true} onChange={(e) => setEstagiarioDataDelete({ ...estagiarioDataDelete, matricula: e.target.value })} type='number' placeholder='012345678'
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>CPF</span>
                                <IMaskInput mask="000.000.000-00" placeholder="Digite o telefone..." className='form-1' value={estagiarioDataDelete.cpf} disabled={true} onChange={(e) => setEstagiarioDataDelete({ ...estagiarioDataDelete, cpf: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="popUpCreateLineTwo">
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Telefone</span>
                                <IMaskInput mask="(00) 00000-0000" placeholder="Digite o telefone..." className='form-1' disabled={true} value={estagiarioDataDelete.telefone} onChange={(e) => setEstagiarioDataDelete({ ...estagiarioDataDelete, telefone: e.target.value })}
                                />
                            </div>
                            <div className='searchForms'>
                                <span className='body-light margin-bottom-5 text-color-5'>Email</span>
                                <input className='form-1' disabled={true} value={estagiarioDataDelete.email} onChange={(e) => setEstagiarioDataDelete({ ...estagiarioDataDelete, email: e.target.value })} type='text' placeholder='name@website.com'
                                />
                            </div>
                        </div>
                    </>
                }
                nav={
                    <button className={popUpButtonOneStyle}>Informações pessoais</button>
                }
                onSubmit={handleDeleteEstagiario}
                errorMessage={errorMessage}
            />
        </>
    )
}

export default EstagiarioPage