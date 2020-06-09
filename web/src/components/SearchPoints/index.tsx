import React from 'react';

import './styles.css'

const SearchPoints = () => {
    return (
        <div id="component-search">
            <div className="content">
                <form>
                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>
                
                        <div className="field">
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>
                        <br/>
                        <div className="field">
                            <select name="city" id="city">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>
                    </fieldset>
                </form>
            </div>
            
        </div>
    );
};

export default SearchPoints;