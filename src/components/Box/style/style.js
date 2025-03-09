import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';


export const FinanceAppContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  font-family: 'Roboto';
  width: auto;


`;

export const ContainerItens = styled.div`
  min-width: 300px;
  margin: 1rem;
  padding: .5rem;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

 
  
`;

// export const AddButton = styled.button`
//   background-color: #4CAF50;
//   color: white;
//   padding: 10px 20px;
//   margin: 10px 0;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
  
// `;

// Botão com base na propriedade 'type'
export const AddButton = styled.button`
  background-color: ${props => props.type === 'debt' ? '#d23a2d' : '#4CAF50' };
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 1rem;
  
  &:hover {
    opacity: 0.8;
  }
`;


export const SectionTitle = styled.h2`
  margin-top: 15px;
  padding-top: 1rem;
  font-size: 1.5rem;
  text-align:center;
`;

export const ListItem = styled.li`
  display: flex;
  margin: 0 auto;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
  text-align: center;
  
`;

export const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
  
`;

export const PaidItem = styled.span`
  text-decoration: ${props => (props.paid ? 'line-through' : 'none')};
  color: ${props => (props.paid ? 'green' : 'black')};
`;

export const  TrashIcon = styled(DeleteIcon)`

 cursor: pointer;
`;

export const ItensList = styled.div`
 
 padding-bottom: .5rem;
 padding-left: .5rem;
 text-align: left;
color: #b3331a;
 
  
`;

