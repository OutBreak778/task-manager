"use client";

import { useGlobalState } from "@/app/context/GlobalProvider";
import React from "react";
import styled from "styled-components";

interface Props {
  content: React.ReactNode;
}

const Modal = ({ content }: Props) => {
  const { CloseModal } = useGlobalState();
  const { theme } = useGlobalState();
  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={CloseModal}></div>
      <div className="modal-content">{content}</div>
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
  }

  .modal-content {
    margin: 0 1.6rem;
    border: 2px solid ${(props) => props.theme.borderColor2};
    padding: 1rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    z-index: 100;

    border-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${(props) => props.theme.borderRadiusMd2};

    @media screen and (max-width: 450px) {
      font-size: 60%;
    }

    @media screen and (max-width: 768px) {
      padding: 2rem;
    }
  }
`;

export default Modal;
