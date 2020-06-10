import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import './styles.css'
import logo from '../../assets/logo.svg';
import PopUpSearchPoints from '../../components/PopUpSearchPoints';

const Home = () => {

    const [searchPoints, setSearchPoints] = useState<boolean>(false);

    function handleSearchPoints(){
        setSearchPoints(true);
    }

    return (
        <div id="page-home">
            {
                searchPoints
                ?   <PopUpSearchPoints />
                :
                (            
                    <div className="content">
                        <header>
                            <img src={logo} alt="Ecoleta"/> 
                        </header>

                        <main>
                            <h1>Seu marketplace de coleta de residuos</h1>
                            <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                            <div className="button-group">
                                <Link to="/" onClick={handleSearchPoints}>
                                    <span>
                                        <FiSearch />
                                    </span>
                                    <strong>
                                    Pesquisar pontos de coleta 
                                    </strong>
                                </Link>
                                <Link className="button-secondary" to="/create-point">
                                    <strong>
                                    Cadastrar um ponto de coleta 
                                    </strong>
                                </Link>
                            </div>
                        </main>
                    </div>
                )
            }
        </div>
    )
}

export default Home;