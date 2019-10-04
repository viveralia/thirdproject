import styled from 'styled-components'

/*************************/
/********* CSS ***********/
/*************************/
const Card = styled.section`
  border: 1px solid #eee;
  background: #fcfcfc;
  padding: 3rem 2rem;
  position: relative;
  text-align: ${props => props.align && props.align};
  @media (min-width: 992px) {
    padding: 3rem;
    width: 500px;
  }
`

export default Card
