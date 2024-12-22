import styled, {css} from "styled-components";

const disabledCss = css`
  background-color: #E2E2E2;
  border-width: 0px;
`

const checkedCss = css`
  border-color: #B5B5BA;
  background-color: #B5B5BA;
  background-image: url(assets/images/svg/todo-done.svg);
  background-position: center;
  background-repeat: no-repeat;
  min-width: 20px;
  min-height: 20px;
`

export const CheckboxContainer = styled.span(props => {
  return `
    display: inline-block;
    min-width: 20px;
    min-height: 20px;
    border: 2px solid #C4C4C4;
    border-radius: 6px;
    cursor: pointer;
    ${props.disabled ? disabledCss : ''}
    ${props.checked ? checkedCss : ''}
  `;
});


export const TodoItemCheckbox = ({disabled, checked, onCheck}) => {
  return <CheckboxContainer disabled={disabled} checked={checked} onClick={onCheck}/>
}