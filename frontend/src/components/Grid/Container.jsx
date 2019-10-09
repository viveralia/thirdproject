import styled from 'styled-components'

/*************************/
/********* CSS ***********/
/*************************/
const Container = styled.div`
  padding: 1rem 1.5rem;
  max-width: ${props => (props.type === 'fullwidth' ? '100%' : 'var(--maxWidth)')};
  margin: 0 auto;
  min-height: ${props =>
    props.type === 'fullheight' ? 'calc(100vh - 8.5rem)' : props.type === 'portfolio-fullheight' ? '100vh' : 'initial'};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default Container
