import styled from 'styled-components'

/*************************/
/********* CSS ***********/
/*************************/
const Card = styled.section`
  border: 1px solid #eee;
  background: #fcfcfc;
  padding: 3rem 1.5rem;
  position: relative;
  text-align: ${props => props.align && props.align};
  /* Fullheight */
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 992px) {
    padding: 3rem;
    width: 550px;
    height: initial;
    position: relative;
    display: initial;
  }
`

export default Card
