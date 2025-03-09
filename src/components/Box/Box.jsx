import InputField from '../../pages/finance/InputField';
import {
  FinanceAppContainer,
  ContainerItens,
  AddButton,
  SectionTitle,
  ListItem,
  Checkbox,
  PaidItem,
  TrashIcon,
  ItensList
} from './style/style';

export const Box = ({
  title,
  labelName,
  debtName,
  setDebtName,
  labelValue,
  debtValue,
  setDebtValue,
  addDebt,
  debts,
  setDebts,
  togglePaidStatus, // Aqui podemos passar null quando não quisermos a função
  totalDebts,
  deleteItem,
  titleButtonAdd,
  colorButton
}) => {

  const handleTogglePaidStatus = (index) => {
    if (togglePaidStatus) {
      togglePaidStatus(debts, setDebts, index); // Chama a função apenas se ela não for null
    }
  };

  return (
    <FinanceAppContainer>
      <ContainerItens>
        <SectionTitle>{title}</SectionTitle>

        <InputField
          label={labelName}
          value={debtName} 
          setValue={setDebtName}
        />
        <InputField
          label={labelValue}
          value={debtValue}
          setValue={setDebtValue}
          type="number"
        />
        <AddButton type={colorButton} onClick={addDebt}>{titleButtonAdd}</AddButton>

        <ul>
          {debts && debts.length > 0 && debts.map((debt, index) => (
            <ListItem key={index}>
              <div>
                <TrashIcon onClick={() => deleteItem(debts, setDebts, index)} />
              </div>

              <div>
                {togglePaidStatus && ( // Verifica se a função existe antes de exibir o checkbox
                  <Checkbox
                    type="checkbox"
                    checked={debt.paid}
                    onChange={() => handleTogglePaidStatus(index)}
                  />
                )}

                <PaidItem paid={debt.paid}>
                  {debt.name}: R$ {debt.value.toFixed(2)}
                </PaidItem>
              </div>
            </ListItem>
          ))}
        </ul>

        <ItensList>
          <p>Total: R$ {(totalDebts || 0).toFixed(2)}</p>
        </ItensList>
      </ContainerItens>
    </FinanceAppContainer>
  );
};
