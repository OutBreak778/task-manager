"use client";

import { useGlobalState } from "@/app/context/GlobalProvider";
import React from "react";
import styled from "styled-components";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  selector?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
  border?: string;
  color?: string;
}

const Button = ({
  icon,
  name,
  background,
  selector,
  padding,
  borderRad,
  fw,
  fs,
  type,
  border,
  click,
  color,
}: Props) => {
  const { theme } = useGlobalState();

  return (
    <ButtonStyle
      type={type}
      onClick={click}
      style={{
        background: background,
        padding: padding || "0.5rem 1rem",
        borderRadius: borderRad || "0.5rem",
        fontWeight: fw || "500",
        fontSize: fs,
        border: border || "none",
        color: color,
      }}
      theme={theme}
      className="relative text-[#6c7983] z-10 cursor-pointer flex items-center justify-between gap-2 hover:text-[#f8f8f8] transition-colors"
    >
      {icon && icon}
      {name}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button``;
