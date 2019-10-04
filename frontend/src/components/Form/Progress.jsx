import styled from 'styled-components'

const Progress = styled.progress`
  appearance: none;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 0.325rem;
  z-index: 9;
  ::-webkit-progress-bar {
    background: transparent;
  }
  ::-webkit-progress-value {
    background: var(--action);
  }
`

export default Progress
