import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
`;

export const Form = styled.form`
  display: flex;
`;

export const Button = styled.button`
  background: ${({ disabled }) => (disabled ? 'darkseagreen' : 'green')};
  color: ${({ disabled }) => (disabled ? '' : 'white')};
  border: none;
  width: 100px;
`;
