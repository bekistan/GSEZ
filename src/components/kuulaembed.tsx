// components/kuulaembed.tsx
import React from 'react';
import styled from 'styled-components';

const Iframe = styled.iframe`
  width: 100%;
  height: 500px;
  border: none;
`;

interface KuulaEmbedProps {
  src: string;
}

const KuulaEmbed: React.FC<KuulaEmbedProps> = ({ src }) => {
  return <Iframe src={src} allowFullScreen></Iframe>;
};

export default KuulaEmbed;
