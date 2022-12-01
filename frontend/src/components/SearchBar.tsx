import React, {ChangeEvent} from "react";
import '../styles/mainPage.scss'
import Search from '../assets/svg/search.svg'
import PropTypes from 'prop-types';

interface IProps {
    onChange: (e: string) => void
}

const SearchBar = (props: IProps) => {
    return (
        <div className="search-bar">
            <img src={Search} alt={"search"}/>
            <input
                className="search-bar-input"
                type="search"
                placeholder="Search for article"
                onChange={(e: ChangeEvent<HTMLInputElement>)=> props.onChange(e.target.value)}
            />
        </div>
    )
}

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default SearchBar