import styled from 'styled-components';
import { darken } from 'polished'

export const Container = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 4px;


  footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase; 
      transform: background 0.2s;

      &:hover {
        background: ${darken(0.1, '#7159c1')}
      }
    }

  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align:left;
    padding: 12px;
  }

  tbody td {
    padding: 12px;
    border-bottom: 1px solid #999;

    img {
      height: 100px;
    }

    strong {
      color: #333;
      display: block;
    }

    span {
      display: block;
      font-weight: bold;
      font-size: 20px;
      margin-top: 5px;
    }

    div {
      display: flex;
      align-items: center;

      input {
        border: 1px solid #ddd;
        width: 50px;
        border-radius: 4px;
        color: #666;
        padding: 6px;
      }
    }

    button {
        border: 0;
        background: none;
        padding: 6px;
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #666;
    font-weight: bold;
  }

  strong {
    font-size: 28px;
    margin-left: 5px;
  }
`;
