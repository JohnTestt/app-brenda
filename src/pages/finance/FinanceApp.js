import React, { useState, useEffect } from 'react';
import { Box } from '../../components/Box/Box';
import { SectionTitle, SectionBox, Container, BoxContainer, MonthSelector } from './style/style';
import InputField from './InputField';

const FinanceApp = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Formato "YYYY-MM"
  const [salary, setSalary] = useState('');
  const [pension, setPension] = useState('');
  const [familyAllowance, setFamilyAllowance] = useState('');
  const [fixedDebts, setFixedDebts] = useState([]);
  const [newFixedDebtName, setNewFixedDebtName] = useState('');
  const [newFixedDebtValue, setNewFixedDebtValue] = useState('');

  const [variableDebts, setVariableDebts] = useState([]);
  const [newVariableDebtName, setNewVariableDebtName] = useState('');
  const [newVariableDebtValue, setNewVariableDebtValue] = useState('');

  const [marketPurchases, setMarketPurchases] = useState([]);
  const [newMarketPurchaseDescription, setNewMarketPurchaseDescription] = useState('');
  const [newMarketPurchaseValue, setNewMarketPurchaseValue] = useState('');

  const [variableIncomes, setVariableIncomes] = useState([]);
  const [newVariableIncomeName, setNewVariableIncomeName] = useState('');
  const [newVariableIncomeValue, setNewVariableIncomeValue] = useState('');

  // Função para carregar dados do localStorage com base no mês selecionado
  useEffect(() => {
    const monthPrefix = `month_${selectedMonth}_`;

    const savedSalary = localStorage.getItem(`${monthPrefix}salary`);
    const savedPension = localStorage.getItem(`${monthPrefix}pension`);
    const savedFamilyAllowance = localStorage.getItem(`${monthPrefix}familyAllowance`);
    const savedFixedDebts = localStorage.getItem(`${monthPrefix}fixedDebts`);
    const savedVariableDebts = localStorage.getItem(`${monthPrefix}variableDebts`);
    const savedMarketPurchases = localStorage.getItem(`${monthPrefix}marketPurchases`);
    const savedVariableIncomes = localStorage.getItem(`${monthPrefix}variableIncomes`);

    if (savedSalary) setSalary(JSON.parse(savedSalary));
    if (savedPension) setPension(JSON.parse(savedPension));
    if (savedFamilyAllowance) setFamilyAllowance(JSON.parse(savedFamilyAllowance));
    if (savedFixedDebts) setFixedDebts(JSON.parse(savedFixedDebts));
    if (savedVariableDebts) setVariableDebts(JSON.parse(savedVariableDebts));
    if (savedMarketPurchases) setMarketPurchases(JSON.parse(savedMarketPurchases));
    if (savedVariableIncomes) setVariableIncomes(JSON.parse(savedVariableIncomes));
  }, [selectedMonth]);

  // Função para salvar dados no localStorage com base no mês selecionado
  useEffect(() => {
    const monthPrefix = `month_${selectedMonth}_`;

    localStorage.setItem(`${monthPrefix}salary`, JSON.stringify(salary));
    localStorage.setItem(`${monthPrefix}pension`, JSON.stringify(pension));
    localStorage.setItem(`${monthPrefix}familyAllowance`, JSON.stringify(familyAllowance));
    localStorage.setItem(`${monthPrefix}fixedDebts`, JSON.stringify(fixedDebts));
    localStorage.setItem(`${monthPrefix}variableDebts`, JSON.stringify(variableDebts));
    localStorage.setItem(`${monthPrefix}marketPurchases`, JSON.stringify(marketPurchases));
    localStorage.setItem(`${monthPrefix}variableIncomes`, JSON.stringify(variableIncomes));
  }, [salary, pension, familyAllowance, fixedDebts, variableDebts, marketPurchases, variableIncomes, selectedMonth]);

  const addFixedDebt = () => {
    if (newFixedDebtName && newFixedDebtValue) {
      const updatedFixedDebts = [...fixedDebts, { name: newFixedDebtName, value: parseFloat(newFixedDebtValue), paid: false }];
      setFixedDebts(updatedFixedDebts);
      setNewFixedDebtName('');
      setNewFixedDebtValue('');
    }
  };

  const addVariableDebt = () => {
    if (newVariableDebtName && newVariableDebtValue) {
      const updatedVariableDebts = [...variableDebts, { name: newVariableDebtName, value: parseFloat(newVariableDebtValue), paid: false }];
      setVariableDebts(updatedVariableDebts);
      setNewVariableDebtName('');
      setNewVariableDebtValue('');
    }
  };

  const addMarketPurchase = () => {
    if (newMarketPurchaseDescription && newMarketPurchaseValue) {
      const updatedMarketPurchases = [...marketPurchases, { name: newMarketPurchaseDescription, value: parseFloat(newMarketPurchaseValue), paid: false }];
      setMarketPurchases(updatedMarketPurchases);
      setNewMarketPurchaseDescription('');
      setNewMarketPurchaseValue('');
    }
  };

  const addVariableIncome = () => {
    if (newVariableIncomeName && newVariableIncomeValue) {
      const updatedVariableIncomes = [...variableIncomes, { name: newVariableIncomeName, value: parseFloat(newVariableIncomeValue) }];
      setVariableIncomes(updatedVariableIncomes);
      setNewVariableIncomeName('');
      setNewVariableIncomeValue('');
    }
  };

  const togglePaidStatus = (list, setList, index) => {
    const updatedList = list.map((item, idx) =>
      idx === index ? { ...item, paid: !item.paid } : item
    );
    setList(updatedList);
  };

  const deleteItem = (list, setList, index) => {
    const updatedList = list.filter((_, idx) => idx !== index);
    setList(updatedList);
  };

  const totalFixedDebts = fixedDebts.reduce((sum, debt) => sum + debt.value, 0);
  const totalVariableDebts = variableDebts.reduce((sum, debt) => sum + debt.value, 0);
  const totalMarketPurchases = marketPurchases.reduce((sum, purchase) => sum + purchase.value, 0);
  const totalVariableIncomes = variableIncomes.reduce((sum, income) => sum + income.value, 0);

  const totalExpenses = (fixedDebts.filter(debt => debt.paid).reduce((sum, debt) => sum + debt.value, 0) +
    variableDebts.filter(debt => debt.paid).reduce((sum, debt) => sum + debt.value, 0) +
    marketPurchases.filter(purchase => purchase.paid).reduce((sum, purchase) => sum + purchase.value, 0));

  const totalIncome = parseFloat(salary || 0) + parseFloat(pension || 0) + parseFloat(familyAllowance || 0) + totalVariableIncomes;
  const remainingBalance = totalIncome - totalExpenses;

  return (
    <Container>
      <SectionTitle>Controle Finanças</SectionTitle>

      <SectionBox>
       
        <MonthSelector
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const month = new Date(0, i).toLocaleString('pt-BR', { month: 'long' });
            const value = new Date(0, i).toISOString().slice(0, 7);
            return (
              <option key={value} value={value}>
                {month} {new Date().getFullYear()}
              </option>
            );
          })}
        </MonthSelector>

        <SectionTitle>Rendimentos</SectionTitle>
        <InputField
          label="Salário"
          value={salary}
          setValue={setSalary}
          type="number"
        />
        <InputField
          label="Pensão"
          value={pension}
          setValue={setPension}
          type="number"
        />
        <InputField
          label="Bolsa Família"
          value={familyAllowance}
          setValue={setFamilyAllowance}
          type="number"
        />
      </SectionBox>

      <BoxContainer>
        <Box
          title='Dívidas Fixas'
          labelName='Nome da Dívida Fixa'
          debtName={newFixedDebtName}
          setDebtName={setNewFixedDebtName}

          labelValue='Valor da Dívida Fixa'
          debtValue={newFixedDebtValue}
          setDebtValue={setNewFixedDebtValue}
          addDebt={addFixedDebt}

          debts={fixedDebts}
          setDebts={setFixedDebts}
          togglePaidStatus={togglePaidStatus}
          totalDebts={totalFixedDebts}
          deleteItem={deleteItem}
          titleButtonAdd='Adicionar Dívida'
          colorButton='debt'
        />

        <Box
          title='Dívidas Variáveis'
          labelName='Nome da Dívida Variável'
          debtName={newVariableDebtName}
          setDebtName={setNewVariableDebtName}

          labelValue='Valor da Dívida Variável'
          debtValue={newVariableDebtValue}
          setDebtValue={setNewVariableDebtValue}
          addDebt={addVariableDebt}

          debts={variableDebts}
          setDebts={setVariableDebts}
          togglePaidStatus={togglePaidStatus}
          totalDebts={totalVariableDebts}
          deleteItem={deleteItem}
          titleButtonAdd='Adicionar Dívida'
          colorButton='debt'
        />

        <Box
          title='Compras Mercado e etc..'
          labelName='Data e Descrição da Compra'
          debtName={newMarketPurchaseDescription}
          setDebtName={setNewMarketPurchaseDescription}

          labelValue='Valor da Compra'
          debtValue={newMarketPurchaseValue}
          setDebtValue={setNewMarketPurchaseValue}
          addDebt={addMarketPurchase}

          debts={marketPurchases}
          setDebts={setMarketPurchases}
          togglePaidStatus={togglePaidStatus}
          totalDebts={totalMarketPurchases}
          deleteItem={deleteItem}
          titleButtonAdd='Adicionar Compra'
          colorButton='debt'
        />

        <Box
          title='Ganhos Variáveis'
          labelName='Nome do Ganho Variável'
          debtName={newVariableIncomeName}
          setDebtName={setNewVariableIncomeName}

          labelValue='Valor do Ganho Variável'
          debtValue={newVariableIncomeValue}
          setDebtValue={setNewVariableIncomeValue}
          addDebt={addVariableIncome}

          debts={variableIncomes}
          setDebts={setVariableIncomes}
          togglePaidStatus={null} // Ganhos não têm status de pagamento
          totalDebts={totalVariableIncomes}
          deleteItem={deleteItem}
          titleButtonAdd='Adicionar Ganho'
          colorButton='income'
        />
      </BoxContainer>

      <div>
        <SectionTitle>Resumo</SectionTitle>
        <p>Total de Renda: R$ {totalIncome.toFixed(2)}</p>
        <p>Total de Despesas: R$ {totalExpenses.toFixed(2)}</p>
        <p>Saldo Restante: R$ {remainingBalance.toFixed(2)}</p>
      </div>
    </Container>
  );
};

export default FinanceApp;
