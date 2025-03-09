import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
 
`;

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: #f4f4f4;
  border-radius: 15px;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;

`;


export const SectionBox = styled.section`
  width:40%;
  margin: 0 auto;
  margin-bottom: 1rem;
`;


export const SectionTitle = styled.h2`
  margin-top: 20px;
  font-size: 1.5rem;
  text-align:center;
`;

export const MonthSelector = styled.select`
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;