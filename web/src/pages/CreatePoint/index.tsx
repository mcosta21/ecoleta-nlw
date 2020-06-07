import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import logo from '../../assets/logo.svg';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import InputMask from 'react-input-mask';

interface Item {
    id: number,
    title: string,
    image_url: string
}

interface Point {
    name: string,
    email: string,
    whatsapp: string,
    uf: string,
    city: string,
    latitude: number,
    longitude: number,
    items: number[]
}

interface IBGERUFResponse{
    sigla: string
}

interface IBGECityResponse{
    nome: string
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([ latitude, longitude ]);
            setSelectedPosition( [ latitude, longitude ]);
        })
    }, []);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);
   
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
    }

    function handleSelectCity(event : ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleMapClick(event : LeafletMouseEvent){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
        setInitialPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    function handleInputChange(event : ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;
        setFormData({
            ...formData, [name]: value
        });
    }

    function handleSelectItem(id : number){
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if(alreadySelected >= 0){
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        }
        else{
            setSelectedItems([ ...selectedItems, id ]);
        }
    }

    function handleSelectAllItems(event : ChangeEvent<HTMLInputElement>){
        const check = event.target.checked;
        if(check){
            setSelectedItems(items.map(item => item.id));
        }
        else{
            setSelectedItems([]);
        }
    }

    async function handleSubmit(event : FormEvent){
        event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [ latitude, longitude ] = selectedPosition;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        };
        
        const canCreate = await validatorData(data)
        if(canCreate === false){
            return;
        }
            
        await api.post('points', data);
        alert('Ponto de coleta criado!');
        history.push('/');
    }

    async function validatorData(data : Point){
        if(data.name === ''){
            alert('Nome da entidade não informado.');
            return false;
        }
        if(data.email === ''){
            alert('E-mail não informado.');
            return false;
        }
        if(data.whatsapp === ''){
            alert('Whatsapp não informado.');
            return false;
        }
        if(data.uf === '0'){
            alert('Estado não informado.');
            return false;
        }
        if(data.city === '0'){
            alert('Cidade não informada.');
            return false;
        }
        if(data.items.length === 0){
            alert('Nenhum item de coleta informado.');
            return false;
        }
        
        const pointAlreadyExists = await api.get('points', {
            params: { city: data.city, uf: data.uf, items: '', name: data.name },
        }).then(response => {
            return response.data.length;
        });

        if(pointAlreadyExists > 0){
            alert('Ponto de coleta já cadastrado.');
            return false;
        }
        
        return true;
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro do ponto <br/> de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
               
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                            />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <InputMask mask="(99) 99999-9999"
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}>
                            </InputMask>
                        </div>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        <Marker position={selectedPosition}>
                            <Popup >
                                <span>
                                    <h3>{formData.name || 'Olá Mundo'}</h3>
                                    <h4>Estou aqui!!!.</h4>
                                </span>
                            </Popup>
                        </Marker>
                    </Map>

                    <div className="field">
                        <label htmlFor="address">Endereço</label>
                        <input 
                            type="text"
                            name="address"
                            id="address"
                            disabled={true}
                            />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" value={selectedCity} onChange={handleSelectCity} id="city">
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {
                            items.map(item => (
                                <li 
                                    key={item.id} 
                                    onClick={() => handleSelectItem(item.id)}
                                    className={selectedItems.includes(item.id) ? 'selected' : ''}
                                >
                                    <img src={item.image_url} alt={item.title}/>
                                    <span>{item.title}</span>
                                </li>
                            ))
                        }
                        
                    </ul>
                </fieldset>
                
                <div id="page-submit-point">
                    <div className="check-select-all">
                        <input type="checkbox" id="selectAllItems" name="selectAllItems" onChange={handleSelectAllItems} value='0'/>
                        <label htmlFor="selectAllItems"> Selecionar todos os itens.</label><br></br>
                    </div>
                    <button type="submit">
                        Cadastrar ponto de coleta
                    </button>
                </div>
                

            </form>
        </div>
    )
}

export default CreatePoint;