import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from 'styled-components';
import { dropDownMenuRecoil } from "./recoil/DropDownRecoil";

const Dropdown = () => {
    const dropDownMenu = useRecoilValue(dropDownMenuRecoil);
    const [searchItem, setSearchItem] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState('title');

    return (
        <DropdownWrapper>
            <DropdownBox onClick={() => setIsOpen(!isOpen)}>
                {item}
                <Arrow>▼</Arrow>
            </DropdownBox>
            {isOpen &&
                <SelectWrapper>
                    {dropDownMenu.filter((data) => {
                        if (searchItem === '') {
                            return data;
                        } else if (data.toLowerCase().includes(searchItem.toLowerCase())) {
                            return data;
                        }
                        return null;
                    }).map(data => (
                        <SelectOptions key={data} onClick={() => { setItem(data); setIsOpen(false); }}>
                            {data}
                        </SelectOptions>
                    ))}
                </SelectWrapper>
            }
        </DropdownWrapper>
    );
};

const DropdownWrapper = styled.div`
    width: 100%;
    padding: 20px;
`;

const DropdownBox = styled.div`
    width: 240px;
    padding: 14px 10px;
    margin: 0 auto 5px;
    border: 1px solid var(--shadow);
    border-radius: 5px; 
    background: var(--white);
    line-height: 15px;
    cursor: pointer;
    position: relative;
    text-align: center;
`;

const Arrow = styled.div`
    position: absolute;
    top: 14px;
    left: calc(100% - 22px);
    font-size: 0.6em;
`;

const SelectWrapper = styled.div`
    width: 240px;
    margin: 0 auto;
    padding-bottom: 10px;
    border: 1px solid var(--shadow);
    border-radius: 5px; 
    background: var(--white);
    line-height: 15px;
    position: relative;
    box-shadow: 0 1px 1px 0 var(--shadow), 0 1px 5px 0 var(--grey-light);
`;

const SelectOptions = styled.div`
    width: 100%;
    padding: 10px;
    background: var(--white);
    line-height: 15px;
    cursor: pointer;
    :hover {
        background: var(--white-second);
    }
`;

export default Dropdown;