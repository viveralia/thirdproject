import styled from 'styled-components'

/*************************/
/********* CSS ***********/
/*************************/
const Button = styled.button`
  background: ${props => (props.modifier === 'primary' ? 'var(--black)' : 'transparent')};
  color: ${props => (props.modifier === 'primary' ? '#fff' : 'var(--black)')};
  padding: 0.5rem 1.571rem;
  font-size: 0.8125rem;
  text-transform: uppercase;
  font-weight: 500;
  border: 2px solid var(--black);
  transition: all 0.175s ease;
  display: inline-block;
  position: relative;
  cursor: pointer;
  ::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: -2px;
    left: -2px;
    width: 100%;
    height: 100%;
    border: 2px solid var(--black);
    opacity: 0;
    transition: opacity 0.175s ease;
  }
  :hover,
  :focus {
    background: ${props => (props.modifier !== 'primary' ? 'var(--black)' : '#eee')};
    color: ${props => (props.modifier !== 'primary' ? '#fff' : 'var(--black)')};
    ::after {
      opacity: 1;
    }
  }
  @media (min-width: 992px) {
    padding: 0.675rem 1.78571rem;
  }
`

export default Button
