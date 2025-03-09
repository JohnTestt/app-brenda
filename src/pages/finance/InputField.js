import React from 'react';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin-bottom: 5px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  text-align: left;
  padding-left: .6rem;
`;

const Input = styled.input`
  width: 90%;
  padding: 8px;
  margin: .5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputField = ({ label, value, setValue, type }) => {
  return (
    <FieldContainer>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Insira o ${label.toLowerCase()}`}
      />
    </FieldContainer>
  );
};

export default InputField;
