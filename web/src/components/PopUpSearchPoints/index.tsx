import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './styles.css'
import { Link } from 'react-router-dom';

interface IBGERUFResponse{
    sigla: string
}

interface IBGECityResponse{
    nome: string
}

const PopUpSearchPoints = () => {

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    const [params, setParams] = useState({ pathname: '/search-points', uf: '', city: ''})

    useEffect(() => {
        axios.get<IBGERUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);
    
    useEffect(() => {
        if(selectedUf === '0'){
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
        
    }, [selectedUf]);

    function handleSelectUf(event : ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;
        setSelectedUf(uf);
        setParams({
            ...params,
            uf
        });
    }

    function handleSelectCity(event : ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;
        setSelectedCity(city);
        setParams({
            ...params,
            city
        });
    }

    return (
        <div id="component-search">
            <div className="container">
                <form>
                    <fieldset>
                        <legend>
                            <h2>Pontos de coleta</h2>
                        </legend>
                
                        <div className="field">
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <br/>
                        <div className="field">
                            <select name="city" value={selectedCity} onChange={handleSelectCity} id="city">
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                        <br/>
                        <Link to={params}>Pesquisar</Link>
                    </fieldset>
                </form>
            </div>
            
        </div>
    );
};

export default PopUpSearchPoints;