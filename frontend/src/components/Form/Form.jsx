import styled from 'styled-components'

/*************************/
/********* CSS ***********/
/*************************/
const Form = styled.form`
  div {
    margin-bottom: 1rem;
    input,
    textarea {
      display: block;
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: 1.125rem;
      font-weight: 400;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      text-align: center;
    }
  }
`
export default Form
