import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { point } from 'leaflet';

interface Props {
    location: {
        uf: string,
        city: string
    }
}

interface Point {
    id:number,
    name: string,
    email: string,
    whatsapp: string,
    uf: string,
    city: string,
    items: number[],
    image_url: string,
    image: string
}

const SearchPoints : React.FC<Props> = (props) => {

    const history = useHistory();
    const uf = props.location.uf;
    const city = props.location.city;

    useEffect(() => {
        if(uf === ''|| city === ''){
            history.push('/');
        } 
    }, []);
    

    const [points, setPoints] = useState<Point[]>([]);
    
    const params = {
        uf,
        city,
        name: '',
        items: ''
    }

    useEffect(() => {
        api.get('points', { params }).then(response => {
            setPoints(response.data);
            console.log(response.data)
        });
    }, []);

    return (
        <>
            <div id="tag-gray"></div>

            <div id="page-search">
                <div className="content">

                    <header>
                        <img src={logo} alt="Ecoleta"/>
                        <Link to="/">
                            <FiArrowLeft />
                            Voltar para home
                        </Link>
                    </header>

                    <main>
                        <fieldset>
                            <p><strong>{ points === undefined ? 0 : points.length } pontos</strong> encontrados.</p>
                        </fieldset>

                        <ul className="item-grid">
                            {
                                points.map(point => (
                                        <li key={point.id}>
                                            <img src={point.image_url || point.image} alt={point.name}></img>
                                            <h1>{point.name}</h1>
                                            <h3>Lampada</h3>
                                            <p>{point.city}, {point.uf}</p>
                                        </li>
                                    )
                                )
                            }
                            
                        </ul>
                    </main>
                </div>
            </div>
        </>
    );
};

export default SearchPoints;